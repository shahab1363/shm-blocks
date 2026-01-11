/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	ALLOWED_CONTENT_BLOCKS,
	HOVER_CONTENT_TEMPLATE,
} from '../poster/constants';

/**
 * Edit component for Poster Hover Content block
 *
 * @return {JSX.Element} Block edit component
 */
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'shm-poster__content shm-poster__content--hover',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_CONTENT_BLOCKS }
				template={ HOVER_CONTENT_TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
