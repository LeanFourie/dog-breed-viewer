'use client'

import { UiIcon } from '../../base/ui-icon/ui-icon'
import { UiLoader } from '../../base/ui-loader/ui-loader'
import { UiText } from '../../base/ui-text/ui-text'
import {
    type TUiButtonClickEvent,
    type TUiButtonProps,
} from './ui-button.definitions'
import css from './ui-button.module.scss'
import { Link } from 'react-router-dom'

function UiButton(props: TUiButtonProps) {
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

    const name = `UiButton`
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

    switch (props.tag) {
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

        case 'link': {
            const { to } = props

            return (
                <Link to={to} className={classes} style={style}>
                    {content}
                </Link>
            )
        }

        case 'button': {
            const { onClick, action } = props

            const handleClick = (event: TUiButtonClickEvent): void => {
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
                >
                    {content}
                </button>
            )
        }
    }
}

export { UiButton }
