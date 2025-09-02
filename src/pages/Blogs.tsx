import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import pianoLearning from "@/assets/piano-learning.jpg";
import guitarLearning from "@/assets/guitar-learning.jpg";
import musicTheory from "@/assets/music-theory.jpg";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  date: string;
  image: string;
  readTime: string;
}

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Master Piano Scales in 30 Days",
    excerpt: "Learn the essential piano scales that will transform your playing. From major to minor scales, we'll guide you through each step.",
    category: "PIANO",
    author: {
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ"
    },
    date: "March 15, 2024",
    image: pianoLearning,
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Guitar Chord Progressions Every Beginner Should Know",
    excerpt: "Master the fundamental chord progressions that appear in thousands of songs. Start creating music today!",
    category: "GUITAR",
    author: {
      name: "Mike Rodriguez",
      avatar: "",
      initials: "MR"
    },
    date: "March 12, 2024",
    image: guitarLearning,
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Understanding Music Theory: A Complete Guide",
    excerpt: "Demystify music theory with our comprehensive guide. Learn about scales, intervals, and harmony in simple terms.",
    category: "THEORY",
    author: {
      name: "Dr. Emma Williams",
      avatar: "",
      initials: "EW"
    },
    date: "March 10, 2024",
    image: musicTheory,
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Top 10 Practice Techniques for Musicians",
    excerpt: "Improve your practice sessions with these proven techniques used by professional musicians worldwide.",
    category: "PRACTICE",
    author: {
      name: "Alex Chen",
      avatar: "",
      initials: "AC"
    },
    date: "March 8, 2024",
    image: pianoLearning,
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Building Your Home Recording Studio",
    excerpt: "Create professional recordings from home with our step-by-step guide to setting up your recording space.",
    category: "RECORDING",
    author: {
      name: "Jordan Taylor",
      avatar: "",
      initials: "JT"
    },
    date: "March 5, 2024",
    image: guitarLearning,
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "The Psychology of Musical Performance",
    excerpt: "Overcome stage fright and perform with confidence. Learn mental techniques used by top performers.",
    category: "PERFORMANCE",
    author: {
      name: "Dr. Lisa Park",
      avatar: "",
      initials: "LP"
    },
    date: "March 3, 2024",
    image: musicTheory,
    readTime: "9 min read"
  },
  {
    id: 7,
    title: "Jazz Improvisation: Getting Started",
    excerpt: "Dive into the world of jazz improvisation with fundamental concepts and practical exercises.",
    category: "JAZZ",
    author: {
      name: "Marcus Thompson",
      avatar: "",
      initials: "MT"
    },
    date: "March 1, 2024",
    image: pianoLearning,
    readTime: "11 min read"
  },
  {
    id: 8,
    title: "Digital vs Acoustic: Choosing Your Instrument",
    excerpt: "Compare digital and acoustic instruments to find the perfect fit for your musical journey and lifestyle.",
    category: "INSTRUMENTS",
    author: {
      name: "Rebecca Lee",
      avatar: "",
      initials: "RL"
    },
    date: "February 28, 2024",
    image: guitarLearning,
    readTime: "4 min read"
  },
  {
    id: 9,
    title: "Music Production Basics for Beginners",
    excerpt: "Start your music production journey with essential tips, tools, and techniques for creating your first track.",
    category: "PRODUCTION",
    author: {
      name: "David Kim",
      avatar: "",
      initials: "DK"
    },
    date: "February 25, 2024",
    image: musicTheory,
    readTime: "12 min read"
  }
];

const additionalPosts: BlogPost[] = [
  {
    id: 10,
    title: "Songwriting Secrets from Hit Makers",
    excerpt: "Learn the techniques behind chart-topping songs and discover how to craft memorable melodies and lyrics.",
    category: "SONGWRITING",
    author: {
      name: "Taylor Swift",
      avatar: "",
      initials: "TS"
    },
    date: "February 22, 2024",
    image: pianoLearning,
    readTime: "8 min read"
  },
  {
    id: 11,
    title: "Classical Music in the Modern World",
    excerpt: "Explore how classical music continues to influence contemporary artists and remains relevant today.",
    category: "CLASSICAL",
    author: {
      name: "Prof. Harrison Wells",
      avatar: "",
      initials: "HW"
    },
    date: "February 20, 2024",
    image: musicTheory,
    readTime: "7 min read"
  },
  {
    id: 12,
    title: "Electronic Music Production Workshop",
    excerpt: "Master the art of electronic music with advanced synthesis techniques and modern production workflows.",
    category: "ELECTRONIC",
    author: {
      name: "Nina Beats",
      avatar: "",
      initials: "NB"
    },
    date: "February 18, 2024",
    image: guitarLearning,
    readTime: "15 min read"
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    PIANO: "bg-primary text-primary-foreground",
    GUITAR: "bg-secondary text-secondary-foreground", 
    THEORY: "bg-accent text-accent-foreground",
    PRACTICE: "bg-gradient-to-r from-primary to-secondary text-white",
    RECORDING: "bg-gradient-to-r from-secondary to-accent text-white",
    PERFORMANCE: "bg-gradient-to-r from-accent to-primary text-white",
    JAZZ: "bg-destructive text-destructive-foreground",
    INSTRUMENTS: "bg-gradient-primary text-white",
    PRODUCTION: "bg-gradient-secondary text-white",
    SONGWRITING: "bg-gradient-accent text-white",
    CLASSICAL: "bg-muted text-muted-foreground",
    ELECTRONIC: "bg-gradient-to-r from-primary via-secondary to-accent text-white"
  };
  return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
};

const Blogs = () => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [showingMore, setShowingMore] = useState(false);

  const handleLoadMore = () => {
    if (!showingMore) {
      setDisplayedPosts([...initialBlogPosts, ...additionalPosts]);
      setShowingMore(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Musoclef Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover expert tips, tutorials, and insights to accelerate your musical journey
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 border-0 shadow-brand">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(post.category)} font-semibold`}>
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="text-xs bg-gradient-primary text-white">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-muted-foreground">{post.date}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  <Button variant="read-more" size="sm">
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {!showingMore && (
          <div className="text-center mt-16">
            <Button 
              onClick={handleLoadMore}
              variant="gradient"
              size="lg"
              className="px-12 py-3 text-lg font-semibold"
            >
              Load More Articles
            </Button>
          </div>
        )}

        {/* All Posts Loaded Message */}
        {showingMore && (
          <div className="text-center mt-16">
            <p className="text-muted-foreground text-lg">
              You've reached the end! 🎵 Check back soon for more amazing content.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Blogs;