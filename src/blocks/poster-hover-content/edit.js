/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ALLOWED_INNER_BLOCKS } from '../poster/constants';

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
			<InnerBlocks
				allowedBlocks={ ALLOWED_INNER_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
