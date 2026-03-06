'use client'

import { useContext } from 'react'
import { UiImage, UiLoader, UiButton, UiBrand, UiText } from '../../components'
import css from './favourites.module.scss'
import { ROUTES } from '../../utils/routes/routes'
import { FavouritesContext } from '../../providers/favourites/favourites.provider'

function PageFavourites() {
    // #region - Variables
    const name = `PageFavourites`
    // #endregion

    // #region - Hooks

    const favouritesContext = useContext(FavouritesContext)!
    // #endregion

    // #region - Markup
    return (
        <div className={css[name]}>
            <div className={css[`${name}__header`]}>
                {/* Back Button */}
                <UiButton
                    icon={{ type: 'text', value: 'chevron_left' }}
                    label={'Go back'}
                    shade={'light'}
                    size={'lg'}
                    to={ROUTES.Home}
                    tag={'link'}
                    type={'icon'}
                    color={'white'}
                    shape={'circle'}
                />
                {/* ./Back Button */}
                {/* Title */}
                <UiText
                    className={css[`${name}__header-title`]}
                    size={'lg'}
                    variant={'h3'}
                >
                    Favourites
                </UiText>
                {/* ./Title */}
            </div>

            {favouritesContext?.isLoading ? (
                <div className={css[`${name}__loader`]}>
                    <UiLoader size={'lg'} type={'shape'} />
                </div>
            ) : favouritesContext?.favourites.length > 0 ? (
                <div className={css[`${name}__list`]}>
                    {favouritesContext?.favourites.map((image, index) => (
                        <div key={index} className={css[`${name}__item`]}>
                            {/* Image */}
                            <UiImage
                                alt={`Favourite ${index}`}
                                aspectRatio={'4:3'}
                                fit={'cover'}
                                orientation={'portrait'}
                                src={image}
                            />
                            {/* ./Image */}
                            {/* Button */}
                            <UiButton
                                onClick={() =>
                                    favouritesContext?.toggleFavourite(image)
                                }
                                key={index}
                                className={`
                                    ${css[`${name}__item-action`]}
                                    ${
                                        favouritesContext?.favourites.includes(
                                            image
                                        )
                                            ? css[
                                                  `${name}__item-action--is-favourite`
                                              ]
                                            : ''
                                    }
                                `}
                                color={
                                    favouritesContext?.favourites.includes(
                                        image
                                    )
                                        ? 'danger'
                                        : 'base'
                                }
                                icon={{
                                    type: 'text',
                                    value: 'favorite',
                                }}
                                label={'Favourite'}
                                tag={'button'}
                                type={'icon'}
                                variant={'filled'}
                            />
                            {/* ./Button */}
                        </div>
                    ))}
                </div>
            ) : (
                <UiText size={'lg'}>
                    No favourites yet. Go explore breeds!
                </UiText>
            )}

            <UiBrand />
        </div>
    )
    // #endregion
}

export { PageFavourites }
