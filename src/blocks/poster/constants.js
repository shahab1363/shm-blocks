/**
 * Shared constants for Poster blocks
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Allowed blocks for content child blocks
 */
export const ALLOWED_CONTENT_BLOCKS = [
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
 * Default template for default state content
 */
export const DEFAULT_CONTENT_TEMPLATE = [
	[
		'core/heading',
		{ level: 3, placeholder: __( 'Title\u2026', 'shm-blocks' ) },
	],
];

/**
 * Default template for hover state content
 */
export const HOVER_CONTENT_TEMPLATE = [
	[
		'core/heading',
		{ level: 3, placeholder: __( 'Title\u2026', 'shm-blocks' ) },
	],
	[
		'core/paragraph',
		{ placeholder: __( 'Summary text\u2026', 'shm-blocks' ) },
	],
];
