import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  User,
  Instagram
} from "lucide-react";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Sample data - in real app, this would come from Supabase
  const reports = [
    {
      id: 1,
      title: "Fake Digital Marketing Course - Complete Scam",
      author: "Ahmed K.",
      rating: 1,
      date: "2 days ago",
      location: "Casablanca",
      instagramHandle: "@fake_marketing_guru",
      accusedName: "Mohamed Digital",
      courseName: "Master Digital Marketing 2024",
      excerpt: "Promised advanced marketing strategies with guaranteed results. Paid 3000 DH for basic YouTube tutorials and WhatsApp group access. No support after payment.",
      status: "verified",
      views: 234,
      tags: ["Refund Issue", "Fake Content", "No Support"]
    },
    {
      id: 2,
      title: "Cryptocurrency Investment Scam - Lost 5000 DH",
      author: "Fatima M.",
      rating: 1,
      date: "1 week ago",
      location: "Rabat",
      instagramHandle: "@crypto_master_ma",
      accusedName: "Youssef Crypto",
      courseName: "Crypto Millionaire Blueprint",
      excerpt: "Instagram coach promised guaranteed 500% returns in 30 days. Collected 5000 DH then completely disappeared. All fake testimonials and screenshots.",
      status: "verified",
      views: 456,
      tags: ["Ghosted", "Fake Testimonials", "Financial Loss"]
    },
    {
      id: 3,
      title: "Excellent Business Coaching - Highly Recommended",
      author: "Omar B.",
      rating: 5,
      date: "2 weeks ago",
      location: "Marrakech",
      instagramHandle: "@business_coach_morocco",
      accusedName: "Laila Business",
      courseName: "E-commerce Success Program",
      excerpt: "Outstanding guidance and genuine expertise. Helped me launch my online store with detailed strategies and ongoing support. Worth every dirham!",
      status: "verified",
      views: 189,
      tags: ["Excellent Support", "Real Results", "Professional"]
    },
    {
      id: 4,
      title: "Dropshipping Course - Misleading Information",
      author: "Karim A.",
      rating: 2,
      date: "3 weeks ago",
      location: "Fez",
      instagramHandle: "@dropship_expert",
      accusedName: "Hassan Dropship",
      courseName: "Dropshipping Empire",
      excerpt: "Course content was outdated and many strategies no longer work. Some useful basics but not worth the 2500 DH price tag.",
      status: "verified",
      views: 112,
      tags: ["Outdated Content", "Overpriced"]
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.accusedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === "all" || report.rating === parseInt(filterRating);
    const matchesLocation = filterLocation === "all" || report.location === filterLocation;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    
    return matchesSearch && matchesRating && matchesLocation && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              استكشاف التقارير
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              تصفح التقارير والمراجعات المعتمدة من مجتمع التدريب الرقمي المغربي
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث بالاسم أو الدورة أو حساب الإنستغرام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع التقييمات</SelectItem>
                    <SelectItem value="1">نجمة واحدة</SelectItem>
                    <SelectItem value="2">نجمتان</SelectItem>
                    <SelectItem value="3">3 نجوم</SelectItem>
                    <SelectItem value="4">4 نجوم</SelectItem>
                    <SelectItem value="5">5 نجوم</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المدن</SelectItem>
                    <SelectItem value="Casablanca">الدار البيضاء</SelectItem>
                    <SelectItem value="Rabat">الرباط</SelectItem>
                    <SelectItem value="Marrakech">مراكش</SelectItem>
                    <SelectItem value="Fez">فاس</SelectItem>
                    <SelectItem value="Tangier">طنجة</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="verified">معتمد</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <p className="text-muted-foreground">
              عرض {filteredReports.length} من {reports.length} تقرير
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl line-clamp-2 mb-2">
                        {report.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <User className="w-3 h-3" />
                        <span>by {report.author}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{report.location}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                    <Badge variant={report.status === "verified" ? "default" : "secondary"}>
                      {report.status === "verified" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1" />
                      )}
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Accused Info */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">المتهم:</span> {report.accusedName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Instagram className="w-3 h-3" />
                          <span className="font-medium">إنستغرام:</span> {report.instagramHandle}
                        </div>
                        <div className="sm:col-span-2">
                          <span className="font-medium">الدورة:</span> {report.courseName}
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-4">
                      <StarRating rating={report.rating} readonly size="md" />
                    </div>
                    
                    {/* Description */}
                    <CardDescription className="line-clamp-3">
                      {report.excerpt}
                    </CardDescription>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {report.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {report.views} مشاهدة
                      </div>
                      <Button variant="ghost" size="sm">
                        اقرأ التقرير كاملاً
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                لم يتم العثور على تقارير
              </h3>
              <p className="text-muted-foreground">
                جرب تعديل المرشحات أو مصطلحات البحث
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}