import React from 'react';
import { createRoot } from 'react-dom/client';
import "./index.css"
import App from './frontend/components/App/App';
import Header from './frontend/components/Header/Header';
import { BrowserRouter } from 'react-router-dom';


export default function IndexPage() {
  return (
    <div className='index_page'>
        <BrowserRouter>
            <Header/>
            <App/>
        </BrowserRouter>
    </div>
  )
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<IndexPage />);
} else {
    console.error('No container element found!');
}
