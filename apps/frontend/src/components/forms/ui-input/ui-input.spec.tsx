import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { UiInput } from './ui-input'
import type { TUiInputProps } from './ui-input.definitions'
import { vi } from 'vitest'
import { useState } from 'react'

// Helper to render the input with defaults
const renderInput = (props: Partial<TUiInputProps> = {}, value = 'Test') =>
    render(
        <UiInput
            htmlFor={props.htmlFor ?? 'input-id'}
            onChange={() => {}}
            value={value}
            {...props}
        />
    )

describe('UiInput', () => {
    // --------------------
    // Rendering
    // --------------------
    describe('Rendering', () => {
        it('renders without crashing', () => {
            const { baseElement } = renderInput()
            expect(baseElement).toBeTruthy()
        })

        it('renders label if provided', () => {
            renderInput({ label: 'Username', htmlFor: 'username' })
            expect(screen.getByText('Username')).toBeInTheDocument()
        })

        it('renders helper text if provided', () => {
            renderInput({
                helperText: [{ value: 'Helper text' }],
                htmlFor: 'helper-text',
            })
            expect(screen.getByText('Helper text')).toBeInTheDocument()
        })

        it('renders prefix and suffix text', () => {
            renderInput({
                prefix: { value: '$' },
                suffix: { value: 'USD' },
                htmlFor: 'prefix-suffix',
            })
            expect(screen.getByText('$')).toBeInTheDocument()
            expect(screen.getByText('USD')).toBeInTheDocument()
        })

        it('renders leading and trailing icons', () => {
            renderInput({
                leadingIcon: { type: 'text', value: 'info' },
                trailingIcon: { type: 'text', value: 'add_circle' },
                htmlFor: 'icons',
            })
            expect(screen.getByText('info')).toBeInTheDocument()
            expect(screen.getByText('add_circle')).toBeInTheDocument()
        })

        it('applies error state correctly', () => {
            renderInput({
                state: 'danger',
                htmlFor: 'input-error',
                helperText: [{ value: 'Error!' }],
            })
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('aria-invalid', 'true')
            // Optional: check helper text renders
            expect(screen.getByText('Error!')).toBeInTheDocument()
        })
    })

    // --------------------
    // Events
    // --------------------
    describe('Events', () => {
        it('calls onChange when input value changes', () => {
            const handleChange = vi.fn()
            const Wrapper = () => {
                const [val, setVal] = useState('Test')
                return (
                    <UiInput
                        htmlFor="change"
                        value={val}
                        onChange={(e) => {
                            setVal(e.target.value)
                            handleChange(e)
                        }}
                    />
                )
            }
            render(<Wrapper />)

            const input = screen.getByDisplayValue('Test') as HTMLInputElement
            fireEvent.change(input, { target: { value: 'New value' } })

            expect(handleChange).toHaveBeenCalled()
            expect(input.value).toBe('New value')
        })

        it('does not call onChange when disabled, loading, or skeleton', () => {
            const handleChange = vi.fn()
            const states = [
                { isDisabled: true },
                { isLoading: true },
                { isSkeleton: true },
            ]
            states.forEach((state) => {
                const { unmount } = render(
                    <UiInput
                        onChange={handleChange}
                        htmlFor="disabled-interaction"
                        value="Test"
                        {...state}
                    />
                )
                const input = screen.getByRole('textbox')
                fireEvent.change(input, { target: { value: 'New' } })
                expect(handleChange).not.toHaveBeenCalled()
                unmount()
            })
        })

        it('calls onFocus and onBlur', () => {
            const handleFocus = vi.fn()
            const handleBlur = vi.fn()
            render(
                <UiInput
                    onChange={() => {}}
                    htmlFor="focus"
                    value="Test"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )
            const input = screen.getByDisplayValue('Test')
            input.focus()
            expect(handleFocus).toHaveBeenCalled()
            input.blur()
            expect(handleBlur).toHaveBeenCalled()
        })

        it('calls onEnterPress when Enter key is pressed', () => {
            const handleEnter = vi.fn()
            render(
                <UiInput
                    onChange={() => {}}
                    htmlFor="enter"
                    value="Test"
                    onEnterPress={handleEnter}
                />
            )
            const input = screen.getByDisplayValue('Test')
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
            expect(handleEnter).toHaveBeenCalled()
        })
    })

    // --------------------
    // Icon interactions
    // --------------------
    describe('Icon interactions', () => {
        it('clicks trailing icon button', () => {
            const handleIconClick = vi.fn()
            renderInput({
                trailingIcon: {
                    type: 'text',
                    value: 'add_circle',
                    onClick: handleIconClick,
                },
                htmlFor: 'trailing-icon',
            })

            const button = screen.getByText('add_circle').closest('button')
            expect(button).toBeInTheDocument()
            fireEvent.click(button!)
            expect(handleIconClick).toHaveBeenCalled()
        })

        it('clicks leading icon button', () => {
            const handleIconClick = vi.fn()
            renderInput({
                leadingIcon: {
                    type: 'text',
                    value: 'info',
                    onClick: handleIconClick,
                },
                htmlFor: 'leading-icon',
            })

            const button = screen.getByText('info').closest('button')
            expect(button).toBeInTheDocument()
            fireEvent.click(button!)
            expect(handleIconClick).toHaveBeenCalled()
        })
    })

    // --------------------
    // Input states
    // --------------------
    describe('Input states', () => {
        it('renders disabled input', () => {
            renderInput({ isDisabled: true, htmlFor: 'disabled' })
            const input = screen.getByRole('textbox') as HTMLInputElement
            expect(input).toBeDisabled()
        })

        it('renders readonly input', () => {
            renderInput({ isReadonly: true, htmlFor: 'readonly' })
            const input = screen.getByRole('textbox') as HTMLInputElement
            expect(input).toHaveAttribute('readOnly')
        })

        it('renders loading state', () => {
            const { container } = renderInput({ isLoading: true })
            const loader = container.querySelector('svg')
            expect(loader).toBeInTheDocument()
        })
    })
})
