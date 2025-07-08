import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, User, AlertTriangle, Search } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            Safe Coach Morocco
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-foreground hover:text-primary font-medium transition-colors">
              <Search className="w-4 h-4 mr-1 inline" />
              Explore Reports
            </Link>
            <Link to="/submit" className="text-foreground hover:text-primary font-medium transition-colors">
              <AlertTriangle className="w-4 h-4 mr-1 inline" />
              Report Scam
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="w-4 h-4 mr-1" />
                  Login
                </Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/explore" 
                className="text-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-4 h-4 mr-2 inline" />
                Explore Reports
              </Link>
              <Link 
                to="/submit" 
                className="text-foreground hover:text-primary font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <AlertTriangle className="w-4 h-4 mr-2 inline" />
                Report Scam
              </Link>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                <Button variant="ghost" size="sm" asChild className="justify-start">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}