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
    <Card className="group hover:shadow-card transition-all duration-300 hover:scale-[1.01] cursor-pointer flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant={report.status === "verified" ? "default" : "secondary"}
            className="flex items-center gap-1"
          >
            <Shield className="w-3 h-3" />
            {report.status === "verified" ? "تقرير موثق" : "قيد المراجعة"}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            {report.views} مشاهدة
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2 mb-2">
          {report.title}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>بواسطة {report.author}</span>
          <span>•</span>
          <Calendar className="w-4 h-4" />
          <span>{timeAgo(report.date)}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          {/* Alert Info */}
          <div className="bg-muted/50 rounded-lg p-4 border">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    المتهم: {report.accusedName}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    الدورة: {report.courseName}
                  </div>
                  <a
                    href={`https://instagram.com/${report.instagramHandle.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm mt-1 transition-colors"
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
                report.rating <= 2 ? 'text-destructive' : 
                report.rating <= 3 ? 'text-warning' : 'text-success'
              }`}>
                {report.rating}/5
              </span>
            </div>
          </div>

          {/* Description */}
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
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
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          className="w-full" 
          variant="default"
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
