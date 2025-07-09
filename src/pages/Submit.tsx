import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  AlertTriangle,
  User,
  Instagram,
  Mail,
  Phone,
  Shield,
  FileText,
  Star,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "المعلومات الشخصية", icon: User },
  { id: 2, title: "تفاصيل التقرير", icon: FileText },
  { id: 3, title: "التقييم والإثبات", icon: Star },
  { id: 4, title: "المراجعة والإرسال", icon: Send },
];

export default function Submit() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: "",
    email: "",
    phone: "",

    // Step 2 - Report Details
    accusedName: "",
    instagramHandle: "",
    courseName: "",
    description: "",

    // Step 3 - Rating & Proof
    rating: 0,
    proofFiles: [] as File[],

    // Step 4 - Additional
    isAnonymous: false,
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.proofFiles.length + files.length > 5) {
      toast({
        title: "عدد كبير من الملفات",
        description: "الحد الأقصى 5 ملفات مسموح",
        variant: "destructive",
      });
      return;
    }

    handleInputChange("proofFiles", [...formData.proofFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.proofFiles.filter((_, i) => i !== index);
    handleInputChange("proofFiles", newFiles);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "يتطلب ربط Supabase",
      description: "يرجى الاتصال بـ Supabase لتمكين وظيفة إرسال التقارير.",
      variant: "destructive",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">عنوان البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="أدخل عنوان بريدك الإلكتروني"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="أدخل رقم هاتفك (اختياري)"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">إشعار الخصوصية</span>
              </div>
              <p className="text-sm text-muted-foreground">
                معلوماتك الشخصية محفوظة بأمان وستُستخدم فقط للتحقق من تقريرك.
                يمكنك اختيار جعل تقريرك مجهول الهوية في الخطوة الأخيرة.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accusedName">اسم الشخص المتهم *</Label>
              <Input
                id="accusedName"
                value={formData.accusedName}
                onChange={(e) =>
                  handleInputChange("accusedName", e.target.value)
                }
                placeholder="الاسم الكامل للشخص/المدرب"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagramHandle">حساب الإنستغرام *</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={(e) =>
                    handleInputChange("instagramHandle", e.target.value)
                  }
                  placeholder="@username"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseName">اسم الدورة/الخدمة *</Label>
              <Input
                id="courseName"
                value={formData.courseName}
                onChange={(e) =>
                  handleInputChange("courseName", e.target.value)
                }
                placeholder="اسم الدورة أو الخدمة"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف مفصل *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="اوصف تجربتك بالتفصيل. أدرج ما حدث، ما دفعته، ما تلقيته، وأي معلومات أخرى ذات صلة..."
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                كن محدداً وواقعياً. هذا يساعد الآخرين على فهم تجربتك.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>التقييم الإجمالي *</Label>
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => handleInputChange("rating", rating)}
                size="lg"
              />
            </div>

            <div className="space-y-3">
              <Label>رفع الإثبات (اختياري)</Label>
              <p className="text-sm text-muted-foreground">
                ارفع لقطات شاشة أو إيصالات أو أي أدلة أخرى لدعم تقريرك. الحد
                الأقصى 5 ملفات.
              </p>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  انقر للرفع أو اسحب وأسقط
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, PDF حتى 10 ميجابايت لكل ملف
                </p>
                <input
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  اختر الملفات
                </Button>
              </div>

              {formData.proofFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>
                    الملفات المرفوعة ({formData.proofFiles.length}/5)
                  </Label>
                  {formData.proofFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted/50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-3">مراجعة تقريرك</h3>

              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">اسمك:</span>
                    <p className="text-muted-foreground">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="font-medium">البريد الإلكتروني:</span>
                    <p className="text-muted-foreground">{formData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">المتهم:</span>
                    <p className="text-muted-foreground">
                      {formData.accusedName}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">الإنستغرام:</span>
                    <p className="text-muted-foreground">
                      {formData.instagramHandle}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-medium">الدورة/الخدمة:</span>
                  <p className="text-muted-foreground">{formData.courseName}</p>
                </div>

                <div>
                  <span className="font-medium">التقييم:</span>
                  <div className="mt-1">
                    <StarRating rating={formData.rating} readonly size="sm" />
                  </div>
                </div>

                <div>
                  <span className="font-medium">الوصف:</span>
                  <p className="text-muted-foreground line-clamp-3">
                    {formData.description}
                  </p>
                </div>

                {formData.proofFiles.length > 0 && (
                  <div>
                    <span className="font-medium">ملفات الإثبات:</span>
                    <p className="text-muted-foreground">
                      {formData.proofFiles.length} ملفات مرفوعة
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-sm">إشعار هام</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                بإرسال هذا التقرير، تؤكد أن المعلومات المقدمة دقيقة وصحيحة.
                التقارير الكاذبة قد تؤدي إلى إيقاف الحساب.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-hero py-12 sm:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              الإبلاغ عن احتيال
            </h1>
            <p className="text-base sm:text-xl text-white/90 max-w-xl mx-auto">
              ساعد في حماية الآخرين من خلال مشاركة تجربتك مع المدربين الرقميين
              والدورات الإلكترونية
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
            <nav aria-label="Progress" className="w-full">
              <ol className="flex w-full justify-between items-center gap-2 sm:gap-4">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <li
                      key={step.id}
                      className="flex-1 flex flex-col items-center min-w-0"
                    >
                      <div className="flex flex-col items-center w-full">
                        <div
                          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200 font-bold text-base sm:text-lg ${
                            isActive
                              ? "bg-white border-primary text-primary shadow-sm"
                              : isCompleted
                              ? "bg-white border-muted-foreground text-muted-foreground opacity-60"
                              : "bg-white border-muted-foreground text-muted-foreground opacity-40"
                          }`}
                        >
                          <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span
                          className={`mt-2 text-[11px] sm:text-xs font-medium text-center break-words w-full ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground opacity-80"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index !== steps.length - 1 && (
                        <div
                          className="hidden sm:block absolute right-0 top-1/2 w-full h-0.5 bg-muted-foreground/10 z-0"
                          style={{ left: "50%", right: "-50%" }}
                        ></div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {currentStep === 1 && "يرجى تقديم معلومات الاتصال الخاصة بك"}
                {currentStep === 2 && "أخبرنا عن الشخص/الخدمة التي تبلغ عنها"}
                {currentStep === 3 && "قيم تجربتك وارفع أي أدلة داعمة"}
                {currentStep === 4 && "راجع تقريرك قبل الإرسال"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto"
                >
                  <ChevronRight className="w-4 h-4 ml-2" />
                  السابق
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    variant="hero"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 &&
                        (!formData.fullName || !formData.email)) ||
                      (currentStep === 2 &&
                        (!formData.accusedName ||
                          !formData.instagramHandle ||
                          !formData.courseName ||
                          !formData.description)) ||
                      (currentStep === 3 && formData.rating === 0)
                    }
                    className="w-full sm:w-auto"
                  >
                    التالي
                    <ChevronLeft className="w-4 h-4 mr-2" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    إرسال التقرير
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
