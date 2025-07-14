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
    <Card className="group hover:shadow-soft transition-all duration-300 cursor-pointer flex flex-col border border-border/50 bg-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          {report.status === "verified" && (
            <Badge variant="secondary" className="text-xs">
              <Shield className="w-3 h-3 ml-1" />
              موثق
            </Badge>
          )}
          {report.views > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {report.views}
            </div>
          )}
        </div>
        
        <CardTitle className="text-base line-clamp-2 mb-2 font-medium">
          {report.title}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{timeAgo(report.date)}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {/* Main Info */}
        <div className="space-y-2">
          {report.accusedName && (
            <div className="text-sm font-medium text-foreground">
              {report.accusedName}
            </div>
          )}
          {report.courseName && (
            <div className="text-sm text-muted-foreground">
              {report.courseName}
            </div>
          )}
          {report.instagramHandle && (
            <a
              href={`https://instagram.com/${report.instagramHandle.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm transition-colors"
            >
              <Instagram className="w-3 h-3" />
              {report.instagramHandle}
            </a>
          )}
        </div>

        {/* Rating */}
        {report.rating > 0 && (
          <div className="flex items-center gap-2">
            <StarRating
              rating={report.rating}
              readonly
              size="sm"
              showLabel={false}
            />
          </div>
        )}

        {/* Description */}
        {report.excerpt && (
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {report.excerpt}
          </CardDescription>
        )}

        {/* Tags */}
        {report.tags && report.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {report.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 bg-muted/30">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          className="w-full text-sm" 
          variant="ghost"
          size="sm"
        >
          عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
};

const ReportCardSkeleton = () => <Card>{/* Skeleton implementation */}</Card>;

export { ReportCard, ReportCardSkeleton };
