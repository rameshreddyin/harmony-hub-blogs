import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Welcome to Musoclef
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your ultimate destination for music learning, practice, and musical growth. 
          Discover expert tutorials, tips, and insights to master your musical journey.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="gradient" 
            size="lg"
            onClick={() => navigate('/blogs')}
            className="px-8 py-3 text-lg"
          >
            Explore Our Blog
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3 text-lg"
          >
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
