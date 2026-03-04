import { UiButton } from '../../../../actions/ui-button/ui-button'
import { UiText } from '../../../../base/ui-text/ui-text'
import { type IPageHomePageErrorProps } from './page-error.definitions'
import css from './page-error.module.scss'

function PageHomePageError({ onRetryClick, message }: IPageHomePageErrorProps) {
    const name = `PageHomePageError`

    return (
        <div className={css[name]}>
            <UiText size={'sm'} variant={'h4'} weight={'semi-bold'}>
                {message}
            </UiText>
            <UiButton
                onClick={onRetryClick}
                color={'grey'}
                label={'Retry'}
                shade={'light'}
                tag={'button'}
                type={'text'}
            />
        </div>
    )
}

export { PageHomePageError }
