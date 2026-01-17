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
		focalPoint,
	} = attributes;

	// Build CSS custom properties using shared utility
	const customStyles = buildCustomStyles( attributes );

	const classNames = [
		`wp-block-shm-poster--animation-${ animationType }`,
		`wp-block-shm-poster--position-${ overlayPosition }`,
	].join( ' ' );

	const blockProps = useBlockProps.save( {
		className: classNames,
		style: customStyles,
	} );

	const overlayContent = (
		<span className="shm-poster__overlay">
			<InnerBlocks.Content />
		</span>
	);

	const imageStyles = {
		position: 'absolute',
		inset: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		objectPosition: `${ ( focalPoint?.x ?? 0.5 ) * 100 }% ${
			( focalPoint?.y ?? 0.5 ) * 100
		}%`,
	};

	const linkProps = linkUrl
		? {
				className: 'shm-poster__link',
				href: linkUrl,
				...( linkTarget === '_blank' && {
					target: '_blank',
					rel: linkRel || 'noopener noreferrer',
				} ),
		  }
		: { className: 'shm-poster__link', 'data-no-link': 'true' };

	const WrapperTag = linkUrl ? 'a' : 'div';

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
			<WrapperTag { ...linkProps }>{ overlayContent }</WrapperTag>
		</div>
	);
}
