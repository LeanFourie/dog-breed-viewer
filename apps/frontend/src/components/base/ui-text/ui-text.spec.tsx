import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { UiText } from './ui-text'
import css from './ui-text.module.scss'
import type { TUiTextProps } from './ui-text.definitions'
import { describe, it, expect } from 'vitest'

/**
 * Test helper to simplify rendering
 */
const renderUiText = (
    props: Partial<TUiTextProps> = {},
    children = 'Test Text'
) => render(<UiText {...props}>{children}</UiText>)

describe('UiText', () => {
    describe('rendering', () => {
        it('renders children', () => {
            renderUiText({}, 'Hello World')

            expect(screen.getByText('Hello World')).toBeInTheDocument()
        })

        it('renders as the provided element when renderAs is set', () => {
            renderUiText({ renderAs: 'h1' }, 'Heading')

            const heading = screen.getByRole('heading', { level: 1 })
            expect(heading).toBeInTheDocument()
        })

        it('renders as the variant element when renderAs is not provided', () => {
            renderUiText({ variant: 'h2' }, 'Heading')

            const heading = screen.getByRole('heading', { level: 2 })
            expect(heading).toBeInTheDocument()
        })
    })

    describe('styling', () => {
        it('applies size class', () => {
            renderUiText({ size: 'lg' }, 'Large Text')

            expect(screen.getByText('Large Text')).toHaveClass(
                css['UiText--size-lg']
            )
        })

        it('applies weight class', () => {
            renderUiText({ weight: 'bold' }, 'Bold Text')

            expect(screen.getByText('Bold Text')).toHaveClass(
                css['UiText--weight-bold']
            )
        })

        it('applies skeleton class when isSkeleton is true', () => {
            renderUiText({ isSkeleton: true }, 'Skeleton')

            expect(screen.getByText('Skeleton')).toHaveClass(
                css['UiText--is-skeleton']
            )
        })

        it('applies truncated class when truncate is true', () => {
            renderUiText({ truncate: true }, 'Truncated')

            expect(screen.getByText('Truncated')).toHaveClass(
                css['UiText--is-truncated']
            )
        })

        it('applies a custom className', () => {
            renderUiText({ className: 'custom-class' }, 'Custom')

            expect(screen.getByText('Custom')).toHaveClass('custom-class')
        })

        it('always applies base, size, variant, and weight classes', () => {
            renderUiText(
                { size: 'md', variant: 'p', weight: 'regular' },
                'Base'
            )

            const el = screen.getByText('Base')
            expect(el).toHaveClass(css['UiText'])
            expect(el).toHaveClass(css['UiText--size-md'])
            expect(el).toHaveClass(css['UiText--variant-p'])
            expect(el).toHaveClass(css['UiText--weight-regular'])
        })
    })
})
