import { type IComponentChildProps } from '../../../../../utils/definitions/interfaces'
import { type IUiAvatarImageProps } from '../../ui-avatar.definitions'
import css from '../../ui-avatar.module.scss'
import { UiImage } from '../../../ui-image/ui-image'

function UiAvatarImage({
    alt,
    name,
    className = '',
    isSelected = false,
    isSkeleton = false,
    size = 'md',
    src,
    style = {},
}: IUiAvatarImageProps & IComponentChildProps) {
    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--type-image`]}
                ${css[`${name}--size-${size}`]}
                ${isSelected ? css[`${name}--is-selected`] : ''}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${className}
            `}
            style={style}
        >
            <UiImage
                aspectRatio={'1:1'}
                alt={alt}
                className={css[`${name}__image`]}
                fit={'cover'}
                src={src}
            />
        </span>
    )
}

export { UiAvatarImage }
