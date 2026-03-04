'use client'

import { useParams, useNavigate } from 'react-router-dom'
import { use, useEffect, startTransition } from 'react'
import { BreedsContext } from '../../../providers'
import { UiText } from '../../base/ui-text/ui-text'
import { UiImage } from '../../base/ui-image/ui-image'
import { capitalizeFirstLetter } from '../../../utils/methods/strings'
import { ROUTES } from '../../../utils/routes/routes'
import css from './breed.module.scss'

export function PageBreed() {
    const { id } = useParams()
    const navigate = useNavigate()
    const breedsContext = use(BreedsContext)
    const name = `PageBreed`
    const breed = id || ''

    useEffect(() => {
        if (breed && breedsContext && !breedsContext.breedImageArray[breed]) {
            breedsContext.fetchDogBreedImages(breed)
        }
    }, [breed, breedsContext])

    if (!breed) return null

    return (
        <div className={css[name]}>
            <button
                onClick={() => {
                    startTransition(() => {
                        navigate(ROUTES.Home, { preventScrollReset: true })
                    })
                }}
                className={css[`${name}__back`]}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                }}
            >
                <UiText renderAs="span" size="md">
                    ← Back to Breeds
                </UiText>
            </button>

            <div className={css[`${name}__content`]}>
                <div className={css[`${name}__header`]}>
                    <UiText renderAs="h1" size="lg" variant="h1">
                        {capitalizeFirstLetter(breed)}
                    </UiText>
                </div>

                {breedsContext &&
                breedsContext.breedImageArray?.[breed]?.length > 0 ? (
                    <div className={css[`${name}__images`]}>
                        {breedsContext.breedImageArray[breed].map(
                            (image, index) => (
                                <div
                                    className={css[`${name}__image`]}
                                    key={index}
                                >
                                    <UiImage
                                        alt={breed}
                                        aspectRatio={'unset'}
                                        className={
                                            css[`${name}__image-element`]
                                        }
                                        fit={'cover'}
                                        src={image}
                                    />
                                </div>
                            )
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
