<?php
/**
 * Template Name: Booking Page
 * Template Post Type: page
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content">
    
    <!-- Page Hero -->
    <div class="page-hero">
        <div class="page-hero-bg">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/booking-hero.jpg' ); ?>" alt="">
        </div>
        <div class="page-hero-content container">
            <h1 class="animate-fade-up"><?php esc_html_e( 'Book a Call', 'automind-labs' ); ?></h1>
            <p class="text-muted animate-fade-up delay-100"><?php esc_html_e( 'Schedule a free strategy call to discuss your automation needs.', 'automind-labs' ); ?></p>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <div class="grid md:grid-cols-2 gap-12 items-start">
                <!-- Calendar Embed -->
                <div class="reveal">
                    <div class="card" style="padding: 0; overflow: hidden; min-height: 600px;">
                        <?php 
                        $booking_url = get_theme_mod( 'booking_url' );
                        if ( $booking_url ) : ?>
                            <iframe 
                                src="<?php echo esc_url( $booking_url ); ?>" 
                                width="100%" 
                                height="700" 
                                frameborder="0"
                                style="border: none; background: hsl(var(--card));"
                            ></iframe>
                        <?php else : ?>
                            <div style="padding: 3rem; text-align: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="color: hsl(var(--muted-foreground)); margin: 0 auto 1rem;"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                                <h3><?php esc_html_e( 'Calendar Coming Soon', 'automind-labs' ); ?></h3>
                                <p class="text-muted"><?php esc_html_e( 'Add your booking calendar URL in Theme Customizer → Automind Labs Options → Contact Information.', 'automind-labs' ); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- What to Expect -->
                <div class="reveal-right">
                    <h2 style="margin-bottom: 1.5rem;"><?php esc_html_e( 'What to Expect', 'automind-labs' ); ?></h2>
                    
                    <div class="approach-timeline" style="margin-top: 2rem;">
                        <div class="approach-item" style="padding-left: 60px; padding-bottom: 2rem;">
                            <div class="approach-number" style="left: 0;">1</div>
                            <div class="approach-content">
                                <h4><?php esc_html_e( 'Discovery Call', 'automind-labs' ); ?></h4>
                                <p class="text-muted"><?php esc_html_e( 'We\'ll discuss your business, current challenges, and goals. This helps us understand where automation can make the biggest impact.', 'automind-labs' ); ?></p>
                            </div>
                        </div>
                        
                        <div class="approach-item" style="padding-left: 60px; padding-bottom: 2rem;">
                            <div class="approach-number" style="left: 0;">2</div>
                            <div class="approach-content">
                                <h4><?php esc_html_e( 'Strategy Overview', 'automind-labs' ); ?></h4>
                                <p class="text-muted"><?php esc_html_e( 'We\'ll share initial ideas on how AI automation can solve your specific problems and save you time.', 'automind-labs' ); ?></p>
                            </div>
                        </div>
                        
                        <div class="approach-item" style="padding-left: 60px; padding-bottom: 2rem;">
                            <div class="approach-number" style="left: 0;">3</div>
                            <div class="approach-content">
                                <h4><?php esc_html_e( 'Q&A Session', 'automind-labs' ); ?></h4>
                                <p class="text-muted"><?php esc_html_e( 'Ask any questions you have about AI automation, our process, timeline, or anything else on your mind.', 'automind-labs' ); ?></p>
                            </div>
                        </div>
                        
                        <div class="approach-item" style="padding-left: 60px;">
                            <div class="approach-number" style="left: 0;">4</div>
                            <div class="approach-content">
                                <h4><?php esc_html_e( 'Next Steps', 'automind-labs' ); ?></h4>
                                <p class="text-muted"><?php esc_html_e( 'If we\'re a good fit, we\'ll outline the next steps and provide a custom proposal for your project.', 'automind-labs' ); ?></p>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="margin-top: 2rem; background: hsl(var(--primary) / 0.1); border-color: hsl(var(--primary) / 0.3);">
                        <h4 style="color: hsl(var(--primary)); margin-bottom: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                            <?php esc_html_e( '100% Free, No Obligation', 'automind-labs' ); ?>
                        </h4>
                        <p class="text-muted" style="margin: 0;"><?php esc_html_e( 'This call is completely free with no strings attached. Even if we\'re not the right fit, you\'ll walk away with valuable insights about automating your business.', 'automind-labs' ); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
