/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { buildCustomStyles } from './utils';

/**
 * Save component for Poster block
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Block save component
 */
export default function save( { attributes } ) {
	const {
		mediaUrl,
		imageAlt,
		linkUrl,
		linkTarget,
		linkRel,
		overlayPosition,
		animationType,
		contentAnimationType,
	} = attributes;

	// Build CSS custom properties using shared utility
	const customStyles = buildCustomStyles( attributes );

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
