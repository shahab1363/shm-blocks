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
 * @package shm-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register all blocks in the plugin.
 *
 * @return void
 */
function shm_blocks_init() {
	$blocks_dir = __DIR__ . '/build/blocks';
	$blocks     = array( 'poster', 'poster-content-default', 'poster-content-hover' );

	foreach ( $blocks as $block ) {
		$block_path = $blocks_dir . '/' . $block;

		if ( ! file_exists( $block_path . '/block.json' ) ) {
			continue;
		}

		$result = register_block_type( $block_path );

		if ( false === $result && WP_DEBUG ) {
			// translators: %s: Block name.
			$message = sprintf( __( 'SHM Blocks: Failed to register block "%s".', 'shm-blocks' ), $block );
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log( '[SHM Blocks] ' . $message );
		}
	}
}
add_action( 'init', 'shm_blocks_init' );

/**
 * Register the block category for SHM blocks.
 *
 * @param array $categories Array of block categories.
 * @return array Modified array of block categories.
 */
function shm_blocks_register_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'shm-blocks',
				'title' => __( 'SHM Blocks', 'shm-blocks' ),
				'icon'  => 'layout',
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'shm_blocks_register_category' );
