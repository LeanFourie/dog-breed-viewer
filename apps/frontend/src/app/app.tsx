import { PageHome, PageBreed } from '../features'
import {
    BreedProvider,
    BreedsProvider,
    NotificationProvider,
} from '../providers'
import { ROUTES } from '../utils/routes/routes'
import css from './app.module.scss'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

export function App() {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `App`
    // #endregion

    // #region - Effects
    useEffect(() => {
        // Create a new lenis scroll object
        const lenis = new Lenis({
            infinite: true,
        })

        // Create the lenis smooth scroll using RAF
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        // Initialize the smooth scrolling
        requestAnimationFrame(raf)

        return () => {
            // Destroy lenis so the added functions are removed
            lenis.destroy()
        }
    }, [])
    // #endregion

    // #region - Markup
    return (
        <div className={css[name]} data-theme="dark">
            <NotificationProvider>
                <BreedsProvider>
                    <Routes>
                        <Route path={ROUTES.Home} element={<PageHome />} />
                        <Route
                            path={ROUTES.Breed}
                            element={
                                <BreedProvider>
                                    <PageBreed />
                                </BreedProvider>
                            }
                        />
                    </Routes>
                </BreedsProvider>
            </NotificationProvider>
        </div>
    )
    // #endregion
}

export default App
