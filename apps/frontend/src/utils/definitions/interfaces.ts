// #region - Imports
import type { CSSProperties } from 'react'
// #endregion

// #region - Interfaces
/**
 * The base attributes to be set on a component.
 */
interface IComponentAttributes {
    /**
     * Allows for custom class names to be set on the component.
     */
    className?: string
    /**
     * Allows for custom styles to be set on the component.
     */
    style?: Record<string, number | string> | CSSProperties
}
/**
 * Props required to style child components.
 */
interface IComponentChildProps {
    /**
     * The class name of the parent component.
     */
    name: string
}
interface IFetchJsonAuthOptions extends RequestInit {
    /**
     * The authentication token to be included in the request headers.
     */
    authToken?: string
}
// #endregion

// #region - Exports
export type { IComponentAttributes, IComponentChildProps, IFetchJsonAuthOptions }
// #endregion
