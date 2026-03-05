'use client'

import { UiButton } from '../../../../components'
import { stringToKey } from '../../../../utils/methods/strings'
import { ROUTES } from '../../../../utils/routes/routes'
import { type IPageHomeNavigationProps } from './navigation.definitions'
import css from './navigation.module.scss'
import { useEffect, useState } from 'react'

function PageBreedNavigation({ breedId, breedsList }: IPageHomeNavigationProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageBreedNavigation`
    // #endregion
    
    // #region - States
    /**
     * Stores the IDs for the next and previous breeds.
     * This is used to navigate between breeds.
     */
    const [_adjacentBreeds, _setAdjacentBreeds] = useState<{
        next: string
        prev: string
    }>()
    // #endregion

    // #region - Effects
    /**
     * Get the next and previous breed IDs based on the current breed ID.
     */
    useEffect(() => {
        // If the breed ID or breeds list is not available, end early.
        // We cannot navigate between breeds without these.
        if (!breedId || !breedsList || breedsList.length === 0) return

        // Get the selected breed from the breeds list
        // This will be used to find the next and previous breeds.
        const selectedBreed = breedsList.find((breed) =>
            stringToKey(breed.name).includes(breedId)
        )

        // If we don't find the selected breed, end early.
        // We cannot navigate between breeds without this.
        if (!selectedBreed) return

        // Get the index of the next and previous breeds
        // We use the modulo operator to wrap around to the first/last breed
        // if we reach the end of the breeds list.
        const nextBreedIndex = breedsList.indexOf(selectedBreed) + 1
        const nextBreed =
            breedsList[
                nextBreedIndex === breedsList.length ? 0 : nextBreedIndex
            ]
        // Get the index of the previous breed
        // We use the modulo operator to wrap around to the first/last breed
        // if we reach the end of the breeds list.
        const prevBreedIndex = breedsList.indexOf(selectedBreed) - 1
        const prevBreed =
            breedsList[
                prevBreedIndex < 0 ? breedsList.length - 1 : prevBreedIndex
            ]
        
        // If we don't find the next or previous breed, end early.
        // We cannot navigate between breeds without these.
        if (!nextBreed || !prevBreed) return

        // Store the next and previous breed IDs in the state
        _setAdjacentBreeds({
            next: nextBreed.name.replaceAll(' ', '-'),
            prev: prevBreed.name.replaceAll(' ', '-'),
        })
    }, [breedId, breedsList])
    // #endregion

    // #region - Markup
    return (
        <div className={css[name]}>
            {/* Prev Button */}
            {_adjacentBreeds?.prev ? (
                <UiButton
                    className={css[`${name}__button`]}
                    leadingIcon={{ type: 'text', value: 'arrow_back' }}
                    label={'Previous'}
                    shade={'light'}
                    size={'lg'}
                    to={ROUTES.Breed.replace(':id', _adjacentBreeds.prev)}
                    tag={'link'}
                    type={'text'}
                    color={'white'}
                    shape={'circle'}
                />
            ) : null}
            {/* ./Prev Button */}

            {/* Next Button */}
            {_adjacentBreeds?.next ? (
                <UiButton
                    className={css[`${name}__button`]}
                    leadingIcon={{
                        type: 'text',
                        value: 'arrow_forward',
                    }}
                    label={'Next'}
                    shade={'light'}
                    size={'lg'}
                    to={ROUTES.Breed.replace(':id', _adjacentBreeds.next)}
                    tag={'link'}
                    type={'text'}
                    color={'white'}
                    shape={'circle'}
                />
            ) : null}
            {/* ./Next Button */}
        </div>
    )
    // #endregion
}

export { PageBreedNavigation }
