import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  User,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Search,
  Filter,
  Settings,
  LogOut,
  Instagram,
  MessageSquare,
  Clock
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";

export default function Admin() {
  const [pendingReports, setPendingReports] = useState([]);
  const [approvedReports, setApprovedReports] = useState([]);
  const [rejectedReports, setRejectedReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchReports();
      fetchStats();
    }
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || profile?.role !== 'admin') {
        toast({
          title: "غير مخول",
          description: "ليس لديك صلاحية للوصول إلى لوحة الإدارة",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const pending = data?.filter(r => r.status === 'pending') || [];
      const approved = data?.filter(r => r.status === 'approved') || [];
      const rejected = data?.filter(r => r.status === 'rejected') || [];

      setPendingReports(pending);
      setApprovedReports(approved);
      setRejectedReports(rejected);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في تحميل التقارير",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { count: total } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true });

      const { count: pending } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: approved } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      const { count: rejected } = await supabase
        .from('reports')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rejected');

      setStats({ total: total || 0, pending: pending || 0, approved: approved || 0, rejected: rejected || 0 });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleApproveReport = async (reportId) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', reportId);

      if (error) throw error;

      if (adminNote.trim()) {
        await supabase
          .from('admin_notes')
          .insert([{
            report_id: reportId,
            admin_id: user.id,
            note: adminNote
          }]);
      }

      toast({
        title: "تم الموافقة",
        description: "تم الموافقة على التقرير بنجاح",
      });

      fetchReports();
      fetchStats();
      setAdminNote("");
      setSelectedReport(null);
    } catch (error) {
      console.error('Error approving report:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الموافقة على التقرير",
        variant: "destructive",
      });
    }
  };

  const handleRejectReport = async (reportId) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: 'rejected', updated_at: new Date().toISOString() })
        .eq('id', reportId);

      if (error) throw error;

      if (adminNote.trim()) {
        await supabase
          .from('admin_notes')
          .insert([{
            report_id: reportId,
            admin_id: user.id,
            note: adminNote
          }]);
      }

      toast({
        title: "تم الرفض",
        description: "تم رفض التقرير",
      });

      fetchReports();
      fetchStats();
      setAdminNote("");
      setSelectedReport(null);
    } catch (error) {
      console.error('Error rejecting report:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء رفض التقرير",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const ReportCard = ({ report, showActions = false }) => {
    const timeAgo = (date) => {
      const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
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
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2 mb-2">
                {report.course_name}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {report.is_anonymous ? "مجهول" : report.profiles?.full_name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {timeAgo(report.created_at)}
                </span>
              </div>
            </div>
            <Badge
              variant={
                report.status === "approved" ? "default" : 
                report.status === "rejected" ? "destructive" : "secondary"
              }
            >
              {report.status === "approved" ? "موافق عليه" : 
               report.status === "rejected" ? "مرفوض" : "قيد المراجعة"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">المتهم:</span> {report.accused_name}
                </div>
                <div className="flex items-center gap-1">
                  <Instagram className="w-3 h-3" />
                  {report.instagram_handle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={report.rating} readonly size="sm" showLabel={false} />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="w-3 h-3" />
                {report.views} مشاهدة
              </div>
            </div>

            <CardDescription className="line-clamp-3">
              {report.description}
            </CardDescription>

            {showActions && (
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => {
                    setSelectedReport(report);
                    handleApproveReport(report.id);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  موافقة
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSelectedReport(report);
                    handleRejectReport(report.id);
                  }}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  رفض
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">لوحة الإدارة</h1>
                <p className="text-white/80 text-sm">إدارة التقارير والمراجعات</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/80 text-sm">مرحباً، المدير</span>
              <Button variant="ghost" onClick={handleSignOut} className="text-white hover:bg-white/20">
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي التقارير</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">قيد المراجعة</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">موافق عليها</p>
                  <p className="text-3xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">مرفوضة</p>
                  <p className="text-3xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              قيد المراجعة ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              موافق عليها ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              مرفوضة ({stats.rejected})
            </TabsTrigger>
          </TabsList>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="بحث في التقارير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingReports
                .filter(report => 
                  report.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.accused_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.instagram_handle.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((report) => (
                  <ReportCard key={report.id} report={report} showActions={true} />
                ))}
              {pendingReports.length === 0 && (
                <div className="lg:col-span-2 text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">لا توجد تقارير قيد المراجعة</h3>
                  <p className="text-muted-foreground">جميع التقارير تم مراجعتها</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {approvedReports
                .filter(report => 
                  report.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.accused_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.instagram_handle.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rejectedReports
                .filter(report => 
                  report.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.accused_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  report.instagram_handle.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Admin Note Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>إضافة ملاحظة إدارية</CardTitle>
                <CardDescription>
                  إضافة ملاحظة اختيارية حول هذا التقرير
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="أدخل ملاحظتك هنا..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={4}
                />
              </CardContent>
              <div className="flex gap-2 p-6 pt-0">
                <Button
                  onClick={() => setSelectedReport(null)}
                  variant="outline"
                  className="flex-1"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={() => {
                    // The action was already performed, just close modal
                    setSelectedReport(null);
                    setAdminNote("");
                  }}
                  className="flex-1"
                >
                  حفظ
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}