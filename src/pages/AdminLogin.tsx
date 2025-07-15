import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUpAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await signUpAdmin(email, password, fullName);
        if (error) {
          toast({
            title: "خطأ في التسجيل",
            description: error.message === "User already registered" 
              ? "المستخدم مسجل بالفعل" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم التسجيل بنجاح",
            description: "تم إنشاء حساب المشرف بنجاح",
          });
          navigate("/admin");
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: error.message === "Invalid login credentials" 
              ? "بيانات الدخول غير صحيحة" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "مرحباً بك في لوحة التحكم",
          });
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {isSignUp ? "إنشاء حساب مشرف" : "تسجيل دخول المشرف"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {isSignUp 
              ? "قم بإنشاء حساب مشرف جديد للوصول إلى لوحة التحكم"
              : "قم بتسجيل الدخول للوصول إلى لوحة التحكم الإدارية"
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert className="border-warning/50 bg-warning/5">
            <AlertCircle className="w-4 h-4 text-warning" />
            <AlertDescription className="text-sm">
              <strong>ملاحظة:</strong> تأكد من إعداد أدوار المستخدمين في Supabase أولاً
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  الاسم الكامل
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                  placeholder="أدخل كلمة المرور"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-1 top-1 h-10 w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold"
              disabled={loading}
            >
              {loading ? "جاري التحميل..." : isSignUp ? "إنشاء حساب مشرف" : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {isSignUp ? "لديك حساب؟ تسجيل دخول" : "حساب جديد؟ إنشاء حساب مشرف"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}