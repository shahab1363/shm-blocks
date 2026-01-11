/**
 * Shared utilities for Poster block
 */

/**
 * Check if we're in development mode.
 */
const IS_DEV =
	typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

/**
 * Log a warning in development mode only.
 *
 * @param {string} message Warning message
 */
function devWarn( message ) {
	if ( IS_DEV ) {
		// eslint-disable-next-line no-console
		console.warn( `[SHM Blocks] ${ message }` );
	}
}

/**
 * Valid CSS units for measurement values.
 */
const VALID_CSS_UNITS = /^-?[\d.]+(%|px|em|rem|vh|vw|vmin|vmax|ch|ex)$/;

/**
 * Valid CSS easing functions.
 */
const VALID_EASINGS = [
	'ease',
	'ease-in',
	'ease-out',
	'ease-in-out',
	'linear',
];

/**
 * Valid aspect ratio format (e.g., "16/9", "4/3").
 */
const VALID_ASPECT_RATIO = /^\d+\/\d+$/;

/**
 * Valid color formats: hex (3 or 6 digit) or rgb/rgba.
 */
const VALID_COLOR =
	/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$|^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/;

/**
 * Validate and sanitize a CSS measurement value.
 *
 * @param {string} value    The CSS value to validate
 * @param {string} fallback Fallback value if invalid
 * @return {string} Validated CSS value or fallback
 */
function sanitizeCSSValue( value, fallback ) {
	if ( ! value || typeof value !== 'string' ) {
		return fallback;
	}

	const trimmed = value.trim();

	if ( VALID_CSS_UNITS.test( trimmed ) ) {
		return trimmed;
	}

	if ( trimmed === 'auto' || trimmed === 'unset' ) {
		return trimmed;
	}

	devWarn(
		`Invalid CSS value "${ value }", using fallback "${ fallback }".`
	);
	return fallback;
}

/**
 * Validate a numeric value, returning fallback if invalid.
 *
 * @param {*}      value    The value to validate
 * @param {number} fallback Fallback value if invalid
 * @return {number} Validated number or fallback
 */
function safeNumber( value, fallback ) {
	return typeof value === 'number' && isFinite( value ) ? value : fallback;
}

/**
 * Parse a hex color string to RGB values.
 * Supports 3-digit and 6-digit hex formats, as well as rgb()/rgba() formats.
 *
 * @param {string} hex Hex color string (e.g., "#ff0000" or "#f00")
 * @return {{ r: number, g: number, b: number }} RGB values
 */
function hexToRgb( hex ) {
	const defaultColor = { r: 0, g: 0, b: 0 };

	if ( ! hex || typeof hex !== 'string' ) {
		return defaultColor;
	}

	// Handle rgb()/rgba() format that ColorPicker might return
	const rgbaMatch = hex.match( /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/ );
	if ( rgbaMatch ) {
		return {
			r: parseInt( rgbaMatch[ 1 ], 10 ),
			g: parseInt( rgbaMatch[ 2 ], 10 ),
			b: parseInt( rgbaMatch[ 3 ], 10 ),
		};
	}

	const sanitized = hex.replace( '#', '' );

	// Validate hex format (3 or 6 characters, valid hex chars only)
	if ( ! /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test( sanitized ) ) {
		return defaultColor;
	}

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
		r: parseInt( sanitized.substring( 0, 2 ), 16 ),
		g: parseInt( sanitized.substring( 2, 4 ), 16 ),
		b: parseInt( sanitized.substring( 4, 6 ), 16 ),
	};
}

/**
 * Build CSS custom properties object for poster block
 *
 * @param {Object} attributes Block attributes
 * @return {Object} CSS custom properties object
 */
export function buildCustomStyles( attributes ) {
	if ( ! attributes || typeof attributes !== 'object' ) {
		return {};
	}

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

	// Validate color format before use
	let safeOverlayColor = '#000000';
	if ( overlayColor && VALID_COLOR.test( overlayColor ) ) {
		safeOverlayColor = overlayColor;
	} else if ( overlayColor ) {
		devWarn(
			`Invalid color format "${ overlayColor }", using fallback "#000000".`
		);
	}

	const rgb = hexToRgb( safeOverlayColor );
	const overlayColorRgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;

	// Validate numeric values with sensible defaults
	const safeOpacity = safeNumber( overlayOpacity, 60 ) / 100;
	const safeOpacityHover = safeNumber( overlayOpacityHover, 80 ) / 100;
	const safeDuration = safeNumber( transitionDuration, 400 );
	const safeDelay = safeNumber( contentAnimationDelay, 100 );

	// Validate easing against allowed values
	let safeEasing = 'ease-in-out';
	if ( VALID_EASINGS.includes( transitionEasing ) ) {
		safeEasing = transitionEasing;
	} else if ( transitionEasing ) {
		devWarn(
			`Invalid easing "${ transitionEasing }", using fallback "ease-in-out".`
		);
	}

	// Validate focalPoint values
	const focalX = safeNumber( focalPoint?.x, 0.5 );
	const focalY = safeNumber( focalPoint?.y, 0.5 );

	const customStyles = {
		'--poster-overlay-color': safeOverlayColor,
		'--poster-overlay-color-rgb': overlayColorRgb,
		'--poster-overlay-opacity': safeOpacity,
		'--poster-overlay-opacity-hover': safeOpacityHover,
		'--poster-overlay-height': sanitizeCSSValue( overlayHeight, '30%' ),
		'--poster-overlay-height-hover': sanitizeCSSValue(
			overlayHeightHover,
			'100%'
		),
		'--poster-transition-duration': `${ safeDuration }ms`,
		'--poster-transition-easing': safeEasing,
		'--poster-content-delay': `${ safeDelay }ms`,
		'--poster-min-height': sanitizeCSSValue( minHeight, '400px' ),
		'--poster-focal-x': `${ focalX * 100 }%`,
		'--poster-focal-y': `${ focalY * 100 }%`,
	};

	if ( aspectRatio && VALID_ASPECT_RATIO.test( aspectRatio ) ) {
		customStyles[ '--poster-aspect-ratio' ] = aspectRatio;
	}

	return customStyles;
}
