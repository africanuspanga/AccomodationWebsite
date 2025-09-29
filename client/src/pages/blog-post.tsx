import { Link, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blog-data';
import SEOHead from '@/components/seo/seo-head';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  
  // Find the blog post by ID
  const post = blogPosts.find(p => p.id === id);

  // If post not found, show 404
  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom max-w-4xl">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog">
            <Button data-testid="back-to-blog-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEOHead 
        title={`${post.title} | Accommodation Collection Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        ogImage={post.imageUrl}
      />
      
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          {/* Back to Blog Button */}
          <Link href="/blog">
            <Button 
              variant="outline" 
              className="mb-8 hover:bg-accent hover:text-accent-foreground"
              data-testid="back-to-blog-link"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          {/* Article Header */}
          <article className="bg-card rounded-2xl overflow-hidden shadow-lg">
            {/* Featured Image */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                data-testid="blog-post-featured-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8 lg:p-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="blog-post-date">{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span data-testid="blog-post-author">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span data-testid="blog-post-read-time">{post.readTime}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                  data-testid="share-button"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="blog-post-title">
                {post.title}
              </h1>

              {/* Excerpt */}
              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mb-8">
                <p className="text-lg text-muted-foreground italic" data-testid="blog-post-excerpt">
                  {post.excerpt}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-foreground" data-testid="blog-post-content">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-primary rounded-xl text-center">
                <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
                  Ready to Experience This Adventure?
                </h3>
                <p className="text-primary-foreground/90 mb-6">
                  Let our experts craft your perfect Africa journey with personalized itineraries and insider access.
                </p>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="px-8 py-3 font-semibold"
                    data-testid="contact-cta-button"
                  >
                    Plan Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              More Travel Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.id}`}
                    className="group"
                    data-testid={`related-post-${relatedPost.id}`}
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}