import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { UiFormWrapper } from './ui-form-wrapper'
import css from './ui-form-wrapper.module.scss'

describe('UiFormWrapper', () => {
    // --------------------
    // Rendering
    // --------------------
    it('renders children correctly', () => {
        render(
            <UiFormWrapper htmlFor="input-id">
                <div data-testid="child">Child Content</div>
            </UiFormWrapper>
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('renders label if provided', () => {
        render(<UiFormWrapper htmlFor="input-id" label="Username" />)
        expect(screen.getByText('Username')).toBeInTheDocument()
    })

    it('renders required indicator when requirement="required"', () => {
        render(
            <UiFormWrapper
                htmlFor="input-id"
                label="Email"
                requirement="required"
            />
        )
        expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders optional indicator when requirement="optional"', () => {
        render(
            <UiFormWrapper
                htmlFor="input-id"
                label="Email"
                requirement="optional"
            />
        )
        expect(screen.getByText('(Optional)')).toBeInTheDocument()
    })

    it('renders count if provided', () => {
        render(<UiFormWrapper htmlFor="input-id" label="Name" count="3/5" />)
        expect(screen.getByText('3/5')).toBeInTheDocument()
    })

    it('does not render label section if label is not provided', () => {
        render(<UiFormWrapper htmlFor="input-id" />)
        const labelSection = document.querySelector(`[class*="__label"]`)
        expect(labelSection).toBeNull()
    })

    // --------------------
    // Helper Text
    // --------------------
    it('renders helper text correctly', () => {
        render(
            <UiFormWrapper
                htmlFor="input-id"
                helperText={[
                    { value: 'Helper 1' },
                    { value: 'Helper 2', state: 'danger' },
                ]}
            />
        )
        expect(screen.getByText('Helper 1')).toBeInTheDocument()
        expect(screen.getByText('Helper 2')).toBeInTheDocument()
    })

    // --------------------
    // Semantic State
    // --------------------
    it('applies the correct state class', () => {
        render(<UiFormWrapper htmlFor="input-id" state="danger" />)
        const wrapper = document.querySelector(`.${css.UiFormWrapper}`)
        expect(wrapper).toBeInTheDocument()
        expect(wrapper).toHaveClass(css['UiFormWrapper--state-danger'])
    })

    it('defaults to neutral state if no state is provided', () => {
        render(<UiFormWrapper htmlFor="input-id" />)
        const wrapper = document.querySelector(`.${css.UiFormWrapper}`)
        expect(wrapper).toBeInTheDocument()
        expect(wrapper).toHaveClass(css['UiFormWrapper--state-neutral'])
    })

    // --------------------
    // Custom className & style
    // --------------------
    it('applies custom className and style', () => {
        render(
            <UiFormWrapper
                htmlFor="input-id"
                className="custom-class"
                style={{ marginTop: 10 }}
            />
        )
        const wrapper = document.querySelector('.custom-class')
        expect(wrapper).toBeInTheDocument()
        expect(wrapper).toHaveStyle({ marginTop: '10px' })
    })
})
