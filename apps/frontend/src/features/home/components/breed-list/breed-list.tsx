import { UiIcon, UiImage, UiText } from '../../../../components'
import {
    capitalizeFirstLetter,
    stringToKey,
} from '../../../../utils/methods/strings'
import { ROUTES } from '../../../../utils/routes/routes'
import { IPageHomeBreedListProps } from './breed-list.definitions'
import css from './breed-list.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HOME_SCROLL_POSITION_KEY = 'home-scroll-position'

function PageHomeBreedList({
    allBreeds,
    fetchBreedDisplayImage,
    filteredBreeds,
}: IPageHomeBreedListProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageHomeBreedList`
    // #endregion

    // #region - Hooks
    /**
     * The navigation function used to navigate to other pages.
     */
    const navigate = useNavigate()
    // #endregion

    // #region - Refs
    /**
     * The map of breed item references used for intersection observation.
     */
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
    /**
     * The last breed requested for display image fetching.
     */
    const lastRequestedBreedRef = useRef<string>(null)
    /**
     * The map of intersecting breed items used for intersection observation.
     */
    const intersectingMap = useRef<Map<string, Element>>(new Map())
    // #endregion

    // #region - States
    /**
     * The currently highlighted breed used for intersection observation.
     */
    const [_highlightedBreed, _setHighlightedBreed] = useState<string>()
    /**
     * The currently displayed breed used for image swapping.
     */
    const [_displayedBreed, _setDisplayedBreed] = useState<string>()
    // #endregion

    // #region - Effects
    /**
     * Observes the intersection of breed items to highlight the closest one.
     */
    useEffect(() => {
        // Clear the intersecting map when the filtered breeds change
        // We do this to ensure we only observe the current filtered breeds
        intersectingMap.current.clear()

        // Create a new intersection observer for the filtered breeds
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Get the breed attribute from the intersecting element
                    const breed = entry.target.getAttribute('data-breed')

                    // If the breed is not found, skip this entry
                    // We do this to avoid errors when the breed is not found in the filtered breeds
                    if (!breed) return

                    // If the entry is intersecting, add it to the intersecting map
                    // We do this to ensure we only highlight the closest breed
                    if (entry.isIntersecting) {
                        intersectingMap.current.set(breed, entry.target)
                    } else {
                        // If the entry is not intersecting, remove it from the intersecting map
                        // We do this to ensure we only highlight the closest breed
                        intersectingMap.current.delete(breed)
                    }
                })

                // The breed item closest to the center of the viewport
                let closestBreed: string | undefined
                // The minimum distance between the center of the viewport and the center of the item
                let minDistance = Infinity
                // The center of the viewport
                const center = window.innerHeight / 2

                // Loop through the intersecting map to find the closest breed item
                intersectingMap.current.forEach((element, breed) => {
                    // Get the bounding client rectangle of the intersecting element
                    const rect = element.getBoundingClientRect()
                    // The center of the intersecting element
                    const itemCenter = rect.top + rect.height / 2
                    // The distance between the center of the viewport and the center of the item
                    const distance = Math.abs(center - itemCenter)

                    // If the distance is less than the minimum distance, update the minimum distance and closest breed
                    if (distance < minDistance) {
                        minDistance = distance
                        closestBreed = breed
                    }
                })

                // If a closest breed is found, set it as the highlighted breed
                if (closestBreed) {
                    _setHighlightedBreed(closestBreed)
                }
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px', // center band
                threshold: 0,
            }
        )

        // Observe each breed item in the filtered breeds
        itemRefs.current.forEach((element) => {
            observer.observe(element)
        })

        return () => observer.disconnect()
    }, [filteredBreeds])
    /**
     * Fetches the display image for the currently highlighted breed.
     */
    useEffect(() => {
        // If no highlighted breed is set, skip this effect
        // We should not fetch an image if there is no focussed breed
        if (
            !_highlightedBreed ||
            lastRequestedBreedRef.current === _highlightedBreed
        )
            return

        // Add a delay to avoid fetching the image too frequently
        // We do this to avoid overloading the API with requests
        const timeout = setTimeout(() => {
            lastRequestedBreedRef.current = _highlightedBreed
            fetchBreedDisplayImage({ breed: _highlightedBreed })
        }, 250)

        return () => clearTimeout(timeout)
    }, [_highlightedBreed, fetchBreedDisplayImage])
    /**
     * Swaps the displayed breed image with the new image when the highlighted breed changes.
     */
    useEffect(() => {
        // If no highlighted breed is set, skip this effect
        // We should not show an image if there is no focussed breed
        if (!_highlightedBreed) return

        // Find the next source image for the highlighted breed
        const nextSrc = allBreeds.find(
            (breed) => breed.name === _highlightedBreed
        )?.image

        // If no image is found, skip this effect
        // This is to avoid errors when the breed is not found in the filtered breeds
        if (!nextSrc) return

        // Remember the latest requested breed to avoid race conditions
        lastRequestedBreedRef.current = _highlightedBreed

        const img = new Image()
        img.src = nextSrc

        const onLoad = () => {
            // Only update if this is still the latest requested breed
            if (lastRequestedBreedRef.current === _highlightedBreed) {
                _setDisplayedBreed(_highlightedBreed)
            }
        }

        const onError = () => {
            // Keep showing the current image on error
        }

        img.addEventListener('load', onLoad)
        img.addEventListener('error', onError)

        return () => {
            img.removeEventListener('load', onLoad)
            img.removeEventListener('error', onError)
        }
    }, [_highlightedBreed, allBreeds])
    // #endregion

    return (
        <div className={css[name]}>
            {/* Breeds List */}
            <div className={css[`${name}__inner`]}>
                {filteredBreeds.length > 0 ? (
                    <>
                        {filteredBreeds.map((breed, index) => (
                            <button
                                ref={(el) => {
                                    if (el) {
                                        itemRefs.current.set(breed.name, el)
                                    } else {
                                        itemRefs.current.delete(breed.name)
                                    }
                                }}
                                className={`
                            ${css[`${name}__item`]}
                            ${
                                _highlightedBreed === breed.name
                                    ? css[`${name}__item--is-highlighted`]
                                    : ''
                            }
                        `}
                                key={`${stringToKey(breed.name)}-${index}`}
                                data-breed={breed.name}
                                onClick={(event) => {
                                    if (window) {
                                        const element = event.currentTarget
                                        const rect =
                                            element.getBoundingClientRect()
                                        const scrollTop =
                                            window.scrollY ||
                                            document.documentElement.scrollTop
                                        const absoluteTop = rect.top + scrollTop
                                        const targetScroll =
                                            absoluteTop -
                                            window.innerHeight / 2 +
                                            rect.height / 2

                                        window.scrollTo({
                                            top: targetScroll,
                                            behavior: 'smooth',
                                        })
                                        sessionStorage.setItem(
                                            HOME_SCROLL_POSITION_KEY,
                                            String(targetScroll)
                                        )
                                    }
                                    navigate(
                                        ROUTES.Breed.replace(
                                            ':id',
                                            stringToKey(breed.name)
                                        ),
                                        {
                                            preventScrollReset: true,
                                        }
                                    )
                                }}
                            >
                                <UiText
                                    className={css[`${name}__item-label`]}
                                    renderAs={'span'}
                                    size={'lg'}
                                    variant={'h1'}
                                >
                                    {capitalizeFirstLetter(breed.name)}
                                </UiText>
                                <span className={css[`${name}__item-icon`]}>
                                    <UiIcon
                                        className={
                                            css[`${name}__item-icon-element`]
                                        }
                                        type={'text'}
                                        value={'arrow_forward'}
                                    />
                                </span>
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        {allBreeds.length > 0 ? (
                            <div className={css[`${name}__empty-state`]}>
                                <UiText
                                    className={
                                        css[`${name}__empty-state-title`]
                                    }
                                    size={'lg'}
                                    variant={'h1'}
                                >
                                    No results found.
                                </UiText>
                                <UiText
                                    renderAs={'p'}
                                    size={'lg'}
                                    variant={'h5'}
                                >
                                    Please update your search criteria.
                                </UiText>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
            {/* ./Breeds List */}

            {/* Breed Image */}
            {filteredBreeds.length > 0 ? (
                <div className={css[`${name}__image`]}>
                    {_displayedBreed &&
                    _highlightedBreed &&
                    filteredBreeds.find(
                        (breed) => breed.name === _highlightedBreed
                    ) ? (
                        <UiImage
                            alt={_displayedBreed}
                            aspectRatio={'unset'}
                            className={css[`${name}__image-element`]}
                            fit={'cover'}
                            src={
                                allBreeds.find(
                                    (breed) => breed.name === _displayedBreed
                                )?.image ?? ''
                            }
                        />
                    ) : null}
                </div>
            ) : null}
            {/* ./Breed Image */}
        </div>
    )
    // #endregion
}

export { PageHomeBreedList }
