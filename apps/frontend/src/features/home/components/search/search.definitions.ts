// #region - Interfaces
/**
 * The props required by the PageHomeSearch component.
 */
interface IPageHomeSearchProps {
    /**
     * The active search keyword used to filter dog breeds.
     */
    keyword: string
    /**
     * The callback function to emit the search event to the parent.
     */
    onSearch: (keyword: string) => void
}
// #endregion

// #region - Exports
export type { IPageHomeSearchProps }
// #endregion
