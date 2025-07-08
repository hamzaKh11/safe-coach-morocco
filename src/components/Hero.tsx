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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">Protecting Moroccan Digital Consumers</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Fight Digital{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Scams
            </span>
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl">in Morocco</span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            Report fraudulent coaches, fake courses, and digital scams. 
            Help others make informed decisions by sharing your experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="glass" size="xl" className="text-lg font-semibold">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report a Scam
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Users className="w-5 h-5 mr-2" />
              Browse Reports
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">250+</div>
              <div className="text-white/80">Reports Submitted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">89%</div>
              <div className="text-white/80">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5k+</div>
              <div className="text-white/80">Users Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features preview */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <AlertTriangle className="w-8 h-8 text-white" />,
              title: "Report Scams",
              description: "Submit detailed reports about fraudulent coaches and fake courses"
            },
            {
              icon: <Star className="w-8 h-8 text-white" />,
              title: "Rate & Review",
              description: "Give ratings and share your experience to help others"
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-white" />,
              title: "Verified Reports",
              description: "Browse authenticated reports from real users"
            }
          ].map((feature, index) => (
            <div key={index} className="glass-card p-6 text-center animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-warm rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}