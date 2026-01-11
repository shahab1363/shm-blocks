/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for Poster Hover Content block
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Block save component
 */
export default function save( { attributes } ) {
	const { textAlign } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'shm-poster__content shm-poster__content--hover',
		style: {
			textAlign,
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
