'use client'

import { UiEmptyPage } from '../../components'
import { BreedContext, BreedsContext } from '../../providers'
import { stringToKey } from '../../utils/methods/strings'
import css from './breed.module.scss'
import {
    PageBreedDetails,
    PageBreedImages,
    PageBreedNavigation,
} from './components'
import { useParams } from 'react-router-dom'
import { use, useEffect } from 'react'

function PageBreed() {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageBreed`
    // #endregion

    // #region - Hooks
    /**
     * The breed ID from the URL parameter.
     */
    const { id } = useParams()
    /**
     * The context for the breed details.
     */
    const breedContext = use(BreedContext)
    /**
     * The context for the breeds list.
     */
    const breedsContext = use(BreedsContext)
    // #endregion

    // #region - Effects
    /**
     * Fetches the breed details and images when the breed ID changes.
     */
    useEffect(() => {
        if (!id) return

        breedsContext?.fetchBreeds()
        breedContext?.fetchBreedImages({ breed: id })
    }, [id])
    // #endregion

    // #region - Markup
    if (
        !id ||
        !breedsContext?.allBreeds?.find(
            (breed) => stringToKey(breed.name) === id
        )
    )
        return <UiEmptyPage />

    return (
        <div className={css[name]}>
            {/* Details */}
            <PageBreedDetails breedId={id} />
            {/* ./Details */}

            {/* Images */}
            <PageBreedImages
                breedId={id}
                images={breedContext?.selectedBreedImages ?? []}
                isLoading={breedContext?.isLoading ?? false}
            />
            {/* ./Images */}

            {/* Navigation */}
            <PageBreedNavigation
                breedId={id}
                breedsList={breedsContext?.allBreeds ?? []}
            />
            {/* ./Navigation */}
        </div>
    )
    // #endregion
}

export { PageBreed }
