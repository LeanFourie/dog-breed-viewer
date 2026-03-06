import { UiAvatar } from '../../base/ui-avatar/ui-avatar'
import { UiText } from '../../base/ui-text/ui-text'
import { TUiUserDropdownProps } from './user-dropdown.definitions'
import css from './user-dropdown.module.scss'

const UiUserDropdown = ({ onLogoutClick, user }: TUiUserDropdownProps) => {
    const name = `UiUserDropdown`

    const handleLogoutClick = (): void => {
        onLogoutClick()
    }

    return (
        <div className={css[name]}>
            {/* Trigger */}
            <div className={css[`${name}__trigger`]}>
                <UiAvatar
                    color={'secondary'}
                    isSelected={false}
                    isSkeleton={false}
                    size={'lg'}
                    type={'initials'}
                    initials={`${user.firstName[0]}${user.lastName[0]}`}
                />
                <div>
                    <UiText size={'sm'}>
                        {user.firstName} {user.lastName}
                    </UiText>
                    <UiText renderAs={'p'} size={'sm'} variant={'h6'}>
                        {user.email}
                    </UiText>
                </div>
            </div>
            {/* ./Trigger */}

            {/* Options */}
            <div className={css[`${name}__options`]}>
                <button
                    onClick={handleLogoutClick}
                    className={css[`${name}__options-button`]}
                >
                    Logout
                </button>
            </div>
            {/* ./Options */}
        </div>
    )
}

export { UiUserDropdown }
