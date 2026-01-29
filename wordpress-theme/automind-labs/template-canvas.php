<?php
/**
 * Template Name: Elementor Canvas
 * Template Post Type: page
 *
 * A blank canvas template for Elementor - no header/footer.
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

<body <?php body_class( 'elementor-template-canvas' ); ?>>
<?php wp_body_open(); ?>

<main id="primary" class="main-content canvas-content">
    <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
    <?php endwhile; ?>
</main>

<?php wp_footer(); ?>
</body>
</html>
