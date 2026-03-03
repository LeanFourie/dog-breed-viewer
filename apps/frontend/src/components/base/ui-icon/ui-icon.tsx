import { useEffect, useState } from 'react'
import css from './ui-icon.module.scss'
import { Fragment } from 'react/jsx-runtime'
import type { TUiIconProps } from './ui-icon.definitions'

function UiIcon({
    className = '',
    style = {},
    type = 'text',
    value,
}: TUiIconProps) {
    const name = `UiIcon`
    const [_svgContent, _setSvgContent] = useState<SVGSVGElement | null>(null)

    const loadSVG = async () => {
        if (!value || typeof value !== 'string') return

        try {
            const response = await fetch(value)
            const text = await response.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(text, 'image/svg+xml')
            const svg = doc.querySelector('svg')
            if (svg) {
                svg.removeAttribute('xmlns:a')
                _setSvgContent(svg)
            }
        } catch (err) {
            console.error('Failed to load SVG:', err)
        }
    }

    useEffect(() => {
        if (type === 'svg') loadSVG()
    }, [type, value])

    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--type-${type}`]}
                ${className}
            `}
            style={style}
        >
            {type === 'text' ? (
                <Fragment>{value}</Fragment>
            ) : (
                <span
                    className={`${css[`${name}__element`]}`}
                    dangerouslySetInnerHTML={{
                        __html: _svgContent?.outerHTML ?? '',
                    }}
                ></span>
            )}
        </span>
    )
}

export { UiIcon }
