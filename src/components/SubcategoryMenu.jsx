import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css'; // Reuse styles

/**
 * SubcategoryMenu displays subcategories in the facet diagram style (like CategoryPage)
 * @param {Array} subcategories - Array of subcategory objects ({id, name, slug, image})
 * @param {Array} articles - Array of article objects (with subcategory field)
 */
export default function SubcategoryMenu({ subcategories = [], articles = [] }) {
  if (!subcategories.length) return null;
  return (
    <section className="subcategory-facets-root">
      <div className="subcategory-facets-diagram-multiline">
        {Array.from({ length: Math.ceil(subcategories.length / 5) }).map((_, rowIdx) => (
          <div className="subcategory-facets-row" key={rowIdx}>
            {subcategories.slice(rowIdx * 5, rowIdx * 5 + 5).map((subcat, idx) => {
              const subcatArticles = articles.filter(
                a => a.subcategory === subcat.slug || a.subcategory === subcat.name
              );
              return (
                <div className="facet-column" key={subcat.id}>
                  <div className="facet-parent">
                    <span>{subcat.name}</span>
                  </div>
                  <div className="facet-children">
                    {subcatArticles.map((item, i) => (
                      item.link ? (
                        <a
                          href={item.link}
                          className="facet-child facet-child-link"
                          key={i}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.title || item.name}
                        </a>
                      ) : (
                        <div className="facet-child" key={i}>
                          {item.title || item.name}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
