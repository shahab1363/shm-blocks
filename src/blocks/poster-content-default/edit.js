/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

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
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @return {JSX.Element} Block edit component
 */
export default function Edit( { attributes, setAttributes } ) {
	const { textAlign } = attributes;

	const blockProps = useBlockProps( {
		className: 'shm-poster__content shm-poster__content--default',
		style: {
			textAlign,
		},
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) =>
						setAttributes( { textAlign: value } )
					}
				/>
			</BlockControls>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_CONTENT_BLOCKS }
					template={ DEFAULT_CONTENT_TEMPLATE }
					templateLock={ false }
				/>
			</div>
		</>
	);
}
