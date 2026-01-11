/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Shared Save component for Poster Content blocks
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {string} props.variant    Content variant ('default' or 'hover').
 * @return {JSX.Element} Block save component.
 */
export default function ContentSave( { attributes, variant } ) {
	const { textAlign } = attributes;

	const blockProps = useBlockProps.save( {
		className: `shm-poster__content shm-poster__content--${ variant }`,
		style: { textAlign },
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
