import { render } from '@testing-library/react'
import { UiIcon } from './ui-icon'

describe('UiIcon', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiIcon type="text" value="home" />)
        expect(baseElement).toBeTruthy()
    })
})
