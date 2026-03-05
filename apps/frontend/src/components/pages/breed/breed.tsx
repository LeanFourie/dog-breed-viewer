'use client'

import { useParams } from 'react-router-dom'
import { use, useEffect, useRef, useState } from 'react'
import { BreedsContext } from '../../../providers'
import { UiText } from '../../base/ui-text/ui-text'
import { UiImage } from '../../base/ui-image/ui-image'
import { capitalizeFirstLetter, stringToKey } from '../../../utils/methods/strings'
import { ROUTES } from '../../../utils/routes/routes'
import css from './breed.module.scss'
import { UiLoader } from '../../base/ui-loader/ui-loader'
import Lenis from 'lenis'
import { UiButton } from '../../actions/ui-button/ui-button'

export function PageBreed() {
    const { id } = useParams()
    const breedsContext = use(BreedsContext)
    const name = `PageBreed`
    const breed = id || ''
    const [_selectedBreed, _setSelectedBreed] = useState<{
        next: string
        prev: string
    }>()

    const getBreedDetails = (name: string) => {
        const breedSegments = name.split('-')

        if (breedSegments.length === 1) {
            return {
                fullName: capitalizeFirstLetter(breedSegments[0]),
                breed: capitalizeFirstLetter(breedSegments[0]),
                subBreed: '-',
            }
        }

        return {
            fullName: capitalizeFirstLetter(breedSegments.join(' ')),
            breed: capitalizeFirstLetter(breedSegments[1]),
            subBreed: capitalizeFirstLetter(breedSegments[0]),
        }
    }

    useEffect(() => {
        if (breed && breedsContext && !breedsContext.breedImageArray[breed]) {
            breedsContext.fetchDogBreedImages(breed)
        }
    }, [id])

    const imagesWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!imagesWrapperRef.current) return

        const lenis = new Lenis({
            infinite: true,
            orientation: 'horizontal',
            wrapper: imagesWrapperRef.current,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [imagesWrapperRef])

    useEffect(() => {
        if (!id || !breedsContext || !breedsContext.dogBreedList) return

        const selectedBreed = breedsContext.dogBreedList.find((breed) =>
            stringToKey(breed).includes(id)
        )

        if (!selectedBreed) return

        const nextBreed = breedsContext.dogBreedList[
            breedsContext.dogBreedList.indexOf(selectedBreed) + 1
        ]
        const prevBreed = breedsContext.dogBreedList[
            breedsContext.dogBreedList.indexOf(selectedBreed) - 1
        ]

        if (!nextBreed || !prevBreed) return

        _setSelectedBreed({
            next: nextBreed.replaceAll(' ', '-'),
            prev: prevBreed.replaceAll(' ', '-')
        })
    }, [id, breedsContext])

    if (!breed) return null

    return (
        <div className={css[name]}>
            <div className={css[`${name}__text`]}>
                <div className={css[`${name}__text-headline`]}>
                    <UiButton
                        className={css[`${name}__text-cta`]}
                        icon={{ type: 'text', value: 'chevron_left' }}
                        label={'Go back'}
                        shade={'light'}
                        size={'lg'}
                        to={ROUTES.Home}
                        tag={'link'}
                        type={'icon'}
                        color={'white'}
                        shape={'circle'}
                    />
                    <UiText
                        className={css[`${name}__text-title`]}
                        size="lg"
                        variant="h1"
                    >
                        {getBreedDetails(breed).fullName}
                    </UiText>
                </div>
                <div className={css[`${name}__text-details`]}>
                    <UiText size="lg">
                        <b>Breed:</b> {getBreedDetails(breed).breed}
                    </UiText>
                    <UiText size="lg">
                        <b>Subbreed:</b> {getBreedDetails(breed).subBreed}
                    </UiText>
                </div>
            </div>

            <div className={css[`${name}__images`]} ref={imagesWrapperRef}>
                {breedsContext &&
                breedsContext.breedImageArray?.[breed]?.length > 0 ? (
                    <div className={css[`${name}__images-inner`]}>
                        {[
                            ...breedsContext.breedImageArray[breed],
                            ...breedsContext.breedImageArray[breed],
                            ...breedsContext.breedImageArray[breed],
                        ].map((image, index) => (
                            <UiImage
                                alt={breed}
                                aspectRatio={'4:3'}
                                className={css[`${name}__image`]}
                                fit={'cover'}
                                key={index}
                                orientation={'portrait'}
                                src={image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={css[`${name}__images-loader`]}>
                        <UiLoader type={'shape'} />
                    </div>
                )}
            </div>


            <div className={css[`${name}__navigation`]}>
                {_selectedBreed?.prev &&
                _selectedBreed?.next ? (
                    <>
                        <UiButton
                            className={css[`${name}__text-cta`]}
                            leadingIcon={{ type: 'text', value: 'arrow_back' }}
                            label={'Previous'}
                            shade={'light'}
                            size={'lg'}
                            to={ROUTES.Breed.replace(':id', _selectedBreed.prev)}
                            tag={'link'}
                            type={'text'}
                            color={'white'}
                            shape={'circle'}
                        />
                        <UiButton
                            className={css[`${name}__text-cta`]}
                            leadingIcon={{
                                type: 'text',
                                value: 'arrow_forward',
                            }}
                            label={'Next'}
                            shade={'light'}
                            size={'lg'}
                            to={ROUTES.Breed.replace(':id', _selectedBreed.next)}
                            tag={'link'}
                            type={'text'}
                            color={'white'}
                            shape={'circle'}
                        />
                    </>
                ) : null}
            </div>
        </div>
    )
}
