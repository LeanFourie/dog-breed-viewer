import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/routes/routes'
import { PageHome } from '../components'

export function App() {
    return (
        <div data-theme="light">
            <Routes>
                <Route
                    path={ ROUTES.Home }
                    element={ <PageHome /> }
                />
            </Routes>
        </div>
    )
}

export default App
