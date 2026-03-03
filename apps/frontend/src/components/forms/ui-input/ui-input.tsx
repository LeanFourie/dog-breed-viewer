import { forwardRef } from 'react'
import { UiIcon } from '../../base/ui-icon/ui-icon'
import { UiLoader } from '../../base/ui-loader/ui-loader'
import { UiText } from '../../base/ui-text/ui-text'
import { UiFormWrapper } from '../ui-form-wrapper/ui-form-wrapper'
import {
    type TUiInputKeyDownEvent,
    type TUiInputChangeEvent,
    type TUiInputFocusEvent,
    type TUiInputProps,
} from './ui-input.definitions'
import css from './ui-input.module.scss'

const UiInput = forwardRef<HTMLInputElement, TUiInputProps>(function UiInput(
    {
        autoComplete = 'off',
        className = '',
        count,
        helperText,
        htmlFor,
        isDisabled = false,
        isLoading = false,
        isReadonly = false,
        isSkeleton = false,
        label,
        leadingIcon,
        max,
        maxLength,
        min,
        minLength,
        onChange,
        onEnterPress,
        onFocus,
        onBlur,
        onValueIncrement,
        pattern,
        placeholder,
        prefix,
        requirement = 'none',
        size = 'md',
        state = 'neutral',
        step,
        style = {},
        suffix,
        trailingIcon,
        type = 'text',
        value = '',
    },
    ref
) {
    const name = `UiInput`

    const handleChange = (event: TUiInputChangeEvent): void => {
        if (isDisabled || isLoading || isSkeleton) return
        onChange(event)
    }

    const handleFocus = (event: TUiInputFocusEvent): void => {
        if (isDisabled || isLoading || isSkeleton || !onFocus) return
        onFocus(event)
    }

    const handleBlur = (event: TUiInputFocusEvent): void => {
        if (isDisabled || isLoading || isSkeleton || !onBlur) return
        onBlur(event)
    }

    const handleEnterPress = (event: TUiInputKeyDownEvent): void => {
        if (
            isDisabled ||
            isLoading ||
            isSkeleton ||
            !onEnterPress ||
            event.key !== 'Enter'
        )
            return

        onEnterPress(event)
    }

    const handleValueIncrement = (direction: -1 | 1): void => {
        if (!onValueIncrement) return

        const newValue = Number(value) + direction * (step ?? 1)

        if (!!min && newValue < min) return
        if (!!max && newValue > max) return

        onValueIncrement(`${newValue}`)
    }

    const LeadingIcon = leadingIcon?.onClick ? 'button' : 'div'
    const TrailingIcon = trailingIcon?.onClick ? 'button' : 'div'
    const Prefix = prefix?.onClick ? 'button' : 'div'
    const Suffix = suffix?.onClick ? 'button' : 'div'

    return (
        <UiFormWrapper
            className={`
                ${css[name]}
                ${css[`${name}--size-${size}`]}
                ${css[`${name}--state-${state}`]}
                ${isSkeleton ? css[`${name}--is-skeleton`] : ''}
                ${className}
            `}
            count={count}
            helperText={helperText}
            htmlFor={htmlFor}
            isSkeleton={isSkeleton}
            label={label}
            requirement={requirement}
            state={state}
            style={style}
        >
            <div className={css[`${name}__inner`]}>
                {!!leadingIcon && (
                    <LeadingIcon
                        onClick={leadingIcon.onClick}
                        className={`
                            ${css[`${name}__icon`]}
                            ${css[`${name}__icon--leading`]}
                        `}
                    >
                        <UiIcon
                            {...leadingIcon}
                            className={css[`${name}__icon-element`]}
                        />
                    </LeadingIcon>
                )}

                {type === 'number' && (
                    <LeadingIcon
                        onClick={() => handleValueIncrement(-1)}
                        className={`
                            ${css[`${name}__icon`]}
                            ${css[`${name}__icon--leading`]}
                            ${css[`${name}__icon--clickable`]}
                        `}
                    >
                        <UiIcon
                            className={css[`${name}__icon-element`]}
                            type={'text'}
                            value={'remove'}
                        />
                    </LeadingIcon>
                )}

                {!!prefix && (
                    <Prefix
                        onClick={prefix.onClick}
                        className={`
                            ${css[`${name}__text`]}
                            ${css[`${name}__text--prefix`]}
                        `}
                    >
                        <UiText renderAs="span" variant="label">
                            {prefix.value}
                        </UiText>
                    </Prefix>
                )}

                <input
                    autoComplete={autoComplete}
                    ref={ref}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onKeyDown={handleEnterPress}
                    className={css[`${name}__element`]}
                    disabled={isDisabled}
                    id={htmlFor}
                    max={max}
                    maxLength={maxLength}
                    min={min}
                    minLength={minLength}
                    name={htmlFor}
                    pattern={pattern}
                    placeholder={placeholder}
                    readOnly={isReadonly}
                    required={requirement === 'required'}
                    step={step}
                    type={type}
                    value={value}
                />

                {!!suffix && (
                    <Suffix
                        onClick={suffix.onClick}
                        className={`
                            ${css[`${name}__text`]}
                            ${css[`${name}__text--suffix`]}
                        `}
                    >
                        <UiText renderAs="span" variant="label">
                            {suffix.value}
                        </UiText>
                    </Suffix>
                )}

                {type === 'number' && (
                    <LeadingIcon
                        onClick={() => handleValueIncrement(1)}
                        className={`
                            ${css[`${name}__icon`]}
                            ${css[`${name}__icon--trailing`]}
                            ${css[`${name}__icon--clickable`]}
                        `}
                    >
                        <UiIcon
                            className={css[`${name}__icon-element`]}
                            type={'text'}
                            value={'add'}
                        />
                    </LeadingIcon>
                )}

                {!!trailingIcon && (
                    <TrailingIcon
                        onClick={trailingIcon.onClick}
                        className={`
                            ${css[`${name}__icon`]}
                            ${css[`${name}__icon--trailing`]}
                        `}
                    >
                        <UiIcon
                            {...trailingIcon}
                            className={css[`${name}__icon-element`]}
                        />
                    </TrailingIcon>
                )}

                {isLoading && (
                    <UiLoader
                        className={css[`${name}__loader`]}
                        size="xs"
                        type="circular"
                    />
                )}
            </div>
        </UiFormWrapper>
    )
})

export { UiInput }
