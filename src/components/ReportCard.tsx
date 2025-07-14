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
    <Card className="group hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] cursor-pointer flex flex-col overflow-hidden bg-gradient-to-br from-card via-card/95 to-muted/20 border-0 shadow-soft">
      {/* Header with subtle gradient */}
      <div className="relative p-6 pb-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-transparent"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            {report.status === "verified" && (
              <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/15">
                <Shield className="w-3 h-3 ml-1" />
                موثق
              </Badge>
            )}
            {report.views > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full backdrop-blur-sm">
                <Eye className="w-3 h-3" />
                {report.views}
              </div>
            )}
          </div>
          
          <CardTitle className="text-lg line-clamp-2 mb-3 font-semibold text-foreground/90 leading-relaxed">
            {report.title}
          </CardTitle>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
            <Calendar className="w-3 h-3" />
            <span>{timeAgo(report.date)}</span>
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-6 pt-4 space-y-4">
        {/* Main Info with enhanced styling */}
        <div className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 border border-border/30">
          {report.accusedName && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/60"></div>
              <span className="text-sm font-medium text-foreground/90">
                {report.accusedName}
              </span>
            </div>
          )}
          {report.courseName && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent/60"></div>
              <span className="text-sm text-muted-foreground">
                {report.courseName}
              </span>
            </div>
          )}
          {report.instagramHandle && (
            <a
              href={`https://instagram.com/${report.instagramHandle.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm transition-all duration-300 hover:translate-x-1"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-medium">{report.instagramHandle}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>

        {/* Rating with enhanced design */}
        {report.rating > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
            <StarRating
              rating={report.rating}
              readonly
              size="sm"
              showLabel={false}
            />
            <span className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
              تقييم
            </span>
          </div>
        )}

        {/* Description with better styling */}
        {report.excerpt && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-background/80 to-muted/30 border-l-4 border-l-primary/30">
            <CardDescription className="line-clamp-2 text-sm leading-relaxed text-foreground/70">
              {report.excerpt}
            </CardDescription>
          </div>
        )}

        {/* Tags with enhanced design */}
        {report.tags && report.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {report.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-3 py-1 bg-gradient-to-r from-muted/40 to-muted/60 border-border/50 hover:from-primary/10 hover:to-accent/10 hover:border-primary/30 transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-2">
        <Button 
          className="w-full group-hover:shadow-soft transition-all duration-300 bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent border-0" 
          size="lg"
        >
          <MessageSquare className="w-4 h-4 ml-2" />
          <span className="font-medium">عرض التفاصيل</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

const ReportCardSkeleton = () => <Card>{/* Skeleton implementation */}</Card>;

export { ReportCard, ReportCardSkeleton };
