import { UiLoader } from '../../base/ui-loader/ui-loader'
import css from './fallback-loader.module.scss'

function UiFallbackLoader() {
    const name = `UiFallbackLoader`

    return (
        <div className={css[name]}>
            <UiLoader size={'lg'} type={'shape'} />
        </div>
    )
}

export { UiFallbackLoader }
