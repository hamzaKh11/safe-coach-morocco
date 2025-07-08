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
      title: "Fake Digital Marketing Course",
      author: "Ahmed K.",
      rating: 1,
      date: "2 days ago",
      location: "Casablanca",
      excerpt: "Promised advanced marketing strategies but delivered basic YouTube tutorials...",
      status: "verified",
      views: 234
    },
    {
      id: 2,
      title: "Cryptocurrency Investment Scam",
      author: "Fatima M.",
      rating: 1,
      date: "1 week ago",
      location: "Rabat",
      excerpt: "Instagram coach disappeared after collecting 5000 DH for 'guaranteed profits'...",
      status: "verified",
      views: 456
    },
    {
      id: 3,
      title: "Legitimate Business Coach",
      author: "Omar B.",
      rating: 5,
      date: "2 weeks ago",
      location: "Marrakech",
      excerpt: "Excellent guidance, helped me start my online business successfully...",
      status: "verified",
      views: 189
    }
  ];

  const stats = [
    { label: "Total Reports", value: "247", icon: AlertTriangle, color: "text-orange-600" },
    { label: "Verified Reviews", value: "189", icon: CheckCircle, color: "text-green-600" },
    { label: "Active Users", value: "1.2K", icon: Users, color: "text-blue-600" },
    { label: "Scams Prevented", value: "89", icon: Shield, color: "text-purple-600" }
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
              Community Impact
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Together, we're building a safer digital marketplace for Morocco
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center glass-card border-0 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-warm mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Latest Reports
              </h2>
              <p className="text-muted-foreground text-lg">
                Real experiences from our community
              </p>
            </div>
            <Button variant="outline" size="lg">
              View All Reports
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReports.map((report, index) => (
              <Card key={report.id} className="hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in-up" style={{animationDelay: `${index * 0.15}s`}}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 mb-2">
                        {report.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>by {report.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant={report.status === "verified" ? "default" : "secondary"} className="ml-2">
                      {report.status}
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
                      {report.rating}/5 stars
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
                      {report.views} views
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
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Simple steps to protect yourself and others from digital scams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Report Your Experience",
                description: "Share details about scams, fake courses, or suspicious coaches with our secure form.",
                icon: MessageSquare
              },
              {
                step: "02",
                title: "Community Verification",
                description: "Our admin team reviews submissions and verifies legitimate reports from real users.",
                icon: CheckCircle
              },
              {
                step: "03",
                title: "Protect Others",
                description: "Verified reports become public to help the community make informed decisions.",
                icon: Shield
              }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Moroccans fighting against digital scams. Your report could save someone from losing their hard-earned money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="xl">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report a Scam Now
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
