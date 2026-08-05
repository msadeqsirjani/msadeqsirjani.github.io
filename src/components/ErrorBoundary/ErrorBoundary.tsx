import {Component} from 'react';
import type {ReactNode} from 'react';
import ContentState from '../ContentState/ContentState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false, error: null, errorInfo: null};
  }

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error, errorInfo: null};
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack || 'No additional info available',
    });
  }

  handleReset = () => {
    this.setState({hasError: false, error: null, errorInfo: null});
    this.props.onReset?.();
  };

  override render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    const details =
      import.meta.env.DEV && this.state.error ? (
        <details className="content-state-details">
          <summary>Error details</summary>
          <code>
            {this.state.error.toString()}
            {this.state.errorInfo ? `\n${this.state.errorInfo}` : ''}
          </code>
        </details>
      ) : undefined;

    return (
      <div className="error-boundary-shell">
        <ContentState
          variant="error"
          title="This section could not be displayed"
          message="Try loading the section again. If the problem continues, refresh the page."
          actionLabel="Try again"
          onAction={this.handleReset}
          details={details}
        />
      </div>
    );
  }
}

export default ErrorBoundary;
