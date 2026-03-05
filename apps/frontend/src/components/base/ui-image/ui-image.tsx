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
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiImage`
    // #endregion

    // #region - States
    /**
     * Sets the loading state for the image.
     * This manages the visibility of the main and placeholder images.
     */
    const [_loaded, _setLoaded] = useState(false)
    // #endregion

    // #region - Markup
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
            {/* Placeholder (Blurred Image) */}
            {placeholder ? (
                <img
                    alt={alt}
                    className={`${css[`${name}__placeholder`]}`}
                    src={placeholder}
                    style={{ opacity: _loaded ? 0 : 1 }}
                    aria-hidden="true"
                />
            ) : null}
            {/* ./Placeholder (Blurred Image) */}

            {/* Main Image */}
            <img
                onLoad={() => _setLoaded(true)}
                alt={alt}
                className={`${css[`${name}__element`]}`}
                loading={'lazy'}
                src={src}
                style={{ opacity: _loaded ? 1 : 0 }}
            />
            {/* ./Main Image */}
        </div>
    )
    // #endregion
}

export const UiImage = memo(UiImageComponent)
