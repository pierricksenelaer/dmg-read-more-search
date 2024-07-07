/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { Button, Panel, PanelBody, TextControl, Spinner } from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const Edit = ( props ) => {
    const {
        attributes: { theme_color, postId, postTitle, postLink },
        setAttributes,
    } = props;

    const blockProps = useBlockProps();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      if (searchTerm) {
        // Check if the search term is a number to search by post ID
        const path = isNaN(searchTerm)
          ? `/wp/v2/posts?search=${searchTerm}&per_page=5`
          : `/wp/v2/posts?include[]=${searchTerm}`;
          apiFetch({ path }).then(posts => {
            setSearchResults(posts);
            setLoading(false);
          });
      } else {
          apiFetch({ path: '/wp/v2/posts?per_page=5' }).then(posts => {
              setSearchResults(posts);
              setLoading(false);
          });
      }
    }, [searchTerm]);
    
    const onChangeThemeColor = ( themeColor ) => {
      setAttributes( { theme_color: themeColor } );
    };
    
    return (
        <div { ...blockProps }>
          
          <InspectorControls>
            <Panel>
              <PanelBody title="Header color">
                <fieldset>
                  <legend
                    className="">
                    { __( 'Pls select', 'gutenberg-block-master' ) }
                  </legend>
                  <ColorPalette 
                    value={ theme_color }
                    onChange={ onChangeThemeColor }
                  />
                </fieldset>
              </PanelBody>
            </Panel>
          </InspectorControls>

          <PanelBody title={ __( 'CONTENT' ) }>
            <div>
              <div>
                <MediaUpload
                  onSelect={onSelectImage}
                  type="image"
                  value={ mediaID }
                  render={ ( { open } ) => (
                    <Button
                      className={
                        mediaID ? 'image-button' : 'button button-large'
                      }
                      onClick={ open }
                    >

                      { ! mediaID ? (
                        __( 'Upload Image', 'gutenberg-block-master' )
                      ) : (
                        <img
                          src={ mediaURL }
                          alt={ __(
                            'Upload Image',
                            'gutenberg-block-master'
                          ) }
                        />
                      ) }
                    </Button>
                  ) }
                />
              </div>

              <div>

                <RichText
                  tagName="h3"
                  className="block-heading"
                  placeholder={ __(
                    'Add Jumpoff Headline',
                    'gutenberg-block-master'
                  ) }
                  value={ title }
                  onChange={ onChangeTitle }
                />

                <RichText
                  tagName="p"
                  className="block-blurb"
                  placeholder={ __(
                    'Add Blurb',
                    'gutenberg-block-master'
                  ) }
                  value={ blurb }
                  onChange={ onChangeBlurb }
                />

              </div>
            </div>
          </PanelBody>

        </div>
    );
};

export default Edit;
