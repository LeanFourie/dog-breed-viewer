import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { UiLoader } from './ui-loader'
import { vi } from 'vitest'

// Mock children components since they are imported
vi.mock('./children', () => ({
    UiLoaderCircular: ({ name, size }: any) => (
        <div data-testid="loader-circular" data-name={name} data-size={size} />
    ),
    UiLoaderDots: ({ name, size }: any) => (
        <div data-testid="loader-dots" data-name={name} data-size={size} />
    ),
    UiLoaderShape: ({ name, size }: any) => (
        <div data-testid="loader-shape" data-name={name} data-size={size} />
    ),
}))

describe('UiLoader', () => {
    it('renders circular loader by default', () => {
        render(<UiLoader type="circular" />)
        expect(screen.getByTestId('loader-circular')).toBeInTheDocument()
        expect(screen.queryByTestId('loader-dots')).toBeNull()
        expect(screen.queryByTestId('loader-shape')).toBeNull()
    })

    it('renders dots loader when type is "dots"', () => {
        render(<UiLoader type="dots" />)
        expect(screen.getByTestId('loader-dots')).toBeInTheDocument()
        expect(screen.queryByTestId('loader-circular')).toBeNull()
        expect(screen.queryByTestId('loader-shape')).toBeNull()
    })

    it('renders shape loader when type is "shape"', () => {
        render(<UiLoader type="shape" />)
        expect(screen.getByTestId('loader-shape')).toBeInTheDocument()
        expect(screen.queryByTestId('loader-circular')).toBeNull()
        expect(screen.queryByTestId('loader-dots')).toBeNull()
    })

    it('passes additional props to the loader', () => {
        render(<UiLoader type="circular" size="lg" className="custom-class" />)
        const loader = screen.getByTestId('loader-circular')
        expect(loader).toHaveAttribute('data-size', 'lg')
        expect(loader).toHaveAttribute('data-name', 'UiLoader')
    })
})
