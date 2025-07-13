import React from 'react';
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { Link } from "react-router"
const Error = () => {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
      <div className="text-red-500 mb-4">
        <AlertTriangle className="w-16 h-16" />
      </div>
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl mt-2 text-muted-foreground">Page Not Found</p>
      <p className="mt-4 max-w-md text-muted-foreground">
        Oops! The page you're looking for doesn't exist, was moved, or the link is broken.
      </p>

      <Button asChild className="mt-6">
        <Link to="/">← Go back to homepage</Link>
      </Button>

      
    </div>
  )
};

export default Error;