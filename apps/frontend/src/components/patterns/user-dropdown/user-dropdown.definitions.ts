import type { IComponentAttributes } from '../../../utils/definitions/interfaces'
import type { IUserModel } from '../../../utils/models/user.model'

type TUiUserDropdownProps = IUserDropdownProps

interface IUiUserDropdownDevProps extends IComponentAttributes {
    onLogoutClick: () => void
}

interface IUserDropdownProps extends IUiUserDropdownDevProps {
    user: IUserModel
}

export type { TUiUserDropdownProps }
