/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import save from './save';

/**
 * Block icon
 */
const icon = (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 17h10v-2H7v2zm0-4h10v-2H7v2z" />
	</svg>
);

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save,
} );
