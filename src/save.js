/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

const Save = ( props ) => {
  const {
    attributes: { theme_color, postTitle, postLink },
  } = props;

  if (!postLink) return null;

  const blockProps = useBlockProps.save();
  
  return (
    <div { ...blockProps }>
      <p className="dmg-read-more">
        <a 
          href={postLink}
          style={ {
            color: `${theme_color}`
          } }
        >
          {__('Read More: ', 'dmg')}{postTitle}
        </a>
      </p>
    </div>
  );
};

export default Save;
