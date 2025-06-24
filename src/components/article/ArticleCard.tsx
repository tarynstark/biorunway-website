import { motion } from 'framer-motion';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: 'products' | 'research' | 'sustainability' | 'deep-dive' | 'investment';
  author: string;
  publishedAt: string;
  featuredImage?: string;
  slug: string;
  isPaid?: boolean;
  isFeatured?: boolean;
}

const categoryColors = {
  'products': 'bg-brand-main-burgundy text-brand-light',
  'research': 'bg-brand-main-olive text-brand-light', 
  'sustainability': 'bg-brand-main-mustard text-brand-light',
  'deep-dive': 'bg-biorunway-700 text-brand-light',
  'investment': 'bg-burgundy-600 text-brand-light'
};

const categoryLabels = {
  'products': 'Products',
  'research': 'Research',
  'sustainability': 'Sustainability', 
  'deep-dive': 'Deep Dive',
  'investment': 'Investment'
};

// Calculate read time based on excerpt length (rough estimate)
function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  author,
  publishedAt,
  featuredImage,
  slug,
  isPaid = false,
  isFeatured = false
}: ArticleCardProps) {
  const readTime = calculateReadTime(excerpt);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`bg-brand-light border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        isFeatured 
          ? 'border-brand-main-burgundy border-2' 
          : 'border-biorunway-200'
      }`}
    >
      {/* Featured Image */}
      {featuredImage && (
        <div className="aspect-video bg-biorunway-100 overflow-hidden">
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Category Tag and Indicators */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </span>
            {isFeatured && (
              <span className="inline-block px-2 py-1 bg-brand-main-mustard text-brand-light text-xs font-medium rounded">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-biorunway-500">
              {readTime} min read
            </span>
            {isPaid && (
              <span className="inline-block px-2 py-1 bg-mustard-100 text-mustard-800 text-xs font-medium rounded">
                Premium
              </span>
            )}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-biorunway-900 mb-3 line-clamp-2 leading-tight">
          <a 
            href={`/articles/${slug}/`}
            className="hover:text-brand-main-burgundy transition-colors"
          >
            {title}
          </a>
        </h3>
        
        {/* Excerpt */}
        <p className="text-biorunway-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-biorunway-700 font-medium">
            {author}
          </span>
          <time className="text-biorunway-500" dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Read More Link */}
        <div className="mt-4 pt-4 border-t border-biorunway-100">
          <a 
            href={`/articles/${slug}/`}
            className="inline-flex items-center text-brand-main-burgundy hover:text-burgundy-700 font-medium transition-colors"
          >
            Read More
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
}