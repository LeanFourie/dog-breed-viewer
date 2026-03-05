import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/routes/routes'
import { PageHome, PageBreed, UiFallbackLoader } from '../components'
import { BreedsProvider } from '../providers'
import css from './app.module.scss'
import { Suspense, useEffect } from 'react'
import Lenis from 'lenis'

export function App() {
    const name = `App`

    useEffect(() => {
        const lenis = new Lenis({
            infinite: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div className={css[name]} data-theme="dark">
            <Suspense fallback={<UiFallbackLoader />}>
                <BreedsProvider>
                    <Routes>
                        <Route path={ROUTES.Home} element={<PageHome />} />
                        <Route
                            path={ROUTES.Breed}
                            element={<PageBreed />}
                        />
                    </Routes>
                </BreedsProvider>
            </Suspense>
        </div>
    )
}

export default App
