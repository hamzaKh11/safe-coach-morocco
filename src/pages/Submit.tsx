import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Report Details", icon: FileText },
  { id: 3, title: "Rating & Proof", icon: Star },
  { id: 4, title: "Review & Submit", icon: Send }
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
    isAnonymous: false
  });
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (formData.proofFiles.length + files.length > 5) {
      toast({
        title: "Too many files",
        description: "Maximum 5 files allowed",
        variant: "destructive",
      });
      return;
    }
    
    handleInputChange('proofFiles', [...formData.proofFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = formData.proofFiles.filter((_, i) => i !== index);
    handleInputChange('proofFiles', newFiles);
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
      title: "Supabase Integration Required",
      description: "Please connect to Supabase to enable report submission functionality.",
      variant: "destructive",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number (optional)"
              />
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Privacy Notice</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal information is kept secure and will only be used to verify your report. 
                You can choose to make your report anonymous in the final step.
              </p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accusedName">Accused Person's Name *</Label>
              <Input
                id="accusedName"
                value={formData.accusedName}
                onChange={(e) => handleInputChange('accusedName', e.target.value)}
                placeholder="Full name of the person/coach"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagramHandle">Instagram Handle *</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                  placeholder="@username"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="courseName">Course/Service Name *</Label>
              <Input
                id="courseName"
                value={formData.courseName}
                onChange={(e) => handleInputChange('courseName', e.target.value)}
                placeholder="Name of the course or service"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your experience in detail. Include what happened, what you paid, what you received, and any other relevant information..."
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                Be specific and factual. This helps others understand your experience.
              </p>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Overall Rating *</Label>
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => handleInputChange('rating', rating)}
                size="lg"
              />
            </div>
            
            <div className="space-y-3">
              <Label>Upload Proof (Optional)</Label>
              <p className="text-sm text-muted-foreground">
                Upload screenshots, receipts, or any other evidence to support your report. Maximum 5 files.
              </p>
              
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, PDF up to 10MB each
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
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose Files
                </Button>
              </div>
              
              {formData.proofFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({formData.proofFiles.length}/5)</Label>
                  {formData.proofFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
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
              <h3 className="font-medium mb-3">Review Your Report</h3>
              
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Your Name:</span>
                    <p className="text-muted-foreground">{formData.fullName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-muted-foreground">{formData.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Accused:</span>
                    <p className="text-muted-foreground">{formData.accusedName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Instagram:</span>
                    <p className="text-muted-foreground">{formData.instagramHandle}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Course/Service:</span>
                  <p className="text-muted-foreground">{formData.courseName}</p>
                </div>
                
                <div>
                  <span className="font-medium">Rating:</span>
                  <div className="mt-1">
                    <StarRating rating={formData.rating} readonly size="sm" />
                  </div>
                </div>
                
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-muted-foreground line-clamp-3">{formData.description}</p>
                </div>
                
                {formData.proofFiles.length > 0 && (
                  <div>
                    <span className="font-medium">Proof Files:</span>
                    <p className="text-muted-foreground">{formData.proofFiles.length} files uploaded</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-sm">Important Notice</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                By submitting this report, you confirm that the information provided is accurate and truthful. 
                False reports may result in account suspension.
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
        <div className="bg-gradient-hero py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Report a Scam
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Help protect others by sharing your experience with digital coaches and online courses
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Please provide your contact information"}
                {currentStep === 2 && "Tell us about the person/service you're reporting"}
                {currentStep === 3 && "Rate your experience and upload any supporting evidence"}
                {currentStep === 4 && "Review your report before submitting"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {renderStep()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    variant="hero"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && (!formData.fullName || !formData.email)) ||
                      (currentStep === 2 && (!formData.accusedName || !formData.instagramHandle || !formData.courseName || !formData.description)) ||
                      (currentStep === 3 && formData.rating === 0)
                    }
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
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