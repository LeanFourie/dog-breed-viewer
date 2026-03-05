'use client'

import { UiButton, UiText } from '../../../../components'
import { capitalizeFirstLetter } from '../../../../utils/methods/strings'
import { ROUTES } from '../../../../utils/routes/routes'
import { type IPageBreedDetailsProps } from './details.definitions'
import css from './details.module.scss'

function PageBreedDetails({ breedId }: IPageBreedDetailsProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageBreedDetails`
    /**
     * Stores the breed ID segments.
     * This is used to determine if the breed is a main breed or a subbreed.
     */
    const breedSegments = breedId.split('-')
    /**
     * Stores the breed details.
     * This is used to display the breed name, breed, and subbreed.
     * If the breed segment length is 1, then there is no subbreed.
     */
    const breedDetails =
        breedSegments.length === 1
            ? {
                  fullName: capitalizeFirstLetter(breedSegments[0]),
                  breed: capitalizeFirstLetter(breedSegments[0]),
                  subBreed: '-',
              }
            : {
                  fullName: capitalizeFirstLetter(breedSegments.join(' ')),
                  breed: capitalizeFirstLetter(breedSegments[1]),
                  subBreed: capitalizeFirstLetter(breedSegments[0]),
              }
    // #endregion

    // #region - Markup
    return (
        <div className={css[name]}>
            {/* Headline */}
            <div className={css[`${name}__headline`]}>
                {/* Back Button */}
                <UiButton
                    className={css[`${name}__cta`]}
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
                    className={css[`${name}__title`]}
                    size="lg"
                    variant="h1"
                >
                    {breedDetails.fullName}
                </UiText>
                {/* ./Title */}
            </div>
            {/* ./Headline */}

            {/* Details */}
            <div className={css[`${name}__details`]}>
                {/* Main Breed */}
                <UiText size="lg">
                    <b>Breed:</b> {breedDetails.breed}
                </UiText>
                {/* ./Main Breed */}
                {/* Subbreed */}
                <UiText size="lg">
                    <b>Subbreed:</b> {breedDetails.subBreed}
                </UiText>
                {/* ./Subbreed */}
            </div>
            {/* ./Details */}
        </div>
    )
    // #endregion
}

export { PageBreedDetails }
