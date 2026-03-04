import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/routes/routes'
import { PageHome, PageBreed, UiFallbackLoader } from '../components'
import { BreedsProvider } from '../providers'
import css from './app.module.scss'
import { Suspense, useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function App() {
    const name = `App`

    const appRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!appRef.current) return

        const lenis = new Lenis({
            infinite: true,
            // wrapper: appRef.current
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [appRef])

    return (
        <div className={css[name]} data-theme="dark" ref={appRef}>
            <Suspense fallback={<UiFallbackLoader />}>
                <BreedsProvider>
                    <Routes>
                        <Route path={ROUTES.Home} element={<PageHome />} />
                        <Route
                            path={ROUTES.BreedDetail}
                            element={<PageBreed />}
                        />
                    </Routes>
                </BreedsProvider>
            </Suspense>
        </div>
    )
}

export default App
