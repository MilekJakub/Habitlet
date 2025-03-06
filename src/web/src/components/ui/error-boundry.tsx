import React from "react";
import { Body } from "@/components/typography/body";
import { Header } from "@/components/typography/header";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center h-screen">
          <Header type="h1">Something went wrong 🔥</Header>
          <Body type="b1" className="mt-4">
            If you see this message, try refreshing the page.
          </Body>
          <Body type="b1">
            If the problem persists, please contact the developer.
          </Body>
        </div>
      );
    }

    return this.props.children;
  }
}
