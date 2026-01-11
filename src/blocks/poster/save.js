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
		focalPoint,
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

	// Overlay content wrapper
	const overlayContent = (
		<span className="shm-poster__overlays">
			<InnerBlocks.Content />
		</span>
	);

	// Render link or non-interactive wrapper based on linkUrl
	const renderWrapper = () => {
		if ( linkUrl ) {
			const linkProps = {
				className: 'shm-poster__link',
				href: linkUrl,
			};

			if ( linkTarget === '_blank' ) {
				linkProps.target = '_blank';
				linkProps.rel = linkRel || 'noopener noreferrer';
			}

			return <a { ...linkProps }>{ overlayContent }</a>;
		}

		// No link - use non-interactive div wrapper
		return (
			<div className="shm-poster__link" data-no-link="true">
				{ overlayContent }
			</div>
		);
	};

	// Image styles - inline to ensure they work even if CSS fails to load
	const imageStyles = {
		position: 'absolute',
		inset: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: `${ ( focalPoint?.x ?? 0.5 ) * 100 }% ${ ( focalPoint?.y ?? 0.5 ) * 100 }%`,
	};

	return (
		<div { ...blockProps }>
			{ mediaUrl && (
				<img
					className="shm-poster__image"
					src={ mediaUrl }
					alt={ imageAlt || '' }
					loading="lazy"
					style={ imageStyles }
				/>
			) }
			{ renderWrapper() }
		</div>
	);
}
