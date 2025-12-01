export default {
  plugins: {
    // Tailwind CSS
    tailwindcss: {},
    
    // Autoprefixer - adds vendor prefixes automatically
    autoprefixer: {
      overrideBrowserslist: [
        '>0.2%',
        'not dead',
        'not op_mini all',
        'last 2 versions',
        'Firefox ESR',
        'iOS >= 12',
        'Safari >= 12'
      ],
      grid: 'autoplace'
    },
    
    // CSS Nano - minification for production
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            colormin: true,
            minifyFontValues: true,
            minifySelectors: true,
          }
        ]
      }
    } : {})
  },
};
