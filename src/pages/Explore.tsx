import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ReportCard, ReportCardSkeleton } from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Search,
  Filter,
  AlertTriangle,
  X,
  ListOrdered,
  BookCopy,
  BadgeCent,
  AppWindow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filters, setFilters] = useState({
    rating: "all",
    category: "all",
    price: "all",
    platform: "all",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Sample data - in real app, this would come from Supabase
  const reports = [
    {
      id: 1,
      title: "دورة تسويق رقمي مزيفة - عملية نصب كاملة",
      author: "أحمد ق.",
      rating: 1,
      date: "2024-07-08T10:00:00Z",
      instagramHandle: "@fake_marketing_guru",
      accusedName: "محمد ديجيتال",
      courseName: "إتقان التسويق الرقمي 2024",
      excerpt:
        "وعد باستراتيجيات تسويق متقدمة مع نتائج مضمونة. دفعت 3000 درهم مقابل دروس يوتيوب أساسية والوصول إلى مجموعة واتساب. لا يوجد دعم بعد الدفع.",
      status: "verified",
      views: 234,
      tags: ["مشكلة استرداد", "محتوى مزيف", "لا يوجد دعم"],
      category: "التسويق الرقمي",
      price: 3000,
      platform: "Instagram",
    },
    {
      id: 2,
      title: "احتيال استثمار العملات المشفرة - خسارة 5000 درهم",
      author: "فاطمة م.",
      rating: 1,
      date: "2024-07-01T14:30:00Z",
      instagramHandle: "@crypto_master_ma",
      accusedName: "يوسف كريبتو",
      courseName: "مخطط مليونير العملات المشفرة",
      excerpt:
        "مدرب على إنستغرام وعد بعوائد مضمونة 500% في 30 يومًا. جمع 5000 درهم ثم اختفى تمامًا. كل الشهادات والصور مزيفة.",
      status: "verified",
      views: 456,
      tags: ["اختفاء", "شهادات مزيفة", "خسارة مالية"],
      category: "العملات المشفرة",
      price: 5000,
      platform: "Instagram",
    },
    {
      id: 3,
      title: "تدريب أعمال ممتاز - موصى به بشدة",
      author: "عمر ب.",
      rating: 5,
      date: "2024-06-25T09:00:00Z",
      instagramHandle: "@business_coach_morocco",
      accusedName: "ليلى بيزنس",
      courseName: "برنامج نجاح التجارة الإلكترونية",
      excerpt:
        "إرشادات رائعة وخبرة حقيقية. ساعدني في إطلاق متجري عبر الإنترنت باستراتيجيات مفصلة ودعم مستمر. يستحق كل درهم!",
      status: "verified",
      views: 189,
      tags: ["دعم ممتاز", "نتائج حقيقية", "احترافي"],
      category: "تدريب الأعمال",
      price: 4000,
      platform: "الموقع الإلكتروني",
    },
    {
      id: 4,
      title: "دورة دروبشيبينغ - معلومات مضللة",
      author: "كريم أ.",
      rating: 2,
      date: "2024-06-18T18:00:00Z",
      instagramHandle: "@dropship_expert",
      accusedName: "حسن دروبشيب",
      courseName: "إمبراطورية الدروبشيبينغ",
      excerpt:
        "محتوى الدورة كان قديمًا والعديد من الاستراتيجيات لم تعد تعمل. بعض الأساسيات المفيدة ولكن لا تستحق سعر 2500 درهم.",
      status: "verified",
      views: 112,
      tags: ["محتوى قديم", "مبالغ في السعر"],
      category: "التجارة الإلكترونية",
      price: 2500,
      platform: "WhatsApp",
    },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const clearFilters = () => {
    setFilters({
      rating: "all",
      category: "all",
      price: "all",
      platform: "all",
    });
    setSearchTerm("");
  };

  const filteredReports = reports
    .filter((report) => {
      const { rating, category, price, platform } = filters;
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.accusedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating =
        rating === "all" || report.rating === parseInt(rating);
      const matchesCategory =
        category === "all" || report.category === category;
      const matchesPlatform =
        platform === "all" || report.platform === platform;

      const priceRanges = {
        "0-500": (p) => p <= 500,
        "500-1500": (p) => p > 500 && p <= 1500,
        "1500-3000": (p) => p > 1500 && p <= 3000,
        "3000+": (p) => p > 3000,
        all: () => true,
      };
      const matchesPrice = priceRanges[price](report.price);

      return (
        matchesSearch &&
        matchesRating &&
        matchesCategory &&
        matchesPlatform &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "rating_asc":
          return a.rating - b.rating;
        case "rating_desc":
          return b.rating - a.rating;
        case "views":
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const activeFilterCount =
    Object.values(filters).filter((f) => f !== "all").length +
    (searchTerm ? 1 : 0);

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

        {/* Filters and Search */}
        <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث بالاسم، الدورة، أو حساب إنستغرام..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 h-12"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="md:hidden flex-1">
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-center h-12"
                      >
                        <Filter className="w-4 h-4 ml-2" />
                        الفلاتر
                        {activeFilterCount > 0 && (
                          <Badge className="mr-2">{activeFilterCount}</Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>الفلاتر</SheetTitle>
                        <SheetDescription>
                          قم بتصفية نتائج البحث.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-4">
                        {/* Mobile Filters */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">التقييم</label>
                          <Select
                            value={filters.rating}
                            onValueChange={(val) =>
                              handleFilterChange("rating", val)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="التقييم" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">كل التقييمات</SelectItem>
                              {[1, 2, 3, 4, 5].map((r) => (
                                <SelectItem key={r} value={r.toString()}>
                                  {r} نجمة{r > 1 && "ات"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {/* More mobile filters here */}
                      </div>
                      <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="w-full"
                      >
                        مسح الفلاتر
                      </Button>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="hidden md:flex gap-2">
                  <Select
                    value={filters.rating}
                    onValueChange={(val) => handleFilterChange("rating", val)}
                  >
                    <SelectTrigger className="w-36 h-12">
                      <SelectValue placeholder="التقييم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل التقييمات</SelectItem>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <SelectItem key={r} value={r.toString()}>
                          {r} نجمة{r > 1 && "ات"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* ... other desktop filters ... */}
                </div>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-40 h-12">
                    <SelectValue placeholder="الترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="oldest">الأقدم</SelectItem>
                    <SelectItem value="rating_asc">
                      التقييم (من الأقل للأعلى)
                    </SelectItem>
                    <SelectItem value="rating_desc">
                      التقييم (من الأعلى للأقل)
                    </SelectItem>
                    <SelectItem value="views">الأكثر مشاهدة</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="h-12 hidden md:inline-flex"
                >
                  <X className="w-4 h-4 ml-2" />
                  مسح
                </Button>
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))
            ) : (
              <div className="text-center py-12 xl:col-span-2">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  لم يتم العثور على تقارير
                </h3>
                <p className="text-muted-foreground">
                  جرّب تعديل الفلاتر أو مصطلحات البحث.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
