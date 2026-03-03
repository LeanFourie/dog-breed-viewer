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
    const name = `UiFormWrapper`

    return (
        <div
            className={`
                ${css[name]}
                ${className}
            `}
            style={style}
        >
            {!!label && label !== '' ? (
                <div className={css[`${name}__label`]}>
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
                </div>
            ) : null}

            {children}

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
        </div>
    )
}

export { UiFormWrapper }
