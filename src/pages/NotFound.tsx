import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/90 mb-4">عذراً! الصفحة غير موجودة</p>
        <a href="/" className="text-white hover:text-accent underline">
          العودة إلى الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;
