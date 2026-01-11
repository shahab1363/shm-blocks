/**
 * Shared utilities for Poster block
 */

/**
 * Parse a hex color string to RGB values.
 * Supports 3-digit and 6-digit hex formats.
 *
 * @param {string} hex Hex color string (e.g., "#ff0000" or "#f00")
 * @return {{ r: number, g: number, b: number }} RGB values
 */
function hexToRgb( hex ) {
	const sanitized = ( hex || '#000000' ).replace( '#', '' );

	// Handle 3-digit hex
	if ( sanitized.length === 3 ) {
		return {
			r: parseInt( sanitized[ 0 ] + sanitized[ 0 ], 16 ),
			g: parseInt( sanitized[ 1 ] + sanitized[ 1 ], 16 ),
			b: parseInt( sanitized[ 2 ] + sanitized[ 2 ], 16 ),
		};
	}

	// Handle 6-digit hex
	return {
		r: parseInt( sanitized.substring( 0, 2 ), 16 ) || 0,
		g: parseInt( sanitized.substring( 2, 4 ), 16 ) || 0,
		b: parseInt( sanitized.substring( 4, 6 ), 16 ) || 0,
	};
}

/**
 * Build CSS custom properties object for poster block
 *
 * @param {Object} attributes Block attributes
 * @return {Object} CSS custom properties object
 */
export function buildCustomStyles( attributes ) {
	const {
		overlayColor,
		overlayOpacity,
		overlayOpacityHover,
		overlayHeight,
		overlayHeightHover,
		transitionDuration,
		transitionEasing,
		contentAnimationDelay,
		minHeight,
		focalPoint,
		aspectRatio,
	} = attributes;

	const rgb = hexToRgb( overlayColor );
	const overlayColorRgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;

	const focalX = focalPoint?.x ?? 0.5;
	const focalY = focalPoint?.y ?? 0.5;

	const customStyles = {
		'--poster-overlay-color': overlayColor,
		'--poster-overlay-color-rgb': overlayColorRgb,
		'--poster-overlay-opacity': overlayOpacity / 100,
		'--poster-overlay-opacity-hover': overlayOpacityHover / 100,
		'--poster-overlay-height': overlayHeight,
		'--poster-overlay-height-hover': overlayHeightHover,
		'--poster-transition-duration': `${ transitionDuration }ms`,
		'--poster-transition-easing': transitionEasing,
		'--poster-content-delay': `${ contentAnimationDelay }ms`,
		'--poster-min-height': minHeight,
		'--poster-focal-x': `${ focalX * 100 }%`,
		'--poster-focal-y': `${ focalY * 100 }%`,
	};

	if ( aspectRatio ) {
		customStyles[ '--poster-aspect-ratio' ] = aspectRatio;
	}

	return customStyles;
}
