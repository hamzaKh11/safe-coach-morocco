import { Skeleton } from "@/components/ui/skeleton";

const LoadingAnimation = () => {
  return (
    <div className="w-full animate-fade-in-up">
      {/* Loading Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Loading Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-card rounded-lg border border-border p-6 space-y-4"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Card Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Card Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4" />
                ))}
              </div>
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>

            {/* Tags */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Loading Dots */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: '0.2s' }}
        ></div>
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: '0.4s' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;