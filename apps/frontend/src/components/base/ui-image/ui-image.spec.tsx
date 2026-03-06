import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { UiImage } from './ui-image'
import css from './ui-image.module.scss'

describe('UiImage', () => {
    const src = 'https://example.com/main.jpg'
    const placeholder = 'https://example.com/placeholder.jpg'
    const alt = 'Example Image'

    it('renders the main image with correct src and alt', () => {
        render(<UiImage src={src} alt={alt} />)

        const mainImage = screen
            .getAllByAltText(alt)
            .find((img) => !img.hasAttribute('aria-hidden'))!

        expect(mainImage).toBeInTheDocument()
        expect(mainImage).toHaveAttribute('src', src)
        expect(mainImage).toHaveClass(css.UiImage__element)
    })

    it('renders a placeholder image when provided', () => {
        render(<UiImage src={src} alt={alt} placeholder={placeholder} />)

        const placeholderImage = screen
            .getAllByAltText(alt)
            .find((img) => img.getAttribute('aria-hidden') === 'true')!

        expect(placeholderImage).toBeInTheDocument()
        expect(placeholderImage).toHaveAttribute('src', placeholder)
        expect(placeholderImage).toHaveAttribute('aria-hidden', 'true')
        expect(placeholderImage).toHaveClass(css.UiImage__placeholder)
    })

    it('hides placeholder and shows main image on load', () => {
        render(<UiImage src={src} alt={alt} placeholder={placeholder} />)

        const mainImage = screen
            .getAllByAltText(alt)
            .find((img) => !img.hasAttribute('aria-hidden'))!
        const placeholderImage = screen
            .getAllByAltText(alt)
            .find((img) => img.getAttribute('aria-hidden') === 'true')!

        // Initial state
        expect(mainImage.style.opacity).toBe('0')
        expect(placeholderImage.style.opacity).toBe('1')

        // Simulate main image load
        fireEvent.load(mainImage)

        expect(mainImage.style.opacity).toBe('1')
        expect(placeholderImage.style.opacity).toBe('0')
    })

    it('applies custom classes using CSS module and extra className', () => {
        render(
            <UiImage
                src={src}
                alt={alt}
                aspectRatio="4:3"
                orientation="portrait"
                shape="circle"
                fit="cover"
                className="custom-class"
            />
        )

        const wrapper = screen
            .getAllByAltText(alt)
            .find((img) => !img.hasAttribute('aria-hidden'))!.parentElement!

        expect(wrapper).toHaveClass(css.UiImage)
        expect(wrapper).toHaveClass(css['UiImage--aspect-ratio-4-3'])
        expect(wrapper).toHaveClass(css['UiImage--orientation-portrait'])
        expect(wrapper).toHaveClass(css['UiImage--shape-circle'])
        expect(wrapper).toHaveClass(css['UiImage--fit-cover'])
        expect(wrapper).toHaveClass('custom-class')
    })

    it('defaults to aspect ratio 16:9, rectangle, landscape, and contain', () => {
        render(<UiImage src={src} alt={alt} />)

        const wrapper = screen
            .getAllByAltText(alt)
            .find((img) => !img.hasAttribute('aria-hidden'))!.parentElement!

        expect(wrapper).toHaveClass(css['UiImage--aspect-ratio-16-9'])
        expect(wrapper).toHaveClass(css['UiImage--shape-rectangle'])
        expect(wrapper).toHaveClass(css['UiImage--orientation-landscape'])
        expect(wrapper).toHaveClass(css['UiImage--fit-contain'])
    })
})
