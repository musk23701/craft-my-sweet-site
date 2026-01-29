<?php
/**
 * Automind Labs Theme Functions
 *
 * @package Automind_Labs
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 */
function automind_labs_setup() {
    // Add theme support
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ) );
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );
    add_theme_support( 'customize-selective-refresh-widgets' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'editor-styles' );

    // Elementor support
    add_theme_support( 'elementor' );
    add_theme_support( 'header-footer-elementor' );

    // Register navigation menus
    register_nav_menus( array(
        'primary'   => esc_html__( 'Primary Menu', 'automind-labs' ),
        'footer'    => esc_html__( 'Footer Menu', 'automind-labs' ),
        'mobile'    => esc_html__( 'Mobile Menu', 'automind-labs' ),
    ) );

    // Set content width
    if ( ! isset( $content_width ) ) {
        $content_width = 1400;
    }
}
add_action( 'after_setup_theme', 'automind_labs_setup' );

/**
 * Enqueue Scripts and Styles
 */
function automind_labs_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'automind-labs-fonts',
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap',
        array(),
        null
    );

    // Theme stylesheet
    wp_enqueue_style(
        'automind-labs-style',
        get_stylesheet_uri(),
        array( 'automind-labs-fonts' ),
        wp_get_theme()->get( 'Version' )
    );

    // jQuery (WordPress includes it)
    wp_enqueue_script( 'jquery' );

    // Theme JavaScript
    wp_enqueue_script(
        'automind-labs-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array( 'jquery' ),
        wp_get_theme()->get( 'Version' ),
        true
    );

    // Localize script for AJAX
    wp_localize_script( 'automind-labs-script', 'automindLabs', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'automind_labs_nonce' ),
        'homeUrl' => home_url(),
    ) );

    // Comment reply script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'automind_labs_scripts' );

/**
 * Enqueue Admin/Editor Styles
 */
function automind_labs_admin_scripts() {
    wp_enqueue_style(
        'automind-labs-admin',
        get_template_directory_uri() . '/assets/css/admin.css',
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'admin_enqueue_scripts', 'automind_labs_admin_scripts' );

/**
 * Register Widget Areas
 */
function automind_labs_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar', 'automind-labs' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here to appear in the sidebar.', 'automind-labs' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer 1', 'automind-labs' ),
        'id'            => 'footer-1',
        'description'   => esc_html__( 'First footer widget area.', 'automind-labs' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer 2', 'automind-labs' ),
        'id'            => 'footer-2',
        'description'   => esc_html__( 'Second footer widget area.', 'automind-labs' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer 3', 'automind-labs' ),
        'id'            => 'footer-3',
        'description'   => esc_html__( 'Third footer widget area.', 'automind-labs' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'automind_labs_widgets_init' );

/**
 * Elementor Support Functions
 */

// Disable default colors and fonts in Elementor
function automind_labs_elementor_disable_defaults() {
    add_action( 'elementor/editor/after_enqueue_styles', function() {
        wp_enqueue_style(
            'automind-labs-elementor-editor',
            get_template_directory_uri() . '/assets/css/elementor-editor.css',
            array(),
            wp_get_theme()->get( 'Version' )
        );
    } );
}
add_action( 'init', 'automind_labs_elementor_disable_defaults' );

// Add theme colors to Elementor
function automind_labs_elementor_kit_settings( $config ) {
    $config['colors'] = array(
        array(
            '_id'   => 'primary',
            'title' => __( 'Primary', 'automind-labs' ),
            'color' => '#00a9ce',
        ),
        array(
            '_id'   => 'secondary',
            'title' => __( 'Secondary', 'automind-labs' ),
            'color' => '#141414',
        ),
        array(
            '_id'   => 'text',
            'title' => __( 'Text', 'automind-labs' ),
            'color' => '#ffffff',
        ),
        array(
            '_id'   => 'accent',
            'title' => __( 'Accent', 'automind-labs' ),
            'color' => '#00a9ce',
        ),
    );
    return $config;
}
add_filter( 'elementor/kit/get_settings', 'automind_labs_elementor_kit_settings' );

// Register Elementor Locations
function automind_labs_register_elementor_locations( $elementor_theme_manager ) {
    $elementor_theme_manager->register_location( 'header' );
    $elementor_theme_manager->register_location( 'footer' );
    $elementor_theme_manager->register_location( 'single' );
    $elementor_theme_manager->register_location( 'archive' );
}
add_action( 'elementor/theme/register_locations', 'automind_labs_register_elementor_locations' );

/**
 * Custom Page Templates
 */
function automind_labs_page_templates( $templates ) {
    $templates['template-full-width.php'] = __( 'Full Width', 'automind-labs' );
    $templates['template-elementor-full.php'] = __( 'Elementor Full Width', 'automind-labs' );
    $templates['template-canvas.php'] = __( 'Elementor Canvas', 'automind-labs' );
    return $templates;
}
add_filter( 'theme_page_templates', 'automind_labs_page_templates' );

/**
 * Theme Customizer
 */
function automind_labs_customize_register( $wp_customize ) {
    // Theme Options Panel
    $wp_customize->add_panel( 'automind_labs_options', array(
        'title'    => __( 'Automind Labs Options', 'automind-labs' ),
        'priority' => 30,
    ) );

    // Header Section
    $wp_customize->add_section( 'automind_labs_header', array(
        'title'    => __( 'Header Settings', 'automind-labs' ),
        'panel'    => 'automind_labs_options',
        'priority' => 10,
    ) );

    // Show Sidebar
    $wp_customize->add_setting( 'show_sidebar', array(
        'default'           => true,
        'sanitize_callback' => 'automind_labs_sanitize_checkbox',
    ) );

    $wp_customize->add_control( 'show_sidebar', array(
        'label'    => __( 'Show Desktop Sidebar', 'automind-labs' ),
        'section'  => 'automind_labs_header',
        'type'     => 'checkbox',
    ) );

    // Social Links Section
    $wp_customize->add_section( 'automind_labs_social', array(
        'title'    => __( 'Social Links', 'automind-labs' ),
        'panel'    => 'automind_labs_options',
        'priority' => 20,
    ) );

    $social_networks = array(
        'youtube'   => 'YouTube',
        'instagram' => 'Instagram',
        'twitter'   => 'Twitter/X',
        'linkedin'  => 'LinkedIn',
        'facebook'  => 'Facebook',
        'tiktok'    => 'TikTok',
    );

    foreach ( $social_networks as $network => $label ) {
        $wp_customize->add_setting( 'social_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );

        $wp_customize->add_control( 'social_' . $network, array(
            'label'   => $label . ' URL',
            'section' => 'automind_labs_social',
            'type'    => 'url',
        ) );
    }

    // Contact Section
    $wp_customize->add_section( 'automind_labs_contact', array(
        'title'    => __( 'Contact Information', 'automind-labs' ),
        'panel'    => 'automind_labs_options',
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'contact_email', array(
        'default'           => 'hello@automindlabs.ai',
        'sanitize_callback' => 'sanitize_email',
    ) );

    $wp_customize->add_control( 'contact_email', array(
        'label'   => __( 'Email Address', 'automind-labs' ),
        'section' => 'automind_labs_contact',
        'type'    => 'email',
    ) );

    $wp_customize->add_setting( 'booking_url', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'booking_url', array(
        'label'   => __( 'Booking Calendar URL', 'automind-labs' ),
        'section' => 'automind_labs_contact',
        'type'    => 'url',
    ) );

    // Footer Section
    $wp_customize->add_section( 'automind_labs_footer', array(
        'title'    => __( 'Footer Settings', 'automind-labs' ),
        'panel'    => 'automind_labs_options',
        'priority' => 40,
    ) );

    $wp_customize->add_setting( 'footer_tagline', array(
        'default'           => 'Empowering businesses with intelligent automation solutions.',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'footer_tagline', array(
        'label'   => __( 'Footer Tagline', 'automind-labs' ),
        'section' => 'automind_labs_footer',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'copyright_text', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'copyright_text', array(
        'label'       => __( 'Custom Copyright Text', 'automind-labs' ),
        'description' => __( 'Leave empty for default.', 'automind-labs' ),
        'section'     => 'automind_labs_footer',
        'type'        => 'text',
    ) );
}
add_action( 'customize_register', 'automind_labs_customize_register' );

/**
 * Sanitize checkbox
 */
function automind_labs_sanitize_checkbox( $checked ) {
    return ( ( isset( $checked ) && true == $checked ) ? true : false );
}

/**
 * Custom Nav Walker for Desktop Navigation
 */
class Automind_Labs_Nav_Walker extends Walker_Nav_Menu {
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'nav-item';
        
        if ( in_array( 'current-menu-item', $classes ) ) {
            $classes[] = 'active';
        }

        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        $output .= '<li' . $class_names . '>';

        $atts = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target ) ? $item->target : '';
        $atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
        $atts['href']   = ! empty( $item->url ) ? $item->url : '';
        $atts['class']  = 'nav-link';
        
        if ( in_array( 'current-menu-item', $classes ) ) {
            $atts['class'] .= ' active';
        }

        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $title = apply_filters( 'the_title', $item->title, $item->ID );

        $item_output = $args->before;
        $item_output .= '<a' . $attributes . '>';
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}

/**
 * Custom Nav Walker for Mobile Navigation
 */
class Automind_Labs_Mobile_Nav_Walker extends Walker_Nav_Menu {
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class = 'nav-mobile-link';
        
        if ( in_array( 'current-menu-item', $classes ) ) {
            $class .= ' active';
        }

        $atts = array(
            'href'  => ! empty( $item->url ) ? esc_url( $item->url ) : '',
            'class' => $class,
        );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $attributes .= ' ' . $attr . '="' . esc_attr( $value ) . '"';
            }
        }

        $title = apply_filters( 'the_title', $item->title, $item->ID );

        $output .= '<a' . $attributes . '>';
        $output .= '<span>' . $title . '</span>';
        $output .= '</a>';
    }

    public function start_lvl( &$output, $depth = 0, $args = null ) {
        // No nested lists for mobile
    }

    public function end_lvl( &$output, $depth = 0, $args = null ) {
        // No nested lists for mobile
    }

    public function end_el( &$output, $item, $depth = 0, $args = null ) {
        // No list items, just links
    }
}

/**
 * Helper Functions
 */

// Get social links
function automind_labs_get_social_links() {
    $networks = array( 'youtube', 'instagram', 'twitter', 'linkedin', 'facebook', 'tiktok' );
    $links = array();

    foreach ( $networks as $network ) {
        $url = get_theme_mod( 'social_' . $network );
        if ( ! empty( $url ) ) {
            $links[ $network ] = $url;
        }
    }

    return $links;
}

// Display social icons
function automind_labs_social_icons( $class = 'social-icon-btn' ) {
    $links = automind_labs_get_social_links();
    
    if ( empty( $links ) ) {
        return;
    }

    $icons = array(
        'youtube'   => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>',
        'instagram' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
        'twitter'   => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>',
        'linkedin'  => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
        'facebook'  => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
        'tiktok'    => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>',
    );

    echo '<div class="social-icons">';
    foreach ( $links as $network => $url ) {
        printf(
            '<a href="%s" class="%s" target="_blank" rel="noopener noreferrer" aria-label="%s">%s</a>',
            esc_url( $url ),
            esc_attr( $class ),
            esc_attr( ucfirst( $network ) ),
            $icons[ $network ]
        );
    }
    echo '</div>';
}

// Get copyright text
function automind_labs_copyright() {
    $custom = get_theme_mod( 'copyright_text' );
    
    if ( ! empty( $custom ) ) {
        return esc_html( $custom );
    }

    return sprintf(
        '© %s %s. All rights reserved.',
        date( 'Y' ),
        get_bloginfo( 'name' )
    );
}

/**
 * AJAX Contact Form Handler
 */
function automind_labs_contact_form() {
    check_ajax_referer( 'automind_labs_nonce', 'nonce' );

    $name    = sanitize_text_field( $_POST['name'] ?? '' );
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $message = sanitize_textarea_field( $_POST['message'] ?? '' );

    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        wp_send_json_error( array( 'message' => 'Please fill in all fields.' ) );
    }

    if ( ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please enter a valid email address.' ) );
    }

    // Send email
    $to      = get_theme_mod( 'contact_email', get_option( 'admin_email' ) );
    $subject = sprintf( 'New Contact Form Submission from %s', $name );
    $body    = sprintf(
        "Name: %s\nEmail: %s\n\nMessage:\n%s",
        $name,
        $email,
        $message
    );
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        sprintf( 'Reply-To: %s <%s>', $name, $email ),
    );

    $sent = wp_mail( $to, $subject, $body, $headers );

    if ( $sent ) {
        wp_send_json_success( array( 'message' => 'Thank you for your message. We will get back to you soon!' ) );
    } else {
        wp_send_json_error( array( 'message' => 'There was an error sending your message. Please try again.' ) );
    }
}
add_action( 'wp_ajax_automind_contact_form', 'automind_labs_contact_form' );
add_action( 'wp_ajax_nopriv_automind_contact_form', 'automind_labs_contact_form' );

/**
 * Disable Gutenberg for specific templates
 */
function automind_labs_disable_gutenberg( $use_block_editor, $post ) {
    if ( $post ) {
        $template = get_page_template_slug( $post->ID );
        $elementor_templates = array(
            'template-elementor-full.php',
            'template-canvas.php',
        );
        
        if ( in_array( $template, $elementor_templates ) ) {
            return false;
        }
    }
    return $use_block_editor;
}
add_filter( 'use_block_editor_for_post', 'automind_labs_disable_gutenberg', 10, 2 );

/**
 * Add custom body classes
 */
function automind_labs_body_classes( $classes ) {
    // Add page slug
    global $post;
    if ( isset( $post ) ) {
        $classes[] = 'page-' . $post->post_name;
    }

    // Check for Elementor
    if ( did_action( 'elementor/loaded' ) ) {
        $classes[] = 'elementor-enabled';
    }

    // Check if sidebar is enabled
    if ( get_theme_mod( 'show_sidebar', true ) ) {
        $classes[] = 'has-sidebar';
    }

    return $classes;
}
add_filter( 'body_class', 'automind_labs_body_classes' );

/**
 * Add preload for critical fonts
 */
function automind_labs_preload_fonts() {
    ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php
}
add_action( 'wp_head', 'automind_labs_preload_fonts', 1 );

/**
 * Add theme color meta
 */
function automind_labs_theme_color() {
    ?>
    <meta name="theme-color" content="#000000">
    <meta name="msapplication-navbutton-color" content="#000000">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <?php
}
add_action( 'wp_head', 'automind_labs_theme_color' );
