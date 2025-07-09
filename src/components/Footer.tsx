import { Link } from "react-router-dom";
import { Shield, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              ثيكا
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              منصة مجتمعية مخصصة لحماية المستهلكين المغاربة من عمليات الاحتيال الرقمي والمدربين المزيفين والدورات الإلكترونية الوهمية.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              صُنع بـ <Heart className="w-4 h-4 text-red-500 fill-current" /> من أجل المغرب
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">المنصة</h3>
            <div className="flex flex-col gap-2">
              <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                تصفح التقارير
              </Link>
              <Link to="/submit" className="text-muted-foreground hover:text-primary transition-colors">
                إبلاغ عن احتيال
              </Link>
              <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                لوحة الإدارة
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">قانوني</h3>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                شروط الخدمة
              </Link>
              <Link to="/guidelines" className="text-muted-foreground hover:text-primary transition-colors">
                إرشادات المجتمع
              </Link>
              <a 
                href="mailto:contact@thika.com" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                اتصل بنا
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ثيكا. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🇲🇦 صُنع في المغرب</span>
            <span>•</span>
            <span>نحمي مجتمعنا</span>
          </div>
        </div>
      </div>
    </footer>
  );
}