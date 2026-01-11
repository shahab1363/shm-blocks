/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Styles
 */
import './style.scss';
import './editor.scss';

/**
 * Poster block icon
 */
const icon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
	>
		<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h5v-2h-5v2zm-5-4h10v-2H7v2zm0-4h10V7H7v2z" />
	</svg>
);

/**
 * Register the block
 */
registerBlockType( metadata.name, {
	...metadata,
	icon,
	edit: Edit,
	save,
} );
