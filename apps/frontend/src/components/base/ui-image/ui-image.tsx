'use client'

import css from './ui-image.module.scss'
import type { TUiImageProps } from './ui-image.definitions'
import { useState, memo } from 'react'

const UiImageComponent = ({
    alt,
    aspectRatio = '16:9',
    className = '',
    fit = 'contain',
    orientation = 'landscape',
    placeholder,
    shape = 'rectangle',
    src,
    style = {},
}: TUiImageProps) => {
    const name = `UiImage`
    const [_loaded, _setLoaded] = useState(false)

    return (
        <div
            className={`
                ${css[name]}
                ${
                    css[
                        `${name}--aspect-ratio-${aspectRatio.replaceAll(
                            ':',
                            '-'
                        )}`
                    ]
                }
                ${css[`${name}--fit-${fit}`]}
                ${css[`${name}--orientation-${orientation}`]}
                ${css[`${name}--shape-${shape}`]}
                ${css[`${name}--fit-${fit}`]}
                ${className}
            `}
            style={style}
        >
            {/* Placeholder / blurred image */}
            {placeholder ? (
                <img
                    alt={alt}
                    className={`${css[`${name}__placeholder`]}`}
                    src={placeholder}
                    style={{ opacity: _loaded ? 0 : 1 }}
                    aria-hidden="true"
                />
            ) : null}

            {/* Main image */}
            <img
                onLoad={() => _setLoaded(true)}
                alt={alt}
                className={`${css[`${name}__element`]}`}
                loading={'lazy'}
                src={src}
                style={{ opacity: _loaded ? 1 : 0 }}
            />
        </div>
    )
}

export const UiImage = memo(UiImageComponent)
