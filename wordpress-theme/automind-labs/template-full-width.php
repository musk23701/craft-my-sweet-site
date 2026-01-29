<?php
/**
 * Template Name: Full Width
 * Template Post Type: page
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content">
    <?php while ( have_posts() ) : the_post(); ?>
        
        <!-- Page Hero -->
        <div class="page-hero">
            <?php if ( has_post_thumbnail() ) : ?>
                <div class="page-hero-bg">
                    <?php the_post_thumbnail( 'full' ); ?>
                </div>
            <?php endif; ?>
            <div class="page-hero-content container">
                <h1 class="animate-fade-up"><?php the_title(); ?></h1>
            </div>
        </div>

        <!-- Full Width Content -->
        <section class="section">
            <div class="container" style="max-width: 100%; padding: 0;">
                <?php the_content(); ?>
            </div>
        </section>

    <?php endwhile; ?>
</main>

<?php
get_footer();
