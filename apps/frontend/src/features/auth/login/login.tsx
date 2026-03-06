import { UiButton, UiImage, UiInput, UiText } from '../../../components'
import { AuthContext, NotificationContext } from '../../../providers'
import { ROUTES } from '../../../utils/routes/routes'
import css from './login.module.scss'
import { type SubmitEvent, use, useState } from 'react'
import { Navigate } from 'react-router-dom'

const PageLogin = () => {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `PageLogin`
    // #endregion

    // #region - Hooks
    /**
     * The context for the authentication state and methods.
     */
    const authContext = use(AuthContext)
    /**
     * The context for the notification state and methods.
     */
    const notificationContext = use(NotificationContext)
    // #endregion

    // #region - State
    /**
     * The username input value.
     */
    const [username, setUsername] = useState<string>('')
    /**
     * The password input value.
     */
    const [password, setPassword] = useState<string>('')
    /**
     * Whether the login form is loading.
     */
    const [loading, setLoading] = useState<boolean>(false)
    // #endregion

    // #region - Methods
    /**
     * Handles the form submission for login.
     * @param event - The form event.
     */
    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        // This is important to ensure that the form data is not sent to the server before we have a chance to handle it
        event.preventDefault()

        // Set the loading state to true to indicate that the login process is in progress
        setLoading(true)

        try {
            // Attempt to log in the user with the provided username and password
            await authContext?.login({ username, password })
        } catch (error) {
            // If an error occurs during the login process, log the error to the console for debugging
            console.error(error)

            // Add a snackbar notification to inform the user that the login failed.
            notificationContext?.addSnackbar({
                message:
                    'Login failed. Please check your username and password.',
                state: 'danger',
            })
        } finally {
            // Set the loading state to false to indicate that the login process has completed
            setLoading(false)
        }
    }

    // #region - Markup
    if (!!authContext?.user) return <Navigate to={ROUTES.Home} />

    return (
        <div className={css[name]}>
            {/* Form */}
            <form className={css[`${name}__form`]} onSubmit={handleSubmit}>
                <div className={css[`${name}__form-inner`]}>
                    {/* Title */}
                    <UiText
                        className={css[`${name}__form-title`]}
                        size={'lg'}
                        variant={'h4'}
                        weight={'semi-bold'}
                    >
                        Login to your account
                    </UiText>
                    {/* ./Title */}
                    {/* Name */}
                    <UiInput
                        autoComplete={'off'}
                        htmlFor={'username'}
                        label={'Username'}
                        leadingIcon={{
                            type: 'text',
                            value: 'account_circle',
                        }}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder={'e.g. rileyhawk23'}
                        type={'text'}
                        value={username}
                    />
                    {/* ./Name */}
                    {/* Password */}
                    <UiInput
                        autoComplete={'off'}
                        htmlFor={'password'}
                        label={'Password'}
                        leadingIcon={{
                            type: 'text',
                            value: 'shield_locked',
                        }}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder={'********'}
                        type={'password'}
                        value={password}
                    />
                    {/* ./Password */}
                    {/* Submit Button */}
                    <UiButton
                        action={'submit'}
                        className={css[`${name}__form-cta`]}
                        color={'invert'}
                        isDisabled={!username || !password}
                        isLoading={loading}
                        label={'Login'}
                        tag={'button'}
                        trailingIcon={{ type: 'text', value: 'arrow_forward' }}
                        type={'text'}
                    />
                    {/* ./Submit Button */}
                </div>
            </form>
            {/* ./Form */}

            {/* Image */}
            <div className={css[`${name}__image`]}>
                <div className={css[`${name}__image-inner`]}>
                    <UiImage
                        aspectRatio={'unset'}
                        alt={'Login page image'}
                        fit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    />
                </div>
            </div>
            {/* ./Image */}
        </div>
    )
    // #endregion
}

export { PageLogin }
