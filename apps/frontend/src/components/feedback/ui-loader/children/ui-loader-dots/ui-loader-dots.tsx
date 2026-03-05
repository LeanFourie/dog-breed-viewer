import css from '../../ui-loader.module.scss'
import { type TUiLoaderProps } from '../../ui-loader.definitions'
import { type IComponentChildProps } from '../../../../../utils/definitions/interfaces'

function UiLoaderDots({
    name,
    className = '',
    size = 'md',
    style,
}: Omit<TUiLoaderProps, 'type'> & IComponentChildProps) {
    // #region - Markup
    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--size-${size}`]}
                ${css[`${name}--type-dots`]}
                ${className}
            `}
            style={style}
        >
            {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className={css[`${name}__ellipse`]} />
            ))}
        </span>
    )
    // #endregion
}

export { UiLoaderDots }
