/**
 * Shared utilities for Poster block
 */

/**
 * Helper to convert hex to RGB values
 * Supports 3-digit and 6-digit hex colors
 *
 * @param {string} hex Hex color value
 * @return {Object} RGB values
 */
export function hexToRgb( hex ) {
	if ( ! hex || typeof hex !== 'string' ) {
		// eslint-disable-next-line no-console
		console.warn(
			`[SHM Poster] Invalid hex color: "${ hex }". Using black.`
		);
		return { r: 0, g: 0, b: 0 };
	}

	// Try 6-digit hex first
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	if ( result ) {
		return {
			r: parseInt( result[ 1 ], 16 ),
			g: parseInt( result[ 2 ], 16 ),
			b: parseInt( result[ 3 ], 16 ),
		};
	}

	// Try 3-digit hex
	result = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec( hex );
	if ( result ) {
		return {
			r: parseInt( result[ 1 ] + result[ 1 ], 16 ),
			g: parseInt( result[ 2 ] + result[ 2 ], 16 ),
			b: parseInt( result[ 3 ] + result[ 3 ], 16 ),
		};
	}

	// eslint-disable-next-line no-console
	console.warn( `[SHM Poster] Invalid hex color: "${ hex }". Using black.` );
	return { r: 0, g: 0, b: 0 };
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

	// Convert hex color to RGB for CSS custom properties
	const rgb = hexToRgb( overlayColor );
	const overlayColorRgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;

	// Safe access to focalPoint with fallback
	const safeFocalPoint = focalPoint || { x: 0.5, y: 0.5 };
	const focalX = safeFocalPoint.x ?? 0.5;
	const focalY = safeFocalPoint.y ?? 0.5;

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
