'use client'

import { UiErrorPage, UiLoader } from '../../components'
import { BreedsContext } from '../../providers'
import {
    PageHomeBreedList,
    PageHomeSearch,
} from './components'
import css from './home.module.scss'
import { use, useEffect } from 'react'

/**
 * The key used to store the scroll position in the session storage.
 * This is used to restore the scroll position when the user returns to the home page.
 */
const HOME_SCROLL_POSITION_KEY = 'home-scroll-position'

function PageHome() {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageHome`
    // #endregion

    // #region - Hooks
    /**
     * Context for managing the list of dog breeds.
     */
    const breedsContext = use(BreedsContext)
    // #endregion


    // #region - Methods
    /**
     * Retries fetching the list of dog breeds from the API when an error occurs.
     */
    const handleRetry = () => {
        if (!breedsContext) return

        breedsContext.fetchBreeds({ force: true })
    }
    // #endregion

    // #region - Effects
    /**
     * Restores the scroll position of the home page when the component mounts.
     */
    useEffect(() => {
        const savedScrollPosition = sessionStorage.getItem(
            HOME_SCROLL_POSITION_KEY
        )
        if (!savedScrollPosition) return

        const scrollTop = Number(savedScrollPosition)
        if (Number.isNaN(scrollTop)) return

        requestAnimationFrame(() => {
            window.scrollTo({ top: scrollTop })
        })

        sessionStorage.removeItem(HOME_SCROLL_POSITION_KEY)
    }, [])
    /**
     * Fetches the list of dog breeds from the API when the component mounts.
     */
    useEffect(() => {
        breedsContext?.fetchBreeds()
    }, [])
    // #endregion

    // #region - Markup
    if (breedsContext?.apiError)
        return (
            <UiErrorPage
                onRetryClick={handleRetry}
                message={breedsContext.apiError}
            />
        )

    return (
        <div className={css[name]}>
            {breedsContext?.isLoading ? (
                <div className={css[`${name}__loader`]}>
                    <UiLoader size={'lg'} type={'shape'} />
                </div>
            ) : (
                <>
                    {!!breedsContext ? (
                        <>
                            <PageHomeSearch
                                keyword={breedsContext.searchKeyword}
                                onSearch={breedsContext.handleBreedSearch}
                            />
                            <PageHomeBreedList
                                allBreeds={breedsContext.allBreeds}
                                fetchBreedDisplayImage={breedsContext.fetchBreedDisplayImage}
                                filteredBreeds={breedsContext.filteredBreeds}
                            />
                        </>
                    ) : null}
                </>
            )}
        </div>
    )
    // #endregion
}

export { PageHome }
