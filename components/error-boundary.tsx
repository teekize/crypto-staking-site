// components/error-boundary.tsx
"use client";

import React from "react";
// import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   console.error('Uncaught error:', error, errorInfo)
  // }

  componentDidCatch(/* error: Error, info: React.ErrorInfo */) {
    // If you don't need 'error' and 'info', you can omit them or comment them out
    // Handle errors here if necessary
  }

  render() {
    // if (this.state.hasError) {
    //   return (
    //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //       <h2 className="text-2xl font-bold mb-4">Oops, there was an error!</h2>
    //       <Button onClick={() => this.setState({ hasError: false })}>
    //         Try again
    //       </Button>
    //     </div>
    //   )
    // }

    return this.props.children;
  }
}

export default ErrorBoundary;
