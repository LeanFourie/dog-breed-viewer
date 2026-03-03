'use client'

import { type DogBreedsResponse } from '../../../utils/models/dog-breeds'
import { fetchJson } from '../../../utils/methods/api'
import {
    capitalizeFirstLetter,
    stringToKey,
} from '../../../utils/methods/strings'
import Lenis from 'lenis'
import { use, Suspense, useEffect } from 'react'
import { UiLoader } from '../../base/ui-loader/ui-loader'

const dogBreedData = fetchJson<DogBreedsResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/breeds/list/all`
)

function PageHome() {
    const _dogBreedData = use(dogBreedData)

    const flattenedBreeds = Object.entries(_dogBreedData.message)
        .flatMap(([breed, subBreeds]) => {
            return subBreeds.length > 0
                ? subBreeds.map((sub) => `${sub} ${breed}`)
                : [breed]
        })
        .sort()

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
        <div>
            <Suspense fallback={<UiLoader size={'lg'} type={'circular'} />}>
                <div>
                    {flattenedBreeds.map((item, index) => (
                        <div key={`${stringToKey(item)}-${index}`}>
                            {capitalizeFirstLetter(item)}
                        </div>
                    ))}
                </div>
            </Suspense>
        </div>
    )
}

export { PageHome }
