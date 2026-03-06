import { UiAvatarIcon, UiAvatarImage, UiAvatarInitials } from './children'
import { type TUiAvatarProps } from './ui-avatar.definitions'

function UiAvatar(props: TUiAvatarProps) {
    const name = `UiAvatar`

    return (
        <>
            {props.type === 'icon' ? (
                <UiAvatarIcon name={name} {...props} />
            ) : null}
            {props.type === 'image' ? (
                <UiAvatarImage name={name} {...props} />
            ) : null}
            {props.type === 'initials' ? (
                <UiAvatarInitials name={name} {...props} />
            ) : null}
        </>
    )
}

export { UiAvatar }
