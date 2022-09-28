import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

if (module.hot) module.hot.accept();

const container = document.getElementById('root')!;
const root = window.reactRoot = window.reactRoot || createRoot(container);
root.render(<App />);
