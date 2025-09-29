import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/blog-data';
import SEOHead from '@/components/seo/seo-head';

export default function Blog() {
  return (
    <>
      <SEOHead 
        title="Africa Travel Blog - Expert Guides & Safari Stories | Accommodation Collection"
        description="Discover Africa through our travel blog. Get expert insights on safaris, cultural experiences, and hidden gems across Africa. From Victoria Falls to the Serengeti."
        canonical="/blog"
        ogImage="/attached_assets/victoria fals_1759175723488.jpg"
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Travel Stories & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the magic of Africa through our curated travel stories, expert guides, and insider tips from our on-ground experiences across the continent.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                data-testid={`blog-card-${post.id}`}
              >
                {/* Featured Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    data-testid={`blog-image-${post.id}`}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span data-testid={`blog-date-${post.id}`}>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span data-testid={`blog-author-${post.id}`}>{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl font-bold text-foreground mb-3 line-clamp-2 hover:text-accent transition-colors">
                    <Link href={`/blog/${post.id}`} data-testid={`blog-title-link-${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`blog-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Link href={`/blog/${post.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group hover:bg-accent hover:text-accent-foreground"
                      data-testid={`blog-read-more-${post.id}`}
                    >
                      Read More
                      <Clock className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup Section */}
          <div className="mt-20 bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Stay Inspired
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Get the latest travel stories, destination guides, and exclusive offers delivered to your inbox.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-3 font-semibold"
                data-testid="newsletter-signup-button"
              >
                Subscribe to Updates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}