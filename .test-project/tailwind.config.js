import responsiveScalePlugin from 'responsive-system/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px', 'sm': '640px', 'md': '768px', 'lg': '1024px',
        'xl': '1280px', '2xl': '1536px', '3xl': '1920px', '4xl': '2560px', '5xl': '3840px'
      }
    },
  },
  plugins: [
    responsiveScalePlugin({
      scaleProperties: {
        typography: true,
        spacing: true,
        lineHeight: true,
        letterSpacing: true,
        shadows: true,
        borderWidth: false,
        sizing: false,
        borderRadius: false
      },
      scales: {
        xs: 1.0, sm: 1.0, md: 1.0, lg: 1.0, xl: 1.0,
        '2xl': 1.05, '3xl': 1.15, '4xl': 1.25, '5xl': 1.35
      }
    })
  ],
}
