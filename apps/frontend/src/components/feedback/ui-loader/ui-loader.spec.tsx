import { render } from '@testing-library/react'
import { UiLoader } from './ui-loader'

describe('UiLoader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<UiLoader type={'shape'} />)
        expect(baseElement).toBeTruthy()
    })
})
