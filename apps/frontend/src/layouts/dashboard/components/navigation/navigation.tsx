import { use } from 'react'
import { UiIcon, UiText } from '../../../../components'
import { FavouritesContext } from '../../../../providers'
import { ROUTES } from '../../../../utils/routes/routes'
import css from './navigation.module.scss'
import { Link } from 'react-router-dom'

const LayoutDashboardNavigation = () => {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `LayoutDashboardNavigation`
    /**
     * The list of navigation links.
     */
    const links = [
        {
            icon: 'home',
            label: 'Home',
            to: ROUTES.Home,
        },
        {
            icon: 'favorite',
            label: 'Favourites',
            to: ROUTES.Favourites,
        },
    ]
    // #endregion

    // #region - Hooks
    /**
     * The context for the favourites state.
     */
    const favouritesContext = use(FavouritesContext)
    // #endregion

    // #region - Markup
    return (
        <nav className={css[name]}>
            <ul className={css[`${name}__list`]}>
                {links.map((link) => (
                    <li
                        className={`
                        ${css[`${name}__list-item`]}    
                        ${
                            location.pathname === link.to
                                ? css[`${name}__list-item--is-active`]
                                : ''
                        }
                    `}
                        key={link.label}
                    >
                        <Link
                            className={css[`${name}__list-item-link`]}
                            to={link.to}
                            aria-label={link.label}
                        >
                            {/* Icon */}
                            <UiIcon
                                className={css[`${name}__list-item-icon`]}
                                type={'text'}
                                value={link.icon}
                            />
                            {/* ./Icon */}

                            {/* Indicator */}
                            {link.label === links[1].label ? (
                                <>
                                    <span
                                        className={
                                            css[`${name}__list-item-count`]
                                        }
                                    >
                                        <UiText
                                            className={
                                                css[
                                                    `${name}__list-item-count-value`
                                                ]
                                            }
                                            renderAs={'span'}
                                            size={'sm'}
                                            variant={'h6'}
                                            weight={'semi-bold'}
                                        >
                                            {favouritesContext?.favourites
                                                ?.length || 0}
                                        </UiText>
                                    </span>
                                </>
                            ) : null}
                            {/* ./Indicator */}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
    // #endregion
}

export { LayoutDashboardNavigation }
