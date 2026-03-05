import css from './ui-text.module.scss'
import type { TUiTextProps } from './ui-text.definitions'

function UiText({
    children,
    className = '',
    htmlFor,
    isSkeleton = false,
    renderAs,
    size = 'md',
    truncate = false,
    style = {},
    variant = 'p',
    weight = 'regular',
}: TUiTextProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiText`
    /**
     * The HTML tag for the dynamic component to render based on the provided props.
     * Prefers the `renderAs` prop if set, else uses the `variant` prop.
     */
    const Component = renderAs ?? variant
    // #endregion

    // #region - Markup
    return (
        <Component
            className={`
                ${css[name]}
                ${css[`${name}--size-${size}`]}
                ${css[`${name}--variant-${variant}`]}
                ${css[`${name}--weight-${weight}`]}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${truncate ? css[`${name}--is-truncated`] : ''}
                ${className}
            `}
            style={style}
            htmlFor={htmlFor}
        >
            {children}
        </Component>
    )
    // #endregion
}

export { UiText }
