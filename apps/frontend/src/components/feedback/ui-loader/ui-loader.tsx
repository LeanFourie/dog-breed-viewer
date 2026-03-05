import { UiLoaderDots, UiLoaderShape, UiLoaderCircular } from './children'
import { type TUiLoaderProps } from './ui-loader.definitions'

function UiLoader({ type = 'circular', ...props }: TUiLoaderProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = 'UiLoader'
    // #endregion

    // #region - Markup
    return (
        <>
            {type === 'circular' ? (
                <UiLoaderCircular name={name} {...props} />
            ) : null}
            {type === 'dots' ? <UiLoaderDots name={name} {...props} /> : null}
            {type === 'shape' ? <UiLoaderShape name={name} {...props} /> : null}
        </>
    )
    // #endregion
}

export { UiLoader }
