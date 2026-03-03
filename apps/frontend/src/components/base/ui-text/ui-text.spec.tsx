import { render } from '@testing-library/react'
import { UiText } from './ui-text'

describe('UiText', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiText>Text Component</UiText>)
        expect(baseElement).toBeTruthy()
    })
})
