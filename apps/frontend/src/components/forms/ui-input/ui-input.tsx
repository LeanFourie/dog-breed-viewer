import { forwardRef, useState } from 'react'
import { UiIcon } from '../../base/ui-icon/ui-icon'
import { UiText } from '../../base/ui-text/ui-text'
import { UiLoader } from '../../feedback/ui-loader/ui-loader'
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
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiInput`
    /**
     * The HTML tag to render for the leading icon.
     * If it is clickable, render it as a button, else render it as a div.
     * This ensures more accurate semantic code.
     */
    const LeadingIcon = leadingIcon?.onClick ? 'button' : 'div'
    /**
     * The HTML tag to render for the trailing icon.
     * If it is clickable, render it as a button, else render it as a div.
     * This ensures more accurate semantic code.
     */
    const TrailingIcon = trailingIcon?.onClick ? 'button' : 'div'
    /**
     * The HTML tag to render for the prefix.
     * If it is clickable, render it as a button, else render it as a div.
     * This ensures more accurate semantic code.
     */
    const Prefix = prefix?.onClick ? 'button' : 'div'
    /**
     * The HTML tag to render for the suffix.
     * If it is clickable, render it as a button, else render it as a div.
     * This ensures more accurate semantic code.
     */
    const Suffix = suffix?.onClick ? 'button' : 'div'
    // #endregion

    // #region - State
    /**
     * Whether the password should be revealed or not.
     */
    const [_showPassword, setShowPassword] = useState(false)
    // #endregion

    // #region - Methods
    /**
     * Handles value change events on the input.
     * @param event - The event emitted when the input value changes.
     */
    const handleChange = (event: TUiInputChangeEvent): void => {
        // Do not trigger the event when it should be disabled.
        if (isDisabled || isLoading || isSkeleton) return

        onChange(event)
    }
    /**
     * Handles focus in events on the input.
     * @param event - The event emitted when the input is in focus.
     */
    const handleFocus = (event: TUiInputFocusEvent): void => {
        // Do not trigger the event when it should be disabled.
        if (isDisabled || isLoading || isSkeleton || !onFocus) return

        onFocus(event)
    }
    /**
     * Handles focus out events on the input.
     * @param event - The event emitted when the input loses focus.
     */
    const handleBlur = (event: TUiInputFocusEvent): void => {
        // Do not trigger the event when it should be disabled.
        if (isDisabled || isLoading || isSkeleton || !onBlur) return

        onBlur(event)
    }
    /**
     * Handles enter key press events on the input.
     * @param event - The event emitted when the any key is pressed while the input is in focus.
     */
    const handleEnterPress = (event: TUiInputKeyDownEvent): void => {
        // Do not trigger the event when it should be disabled.
        // Also, only allow press events on the enter key to pass.
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
    /**
     * Handles value increment / decrement for number based inputs.
     * @param event - The direction the value should move to. -1 for for decrement and 1 for increment.
     */
    const handleValueIncrement = (direction: -1 | 1): void => {
        // Do not trigger the event when it should be disabled.
        if (!onValueIncrement) return

        // Calculate the new value
        const newValue = Number(value) + direction * (step ?? 1)

        // Ensure the new value stays within the min and max range
        if (!!min && newValue < min) return
        if (!!max && newValue > max) return

        // Emit the event with the new value
        onValueIncrement(`${newValue}`)
    }
    /**
     * Toggles the password reveal state.
     */
    const handlePasswordReveal = (): void => {
        setShowPassword(show => !show)
    }
    // #endregion

    // #region - Markup
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
                {/* Leading Icon */}
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
                {/* ./Leading Icon */}

                {/* Decrement Button */}
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
                {/* ./Decrement Button */}

                {/* Prefix */}
                {!!prefix && (
                    <Prefix
                        onClick={prefix.onClick}
                        className={`
                            ${css[`${name}__text`]}
                            ${css[`${name}__text--prefix`]}
                        `}
                    >
                        <UiText renderAs={'span'} variant={'label'}>
                            {prefix.value}
                        </UiText>
                    </Prefix>
                )}
                {/* ./Prefix */}

                {/* Input */}
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
                    type={type === 'password' && _showPassword ? 'text' : type}
                    value={value}
                    aria-invalid={state === 'danger'}
                />
                {/* ./Input */}

                {/* Suffix */}
                {!!suffix && (
                    <Suffix
                        onClick={suffix.onClick}
                        className={`
                            ${css[`${name}__text`]}
                            ${css[`${name}__text--suffix`]}
                        `}
                    >
                        <UiText renderAs={'span'} variant={'label'}>
                            {suffix.value}
                        </UiText>
                    </Suffix>
                )}
                {/* ./Suffix */}

                {/* Increment Button */}
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
                {/* ./Increment Button */}

                {/* Password Reveal Button */}
                {type === 'password' && (
                    <LeadingIcon
                        onMouseDown={() => handlePasswordReveal()}
                        onMouseUp={() => handlePasswordReveal()}
                        className={`
                            ${css[`${name}__icon`]}
                            ${css[`${name}__icon--trailing`]}
                            ${css[`${name}__icon--clickable`]}
                        `}
                    >
                        <UiIcon
                            className={css[`${name}__icon-element`]}
                            type={'text'}
                            value={_showPassword ? 'visibility_off' : 'visibility'}
                        />
                    </LeadingIcon>
                )}
                {/* ./Password Reveal Button */}

                {/* Trailing Icon */}
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
                {/* ./Trailing Icon */}

                {/* Loader */}
                {isLoading && (
                    <UiLoader
                        className={css[`${name}__loader`]}
                        size="xs"
                        type="circular"
                    />
                )}
                {/* ./Loader */}
            </div>
        </UiFormWrapper>
    )
    // #endregion
})

export { UiInput }
