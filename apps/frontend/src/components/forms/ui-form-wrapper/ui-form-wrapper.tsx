import { UiText } from '../../base/ui-text/ui-text'
import { UiHelperText } from '../ui-helper-text/ui-helper-text'
import { type TUiFormWrapperProps } from './ui-form-wrapper.definitions'
import css from './ui-form-wrapper.module.scss'

function UiFormWrapper({
    children,
    className = '',
    count,
    helperText,
    htmlFor,
    isSkeleton = false,
    label,
    requirement = 'none',
    state = 'neutral',
    style = {},
}: TUiFormWrapperProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiFormWrapper`
    // #endregion

    // #region - Markup
    return (
        <div
            className={`
                ${css[name]}
                ${className}
            `}
            style={style}
        >
            {/* Label */}
            {!!label && label !== '' ? (
                <div className={css[`${name}__label`]}>
                    {/* Label Value */}
                    <UiText
                        className={css[`${name}__label-element`]}
                        htmlFor={htmlFor}
                        isSkeleton={isSkeleton}
                        size={'sm'}
                        variant={'label'}
                    >
                        {label}
                        {requirement === 'required' ? (
                            <sup
                                className={
                                    css[`${name}__label-required-marker`]
                                }
                            >
                                *
                            </sup>
                        ) : null}
                    </UiText>
                    {/* ./Label Value */}
                    {/* Optional Indicator */}
                    {requirement === 'optional' ? (
                        <UiText
                            className={css[`${name}__label-optional-marker`]}
                            isSkeleton={isSkeleton}
                            renderAs={'span'}
                            size={'sm'}
                            variant={'label'}
                        >
                            (Optional)
                        </UiText>
                    ) : null}
                    {/* ./Optional Indicator */}
                    {/* Count */}
                    {!!count ? (
                        <UiText
                            className={css[`${name}__label-count`]}
                            isSkeleton={isSkeleton}
                            renderAs={'span'}
                            size={'sm'}
                            variant={'label'}
                        >
                            {count}
                        </UiText>
                    ) : null}
                    {/* ./Count */}
                </div>
            ) : null}
            {/* ./Label */}

            {/* Content */}
            {children}
            {/* ./Content */}

            {/* Helper Text */}
            {helperText && helperText.length > 0 ? (
                <div className={css[`${name}__helpers`]}>
                    {helperText.map((helper, index) => (
                        <UiHelperText
                            {...helper}
                            key={index}
                            isSkeleton={isSkeleton}
                            state={helper.state ?? state}
                        />
                    ))}
                </div>
            ) : null}
            {/* ./Helper Text */}
        </div>
    )
    // #endregion
}

export { UiFormWrapper }
