import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/routes/routes'
import { PageHome, UiFallbackLoader } from '../components'
import { BreedsProvider } from '../providers'
import { Suspense } from 'react'

export function App() {
    return (
        <div data-theme="light">
            <Suspense fallback={<UiFallbackLoader />}>
                <BreedsProvider>
                    <Routes>
                        <Route
                            path={ ROUTES.Home }
                            element={ <PageHome /> }
                        />
                    </Routes>
                </BreedsProvider>
            </Suspense>
        </div>
    )
}

export default App
