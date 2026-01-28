# Automind Labs - Static HTML/CSS/JS Theme

This is a complete static theme export of the Automind Labs website, ready for WordPress/Elementor conversion.

## Folder Structure

```
static-theme/
├── css/
│   └── style.css          # Complete CSS with all styles and animations
├── js/
│   └── script.js          # jQuery-based JavaScript for interactions
├── images/
│   └── (add your images here)
│       ├── logo.png
│       └── favicon.ico
├── index.html             # Homepage
├── about.html             # About page
├── contact.html           # Contact page
├── booking.html           # Booking page
├── portfolio.html         # (create based on index.html template)
├── blog.html              # (create based on index.html template)
└── README.md              # This file
```

## Features Included

- ✅ Full responsive design (mobile, tablet, desktop)
- ✅ Dark theme with cyan accent colors
- ✅ Mobile navigation with bottom sheet menu
- ✅ Desktop sidebar navigation
- ✅ Typing text animation
- ✅ Scroll reveal animations
- ✅ FAQ accordion
- ✅ Marquee/carousel animations
- ✅ Counter animations
- ✅ Contact form with webhook submission
- ✅ All sections from original React site

## Dependencies

- jQuery 3.7.1 (loaded from CDN)
- Google Fonts: Montserrat

## WordPress/Elementor Conversion Tips

1. **CSS Variables**: All colors use CSS variables - easy to customize in `:root`
2. **Sections**: Each section is self-contained - copy as Elementor sections
3. **Animations**: Use Elementor's entrance animations or keep the CSS classes
4. **Forms**: Replace contact form with your WordPress form plugin
5. **Booking**: Replace iframe with your booking plugin shortcode

## Color Scheme

- Primary (Cyan): `hsl(193, 100%, 43%)`
- Background: `#000000`
- Card: `hsl(0, 0%, 3%)`
- Text: `#ffffff`
- Muted Text: `hsl(0, 0%, 70%)`

## Usage

1. Add your logo to `images/logo.png`
2. Update social links in HTML files
3. Replace booking iframe with your calendar widget
4. Update contact form webhook URL
5. Add any additional images to the images folder

## License

This theme is for use with Automind Labs projects only.
