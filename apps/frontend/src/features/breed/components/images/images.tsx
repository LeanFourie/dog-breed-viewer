'use client'

import { useEffect, useRef } from 'react'
import { UiImage, UiLoader } from '../../../../components'
import { type IPageHomeImagesProps } from './images.definitions'
import css from './images.module.scss'
import Lenis from 'lenis'

function PageBreedImages({ breedId, images, isLoading }: IPageHomeImagesProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageBreedImages`
    // #endregion

    // #region - Refs
    /**
     * A reference to the images wrapper element.
     * This is used to initialize the lenis smooth scroll.
     */
    const imagesWrapperRef = useRef<HTMLDivElement>(null)
    /**
     * A reference to the lenis smooth scroll object.
     */
    const lenisRef = useRef<Lenis>(null)
    /**
     * A reference to the initial scroll ID.
     * This is used to ensure the smooth scroll is only initialized once per breed.
     */
    const initialScrollRef = useRef<string | null>(null)
    // #endregion

    // #region - Effects
    /**
     * Initializes the lenis smooth scroll object.
     * This is only initialized once per breed.
     */
    useEffect(() => {
        // Check if the images wrapper element exists
        // If not, return early
        // We can't initialize the smooth scroll without the wrapper element
        if (!imagesWrapperRef.current) return

        // Create the lenis smooth scroll object
        lenisRef.current = new Lenis({
            infinite: true,
            orientation: 'horizontal',
            wrapper: imagesWrapperRef.current,
        })

        // Start the smooth scroll animation
        function raf(time: number) {
            lenisRef.current?.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenisRef.current?.destroy()
        }
    }, [imagesWrapperRef])
    /**
     * Scrolls the images wrapper element to the left.
     * This is so we can indicate the list is scrollable.
     */
    useEffect(() => {
        if (
            initialScrollRef.current !== breedId &&
            images?.length > 0 &&
            lenisRef.current &&
            breedId
        ) {
            // Get the lenis smooth scroll object
            const lenis = lenisRef.current

            // Resize the lenis smooth scroll object
            // This is necessary to ensure the scroll is correct
            requestAnimationFrame(() => {
                lenis.resize()
                lenis.scrollTo(window.innerWidth * 0.1, { immediate: true })
            })

            // Set the initial scroll ID to the current breed ID
            // This ensures the smooth scroll is only initialized once per breed
            initialScrollRef.current = breedId
        }
    }, [images, breedId])
    // #endregion

    // #region - Markup
    return (
        <div className={css[name]} ref={imagesWrapperRef}>
            {/* Loader */}
            {isLoading ? (
                <div className={css[`${name}__loader`]}>
                    <UiLoader type={'shape'} />
                </div>
            ) : null}
            {/* ./Loader */}

            {/* Images */}
            {images?.length > 0 && !isLoading ? (
                <div className={css[`${name}__list`]}>
                    {[...images, ...images, ...images].map((image, index) => (
                        <UiImage
                            alt={breedId}
                            aspectRatio={'4:3'}
                            className={css[`${name}__list-item`]}
                            fit={'cover'}
                            key={index}
                            orientation={'portrait'}
                            src={image}
                        />
                    ))}
                </div>
            ) : null}
            {/* ./Images */}
        </div>
    )
    // #endregion
}

export { PageBreedImages }
