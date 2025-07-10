import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, User, AlertTriangle, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { name: "الرئيسية", href: "/", icon: null },
    { name: "استكشاف التقارير", href: "/explore", icon: Search },
    { name: "إبلاغ عن احتيال", href: "/submit", icon: AlertTriangle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/10 shadow-glass">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-primary group"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-hero rounded-xl sm:rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ثيكا
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-accent/10 flex items-center gap-2 ${
                  location.pathname === item.href ? 'text-primary bg-accent/10' : ''
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden lg:block">
                    مرحباً، {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="rounded-full"
                  >
                    <LogOut className="w-4 h-4 ml-1" />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 sm:p-3 rounded-xl hover:bg-accent/10 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 sm:py-6 border-t border-white/10 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1 sm:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary font-medium transition-colors py-3 px-4 rounded-lg hover:bg-accent/10 flex items-center gap-3 ${
                    location.pathname === item.href ? 'text-primary bg-accent/10' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/10 mt-4">
                {user ? (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      مرحباً، {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </div>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="justify-start rounded-xl w-full"
                    >
                      <LogOut className="w-5 h-5 ml-2" />
                      تسجيل الخروج
                    </Button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}