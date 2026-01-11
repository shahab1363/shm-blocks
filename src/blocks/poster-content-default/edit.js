/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	ALLOWED_CONTENT_BLOCKS,
	DEFAULT_CONTENT_TEMPLATE,
} from '../poster/constants';

/**
 * Edit component for Poster Default Content block
 *
 * @return {JSX.Element} Block edit component
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'shm-poster__content shm-poster__content--default',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_CONTENT_BLOCKS }
				template={ DEFAULT_CONTENT_TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
