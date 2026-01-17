/**
 * Shared constants for Poster blocks
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Allowed blocks inside inner content areas
 */
export const ALLOWED_INNER_BLOCKS = [
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
 * Allowed blocks for poster content area (includes hover content wrapper)
 */
export const ALLOWED_CONTENT_BLOCKS = [
	...ALLOWED_INNER_BLOCKS,
	'shm/poster-hover-content',
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
