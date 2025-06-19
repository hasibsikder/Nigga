import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              404 Page Not Found
            </h1>
          </div>
        </CardHeader>

        <CardContent>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here are some helpful links:
            </p>

            <Button asChild variant="outline" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>

            <Button asChild variant="ghost" className="gap-2">
              <a href="mailto:support@example.com?subject=Missing%20Page">
                <AlertCircle className="h-4 w-4" />
                Report Missing Page
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
