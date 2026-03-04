'use client'

import { type IBreedsContext } from './breeds.definitions'
import {
    createContext,
    use,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { fetchJson } from '../../utils/methods/api'
import {
    type DogBreedImageResponse,
    type DogBreedsResponse,
} from '../../utils/models/dog-breeds'
import { trimLowercase } from '../../utils/methods/strings'

export const BreedsContext = createContext<IBreedsContext | null>(null)

const fetchDogBreedDataPromise = () =>
    fetchJson<DogBreedsResponse>({
        url: `${import.meta.env.VITE_API_BASE_URL}/breeds/list/all`,
    })

const initialDogBreedDataPromise = fetchDogBreedDataPromise()
const fetchDogBreedImage = (breed: string) =>
    fetchJson<DogBreedImageResponse>({
        url: `${
            import.meta.env.VITE_API_BASE_URL
        }/breed/${breed}/images/random`,
    })

const BreedsProvider = ({ children }: React.PropsWithChildren) => {
    // #region - APIs
    const [dogBreedDataPromise, setDogBreedDataPromise] = useState(
        initialDogBreedDataPromise
    )
    const dogBreedData = use(dogBreedDataPromise)
    // #endregion

    // #region - Variables
    const dogBreedList = useMemo(() => {
        return dogBreedData.ok
            ? Object.entries(dogBreedData.data.message)
                  .flatMap(([breed, subBreeds]) =>
                      subBreeds.length > 0
                          ? subBreeds.map((sub) => `${sub} ${breed}`)
                          : [breed]
                  )
                  .sort((a, b) => a.localeCompare(b))
            : ['Error occurred while fetching the data']
    }, [dogBreedData])

    const dogBreedListError = !dogBreedData.ok ? dogBreedData.error : null
    // #endregion

    // #region - States
    const [_breedImages, _setBreedImages] = useState<Record<string, string>>({})
    const [_loadingImages, _setLoadingImages] = useState<Set<string>>(new Set())
    const [_filteredDogBreedList, _setFilteredDogBreedList] =
        useState(dogBreedList)
    // #endregion

    // #region - Methods
    const retryDogBreedList = useCallback(() => {
        setDogBreedDataPromise(fetchDogBreedDataPromise())
    }, [])

    const getBreedImage = useCallback(
        async (breed: string): Promise<string | undefined> => {
            if (!dogBreedData.ok) return undefined

            if (_breedImages[breed]) return _breedImages[breed]

            if (_loadingImages.has(breed)) return undefined

            _setLoadingImages((prev) => new Set(prev).add(breed))

            try {
                const formattedBreed = breed.includes(' ')
                    ? `${breed.split(' ')[1]}/${breed.split(' ')[0]}`
                    : breed

                const res = await fetchDogBreedImage(formattedBreed)

                if (!res.ok) return undefined

                _setBreedImages((prev) => ({
                    ...prev,
                    [breed]: res.data.message,
                }))

                return res.data.message
            } catch (error) {
                console.error('Failed to fetch breed image', error)
                return undefined
            } finally {
                _setLoadingImages((prev) => {
                    const next = new Set(prev)
                    next.delete(breed)
                    return next
                })
            }
        },
        [_breedImages, _loadingImages]
    )

    const searchBreedList = (keyword: string) => {
        _setFilteredDogBreedList(
            dogBreedList.filter((breed) =>
                trimLowercase(breed).includes(trimLowercase(keyword))
            )
        )
    }
    // #endregion

    // #region - Effects
    useEffect(() => {
        _setFilteredDogBreedList(dogBreedList)
    }, [dogBreedList])

    useEffect(() => {
        if (dogBreedList.length === 0) return

        getBreedImage(dogBreedList[0])
    }, [dogBreedList])
    // #endregion

    // #region - Value
    const value: IBreedsContext = {
        dogBreedList,
        dogBreedListError,
        filteredDogBreedList: _filteredDogBreedList,
        breedImages: _breedImages,
        getBreedImage,
        searchBreedList,
        retryDogBreedList,
    }
    // #endregion

    // Markup
    return (
        <BreedsContext.Provider value={value}>
            {children}
        </BreedsContext.Provider>
    )
    // #endregion
}

export default BreedsProvider
