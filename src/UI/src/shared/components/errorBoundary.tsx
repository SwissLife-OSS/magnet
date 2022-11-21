import React, { PureComponent } from "react";
import { AppError } from "../../views";

export type ErrorBoundaryProps = React.PropsWithChildren;

export interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state: ErrorBoundaryState = { hasError: false };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary", error, info);
  }

  render() {
    return this.state.hasError ? <AppError /> : this.props.children;
  }
}
