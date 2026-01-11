/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Allowed blocks for content areas
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
 * Default template for initial content
 */
const TEMPLATE = [
	[ 'core/heading', { level: 3, placeholder: __( 'Title...', 'shm-blocks' ) } ],
];

/**
 * Edit component for Poster Default Content block
 *
 * @param {Object} props Block props
 * @return {JSX.Element} Block edit component
 */
export default function Edit( props ) {
	const blockProps = useBlockProps( {
		className: 'shm-poster__content shm-poster__content--default',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
