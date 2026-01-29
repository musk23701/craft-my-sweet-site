<?php
/**
 * Single Post Template
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
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/blog-hero.jpg' ); ?>" alt="">
                </div>
            <?php endif; ?>
            <div class="page-hero-content container">
                <h1 class="animate-fade-up"><?php the_title(); ?></h1>
                <div class="blog-meta animate-fade-up delay-100">
                    <span><?php echo get_the_date(); ?></span>
                    <?php if ( get_the_author() ) : ?>
                        <span>• <?php the_author(); ?></span>
                    <?php endif; ?>
                    <?php
                    $categories = get_the_category();
                    if ( ! empty( $categories ) ) : ?>
                        <span>• <?php echo esc_html( $categories[0]->name ); ?></span>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <article class="section">
            <div class="container">
                <div class="max-w-3xl mx-auto">
                    <!-- Back to Blog -->
                    <a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="btn btn-ghost" style="margin-bottom: 2rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                        <?php esc_html_e( 'Back to Blog', 'automind-labs' ); ?>
                    </a>

                    <!-- Author & Date -->
                    <div class="flex items-center gap-4 text-muted" style="margin-bottom: 2rem;">
                        <?php echo get_avatar( get_the_author_meta( 'ID' ), 48, '', '', array( 'class' => 'review-avatar' ) ); ?>
                        <div>
                            <div style="color: hsl(var(--foreground)); font-weight: 600;"><?php the_author(); ?></div>
                            <div style="font-size: 0.875rem;"><?php echo get_the_date( 'F j, Y' ); ?></div>
                        </div>
                    </div>

                    <!-- Tags -->
                    <?php
                    $tags = get_the_tags();
                    if ( $tags ) : ?>
                        <div class="blog-tags" style="margin-bottom: 2rem;">
                            <?php foreach ( $tags as $tag ) : ?>
                                <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" class="blog-tag">
                                    <?php echo esc_html( $tag->name ); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Content -->
                    <div class="blog-post-content reveal">
                        <?php the_content(); ?>
                    </div>

                    <!-- Post Navigation -->
                    <div class="post-navigation" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid hsl(var(--border));">
                        <?php
                        $prev_post = get_previous_post();
                        $next_post = get_next_post();
                        ?>
                        <div class="grid md:grid-cols-2 gap-6">
                            <?php if ( $prev_post ) : ?>
                                <a href="<?php echo esc_url( get_permalink( $prev_post ) ); ?>" class="card hover-lift" style="text-decoration: none;">
                                    <span class="text-muted" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">← Previous</span>
                                    <h4 style="margin-top: 0.5rem; font-size: 1rem;"><?php echo esc_html( $prev_post->post_title ); ?></h4>
                                </a>
                            <?php else : ?>
                                <div></div>
                            <?php endif; ?>
                            
                            <?php if ( $next_post ) : ?>
                                <a href="<?php echo esc_url( get_permalink( $next_post ) ); ?>" class="card hover-lift" style="text-align: right; text-decoration: none;">
                                    <span class="text-muted" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Next →</span>
                                    <h4 style="margin-top: 0.5rem; font-size: 1rem;"><?php echo esc_html( $next_post->post_title ); ?></h4>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>

                    <!-- Comments -->
                    <?php if ( comments_open() || get_comments_number() ) : ?>
                        <div style="margin-top: 4rem;">
                            <?php comments_template(); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </article>

    <?php endwhile; ?>

    <!-- Related Posts -->
    <?php
    $categories = get_the_category();
    if ( $categories ) :
        $category_ids = array_map( function( $cat ) { return $cat->term_id; }, $categories );
        $related_posts = new WP_Query( array(
            'category__in'   => $category_ids,
            'post__not_in'   => array( get_the_ID() ),
            'posts_per_page' => 3,
        ) );
        
        if ( $related_posts->have_posts() ) : ?>
            <section class="section" style="background: hsl(var(--card));">
                <div class="container">
                    <div class="section-header reveal">
                        <h2 class="section-title"><?php esc_html_e( 'Related Posts', 'automind-labs' ); ?></h2>
                    </div>
                    
                    <div class="blog-grid">
                        <?php while ( $related_posts->have_posts() ) : $related_posts->the_post(); ?>
                            <article class="card blog-card hover-lift reveal">
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
                                    </div>
                                    <h3 class="blog-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <p class="blog-excerpt"><?php echo wp_trim_words( get_the_excerpt(), 15 ); ?></p>
                                </div>
                            </article>
                        <?php endwhile; wp_reset_postdata(); ?>
                    </div>
                </div>
            </section>
        <?php endif;
    endif; ?>

</main>

<?php
get_footer();
