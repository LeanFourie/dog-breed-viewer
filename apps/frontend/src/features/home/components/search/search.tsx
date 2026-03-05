import { UiButton } from '../../../../components'
import css from './search.module.scss'
import { type IPageHomeSearchProps } from './search.definitions'
import { type ChangeEvent } from 'react'

function PageHomeSearch({ keyword, onSearch }: IPageHomeSearchProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageHomeSearch`
    // #endregion

    // #region - Variables
    /**
     * Handles value change events on the search input.
     * This triggers the search event to fire.
     * @param event - The event emitted from the input component.
     */
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        // Get the value from the input element
        const value = event.currentTarget.value
        // Fire the internal search function
        // This is to have a central reusable function for emitting the search event
        handleSearch(value)
    }
    /**
     * Emits the search event to the parent.
     * @param value - The search keyword to emit.
     */
    const handleSearch = (value: string) => {
        onSearch(value)
    }
    // #endregion

    // #region - Variables
    return (
        <div className={css[name]}>
            <div className={css[`${name}__inner`]}>
                {/* Input */}
                <input
                    onChange={handleSearchChange}
                    className={css[`${name}__input`]}
                    name={'search'}
                    placeholder={'Search by name...'}
                    value={keyword}
                />
                {/* ./Input */}

                {/* Clear Button */}
                <UiButton
                    onClick={() => handleSearch('')}
                    className={css[`${name}__cta`]}
                    icon={{ type: 'text', value: 'close' }}
                    label={'Go back'}
                    shade={'light'}
                    size={'sm'}
                    tag={'button'}
                    type={'icon'}
                    color={'invert'}
                    shape={'circle'}
                />
                {/* ./Clear Button */}
            </div>
        </div>
    )
    // #endregion
}

export { PageHomeSearch }
