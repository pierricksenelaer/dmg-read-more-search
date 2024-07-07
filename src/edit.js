/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { Button, Panel, PanelBody, TextControl, Spinner } from '@wordpress/components';

const Edit = ( props ) => {
    const {
        attributes: { title, mediaID, mediaURL, blurb, theme_color },
        setAttributes,
    } = props;

    const blockProps = useBlockProps();

    const onChangeTitle = ( value ) => {
        setAttributes( { title: value } );
    };

    const onSelectImage = ( media ) => {
        setAttributes( {
            mediaURL: media.url,
            mediaID: media.id,
        } );
    };

    const onChangeBlurb = ( value ) => {
        setAttributes( { blurb: value } );
    };

    const onChangeCta = ( value ) => {
        setAttributes( { cta: value } );
    };

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
