import { UiButton } from '../../actions/ui-button/ui-button'
import { UiText } from '../../base/ui-text/ui-text'
import { type UiErrorPageProps } from './error-page.definitions'
import css from './error-page.module.scss'
import { useEffect, useRef } from 'react'

type TWebGLCleanup = () => void

const MAX_CLICKS = 8

function startBayerDitherBackground(canvas: HTMLCanvasElement): TWebGLCleanup {
    const gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        premultipliedAlpha: false,
    })

    if (!gl) return () => {}

    const vertexShaderSource = `
        attribute vec2 aPosition;
        varying vec2 vUv;

        void main() {
            vUv = aPosition * 0.5 + 0.5;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `

    const fragmentShaderSource = `
        precision highp float;

        uniform vec2 uResolution;
        uniform float uTime;
        uniform float uCoverage;
        uniform vec2 uClickPos[${MAX_CLICKS}];
        uniform float uClickTimes[${MAX_CLICKS}];
        varying vec2 vUv;

        float hash21(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }

        float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash21(i);
            float b = hash21(i + vec2(1.0, 0.0));
            float c = hash21(i + vec2(0.0, 1.0));
            float d = hash21(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
            for (int i = 0; i < 5; i++) {
                v += a * noise(p);
                p = m * p + vec2(0.13, 0.17);
                a *= 0.5;
            }
            return v;
        }

        float Bayer2(vec2 a) {
            a = floor(a);
            return fract(a.x / 2.0 + a.y * a.y * 0.75);
        }

        #define Bayer4(a)   (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
        #define Bayer8(a)   (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            float aspect = uResolution.x / uResolution.y;
            vec2 fragUv = (fragCoord / uResolution) * vec2(aspect, 1.0);

            float pixelSize = 7.0;
            float cellPixelSize = 5.0 * pixelSize;

            vec2 pixelId = floor(fragCoord / pixelSize);
            vec2 cellId = floor(fragCoord / cellPixelSize);
            vec2 cellCoord = cellId * cellPixelSize + 0.5 * cellPixelSize;

            vec2 uv = (cellCoord / uResolution) * vec2(aspect, 1.0);

            float n = fbm(uv * 2.8 + vec2(0.0, uTime * 0.05));
            n = pow(n, 1.35);

            float feed = 0.0;
            float speed = 0.9;
            float thickness = 0.05;
            float dampT = 1.1;
            float dampR = 2.0;

            for (int i = 0; i < ${MAX_CLICKS}; ++i) {
                if (uClickTimes[i] < 0.0) continue;
                float t = max(uTime - uClickTimes[i], 0.0);
                vec2 clickUv = (uClickPos[i] / uResolution - 0.5) * vec2(aspect, 1.0);
                float r = distance(fragUv - 0.5 * vec2(aspect, 1.0), clickUv);
                float waveR = speed * t;
                float ring = exp(-pow((r - waveR) / thickness, 2.0));
                float atten = exp(-dampT * t) * exp(-dampR * r);
                feed = max(feed, ring * atten);
            }

            vec2 uv01 = fragCoord / uResolution;
            float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
            float edgeBoost = 1.0 - smoothstep(0.14, 0.48, edgeDist);

            float density = clamp(n * (0.55 + 0.45 * edgeBoost) + feed * 0.9, 0.0, 1.0);
            float dither = Bayer8(pixelId);
            float on = step(uCoverage, density + dither - 0.5);

            vec2 f = fract(fragCoord / pixelSize);
            float shape = step(0.15, f.x) * step(0.15, f.y) * step(f.x, 0.85) * step(f.y, 0.85);

            float dots = on * shape;

            vec3 bg = vec3(0.02, 0.02, 0.03);
            vec3 hot = vec3(1.0, 0.22, 0.08);
            vec3 warm = vec3(1.0, 0.45, 0.12);
            float glow = clamp(density * 0.9 + feed * 0.9, 0.0, 1.0);
            vec3 dotColor = mix(hot, warm, smoothstep(0.15, 0.95, glow));

            float subtle = 0.05 * (fbm(uv * 0.9 + uTime * 0.02) - 0.5);
            vec3 base = bg + subtle;
            vec3 col = mix(base, dotColor, dots);

            gl_FragColor = vec4(col, 1.0);
        }
    `

    const compileShader = (type: number, source: string) => {
        const shader = gl.createShader(type)
        if (!shader) return null
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        const ok = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
        if (!ok) {
            gl.deleteShader(shader)
            return null
        }
        return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    if (!vs || !fs) return () => {}

    const program = gl.createProgram()
    if (!program) return () => {}
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!linked) return () => {}

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    if (!positionBuffer) return () => {}
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
    )

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uCoverage = gl.getUniformLocation(program, 'uCoverage')
    const uClickPos = gl.getUniformLocation(program, 'uClickPos[0]')
    const uClickTimes = gl.getUniformLocation(program, 'uClickTimes[0]')

    const clickPositions = new Float32Array(MAX_CLICKS * 2)
    const clickTimes = new Float32Array(MAX_CLICKS)
    for (let i = 0; i < MAX_CLICKS; i++) {
        clickPositions[i * 2 + 0] = -1
        clickPositions[i * 2 + 1] = -1
        clickTimes[i] = -1
    }

    let clickIndex = 0

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    let width = 0
    let height = 0
    let dpr = 1
    let rafId = 0
    const startTime = performance.now()

    const resize = () => {
        const rect = canvas.getBoundingClientRect()
        dpr = Math.min(window.devicePixelRatio || 1, 2)
        width = Math.max(1, Math.floor(rect.width * dpr))
        height = Math.max(1, Math.floor(rect.height * dpr))

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
            gl.viewport(0, 0, width, height)
        }
    }

    const render = (now: number) => {
        const t = (now - startTime) / 1000
        resize()

        const coverage = 0.75
        if (uResolution) gl.uniform2f(uResolution, width, height)
        if (uTime) gl.uniform1f(uTime, t)
        if (uCoverage) gl.uniform1f(uCoverage, coverage)
        if (uClickPos) gl.uniform2fv(uClickPos, clickPositions)
        if (uClickTimes) gl.uniform1fv(uClickTimes, clickTimes)

        gl.drawArrays(gl.TRIANGLES, 0, 3)

        if (!prefersReducedMotion) {
            rafId = requestAnimationFrame(render)
        }
    }

    const handlePointerDown = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = (event.clientX - rect.left) * dpr
        const y = (rect.height - (event.clientY - rect.top)) * dpr
        clickPositions[clickIndex * 2 + 0] = x
        clickPositions[clickIndex * 2 + 1] = y
        clickTimes[clickIndex] = (performance.now() - startTime) / 1000
        clickIndex = (clickIndex + 1) % MAX_CLICKS
        if (prefersReducedMotion) requestAnimationFrame(render)
    }

    const resizeObserver =
        typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => {
                  if (prefersReducedMotion) requestAnimationFrame(render)
              })
            : null

    resize()
    canvas.addEventListener('pointerdown', handlePointerDown, {
        passive: true,
    })
    resizeObserver?.observe(canvas)
    rafId = requestAnimationFrame(render)

    return () => {
        canvas.removeEventListener('pointerdown', handlePointerDown)
        resizeObserver?.disconnect()
        if (rafId) cancelAnimationFrame(rafId)
        gl.deleteBuffer(positionBuffer)
        gl.deleteProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
    }
}

function UiErrorPage({ onRetryClick, message }: UiErrorPageProps) {
    const name = `UiErrorPage`
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        return startBayerDitherBackground(canvasRef.current)
    }, [])

    return (
        <div className={css[name]}>
            <canvas
                ref={canvasRef}
                className={css[`${name}__background`]}
                aria-hidden="true"
            />
            <div className={css[`${name}__content`]}>
                <UiText size={'sm'} variant={'h4'} weight={'semi-bold'}>
                    {message}
                </UiText>
                <UiButton
                    onClick={onRetryClick}
                    color={'invert'}
                    label={'Retry'}
                    shade={'light'}
                    tag={'button'}
                    type={'text'}
                />
            </div>
        </div>
    )
}

export { UiErrorPage }
