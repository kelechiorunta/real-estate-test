import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div>
            <h1>Welcome to my React JSX</h1>
        </div>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error('No container element found!');
}
