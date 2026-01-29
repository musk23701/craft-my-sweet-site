# Automind Labs WordPress Theme

A complete WordPress theme with Elementor compatibility, matching the Automind Labs design.

## Installation

1. Download the `automind-labs` folder
2. Upload to `wp-content/themes/` in your WordPress installation
3. Activate the theme in Appearance → Themes
4. Install and activate Elementor (recommended)

## Required Setup

### 1. Add Images
Create folder: `assets/images/` and add:
- `logo.png` - Your logo (40x40px recommended)
- `hero-bg.jpg` - Homepage hero background
- `about-hero.jpg`, `contact-hero.jpg`, `booking-hero.jpg`, `portfolio-hero.jpg`, `blog-hero.jpg`
- `about-image.jpg`, `mission-image.jpg`, `case-study.jpg`
- `portfolio/project-1.jpg` through `project-6.jpg`

### 2. Create Pages
Create these pages and assign templates:
- **Home** - Set as Front Page (uses front-page.php automatically)
- **About** - Use "About Page" template
- **Portfolio** - Use "Portfolio Page" template
- **Blog** - Set as Posts Page
- **Contact** - Use "Contact Page" template
- **Booking** - Use "Booking Page" template

### 3. Configure Theme
Go to Appearance → Customize → Automind Labs Options:
- Add social media URLs
- Set contact email
- Add booking calendar URL (Calendly, Cal.com, etc.)
- Customize footer tagline

### 4. Set Up Menus
Go to Appearance → Menus:
- Create Primary Menu (desktop navigation)
- Create Mobile Menu
- Create Footer Menu

## Theme Features

- ✅ Dark theme with cyan accents
- ✅ Full Elementor compatibility
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Desktop sidebar navigation
- ✅ Mobile bottom sheet navigation
- ✅ Scroll reveal animations
- ✅ Typing text animation
- ✅ Counter animations
- ✅ FAQ accordion
- ✅ Contact form with AJAX
- ✅ Custom page templates
- ✅ Widget areas (sidebar, footer x3)
- ✅ Theme Customizer options

## Page Templates

- **Default** - Standard page with hero
- **Full Width** - Full width content
- **Elementor Full Width** - For Elementor pages with header/footer
- **Elementor Canvas** - Blank canvas (no header/footer)
- **About Page** - Pre-designed about page
- **Portfolio Page** - Portfolio grid layout
- **Contact Page** - Contact form layout
- **Booking Page** - Calendar embed layout

## Elementor Usage

For full Elementor control:
1. Create a new page
2. Select "Elementor Full Width" or "Elementor Canvas" template
3. Edit with Elementor
4. Build sections using the theme's design system

## File Structure

```
automind-labs/
├── style.css              # Main stylesheet + theme info
├── functions.php          # Theme setup, scripts, customizer
├── header.php             # Header + navigation
├── footer.php             # Footer
├── index.php              # Blog listing
├── front-page.php         # Homepage
├── page.php               # Default page
├── single.php             # Single post
├── 404.php                # 404 page
├── template-*.php         # Page templates
└── assets/
    ├── js/main.js         # JavaScript
    ├── css/admin.css      # Admin styles (create if needed)
    └── images/            # Theme images
```

## Support

For theme support or customization, contact Automind Labs.
