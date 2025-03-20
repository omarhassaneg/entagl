// Immediate execution script to fix Cal.com dark mode
(function() {
  // Add style tag with !important rules for dark mode
  const styleTag = document.createElement('style');
  styleTag.id = 'cal-dark-mode-fix';
  styleTag.innerHTML = `
    /* Direct fix for the white background in dark mode */
    html.dark .ReactModalPortal,
    html.dark .ReactModalPortal > div,
    html.dark .ReactModalPortal > div > div,
    html.dark [data-cal-embed="inline"],
    html.dark [data-cal-embed="popup"],
    html.dark [data-cal-embed-popup],
    html.dark div[data-cal-namespace],
    html.dark .cal-embed,
    html.dark .cal-embed-popup,
    html.dark .cal-embed iframe,
    html.dark .cal-embed__overlay,
    html.dark div[data-testid="overlay"] {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    
    /* Fix for the popup overlay */
    html.dark .cal-embed__overlay,
    html.dark div[data-testid="overlay"] {
      backdrop-filter: blur(8px) !important;
      background-color: rgba(0, 0, 0, 0.7) !important;
    }
    
    /* Ensure we catch all possible Cal.com elements */
    html.dark iframe[src*="cal.com"],
    html.dark [class*="Cal-"],
    html.dark [class*="Cal__"] {
      background-color: transparent !important;
    }
    
    /* Extra important fix for the white background container */
    html.dark div[role="dialog"],
    html.dark div[role="dialog"] > div,
    html.dark div[data-testid="overlay"] + div,
    html.dark div[data-testid="overlay"] + div > div {
      background-color: transparent !important;
    }
  `;
  document.head.appendChild(styleTag);
  
  // Set up a mutation observer to catch dynamically added Cal.com elements
  function setupObserver() {
    const observer = new MutationObserver(function(mutations) {
      // Look for newly added Cal.com elements
      document.querySelectorAll('.ReactModalPortal, [data-cal-embed], [data-cal-namespace], .cal-embed, .cal-embed-popup, div[data-testid="overlay"]')
        .forEach(function(element) {
          if (document.documentElement.classList.contains('dark')) {
            // Force transparent background on all found elements
            element.style.setProperty('background-color', 'transparent', 'important');
            element.style.setProperty('box-shadow', 'none', 'important');
            
            // If this is a parent container, apply to all children
            Array.from(element.querySelectorAll('*')).forEach(function(child) {
              child.style.setProperty('background-color', 'transparent', 'important');
            });
          }
        });
    });
    
    // Start observing the document body for added nodes
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }
  
  // Run setup when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObserver);
  } else {
    setupObserver();
  }
  
  // Also fix when theme changes
  document.addEventListener('themeChange', function() {
    if (document.documentElement.classList.contains('dark')) {
      document.querySelectorAll('.ReactModalPortal, [data-cal-embed], [data-cal-namespace], .cal-embed, .cal-embed-popup, div[data-testid="overlay"]')
        .forEach(function(element) {
          element.style.setProperty('background-color', 'transparent', 'important');
        });
    }
  });
})();