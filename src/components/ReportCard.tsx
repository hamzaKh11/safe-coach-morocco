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

  return (
    <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-[1.01] cursor-pointer flex flex-col overflow-hidden bg-card border border-border/60 hover:border-border">
      {/* Clean Header */}
      <div className="p-6 pb-4 bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-start justify-between mb-3">
          {report.status === "verified" && (
            <Badge variant="outline" className="bg-success/5 text-success border-success/30 text-xs">
              <Shield className="w-3 h-3 ml-1" />
              موثق
            </Badge>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{timeAgo(report.date)}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2 font-semibold text-foreground leading-relaxed">
          {report.title}
        </CardTitle>
      </div>

      <CardContent className="flex-1 p-6 pt-2 space-y-4">
        {/* Clean Info Section */}
        <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/40">
          {report.accusedName && (
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {report.accusedName}
              </span>
            </div>
          )}
          {report.courseName && (
            <div className="flex items-center gap-3">
              <BookCopy className="w-4 h-4 text-muted-foreground" />
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
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 text-sm transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-medium">{report.instagramHandle}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>

        {/* Clean Rating Display */}
        {report.rating > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/30">
            <StarRating
              rating={report.rating}
              readonly
              size="sm"
              showLabel={false}
            />
            <span className="text-xs text-muted-foreground">
              تقييم
            </span>
          </div>
        )}

        {/* Clean Description */}
        {report.excerpt && (
          <div className="p-4 rounded-lg bg-background border border-border/30">
            <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {report.excerpt}
            </CardDescription>
          </div>
        )}

        {/* Clean Tags */}
        {report.tags && report.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {report.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-3 py-1 bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50 transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Views Counter */}
        {report.views > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Eye className="w-3 h-3" />
            <span>{report.views} مشاهدة</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200" 
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
