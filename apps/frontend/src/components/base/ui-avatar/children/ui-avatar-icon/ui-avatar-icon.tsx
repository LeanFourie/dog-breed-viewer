import { type IComponentChildProps } from '../../../../../utils/definitions/interfaces'
import { type IUiAvatarIconProps } from '../../ui-avatar.definitions'
import css from '../../ui-avatar.module.scss'
import { UiIcon } from '../../../ui-icon/ui-icon'

function UiAvatarIcon({
    name,
    className = '',
    color = 'primary',
    isSelected = false,
    isSkeleton = false,
    shade = 'dark',
    size = 'md',
    style = {},
}: IUiAvatarIconProps & IComponentChildProps) {
    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--color-${color}`]}
                ${css[`${name}--type-icon`]}
                ${css[`${name}--shade-${shade}`]}
                ${css[`${name}--size-${size}`]}
                ${isSelected ? css[`${name}--is-selected`] : ''}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${className}
            `}
            style={style}
        >
            <UiIcon
                className={`${css[`${name}__icon`]}`}
                type={'text'}
                value={'account_circle'}
            />
        </span>
    )
}

export { UiAvatarIcon }
