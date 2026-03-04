import { BreedsContext } from '../../../../../providers'
import {
    capitalizeFirstLetter,
    stringToKey,
} from '../../../../../utils/methods/strings'
import { UiImage } from '../../../../base/ui-image/ui-image'
import { UiText } from '../../../../base/ui-text/ui-text'
import css from './breed-list.module.scss'
import { use, useEffect, useRef, useState } from 'react'

function PageHomeBreedList() {
    const breedsContext = use(BreedsContext)

    const name = `PageHomeBreedList`

    const [_highlightedBreed, _setHighlightedBreed] = useState<
        string | undefined
    >(undefined)
    const [_displayedBreed, _setDisplayedBreed] = useState<string | undefined>(
        undefined
    )
    const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
    const lastRequestedBreedRef = useRef<string>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const breed = entry.target.getAttribute('data-breed')
                        if (breed) {
                            _setHighlightedBreed(breed)
                        }
                    }
                })
            },
            {
                root: null,
                rootMargin: '-50% 0px -50% 0px', // center band
                threshold: 0,
            }
        )

        itemRefs.current.forEach((element) => {
            observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!_highlightedBreed || !breedsContext) return

        breedsContext.getBreedImage(_highlightedBreed)
    }, [_highlightedBreed, breedsContext])

    // Only swap the visible image after the new one has finished loading
    useEffect(() => {
        if (!breedsContext || !_highlightedBreed) return
        const nextSrc = breedsContext.breedImages[_highlightedBreed]
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
    }, [_highlightedBreed, breedsContext?.breedImages])

    return (
        <div className={css[name]}>
            <div className={css[`${name}__inner`]}>
                {breedsContext?.dogBreedList.map((item, index) => (
                    <button
                        ref={(el) => {
                            if (el) {
                                itemRefs.current.set(item, el)
                            } else {
                                itemRefs.current.delete(item)
                            }
                        }}
                        className={`
                            ${css[`${name}__item`]}
                            ${
                                _highlightedBreed === item
                                    ? css[`${name}__item--is-highlighted`]
                                    : ''
                            }
                        `}
                        key={`${stringToKey(item)}-${index}`}
                        data-breed={item}
                    >
                        <UiText renderAs="span" size="lg" variant="h1">
                            {capitalizeFirstLetter(item)}
                        </UiText>
                    </button>
                ))}
            </div>

            <div className={css[`${name}__image`]}>
                {_displayedBreed &&
                    breedsContext?.breedImages[_displayedBreed] && (
                        <UiImage
                            alt={_displayedBreed}
                            aspectRatio={'unset'}
                            className={css[`${name}__image-element`]}
                            fit={'cover'}
                            src={breedsContext.breedImages[_displayedBreed]}
                        />
                    )}
            </div>
        </div>
    )
}

export { PageHomeBreedList }
