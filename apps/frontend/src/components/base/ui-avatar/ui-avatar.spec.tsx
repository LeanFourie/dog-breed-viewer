import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { UiAvatar } from './ui-avatar'
import css from './ui-avatar.module.scss'

describe('UiAvatar', () => {
    it('renders successfully', () => {
        const { baseElement } = render(<UiAvatar type="icon" />)
        expect(baseElement).toBeTruthy()
    })

    // --------------------
    // Icon Avatar
    // --------------------
    it('renders an icon avatar', () => {
        render(<UiAvatar type="icon" color="primary" shade="dark" />)

        const icon = screen.getByText('account_circle')
        const avatar = icon.closest(`.${css.UiAvatar}`)

        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass(css.UiAvatar__icon)

        expect(avatar).toHaveClass(css.UiAvatar)
        expect(avatar).toHaveClass(css['UiAvatar--type-icon'])
        expect(avatar).toHaveClass(css['UiAvatar--color-primary'])
    })

    // --------------------
    // Image Avatar
    // --------------------
    it('renders an image avatar', () => {
        render(
            <UiAvatar
                type="image"
                src="https://example.com/avatar.png"
                alt="Profile"
            />
        )

        const img = screen.getByRole('img', { name: /profile/i })
        const avatar = img.closest(`.${css.UiAvatar}`)

        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')

        expect(avatar).toHaveClass(css.UiAvatar)
        expect(avatar).toHaveClass(css['UiAvatar--type-image'])
    })

    // --------------------
    // Initials Avatar
    // --------------------
    it('renders initials avatar', () => {
        render(<UiAvatar type="initials" initials="JD" color="primary" />)

        const initials = screen.getByText('JD')
        const avatar = initials.closest(`.${css.UiAvatar}`)

        expect(initials).toBeInTheDocument()

        expect(avatar).toHaveClass(css.UiAvatar)
        expect(avatar).toHaveClass(css['UiAvatar--type-initials'])
        expect(avatar).toHaveClass(css['UiAvatar--color-primary'])
    })

    // --------------------
    // Skeleton State
    // --------------------
    it('applies skeleton state', () => {
        render(<UiAvatar type="icon" isSkeleton />)

        const icon = screen.getByText('account_circle')
        const avatar = icon.closest(`.${css.UiAvatar}`)

        expect(avatar).toHaveClass(css['UiAvatar--is-skeleton'])
    })

    // --------------------
    // Selected State
    // --------------------
    it('applies selected state', () => {
        render(<UiAvatar type="icon" isSelected />)

        const icon = screen.getByText('account_circle')
        const avatar = icon.closest(`.${css.UiAvatar}`)

        expect(avatar).toHaveClass(css['UiAvatar--is-selected'])
    })

    // --------------------
    // Custom className + style
    // --------------------
    it('applies custom className and style', () => {
        render(
            <UiAvatar
                type="initials"
                initials="AB"
                className="custom-class"
                style={{ margin: '10px' }}
            />
        )

        const initials = screen.getByText('AB')
        const avatar = initials.closest(`.${css.UiAvatar}`)

        expect(avatar).toHaveClass(css.UiAvatar)
        expect(avatar).toHaveClass('custom-class')
        expect(avatar).toHaveStyle({ margin: '10px' })
    })
})
