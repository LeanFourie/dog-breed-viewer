import { UiLoaderDots, UiLoaderShape, UiLoaderCircular } from './children'
import { type TUiLoaderProps } from './ui-loader.definitions'

function UiLoader({ type = 'circular', ...props }: TUiLoaderProps) {
    const name = 'UiLoader'

    return (
        <>
            {type === 'circular' ? (
                <UiLoaderCircular name={name} {...props} />
            ) : null}
            {type === 'dots' ? <UiLoaderDots name={name} {...props} /> : null}
            {type === 'shape' ? <UiLoaderShape name={name} {...props} /> : null}
        </>
    )
}

export { UiLoader }
