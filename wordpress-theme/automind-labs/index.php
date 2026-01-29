<?php
/**
 * The main template file
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content">
    <?php if ( have_posts() ) : ?>
        
        <?php if ( is_home() && ! is_front_page() ) : ?>
            <div class="page-hero">
                <div class="page-hero-bg">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/blog-hero.jpg' ); ?>" alt="Blog">
                </div>
                <div class="page-hero-content container">
                    <h1 class="animate-fade-up"><?php single_post_title(); ?></h1>
                    <p class="text-muted animate-fade-up delay-100">Insights, tips, and news about AI automation</p>
                </div>
            </div>
        <?php endif; ?>

        <section class="section">
            <div class="container">
                <div class="blog-grid">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <article <?php post_class( 'card blog-card hover-lift reveal' ); ?>>
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="blog-image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail( 'large' ); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            
                            <div class="blog-content">
                                <div class="blog-meta">
                                    <span><?php echo get_the_date(); ?></span>
                                    <?php if ( get_the_author() ) : ?>
                                        <span>• <?php the_author(); ?></span>
                                    <?php endif; ?>
                                </div>
                                
                                <h3 class="blog-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                
                                <?php if ( has_excerpt() ) : ?>
                                    <p class="blog-excerpt"><?php echo wp_trim_words( get_the_excerpt(), 20 ); ?></p>
                                <?php else : ?>
                                    <p class="blog-excerpt"><?php echo wp_trim_words( get_the_content(), 20 ); ?></p>
                                <?php endif; ?>
                                
                                <?php
                                $tags = get_the_tags();
                                if ( $tags ) : ?>
                                    <div class="blog-tags">
                                        <?php foreach ( array_slice( $tags, 0, 3 ) as $tag ) : ?>
                                            <span class="blog-tag"><?php echo esc_html( $tag->name ); ?></span>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <?php
                // Pagination
                the_posts_pagination( array(
                    'mid_size'  => 2,
                    'prev_text' => '← Previous',
                    'next_text' => 'Next →',
                    'class'     => 'pagination-nav',
                ) );
                ?>
            </div>
        </section>

    <?php else : ?>
        
        <section class="section">
            <div class="container text-center">
                <h2>No posts found</h2>
                <p class="text-muted">Check back later for new content.</p>
            </div>
        </section>

    <?php endif; ?>
</main>

<?php
get_footer();
