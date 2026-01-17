/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for Poster Hover Content block
 *
 * @return {JSX.Element} Block save component
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'wp-block-shm-poster-hover-content',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
