<?php
/**
 * Page Template
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
            <?php else : ?>
                <div class="page-hero-bg">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/page-hero.jpg' ); ?>" alt="">
                </div>
            <?php endif; ?>
            <div class="page-hero-content container">
                <h1 class="animate-fade-up"><?php the_title(); ?></h1>
                <?php if ( has_excerpt() ) : ?>
                    <p class="text-muted animate-fade-up delay-100"><?php echo get_the_excerpt(); ?></p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Page Content -->
        <section class="section">
            <div class="container">
                <div class="max-w-4xl mx-auto reveal">
                    <?php the_content(); ?>
                </div>
            </div>
        </section>

    <?php endwhile; ?>
</main>

<?php
get_footer();
