import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { UiSnackbar } from './ui-snackbar'
import css from './ui-snackbar.module.scss'
import { vi } from 'vitest'

describe('UiSnackbar', () => {
    const message = 'This is a snackbar message'

    // --------------------
    // Rendering
    // --------------------
    it('renders the message', () => {
        render(<UiSnackbar message={message} onClose={vi.fn()} />)
        expect(screen.getByText(message)).toBeInTheDocument()
    })

    it('renders the close button', () => {
        render(<UiSnackbar message={message} onClose={vi.fn()} />)
        const button = screen.getByRole('button', { name: /close/i })
        expect(button).toBeInTheDocument()
    })

    // --------------------
    // Close button functionality
    // --------------------
    it('calls onClose when the close button is clicked', () => {
        const handleClose = vi.fn()
        render(<UiSnackbar message={message} onClose={handleClose} />)
        const button = screen.getByRole('button', { name: /close/i })
        fireEvent.click(button)
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    // --------------------
    // Semantic state
    // --------------------
    it('applies the correct state class', () => {
        const message = 'Error occurred'
        render(
            <UiSnackbar message={message} state="danger" onClose={vi.fn()} />
        )

        const wrapper = screen.getByText(message).closest('div')
        expect(wrapper).toBeInTheDocument()
        expect(wrapper).toHaveClass(css.UiSnackbar)
        expect(wrapper).toHaveClass(css['UiSnackbar--state-danger'])
    })

    it('defaults to neutral state if no state is provided', () => {
        const message = 'Info message'
        render(<UiSnackbar message={message} onClose={vi.fn()} />)

        const wrapper = screen.getByText(message).closest('div')
        expect(wrapper).toBeInTheDocument()
        expect(wrapper).toHaveClass(css.UiSnackbar)
        expect(wrapper).toHaveClass(css['UiSnackbar--state-neutral'])
    })

    // --------------------
    // Custom className and style
    // --------------------
    it('applies custom className and inline styles', () => {
        render(
            <UiSnackbar
                message={message}
                onClose={vi.fn()}
                className="custom-class"
                style={{ marginTop: '10px' }}
            />
        )
        const wrapper = screen.getByText(message).closest('div')
        expect(wrapper).toHaveClass('custom-class')
        expect(wrapper).toHaveStyle({ marginTop: '10px' })
    })
})
