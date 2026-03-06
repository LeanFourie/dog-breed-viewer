'use client'

import { UiIcon } from '../../base/ui-icon/ui-icon'
import { UiText } from '../../base/ui-text/ui-text'
import { UiLoader } from '../../feedback/ui-loader/ui-loader'
import {
    type TUiButtonClickEvent,
    type TUiButtonProps,
} from './ui-button.definitions'
import css from './ui-button.module.scss'
import { Link } from 'react-router-dom'

function UiButton(props: TUiButtonProps) {
    // #region - Props
    // The props are extracted here so we can dynamically render the correct props.
    const {
        label,
        color = 'primary',
        isDisabled = false,
        isLoading = false,
        isSkeleton = false,
        shade = 'dark',
        shape = 'squircle',
        size = 'md',
        variant = 'filled',
        className = '',
        style = {},
    } = props
    // #endregion

    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiButton`
    /**
     * The list of dynamic classes to render on the component based on the provided props.
     */
    const classes = `
        ${css[name]}
        ${css[`${name}--color-${color}`]}
        ${css[`${name}--shade-${shade}`]}
        ${css[`${name}--shape-${shape}`]}
        ${css[`${name}--size-${size}`]}
        ${css[`${name}--type-${props.type}`]}
        ${css[`${name}--variant-${variant}`]}
        ${isDisabled ? css[`${name}--is-disabled`] : ''}
        ${isLoading ? css[`${name}--is-loading`] : ''}
        ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
        ${className}
    `
    /**
     * The child content to render for the component
     */
    const content = (
        <>
            {props.type === 'icon' ? (
                <>
                    {'icon' in props ? (
                        <UiIcon
                            {...props.icon}
                            className={`
                                    ${css[`${name}__icon`]}
                                    ${css[`${name}__icon--primary`]}
                                `}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    {'leadingIcon' in props && props.leadingIcon ? (
                        <UiIcon
                            {...props.leadingIcon}
                            className={`
                                    ${css[`${name}__icon`]}
                                    ${css[`${name}__icon--leading`]}
                                `}
                        />
                    ) : null}

                    <UiText
                        className={`${css[`${name}__label`]}`}
                        renderAs={'span'}
                        size={size}
                        variant={'label'}
                    >
                        {label}
                    </UiText>

                    {'trailingIcon' in props && props.trailingIcon ? (
                        <UiIcon
                            {...props.trailingIcon}
                            className={`
                                    ${css[`${name}__icon`]}
                                    ${css[`${name}__icon--trailing`]}
                                `}
                        />
                    ) : null}
                </>
            )}

            {isLoading ? (
                <UiLoader
                    className={`${css[`${name}__loader`]}`}
                    size={'xs'}
                    type={'circular'}
                />
            ) : null}
        </>
    )
    // #endregion

    // #region - Markup
    switch (props.tag) {
        // The anchor link type button wrapper component
        case 'a': {
            const { href, target = '_self' } = props

            return (
                <a
                    href={href}
                    target={target}
                    className={classes}
                    style={style}
                >
                    {content}
                </a>
            )
        }

        // The router link type button wrapper component
        case 'link': {
            const { to } = props

            return (
                <Link to={to} className={classes} style={style}>
                    {content}
                </Link>
            )
        }

        // The button type button wrapper component
        case 'button': {
            const { onClick, action } = props

            /**
             * Handles click events on the button component.
             * @param event - The event emitted from the button click.
             */
            const handleClick = (event: TUiButtonClickEvent): void => {
                // Ensure the click event is not triggered when the button should not be clickable
                if (!onClick || isDisabled || isLoading || isSkeleton) return

                onClick(event)
            }

            return (
                <button
                    type={action}
                    onClick={handleClick}
                    disabled={isDisabled || isLoading || isSkeleton}
                    className={classes}
                    style={style}
                    aria-label={props.label}
                >
                    {content}
                </button>
            )
        }
    }
    // #endregion
}

export { UiButton }
