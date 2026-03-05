import { useEffect, useState } from 'react'
import css from './ui-icon.module.scss'
import { Fragment } from 'react/jsx-runtime'
import type { TUiIconProps } from './ui-icon.definitions'

function UiIcon({
    className = '',
    style = {},
    type = 'text',
    value,
}: TUiIconProps) {
    // #region - Variables
    /**
     * The name of the component used for styling and identification in the DOM inspector.
     */
    const name = `UiIcon`
    // #endregion

    // #region - States
    /**
     * Stores the HTML content of the loaded SVG element.
     */
    const [_svgContent, _setSvgContent] = useState<SVGSVGElement | null>(null)
    // #endregion

    // #region - Methods
    /**
     * Loads an image and transforms it into an inline SVG.
     */
    const loadSVG = async () => {
        if (!value || typeof value !== 'string') return

        try {
            const response = await fetch(value)
            const text = await response.text()
            const parser = new DOMParser()
            const doc = parser.parseFromString(text, 'image/svg+xml')
            const svg = doc.querySelector('svg')
            if (svg) {
                svg.removeAttribute('xmlns:a')
                _setSvgContent(svg)
            }
        } catch (err) {
            console.error('Failed to load SVG:', err)
        }
    }
    // #endregion

    // #region - Effects
    /**
     * Load the image as an SVG if the component type is set to `svg`.
     */
    useEffect(() => {
        if (type === 'svg') loadSVG()
    }, [type, value])
    // #endregion

    // #region - Markup
    return (
        <span
            className={`
                ${css[name]}
                ${css[`${name}--type-${type}`]}
                ${className}
            `}
            style={style}
        >
            {type === 'text' ? (
                <Fragment>{value}</Fragment>
            ) : (
                <span
                    className={`${css[`${name}__element`]}`}
                    dangerouslySetInnerHTML={{
                        __html: _svgContent?.outerHTML ?? '',
                    }}
                ></span>
            )}
        </span>
    )
    // #endregion
}

export { UiIcon }
