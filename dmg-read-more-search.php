<?php
/**
 * Plugin Name:       DMG Read More Search
 * Description:       Choose a published post to insert into the editor as a stylized anchor link
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Pierrick Senelaer
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dmg-read-more-search
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_dmg_read_more_search_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_dmg_read_more_search_block_init' );
