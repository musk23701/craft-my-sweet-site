<?php
/**
 * Template Name: Elementor Full Width
 * Template Post Type: page
 *
 * A full-width template for Elementor pages with header and footer.
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content elementor-full-width">
    <?php while ( have_posts() ) : the_post(); ?>
        <?php the_content(); ?>
    <?php endwhile; ?>
</main>

<?php
get_footer();
