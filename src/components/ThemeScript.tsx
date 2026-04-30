// Inline script that runs before React hydrates so the page paints in the
// user's chosen theme without a flash. The matching <script> is rendered
// directly in <head> by layout.tsx.

export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('toosoon-theme');
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersLight ? 'light' : 'dark');
    if (theme === 'light') document.documentElement.classList.add('light');
  } catch (e) {}
})();
`
