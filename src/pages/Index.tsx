import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare,
  Eye,
  Calendar,
  MapPin 
} from "lucide-react";

const Index = () => {
  // Sample data for recent reports
  const recentReports = [
    {
      id: 1,
      title: "دورة تسويق رقمي مزيفة",
      author: "أحمد ك.",
      rating: 1,
      date: "منذ يومين",
      location: "الدار البيضاء",
      excerpt: "وعد بإستراتيجيات تسويق متقدمة لكن قدم فقط دروس أساسية من يوتيوب...",
      status: "verified",
      views: 234
    },
    {
      id: 2,
      title: "احتيال استثمار العملات المشفرة",
      author: "فاطمة م.",
      rating: 1,
      date: "منذ أسبوع",
      location: "الرباط",
      excerpt: "مدرب إنستقرام اختفى بعد جمع 5000 درهم مقابل 'أرباح مضمونة'...",
      status: "verified",
      views: 456
    },
    {
      id: 3,
      title: "مدرب أعمال شرعي",
      author: "عمر ب.",
      rating: 5,
      date: "منذ أسبوعين",
      location: "مراكش",
      excerpt: "توجيه ممتاز، ساعدني في بدء عملي الإلكتروني بنجاح...",
      status: "verified",
      views: 189
    }
  ];

  const stats = [
    { label: "إجمالي التقارير", value: "247", icon: AlertTriangle, color: "text-orange-600" },
    { label: "المراجعات المؤكدة", value: "189", icon: CheckCircle, color: "text-green-600" },
    { label: "المستخدمون النشطون", value: "1.2K", icon: Users, color: "text-blue-600" },
    { label: "الاحتيال المحبط", value: "89", icon: Shield, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              التأثير المجتمعي
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              معًا، نبني سوقًا رقميًا أكثر أمانًا للمغرب
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center glass-card border-0 animate-fade-in-up rounded-2xl" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-4 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-warm mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                آخر التقارير
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                تجارب حقيقية من مجتمعنا
              </p>
            </div>
            <Button variant="outline" size="lg" className="rounded-xl">
              عرض جميع التقارير
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {recentReports.map((report, index) => (
              <Card key={report.id} className="hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up rounded-2xl" style={{animationDelay: `${index * 0.15}s`}}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 mb-2">
                        {report.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>بواسطة {report.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant={report.status === "verified" ? "default" : "secondary"} className="ml-2 rounded-full">
                      {report.status === "verified" ? "مؤكد" : "معلق"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < report.rating ? 'text-accent fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {report.rating}/5 نجوم
                    </span>
                  </div>
                  
                  <CardDescription className="line-clamp-3 mb-4">
                    {report.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {report.views} مشاهدة
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              كيف يعمل
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              خطوات بسيطة لحماية نفسك والآخرين من الاحتيال الرقمي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "أبلغ عن تجربتك",
                description: "شارك تفاصيل الاحتيال، الدورات المزيفة، أو المدربين المشبوهين من خلال النموذج الآمن.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "التحقق المجتمعي",
                description: "يراجع فريق الإدارة الإرسالات ويتحقق من التقارير الشرعية من المستخدمين الحقيقيين.",
                icon: CheckCircle
              },
              {
                step: "03",
                title: "حماية الآخرين",
                description: "تصبح التقارير المؤكدة عامة لمساعدة المجتمع على اتخاذ قرارات مدروسة.",
                icon: Shield
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
            هل أنت مستعد لإحداث فرق؟
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المغاربة في محاربة الاحتيال الرقمي. تقريرك قد ينقذ شخصًا من خسارة أمواله التي حصل عليها بجهد.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="xl" className="rounded-2xl">
              <AlertTriangle className="w-5 h-5 ml-2" />
              أبلغ عن احتيال الآن
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-2xl">
              اعرف المزيد
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
