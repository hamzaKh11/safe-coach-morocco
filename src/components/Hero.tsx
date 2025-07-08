import { Button } from "@/components/ui/button";
import { Shield, Users, AlertTriangle, Star, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="text-white font-medium text-sm sm:text-base">حماية المستهلك المغربي الرقمي</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            محاربة الاحتيال{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              الرقمي
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">في المغرب</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
            أبلغ عن المدربين المحتالين والدورات المزيفة والاحتيال الرقمي.
            ساعد الآخرين في اتخاذ قرارات مدروسة من خلال مشاركة تجربتك.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <Button variant="glass" size="xl" className="text-base sm:text-lg font-semibold rounded-2xl">
              <AlertTriangle className="w-5 h-5 ml-2" />
              إبلاغ عن احتيال
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-2xl">
              <Users className="w-5 h-5 ml-2" />
              تصفح التقارير
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">250+</div>
              <div className="text-sm sm:text-base text-white/80">تقرير مُقدم</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">89%</div>
              <div className="text-sm sm:text-base text-white/80">قضية محلولة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">5k+</div>
              <div className="text-sm sm:text-base text-white/80">مستخدم محمي</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features preview */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <AlertTriangle className="w-8 h-8 text-white" />,
              title: "إبلاغ عن الاحتيال",
              description: "قدم تقارير مفصلة عن المدربين المحتالين والدورات المزيفة"
            },
            {
              icon: <Star className="w-8 h-8 text-white" />,
              title: "التقييم والمراجعة",
              description: "قم بالتقييم وشارك تجربتك لمساعدة الآخرين"
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              title: "التقارير المؤكدة",
              description: "تصفح التقارير المعتمدة من مستخدمين حقيقيين"
            }
          ].map((feature, index) => (
            <div key={index} className="glass-card p-6 sm:p-8 text-center animate-fade-in-up rounded-2xl" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-warm rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}