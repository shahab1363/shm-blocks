<?php
/**
 * Plugin Name:       SHM Blocks
 * Description:       Custom WordPress Gutenberg blocks including the Poster block with hover effects.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            SHM
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       shm-blocks
 *
 * @package           shm-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers all blocks in the plugin.
 *
 * @return void
 */
function shm_blocks_init() {
	// Register the main poster block
	register_block_type( __DIR__ . '/build/blocks/poster' );

	// Register child blocks
	register_block_type( __DIR__ . '/build/blocks/poster-content-default' );
	register_block_type( __DIR__ . '/build/blocks/poster-content-hover' );
}
add_action( 'init', 'shm_blocks_init' );

/**
 * Registers the block category for SHM blocks.
 *
 * @param array $categories Array of block categories.
 * @return array Modified array of block categories.
 */
function shm_blocks_register_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'shm-blocks',
				'title' => __( 'SHM Blocks', 'shm-blocks' ),
				'icon'  => 'layout',
			),
		)
	);
}
add_filter( 'block_categories_all', 'shm_blocks_register_category', 10, 1 );
