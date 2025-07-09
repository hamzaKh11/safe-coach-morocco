import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, User, AlertTriangle, Search } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/10 shadow-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-primary group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              الثقة
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accent/10"
            >
              الرئيسية
            </Link>
            <Link
              to="/explore"
              className="text-foreground hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              استكشاف التقارير
            </Link>
            <Link
              to="/submit"
              className="text-foreground hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              إبلاغ عن احتيال
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  تسجيل الدخول
                </Link>
              </Button>
              <Button variant="hero" size="sm" asChild className="rounded-full">
                <Link to="/signup">إنشاء حساب</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-accent/10 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                to="/explore"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-lg hover:bg-accent/10 flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5" />
                استكشاف التقارير
              </Link>
              <Link
                to="/submit"
                className="text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-lg hover:bg-accent/10 flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <AlertTriangle className="w-5 h-5" />
                إبلاغ عن احتيال
              </Link>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/10 mt-4">
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="justify-start rounded-xl"
                >
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    تسجيل الدخول
                  </Link>
                </Button>
                <Button variant="hero" size="lg" asChild className="rounded-xl">
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    إنشاء حساب
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
