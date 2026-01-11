<?php
/**
 * Plugin Name:       SHM Blocks
 * Description:       Custom WordPress Gutenberg blocks including the Poster block with hover effects.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.7
 * Author:            SHM
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       shm-blocks
 *
 * @package shm-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Store failed block registrations for admin notice.
 *
 * @var array
 */
global $shm_blocks_registration_errors;
$shm_blocks_registration_errors = array();

/**
 * Register all blocks in the plugin.
 *
 * @return void
 */
function shm_blocks_init() {
	global $shm_blocks_registration_errors;

	$blocks_dir = __DIR__ . '/build/blocks';
	$blocks     = array( 'poster', 'poster-content-default', 'poster-content-hover' );

	foreach ( $blocks as $block ) {
		$block_path = $blocks_dir . '/' . $block;

		if ( ! file_exists( $block_path . '/block.json' ) ) {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log(
				sprintf(
					'[SHM Blocks] block.json not found for block "%s" at path: %s',
					$block,
					$block_path
				)
			);
			$shm_blocks_registration_errors[] = $block;
			continue;
		}

		$result = register_block_type( $block_path );

		if ( false === $result ) {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log(
				sprintf(
					'[SHM Blocks] Failed to register block "%s".',
					$block
				)
			);
			$shm_blocks_registration_errors[] = $block;
		}
	}
}
add_action( 'init', 'shm_blocks_init' );

/**
 * Display admin notice if block registration failed.
 *
 * @return void
 */
function shm_blocks_admin_notice() {
	global $shm_blocks_registration_errors;

	if ( empty( $shm_blocks_registration_errors ) ) {
		return;
	}

	// Only show to administrators who can manage plugins.
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return;
	}

	$failed_blocks = implode( ', ', $shm_blocks_registration_errors );
	?>
	<div class="notice notice-error">
		<p>
			<?php
			printf(
				/* translators: %s: List of failed block names */
				esc_html__( 'SHM Blocks: Failed to register the following blocks: %s. Please ensure the plugin is built correctly (run npm run build).', 'shm-blocks' ),
				esc_html( $failed_blocks )
			);
			?>
		</p>
	</div>
	<?php
}
add_action( 'admin_notices', 'shm_blocks_admin_notice' );

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
