import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../src/App';

export function render(url: string) {
  try {
    const appHtml = renderToString(
      React.createElement(
        StaticRouter,
        { location: url },
        React.createElement(App)
      )
    );

    return appHtml;
  } catch (err) {
    console.error('SSR render error:', err);
    return '';
  }
}
