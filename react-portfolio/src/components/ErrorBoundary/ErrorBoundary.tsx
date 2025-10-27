import { Component } from 'react';
import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faSync, faHome } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack || 'No additional info available'
    });
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          border: '2px dashed var(--border-color)',
          borderRadius: '8px',
          margin: '1rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h2 style={{ color: 'var(--accent-color)', margin: 0 }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0.5rem 0' }}>
            We encountered an error while loading this section. You can try one of the options below:
          </p>

          {this.state.error && (
            <details style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--gray-light)',
              borderRadius: '6px',
              textAlign: 'left',
              maxWidth: '600px',
              width: '100%'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
                Error Details
              </summary>
              <code style={{
                display: 'block',
                fontSize: '0.85rem',
                color: '#d32f2f',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.toString()}
              </code>
            </details>
          )}

          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'var(--button-border-width, 2px) solid var(--accent-color)',
                borderRadius: 'var(--button-border-radius, 12px)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={faRedo} /> Try Again
            </button>
            <button
              onClick={this.handleReload}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                border: 'var(--button-border-width, 2px) solid var(--border-color)',
                borderRadius: 'var(--button-border-radius, 12px)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={faSync} /> Reload Page
            </button>
            <button
              onClick={this.handleGoHome}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                border: 'var(--button-border-width, 2px) solid var(--border-color)',
                borderRadius: 'var(--button-border-radius, 12px)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <FontAwesomeIcon icon={faHome} /> Go Home
            </button>
          </div>

          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            marginTop: '1rem'
          }}>
            If this problem persists, please contact support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
