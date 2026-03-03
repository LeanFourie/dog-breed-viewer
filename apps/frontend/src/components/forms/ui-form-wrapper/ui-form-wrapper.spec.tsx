import { render } from '@testing-library/react'
import { UiFormWrapper } from './ui-form-wrapper'

describe('UiFormWrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiFormWrapper htmlFor="form-input" />)
        expect(baseElement).toBeTruthy()
    })
})
