import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { UiIcon } from './ui-icon'
import css from './ui-icon.module.scss'
import { vi } from 'vitest'

describe('UiIcon', () => {
    const textValue = 'circle'
    const svgValue = 'https://www.svgrepo.com/show/535115/alien.svg'

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders a text icon correctly', () => {
        render(<UiIcon type="text" value={textValue} />)
        const span = screen.getByText(textValue)
        expect(span).toBeInTheDocument()
        const wrapper = span.closest(`.${css.UiIcon}`)!
        expect(wrapper).toHaveClass(css.UiIcon)
        expect(wrapper).toHaveClass(css['UiIcon--type-text'])
    })

    it('renders an SVG icon correctly after fetch', async () => {
        const svgContent = `<svg><circle cx="10" cy="10" r="5" /></svg>`
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    text: () => Promise.resolve(svgContent),
                } as Response)
            )
        )

        const { container } = render(<UiIcon type="svg" value={svgValue} />)
        const svgWrapper = container.querySelector(`.${css.UiIcon__element}`)!

        await waitFor(() => {
            expect(svgWrapper.querySelector('svg')).toBeInTheDocument()
            expect(svgWrapper.innerHTML).toContain('<circle')
        })
    })

    it('applies custom className', () => {
        render(
            <UiIcon type="text" value={textValue} className="custom-class" />
        )
        const wrapper = screen.getByText(textValue).closest(`.${css.UiIcon}`)!
        expect(wrapper).toHaveClass(css.UiIcon)
        expect(wrapper).toHaveClass(css['UiIcon--type-text'])
        expect(wrapper).toHaveClass('custom-class')
    })

    it('does not break if SVG fetch fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.reject('Network error'))
        )
        const { container } = render(<UiIcon type="svg" value={svgValue} />)
        const svgWrapper = container.querySelector(`.${css.UiIcon__element}`)!

        await waitFor(() => {
            expect(svgWrapper).toBeInTheDocument()
            expect(svgWrapper.innerHTML).toBe('')
        })
    })
})
