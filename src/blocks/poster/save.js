/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Helper to convert hex to RGB values
 *
 * @param {string} hex Hex color value
 * @return {Object} RGB values
 */
function hexToRgb( hex ) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result
		? {
				r: parseInt( result[ 1 ], 16 ),
				g: parseInt( result[ 2 ], 16 ),
				b: parseInt( result[ 3 ], 16 ),
		  }
		: { r: 0, g: 0, b: 0 };
}

/**
 * Save component for Poster block
 *
 * @param {Object} props Block props
 * @return {JSX.Element} Block save component
 */
export default function save( { attributes } ) {
	const {
		mediaUrl,
		focalPoint,
		imageAlt,
		linkUrl,
		linkTarget,
		linkRel,
		overlayColor,
		overlayPosition,
		overlayOpacity,
		overlayOpacityHover,
		overlayHeight,
		overlayHeightHover,
		animationType,
		contentAnimationType,
		transitionDuration,
		contentAnimationDelay,
		transitionEasing,
		minHeight,
		aspectRatio,
	} = attributes;

	// Convert hex color to RGB for CSS custom properties
	const rgb = hexToRgb( overlayColor );
	const overlayColorRgb = `${ rgb.r }, ${ rgb.g }, ${ rgb.b }`;

	// Build CSS custom properties
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
		'--poster-focal-x': `${ focalPoint.x * 100 }%`,
		'--poster-focal-y': `${ focalPoint.y * 100 }%`,
	};

	if ( aspectRatio ) {
		customStyles[ '--poster-aspect-ratio' ] = aspectRatio;
	}

	// Build class names
	const classNames = [
		`wp-block-shm-poster--animation-${ animationType }`,
		`wp-block-shm-poster--content-${ contentAnimationType }`,
		`wp-block-shm-poster--position-${ overlayPosition }`,
	].join( ' ' );

	const blockProps = useBlockProps.save( {
		className: classNames,
		style: customStyles,
	} );

	// Determine link attributes
	const linkProps = {
		className: 'shm-poster__link',
		href: linkUrl || '#',
	};

	if ( linkTarget === '_blank' ) {
		linkProps.target = '_blank';
		linkProps.rel = linkRel || 'noopener noreferrer';
	}

	// If no link URL, we still wrap in an anchor for consistent click handling
	// but prevent navigation
	if ( ! linkUrl ) {
		linkProps[ 'data-no-link' ] = 'true';
	}

	return (
		<div { ...blockProps }>
			{ mediaUrl && (
				<img
					className="shm-poster__image"
					src={ mediaUrl }
					alt={ imageAlt }
					loading="lazy"
				/>
			) }
			<a { ...linkProps }>
				<span className="shm-poster__overlays">
					<InnerBlocks.Content />
				</span>
			</a>
		</div>
	);
}
