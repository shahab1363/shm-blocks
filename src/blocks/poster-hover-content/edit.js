/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Allowed blocks inside hover content
 */
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/buttons',
	'core/button',
	'core/list',
	'core/separator',
	'core/spacer',
	'core/group',
];

/**
 * Default template
 */
const TEMPLATE = [
	[
		'core/paragraph',
		{ placeholder: __( 'Add hover content\u2026', 'shm-blocks' ) },
	],
];

/**
 * Edit component for Poster Hover Content block
 *
 * @return {JSX.Element} Block edit component
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'wp-block-shm-poster-hover-content',
	} );

	return (
		<div { ...blockProps }>
			<div className="wp-block-shm-poster-hover-content__label">
				{ __( 'Hover Content', 'shm-blocks' ) }
			</div>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
