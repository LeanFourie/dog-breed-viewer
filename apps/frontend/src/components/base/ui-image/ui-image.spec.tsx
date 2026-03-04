import { render } from '@testing-library/react'
import { UiImage } from './ui-image'

describe('UiImage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiImage alt="test" src="test.jpg" />)
        expect(baseElement).toBeTruthy()
    })
})
