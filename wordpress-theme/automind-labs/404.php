<?php
/**
 * 404 Page Template
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content">
    <section class="hero" style="min-height: 80vh;">
        <div class="hero-content text-center">
            <h1 style="font-size: 8rem; color: hsl(var(--primary)); margin-bottom: 1rem;">404</h1>
            <h2><?php esc_html_e( 'Page Not Found', 'automind-labs' ); ?></h2>
            <p class="text-muted" style="margin-bottom: 2rem;"><?php esc_html_e( 'The page you\'re looking for doesn\'t exist or has been moved.', 'automind-labs' ); ?></p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary btn-lg"><?php esc_html_e( 'Go Home', 'automind-labs' ); ?></a>
        </div>
    </section>
</main>

<?php get_footer();
