import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { UiHelperText } from './ui-helper-text'
import css from './ui-helper-text.module.scss'

describe('UiHelperText', () => {
    const defaultValue = 'Helper Text'

    // --------------------
    // Rendering
    // --------------------
    it('renders the text value', () => {
        render(<UiHelperText value={defaultValue} />)
        expect(screen.getByText(defaultValue)).toBeInTheDocument()
    })

    it('renders an icon if provided', () => {
        const { container } = render(
            <UiHelperText
                value={defaultValue}
                icon={{ type: 'text', value: 'danger' }}
            />
        )

        // Look for the icon text inside the container
        const iconElement = Array.from(container.querySelectorAll('span')).find(
            (el) => el.textContent === 'danger'
        )

        expect(iconElement).toBeTruthy() // ensure it exists
        expect(iconElement).toHaveTextContent('danger')
    })

    it('does not render icon if none is provided', () => {
        render(<UiHelperText value={defaultValue} />)
        const iconContainer = document.querySelector(
            `.${css.UiHelperText}__icon`
        )
        expect(iconContainer).toBeNull()
    })

    // --------------------
    // Skeleton
    // --------------------
    it('applies skeleton class when isSkeleton is true', () => {
        render(<UiHelperText value={defaultValue} isSkeleton />)
        const wrapper = document.querySelector(`.${css.UiHelperText}`)
        expect(wrapper).toHaveClass(css['UiHelperText--is-skeleton'])
    })

    // --------------------
    // Semantic state
    // --------------------
    it('applies correct state class', () => {
        render(<UiHelperText value={defaultValue} state="danger" />)
        const wrapper = document.querySelector(`.${css.UiHelperText}`)
        expect(wrapper).toHaveClass(css['UiHelperText--state-danger'])
    })

    it('defaults to neutral state if no state is provided', () => {
        render(<UiHelperText value={defaultValue} />)
        const wrapper = document.querySelector(`.${css.UiHelperText}`)
        expect(wrapper).toHaveClass(css['UiHelperText--state-neutral'])
    })

    // --------------------
    // Custom className & style
    // --------------------
    it('applies custom className and style', () => {
        render(
            <UiHelperText
                value={defaultValue}
                className="custom-class"
                style={{ marginTop: '5px' }}
            />
        )
        const wrapper = document.querySelector(`.${css.UiHelperText}`)
        expect(wrapper).toHaveClass('custom-class')
        expect(wrapper).toHaveStyle({ marginTop: '5px' })
    })
})
