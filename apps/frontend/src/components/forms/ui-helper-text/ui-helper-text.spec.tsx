import { render } from '@testing-library/react'
import { UiHelperText } from './ui-helper-text'

describe('UiHelperText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiHelperText value="Message" />)
        expect(baseElement).toBeTruthy()
    })
})
