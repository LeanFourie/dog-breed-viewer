import { BreedsContext } from '../../../../../providers'
import css from './search.module.scss'
import { type ChangeEvent, use } from 'react'

function PageHomeSearch() {
    const breedsContext = use(BreedsContext)

    const name = `PageHomeSearch`

    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!breedsContext) return

        const value = event.currentTarget.value

        breedsContext.searchBreedList(value)
    }

    return (
        <div className={css[name]}>
            <input
                onChange={handleSearch}
                className={css[`${name}__input`]}
                name={'search'}
                placeholder={'Search by name...'}
            />
        </div>
    )
}

export { PageHomeSearch }
