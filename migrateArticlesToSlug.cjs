// migrateArticlesToSlug.cjs
// Run with: node migrateArticlesToSlug.cjs
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

(async () => {
  try {
    // Fetch all categories and subcategories
    const { data: categories } = await supabase.from('categories').select('*');
    const { data: subcategories } = await supabase.from('subcategories').select('*');
    // Fetch all articles
    const { data: articles } = await supabase.from('articles').select('*');
    if (!articles) throw new Error('No articles found');

    for (const article of articles) {
      // Find category slug
      let catObj = categories.find(c => c.id === article.category || c.slug === article.category || c.name === article.category);
      let catSlug = catObj ? catObj.slug : '';
      let subcatSlug = '';
      if (catObj) {
        const subcatObj = subcategories.filter(s => s.category_id === catObj.id).find(s => s.id === article.subcategory || s.slug === article.subcategory || s.name === article.subcategory);
        subcatSlug = subcatObj ? subcatObj.slug : '';
      }
      // Generate link
      let link = '';
      if (catSlug && subcatSlug && article.title) {
        link = `/studymaterial/${catSlug}/${subcatSlug}/${slugify(article.title)}`;
      }
      // Update article if link is missing or incorrect
      if (!article.link || article.link !== link) {
        const { error } = await supabase.from('articles').update({ link }).eq('id', article.id);
        if (error) {
          console.error(`Failed to update article ID ${article.id}:`, error.message);
        } else {
          console.log(`Updated article ID ${article.id} with link: ${link}`);
        }
      }
    }
    console.log('Migration complete!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
})();
