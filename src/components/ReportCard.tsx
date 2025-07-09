import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="hover:shadow-card transition-all duration-300 cursor-pointer flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl line-clamp-2 mb-2">
              {report.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                {platformIcon[report.platform] || (
                  <AppWindow className="w-4 h-4 text-gray-500" />
                )}
                {report.platform}
              </span>
            </div>
          </div>
          <Badge
            variant={report.status === "verified" ? "success" : "warning"}
            className="ml-2"
          >
            {report.status === "verified" ? (
              <CheckCircle className="w-3 h-3 ml-1" />
            ) : (
              <AlertTriangle className="w-3 h-3 ml-1" />
            )}
            {report.status === "verified" ? "موثق" : "قيد المراجعة"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">المتهم:</span>{" "}
                {report.accusedName}
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`https://instagram.com/${report.instagramHandle.substring(
                    1
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline text-blue-500"
                >
                  <Instagram className="w-3 h-3" />
                  {report.instagramHandle}
                </a>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium">الدورة:</span> {report.courseName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StarRating
              rating={report.rating}
              readonly
              size="sm"
              showLabel={false}
            />
            <div className="flex items-center gap-2 text-sm">
              <BookCopy className="w-4 h-4 text-muted-foreground" />
              <span>{report.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCent className="w-4 h-4 text-muted-foreground" />
              <span>{report.price} درهم</span>
            </div>
          </div>

          <CardDescription className="line-clamp-3">
            {report.excerpt}
          </CardDescription>

          <div className="flex flex-wrap gap-2">
            {report.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {report.views} مشاهدة
          </div>
          <span>{timeAgo(report.date)}</span>
        </div>
        <a
          href="#"
          className="text-sm text-primary hover:underline font-medium"
        >
          اقرأ التقرير كاملاً
        </a>
      </CardFooter>
    </Card>
  );
};

const ReportCardSkeleton = () => <Card>{/* Skeleton implementation */}</Card>;

export { ReportCard, ReportCardSkeleton };
