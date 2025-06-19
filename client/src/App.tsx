import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorFallback from "@/components/error-fallback";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error) => console.error("App Error:", error)}
        >
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Router />
          </Suspense>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              className: "bg-background text-foreground",
            }}
          />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
