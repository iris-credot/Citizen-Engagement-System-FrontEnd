import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './components/darkTheme.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <>
          <Toaster position="top-right" reverseOrder={false} />
          <App />
        </>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
