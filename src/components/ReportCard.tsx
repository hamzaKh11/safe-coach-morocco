import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import {
  User,
  Instagram,
  CheckCircle,
  AlertTriangle,
  Eye,
  BookCopy,
  BadgeCent,
  AppWindow,
  Calendar,
  Shield,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

const ReportCard = ({ report }) => {
  const timeAgo = (date) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    let interval = seconds / 31536000;
    if (interval > 1) return `منذ ${Math.floor(interval)} سنوات`;
    interval = seconds / 2592000;
    if (interval > 1) return `منذ ${Math.floor(interval)} أشهر`;
    interval = seconds / 86400;
    if (interval > 1) return `منذ ${Math.floor(interval)} أيام`;
    interval = seconds / 3600;
    if (interval > 1) return `منذ ${Math.floor(interval)} ساعات`;
    interval = seconds / 60;
    if (interval > 1) return `منذ ${Math.floor(interval)} دقائق`;
    return `منذ ${Math.floor(seconds)} ثوان`;
  };

  const platformIcon = {
    Instagram: <Instagram className="w-4 h-4 text-pink-500" />,
    WhatsApp: <AppWindow className="w-4 h-4 text-green-500" />,
    "الموقع الإلكتروني": <AppWindow className="w-4 h-4 text-blue-500" />,
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer flex flex-col bg-gradient-to-b from-background to-muted/20 border-0 shadow-lg">
      {/* Header with gradient background */}
      <div className="bg-gradient-hero p-4 rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              <Shield className="w-3 h-3 ml-1" />
              {report.status === "verified" ? "تقرير موثق" : "قيد المراجعة"}
            </Badge>
            <div className="flex items-center gap-1 text-white/80 text-xs bg-white/10 px-2 py-1 rounded-full">
              <Eye className="w-3 h-3" />
              {report.views} مشاهدة
            </div>
          </div>
          
          <CardTitle className="text-white text-xl line-clamp-2 mb-2 font-bold">
            {report.title}
          </CardTitle>
          
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <User className="w-4 h-4" />
            <span>بواسطة {report.author}</span>
            <span>•</span>
            <Calendar className="w-4 h-4" />
            <span>{timeAgo(report.date)}</span>
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-6">
        <div className="space-y-4">
          {/* Alert Info */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg p-4 border border-red-200/50 dark:border-red-800/50">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-red-800 dark:text-red-300 text-sm mb-1">
                    المتهم: {report.accusedName}
                  </div>
                  <div className="text-red-700 dark:text-red-400 text-sm">
                    الدورة: {report.courseName}
                  </div>
                  <a
                    href={`https://instagram.com/${report.instagramHandle.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm mt-1 transition-colors"
                  >
                    <Instagram className="w-3 h-3" />
                    {report.instagramHandle}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">التقييم:</span>
              <StarRating
                rating={report.rating}
                readonly
                size="sm"
                showLabel={false}
              />
              <span className={`text-sm font-bold ${
                report.rating <= 2 ? 'text-red-600' : 
                report.rating <= 3 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {report.rating}/5
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3" />
              تقرير مفصل
            </div>
          </div>

          {/* Description */}
          <CardDescription className="line-clamp-3 text-base leading-relaxed">
            {report.excerpt}
          </CardDescription>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {report.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-muted/50 hover:bg-muted transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-gradient-hero hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]" 
          size="lg"
        >
          <MessageSquare className="w-4 h-4 ml-2" />
          اقرأ التقرير كاملاً
        </Button>
      </CardFooter>
    </Card>
  );
};

const ReportCardSkeleton = () => <Card>{/* Skeleton implementation */}</Card>;

export { ReportCard, ReportCardSkeleton };
