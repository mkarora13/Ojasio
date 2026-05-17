import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App';
import * as MotionReact from 'motion/react';

export function render(url: string) {
  const helmetContext = {};
  
  const mDiv = MotionReact.motion.div as any;
  console.log("Debug motion.div default:", mDiv);
  console.log("Debug motion.div $$typeof:", mDiv && mDiv['$$typeof'] ? mDiv['$$typeof'].toString() : 'missing');
  
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
           <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
  
  return { html, helmetContext };
}
