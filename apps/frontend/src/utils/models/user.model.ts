// #region - Interfaces
interface IUserModel {
    /**
     * The ID value of the user.
     */
    id: number
    /**
     * The display name for the user.
     */
    username: string
    /**
     * The user email address.
     */
    email: string
    /**
     * The first name of the user.
     */
    firstName: string
    /**
     * The surname of the user.
     */
    lastName: string
    /**
     * An optional profile picture for the user
     */
    image?: string
}
// #endregion

// #region - Exports
export type { IUserModel }
// #endregion
