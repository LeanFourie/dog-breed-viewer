import { render } from '@testing-library/react'
import { UiSnackbar } from './ui-snackbar'

describe('UiSnackbar', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <UiSnackbar message="Test message" onClose={() => {}} />
        )
        expect(baseElement).toBeTruthy()
    })
})
