import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { UiButton } from './ui-button'
import css from './ui-button.module.scss'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

describe('UiButton', () => {
    // --------------------
    // Text Button
    // --------------------
    it('renders a text button with label', () => {
        render(<UiButton tag="button" type="text" label="Click Me" />)
        const btn = screen.getByRole('button', { name: /click me/i })

        // Check base and type classes using CSS module
        expect(btn).toHaveClass(css.UiButton)
        expect(btn).toHaveClass(css['UiButton--type-text'])
    })

    it('renders leading and trailing icons in a text button', () => {
        render(
            <UiButton
                tag="button"
                type="text"
                label="Button"
                leadingIcon={{ type: 'text', value: 'info' }}
                trailingIcon={{ type: 'text', value: 'add_circle' }}
            />
        )
        const icons = screen.getAllByText(/info|add_circle/)
        expect(icons.length).toBe(2)
        // CSS module checks
        icons.forEach((icon) => {
            expect(icon).toHaveClass(css.UiButton__icon)
        })
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(
            <UiButton
                tag="button"
                type="text"
                label="Click Me"
                onClick={handleClick}
            />
        )
        const btn = screen.getByRole('button', { name: /click me/i })
        fireEvent.click(btn)
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled, loading, or skeleton', () => {
        const handleClick = vi.fn()
        const { rerender } = render(
            <UiButton
                tag="button"
                type="text"
                label="Click Me"
                onClick={handleClick}
                isDisabled
            />
        )
        fireEvent.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).not.toHaveBeenCalled()

        rerender(
            <UiButton
                tag="button"
                type="text"
                label="Click Me"
                onClick={handleClick}
                isLoading
            />
        )
        fireEvent.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).not.toHaveBeenCalled()

        rerender(
            <UiButton
                tag="button"
                type="text"
                label="Click Me"
                onClick={handleClick}
                isSkeleton
            />
        )
        fireEvent.click(screen.getByRole('button', { name: /click me/i }))
        expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies loader when isLoading is true', () => {
        render(<UiButton tag="button" type="text" label="Loading" isLoading />)

        const btn = screen.getByRole('button', { name: /loading/i })

        // Use querySelector with the CSS module class
        const loader = btn.querySelector(`.${css.UiButton__loader}`)

        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass(css.UiButton__loader)
    })

    it('applies skeleton class when isSkeleton is true', () => {
        render(
            <UiButton
                tag="button"
                type="text"
                label="Skeleton"
                isSkeleton={true}
            />
        )
        const btn = screen.getByRole('button', { name: /skeleton/i })

        // Use the correct css module key
        expect(btn).toHaveClass(css['UiButton--is-skeleton'])
    })

    // --------------------
    // Icon Button
    // --------------------
    it('renders an icon button', () => {
        render(
            <UiButton
                tag="button"
                type="icon"
                label="Icon Button"
                icon={{ type: 'text', value: 'home' }}
            />
        )
        const btn = screen.getByRole('button', { name: /icon button/i })
        expect(btn).toBeInTheDocument()

        const uiIcon = screen.getByText('home')
        expect(uiIcon).toBeInTheDocument()
        expect(uiIcon).toHaveClass(css.UiButton__icon)
    })

    // --------------------
    // Anchor Button
    // --------------------
    it('renders an anchor button with href and target', () => {
        render(
            <UiButton
                tag="a"
                type="text"
                label="Anchor"
                href="/test"
                target="_blank"
            />
        )
        const anchor = screen.getByText('Anchor').closest('a')
        expect(anchor).toHaveAttribute('href', '/test')
        expect(anchor).toHaveAttribute('target', '_blank')
        expect(anchor).toHaveClass(css.UiButton)
    })

    // --------------------
    // Router Link Button
    // --------------------
    it('renders a router link button with "to" prop', () => {
        render(
            <MemoryRouter>
                <UiButton tag="link" type="text" label="Link" to="/home" />
            </MemoryRouter>
        )
        const link = screen.getByText('Link').closest('a')
        expect(link).toHaveAttribute('href', '/home')
        expect(link).toHaveClass(css.UiButton)
    })

    // --------------------
    // Custom className and style
    // --------------------
    it('applies custom className and style', () => {
        render(
            <UiButton
                tag="button"
                type="text"
                label="Styled"
                className="custom-class"
                style={{ marginTop: '10px' }}
            />
        )
        const btn = screen.getByRole('button', { name: /styled/i })
        expect(btn).toHaveClass(css.UiButton)
        expect(btn).toHaveClass('custom-class')
        expect(btn).toHaveStyle({ marginTop: '10px' })
    })
})
