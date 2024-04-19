import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// Get the root container
const rootContainer = document.getElementById('root');

// Check if the root container exists
if (rootContainer) {
  // Check if the root has already been created for this container
  const existingRoot = rootContainer._reactRootContainer;

  if (!existingRoot) {
    // Create a new root if it doesn't exist
    const root = createRoot(rootContainer);

    // Render your application inside the root using the root.render method
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    // Use the existing root and render the application inside it
    existingRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} else {
  console.error('Root container not found');
}