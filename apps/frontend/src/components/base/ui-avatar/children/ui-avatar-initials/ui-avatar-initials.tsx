import { type IComponentChildProps } from '../../../../../utils/definitions/interfaces'
import {
    type TSize,
    type TSizeExtended,
} from '../../../../../utils/definitions/types'
import { type IUiAvatarInitialsProps } from '../../ui-avatar.definitions'
import css from '../../ui-avatar.module.scss'
import { UiText } from '../../../ui-text/ui-text'

function UiAvatarInitials({
    name,
    className = '',
    color = 'primary',
    initials,
    isSelected = false,
    isSkeleton = false,
    shade = 'dark',
    size = 'md',
    style = {},
}: IUiAvatarInitialsProps & IComponentChildProps) {
    const initialsSize: Record<TSizeExtended, TSize> = {
        xs: 'sm',
        sm: 'sm',
        md: 'md',
        lg: 'md',
        xl: 'lg',
    }

    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--color-${color}`]}
                ${css[`${name}--type-initials`]}
                ${css[`${name}--shade-${shade}`]}
                ${css[`${name}--size-${size}`]}
                ${isSelected ? css[`${name}--is-selected`] : ''}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${className}
            `}
            style={style}
        >
            <UiText variant={'h6'} size={initialsSize[size]}>
                {initials}
            </UiText>
        </span>
    )
}

export { UiAvatarInitials }
