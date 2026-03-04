'use client'

import { BreedsContext } from '../../../providers'
import {
    PageHomeBreedList,
    PageHomePageError,
    PageHomeSearch,
} from './components'
import css from './home.module.scss'
// import Lenis from 'lenis'
import { use, useEffect } from 'react'

const HOME_SCROLL_POSITION_KEY = 'home-scroll-position'

function PageHome() {
    const breedsContext = use(BreedsContext)

    const name = `PageHome`

    const handleRetry = () => {
        breedsContext?.retryDogBreedList()
    }

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

    return (
        <div className={css[name]}>
            {breedsContext?.dogBreedListError ? (
                <PageHomePageError
                    onRetryClick={handleRetry}
                    message={breedsContext?.dogBreedListError}
                />
            ) : (
                <>
                    <PageHomeSearch />
                    <PageHomeBreedList />
                </>
            )}
        </div>
    )
}

export { PageHome }
