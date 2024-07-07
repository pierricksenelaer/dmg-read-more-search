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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      setLoading(true);
      const perPage = searchTerm ? 3 : 5;  // 3 for search, 5 for recent posts
      const path = searchTerm
          ? isNaN(searchTerm)
              ? `/wp/v2/posts?search=${searchTerm}&per_page=${perPage}&page=${currentPage}`
              : `/wp/v2/posts?include[]=${searchTerm}`
          : `/wp/v2/posts?per_page=${perPage}`;

      apiFetch({ path }).then(posts => {
        setSearchResults(posts);
        setLoading(false);
        if (searchTerm && !isNaN(searchTerm)) {
          setTotalPages(1);  // Single result for specific post ID
        } else if (searchTerm) {
        // Perform an additional request to get the total count of posts
          apiFetch({ path: `/wp/v2/posts?search=${searchTerm}` }).then(allPosts => {
            setTotalPages(Math.ceil(allPosts.length / perPage));
          });
        } else {
          setTotalPages(1);  // No pagination for recent posts
        }
      }).catch(() => {
          setLoading(false);
      });
    }, [searchTerm, currentPage]);

    const selectPost = (post) => {
      setAttributes({
          postId: post.id,
          postTitle: post.title.rendered,
          postLink: post.link,
      });
    };

    const onChangeThemeColor = ( themeColor ) => {
      setAttributes( { theme_color: themeColor } );
    };

    const goToNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
      }
    };

    const goToPreviousPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
    };
    
    return (
        <div { ...blockProps }>
          
          <InspectorControls>
            <Panel>
              <PanelBody title={__('Post Selection', 'dmg-read-more-search')}>
                <TextControl
                  label={__('Search Posts', 'dmg-read-more-search')}
                  placeholder={__('Post ID or keyword', 'dmg-read-more-search')}
                  value={searchTerm}
                  onChange={(value) => {
                    setSearchTerm(value);
                    setCurrentPage(1);  // Reset to first page on new search
                  }}
                />
                {loading && <Spinner />}
                {searchResults.length > 0 && (
                  <ul className="search-results">
                    {searchResults.map(post => (
                      <li key={post.id}>
                        <Button
                          onClick={() => selectPost(post)}
                        >
                         {post.title.rendered}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
                {searchTerm && totalPages > 1 && (
                  <div className="search-pagination">
                    <Button
                      disabled={currentPage === 1}
                      onClick={goToPreviousPage}
                    >
                      {__('Previous', 'dmg')}
                    </Button>
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={goToNextPage}
                    >
                      {__('Next', 'dmg')}
                    </Button>
                    <p className="pagination__pages">{__('Page', 'dmg')} {currentPage} {__('of', 'dmg')} {totalPages}</p>
                  </div>
                )}
                
              </PanelBody>

              <PanelBody title="Link color">
                <fieldset>
                  <legend
                    className="">
                    { __( 'Pls select', 'dmg-read-more-search' ) }
                  </legend>
                  <ColorPalette 
                    value={ theme_color }
                    onChange={ onChangeThemeColor }
                  />
                </fieldset>
              </PanelBody>
            </Panel>
          </InspectorControls>

          <PanelBody title={ __( 'LINK' ) }>
          <div>
            {postId ? (
              <p className="dmg-read-more">
                <a href={postLink}>
                  {__('Read More: ', 'dmg')}{postTitle}
                </a>
              </p>
            ) : (
              <p>{__('No post selected', 'dmg')}</p>
            )}
          </div>
        </PanelBody>

        </div>
    );
};

export default Edit;
