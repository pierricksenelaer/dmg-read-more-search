/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
  const {
    attributes: { tag, title, mediaID, mediaURL, blurb, theme_color },
  } = props;

  const blockProps = useBlockProps.save();
  
  return (
    <div { ...blockProps }>

        <RichText.Content 
          tagName="h3"
          className="block-heading" 
          value={ title }
          style={ {
            color: `${theme_color}`
          } }
        />

        <RichText.Content
          tagName="p"
          className="block-blurb"
          value={ blurb }
        />
              
        { mediaURL && (
          <img
            alt=""
            loading="lazy"
            src={ mediaURL }
            sizes={ [
              "(min-width: 1536px) calc((1536px - 2 * 1.5rem) * 1 / 2)",
              "(min-width: 1280px) calc((1280px - 2 * 1.5rem) * 1 / 2)",
              "(min-width: 1024px) calc((1024px - 2 * 1.5rem) * 1 / 2)",
              "(min-width: 768px) calc((768px - 2 * 1.5rem) * 1 / 2)",
              "(min-width: 640px) calc(100vw - 2 * 1.5rem)",
              "100vw",
            ].join(', ') }
            className={ `wp-image-${mediaID} object-cover w-full h-full` }
          />
        ) }
        
    </div>
  );
};

export default Save;
