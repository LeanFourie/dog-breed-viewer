import { UiButton } from '../../actions/ui-button/ui-button'
import { UiText } from '../../base/ui-text/ui-text'
import { TUiSnackbarProps } from './ui-snackbar.definitions'
import css from './ui-snackbar.module.scss'

function UiSnackbar({
    className = '',
    message,
    onClose,
    state = 'neutral',
    style = {},
}: TUiSnackbarProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiSnackbar`
    // #endregion

    // #region - Methods
    /**
     * Emits the close event.
     */
    const handleClick = (): void => {
        onClose()
    }
    // #endregion

    // #region - Markup
    return (
        <div
            className={`
                ${css[name]}
                ${css[`${name}--state-${state}`]}
                ${className}
            `}
            style={style}
        >
            {/* Message */}
            <UiText
                className={css[`${name}__message`]}
                renderAs={'p'}
                size={'sm'}
                variant={'label'}
                weight={'medium'}
            >
                {message}
            </UiText>
            {/* ./Message */}

            {/* Close Button */}
            <UiButton
                onClick={handleClick}
                color={'base'}
                icon={{
                    type: 'text',
                    value: 'close',
                }}
                label={'Close'}
                tag={'button'}
                type={'icon'}
                variant={'ghost'}
            />
            {/* ./Close Button */}
        </div>
    )
    // #endregion
}

export { UiSnackbar }
