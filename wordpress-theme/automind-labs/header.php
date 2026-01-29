<?php
/**
 * The header template
 *
 * @package Automind_Labs
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php if ( get_theme_mod( 'show_sidebar', true ) ) : ?>
<!-- Desktop Sidebar -->
<aside class="sidebar">
    <div class="sidebar-logo">
        <?php if ( has_custom_logo() ) : ?>
            <?php the_custom_logo(); ?>
        <?php else : ?>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.png' ); ?>" alt="<?php bloginfo( 'name' ); ?>">
            </a>
        <?php endif; ?>
    </div>

    <nav class="sidebar-nav" aria-label="<?php esc_attr_e( 'Primary Navigation', 'automind-labs' ); ?>">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="sidebar-link <?php echo is_front_page() ? 'active' : ''; ?>" title="<?php esc_attr_e( 'Home', 'automind-labs' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>
        <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="sidebar-link <?php echo is_page( 'about' ) ? 'active' : ''; ?>" title="<?php esc_attr_e( 'About', 'automind-labs' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </a>
        <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="sidebar-link <?php echo is_page( 'portfolio' ) ? 'active' : ''; ?>" title="<?php esc_attr_e( 'Portfolio', 'automind-labs' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        </a>
        <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="sidebar-link <?php echo is_home() || is_singular( 'post' ) ? 'active' : ''; ?>" title="<?php esc_attr_e( 'Blog', 'automind-labs' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        </a>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="sidebar-link <?php echo is_page( 'contact' ) ? 'active' : ''; ?>" title="<?php esc_attr_e( 'Contact', 'automind-labs' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </a>
    </nav>

    <div class="sidebar-social">
        <?php automind_labs_social_icons(); ?>
    </div>
</aside>
<?php endif; ?>

<!-- Mobile Header -->
<header class="header">
    <div class="header-inner">
        <div class="logo">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.png' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="logo">
                </a>
            <?php endif; ?>
        </div>

        <nav class="nav-desktop">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'container'      => false,
                'items_wrap'     => '%3$s',
                'walker'         => new Automind_Labs_Nav_Walker(),
                'fallback_cb'    => false,
            ) );
            ?>
            <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary"><?php esc_html_e( 'Book a Call', 'automind-labs' ); ?></a>
        </nav>

        <button class="nav-mobile-toggle" id="mobile-menu-toggle" aria-label="<?php esc_attr_e( 'Toggle Menu', 'automind-labs' ); ?>">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>

<!-- Mobile Navigation -->
<nav class="nav-mobile" id="mobile-nav" aria-label="<?php esc_attr_e( 'Mobile Navigation', 'automind-labs' ); ?>">
    <div class="nav-mobile-links">
        <?php
        wp_nav_menu( array(
            'theme_location' => 'mobile',
            'container'      => false,
            'items_wrap'     => '%3$s',
            'walker'         => new Automind_Labs_Mobile_Nav_Walker(),
            'fallback_cb'    => function() {
                ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-mobile-link <?php echo is_front_page() ? 'active' : ''; ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    <span><?php esc_html_e( 'Home', 'automind-labs' ); ?></span>
                </a>
                <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="nav-mobile-link <?php echo is_page( 'about' ) ? 'active' : ''; ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                    <span><?php esc_html_e( 'About', 'automind-labs' ); ?></span>
                </a>
                <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="nav-mobile-link <?php echo is_page( 'portfolio' ) ? 'active' : ''; ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span><?php esc_html_e( 'Portfolio', 'automind-labs' ); ?></span>
                </a>
                <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="nav-mobile-link <?php echo is_home() ? 'active' : ''; ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    <span><?php esc_html_e( 'Blog', 'automind-labs' ); ?></span>
                </a>
                <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="nav-mobile-link <?php echo is_page( 'contact' ) ? 'active' : ''; ?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span><?php esc_html_e( 'Contact', 'automind-labs' ); ?></span>
                </a>
                <?php
            },
        ) );
        ?>
        <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary btn-full" style="margin-top: 1rem;">
            <?php esc_html_e( 'Book a Call', 'automind-labs' ); ?>
        </a>
    </div>
</nav>
