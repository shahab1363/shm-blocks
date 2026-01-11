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
import { ALLOWED_CONTENT_BLOCKS } from '../constants.js';

/**
 * Shared Edit component for Poster Content blocks
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @param {string}   props.variant       Content variant ('default' or 'hover').
 * @param {Array}    props.template      InnerBlocks template.
 * @return {JSX.Element} Block edit component.
 */
export default function ContentEdit( {
	attributes,
	setAttributes,
	variant,
	template,
} ) {
	const { textAlign } = attributes;

	const blockProps = useBlockProps( {
		className: `shm-poster__content shm-poster__content--${ variant }`,
		style: { textAlign },
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
					template={ template }
					templateLock={ false }
				/>
			</div>
		</>
	);
}
