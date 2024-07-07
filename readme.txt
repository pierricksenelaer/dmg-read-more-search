# DMG: Read More & Search

## THE BRIEF
Write a Gutenberg block using native WP React tools (no ACF or other plugin dependencies). This block should allow editors to search for and then choose a published post to insert into the editor as a stylized anchor link.

Editors should be able to search posts in the InspectorControls using a search string. It should paginate results. It should support searching for a specific post ID. Recent posts should be shown to choose from by default.

The anchor text should be the post title and the anchor href should be the post permalink. The anchor should be output within a paragraph element with a CSS class of `dmg-read-more` added to it. The anchor should be prepended with the words `Read More: `.

Choosing a new post should update the anchor link shown in the editor.

**EXTRA**: 

Editors can also apply a colour to the hyperlink 


## THE DETAILS

Contributors:      Pierrick Senelaer
Tags:              block
Tested up to:      6.0
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

## INSTALLATION

1. Upload the plugin files to the `/wp-content/plugins/dmg-read-more-research` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

## LIVE DEMO

You can view this plugin in action from the following demo site
https://www.pierrick-senelaer.com/dev/wp-playground/dmg-media/