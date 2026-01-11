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

/**
 * Animation type options for overlay
 */
export const ANIMATION_TYPES = [
	{ label: __( 'Slide', 'shm-blocks' ), value: 'slide' },
	{ label: __( 'Fade', 'shm-blocks' ), value: 'fade' },
	{ label: __( 'Scale', 'shm-blocks' ), value: 'scale' },
	{ label: __( 'Blur', 'shm-blocks' ), value: 'blur' },
	{ label: __( 'Slide & Fade', 'shm-blocks' ), value: 'slide-fade' },
];

/**
 * Animation type options for content elements
 */
export const CONTENT_ANIMATION_TYPES = [
	{ label: __( 'Fade Up', 'shm-blocks' ), value: 'fade-up' },
	{ label: __( 'Fade', 'shm-blocks' ), value: 'fade' },
	{ label: __( 'Scale', 'shm-blocks' ), value: 'scale' },
	{ label: __( 'Stagger', 'shm-blocks' ), value: 'stagger' },
];

/**
 * Easing function options
 */
export const EASING_OPTIONS = [
	{ label: __( 'Ease', 'shm-blocks' ), value: 'ease' },
	{ label: __( 'Ease In', 'shm-blocks' ), value: 'ease-in' },
	{ label: __( 'Ease Out', 'shm-blocks' ), value: 'ease-out' },
	{ label: __( 'Ease In Out', 'shm-blocks' ), value: 'ease-in-out' },
	{ label: __( 'Linear', 'shm-blocks' ), value: 'linear' },
];

/**
 * Overlay position options
 */
export const POSITION_OPTIONS = [
	{ label: __( 'Bottom', 'shm-blocks' ), value: 'bottom' },
	{ label: __( 'Top', 'shm-blocks' ), value: 'top' },
];

/**
 * Aspect ratio options
 */
export const ASPECT_RATIO_OPTIONS = [
	{ label: __( 'None', 'shm-blocks' ), value: '' },
	{ label: '16:9', value: '16/9' },
	{ label: '4:3', value: '4/3' },
	{ label: '1:1', value: '1/1' },
	{ label: '3:4', value: '3/4' },
	{ label: '9:16', value: '9/16' },
];
