import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type {
    TSizeExtended,
    TShade,
    TColor,
} from '../../../utils/definitions/types'
import type { TUiImageProps } from '../ui-image/ui-image.definitions'

type TUiAvatarType = 'icon' | 'image' | 'initials'
type TUiAvatarProps =
    | IUiAvatarIconProps
    | IUiAvatarImageProps
    | IUiAvatarInitialsProps

interface IUiAvatarDevProps extends IComponentAttributes {
    isSkeleton?: boolean
    isSelected?: boolean
}

interface IUiAvatarProps extends IUiAvatarDevProps {
    type: TUiAvatarType
    size?: TSizeExtended
}

interface TUiVariantProps {
    color?: TColor
    shade?: TShade
}

interface IUiAvatarIconProps extends IUiAvatarProps, TUiVariantProps {
    type: 'icon'
}

interface IUiAvatarImageProps extends IUiAvatarProps {
    type: 'image'
    src: TUiImageProps['src']
    alt: TUiImageProps['alt']
}

interface IUiAvatarInitialsProps extends IUiAvatarProps, TUiVariantProps {
    type: 'initials'
    initials: string
}

export type {
    TUiAvatarProps,
    IUiAvatarIconProps,
    IUiAvatarImageProps,
    IUiAvatarInitialsProps,
}
