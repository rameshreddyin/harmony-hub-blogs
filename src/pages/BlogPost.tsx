import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, Share2, Clock, Heart, Bookmark, Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import pianoLearning from "@/assets/piano-learning.jpg";
import guitarLearning from "@/assets/guitar-learning.jpg";
import musicTheory from "@/assets/music-theory.jpg";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
    bio: string;
    role: string;
    social: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  date: string;
  image: string;
  readTime: string;
  views: string;
  shares: string;
  tags: string[];
}

const blogPosts: { [key: string]: BlogPost } = {
  "1": {
    id: 1,
    title: "How to Master Piano Scales in 30 Days",
    content: `
      <p>Learning piano scales is one of the most fundamental skills every pianist must develop. Whether you're a complete beginner or looking to refine your technique, mastering scales will dramatically improve your playing abilities and musical understanding.</p>

      <h2>Why Piano Scales Matter</h2>
      <p>Piano scales form the backbone of virtually all music. They help develop finger strength, dexterity, and muscle memory while providing the foundation for understanding music theory. When you master scales, you're not just learning patterns - you're building the vocabulary that will allow you to express yourself musically.</p>

      <h2>The 30-Day Scale Mastery Plan</h2>
      <p>This intensive program is designed to take you from struggling with basic scales to confidently playing all major and minor scales. Here's how we'll break it down:</p>

      <h3>Week 1: Foundation Building</h3>
      <p>Start with the C major scale - the most fundamental scale with no sharps or flats. Focus on proper finger positioning and smooth transitions between notes. Practice both hands separately before attempting to play them together.</p>

      <h3>Week 2: Adding Complexity</h3>
      <p>Introduce scales with one sharp or flat: G major, F major, and D major. Pay special attention to the thumb crossings and maintain consistent rhythm throughout your practice sessions.</p>

      <h3>Week 3: Minor Scales and Patterns</h3>
      <p>Begin working on natural minor scales, starting with A minor. The fingering patterns are similar to major scales, but the emotional character is completely different. This week, also introduce scale patterns and arpeggios.</p>

      <h3>Week 4: Advanced Techniques</h3>
      <p>Master harmonic and melodic minor scales, and begin playing scales in different rhythmic patterns. Increase your tempo while maintaining accuracy and evenness in your playing.</p>

      <h2>Practice Tips for Success</h2>
      <ul>
        <li><strong>Start slowly:</strong> Speed comes with accuracy. Never sacrifice precision for tempo.</li>
        <li><strong>Use a metronome:</strong> Consistent timing is crucial for developing muscle memory.</li>
        <li><strong>Practice daily:</strong> Even 15 minutes of focused scale practice daily is better than hours once a week.</li>
        <li><strong>Listen actively:</strong> Pay attention to the sound quality and evenness of each note.</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <p>Many students rush through scales without paying attention to technique. Avoid these common pitfalls:</p>
      <ul>
        <li>Tense shoulders and arms</li>
        <li>Uneven finger pressure</li>
        <li>Poor thumb position during crossings</li>
        <li>Playing too fast too soon</li>
        <li>Ignoring the importance of proper fingering</li>
      </ul>

      <h2>Building Long-term Success</h2>
      <p>After completing this 30-day program, continue to incorporate scales into your daily practice routine. They serve as an excellent warm-up and provide the technical foundation for tackling more complex pieces.</p>

      <p>Remember, mastering piano scales isn't just about technical proficiency - it's about developing the musical fluency that will serve you throughout your entire piano journey. Stay patient, stay consistent, and watch as your playing transforms over the next 30 days.</p>
    `,
    category: "PIANO",
    author: {
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ",
      bio: "Sarah is a classically trained pianist with over 15 years of teaching experience. She holds a Master's degree in Piano Performance from Juilliard and has performed in concert halls around the world. Sarah specializes in helping adult learners develop proper technique and musical expression.",
      role: "Piano Instructor & Performance Coach",
      social: {
        twitter: "@sarahpiano",
        linkedin: "sarah-johnson-piano",
        website: "sarahjohnsonpiano.com"
      }
    },
    date: "March 15, 2024",
    image: pianoLearning,
    readTime: "5 min read",
    views: "2.4K",
    shares: "186",
    tags: ["Piano", "Scales", "Technique", "Practice", "Beginner"]
  }
};

const relatedPosts = [
  {
    id: 2,
    title: "6 Ways to Get Better at Piano Practice",
    category: "PIANO",
    views: "2.9K",
    shares: "210",
    image: pianoLearning
  },
  {
    id: 3,
    title: "Why You Should Learn Music Theory",
    category: "THEORY", 
    views: "1.8K",
    shares: "156",
    image: musicTheory
  },
  {
    id: 4,
    title: "How to Use Rhythm in Your Playing",
    category: "TECHNIQUE",
    views: "2.2K",
    shares: "134",
    image: guitarLearning
  },
  {
    id: 5,
    title: "How Good Practice Can Benefit Your Progress",
    category: "PRACTICE",
    views: "2.0K",
    shares: "198",
    image: pianoLearning
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    PIANO: "bg-primary text-primary-foreground",
    GUITAR: "bg-secondary text-secondary-foreground", 
    THEORY: "bg-accent text-accent-foreground",
    PRACTICE: "bg-gradient-to-r from-primary to-secondary text-white",
    TECHNIQUE: "bg-gradient-to-r from-accent to-primary text-white",
  };
  return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={() => navigate("/blogs")} variant="gradient">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with featured image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-6 left-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/blogs")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="bg-card rounded-lg shadow-brand border-0 overflow-hidden">
              <div className="p-8">
                {/* Meta information */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {post.shares} shares
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Author info */}
                <div className="flex items-center gap-4 mb-8">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* Article content */}
                <div 
                  className="prose prose-lg max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social sharing */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                      className="flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("copy")}
                      className="flex items-center gap-2"
                    >
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>

                {/* Author bio */}
                <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">About the Author</h3>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="bg-gradient-primary text-white text-lg">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground">{post.author.name}</h4>
                      <p className="text-sm text-primary font-medium mb-3">{post.author.role}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {post.author.bio}
                      </p>
                      <div className="flex gap-3">
                        {post.author.social.twitter && (
                          <Button variant="ghost" size="sm" className="p-2">
                            <Twitter className="w-4 h-4" />
                          </Button>
                        )}
                        {post.author.social.linkedin && (
                          <Button variant="ghost" size="sm" className="p-2">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {post.author.social.website && (
                          <Button variant="ghost" size="sm" className="p-2">
                            <Link2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="shadow-brand border-0">
                <CardHeader>
                  <h3 className="text-xl font-bold text-foreground">TOP POSTS</h3>
                  <p className="text-sm text-muted-foreground">Right Now</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost, index) => (
                    <div key={relatedPost.id} className="flex gap-3 group cursor-pointer">
                      <img 
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-16 h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {relatedPost.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            {relatedPost.shares}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;