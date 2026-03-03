import { render } from '@testing-library/react'

import { UiButton } from './ui-button'

describe('UiButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <UiButton label="Button" tag="button" type="text" />
        )
        expect(baseElement).toBeTruthy()
    })
})
