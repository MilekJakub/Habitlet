import React from "react";
import Body from "./typography/body";
import { Heading1 } from "lucide-react";
import Header from "./typography/header";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
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

export default ErrorBoundary;
