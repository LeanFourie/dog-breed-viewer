'use client'

import { BreedsContext } from '../../../providers'
import {
    PageHomeBreedList,
    PageHomePageError,
    PageHomeSearch,
} from './components'
import css from './home.module.scss'
import Lenis from 'lenis'
import { use, useEffect } from 'react'

function PageHome() {
    const breedsContext = use(BreedsContext)

    const name = `PageHome`

    const handleRetry = () => {
        breedsContext?.retryDogBreedList()
    }

    useEffect(() => {
        const lenis = new Lenis({
            infinite: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
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
