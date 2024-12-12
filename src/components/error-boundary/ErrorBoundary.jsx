import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error captured by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ color: "red" }}>Something went wrong.</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
