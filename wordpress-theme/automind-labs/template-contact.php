<?php
/**
 * Template Name: Contact Page
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
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/contact-hero.jpg' ); ?>" alt="">
        </div>
        <div class="page-hero-content container">
            <h1 class="animate-fade-up"><?php esc_html_e( 'Contact Us', 'automind-labs' ); ?></h1>
            <p class="text-muted animate-fade-up delay-100"><?php esc_html_e( 'Let\'s discuss how we can help automate your business.', 'automind-labs' ); ?></p>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Contact Form -->
                <div class="reveal">
                    <h2 style="margin-bottom: 1.5rem;"><?php esc_html_e( 'Send Us a Message', 'automind-labs' ); ?></h2>
                    
                    <form id="contact-form" class="contact-form">
                        <div class="form-group">
                            <label for="name" class="form-label"><?php esc_html_e( 'Name', 'automind-labs' ); ?> *</label>
                            <input type="text" id="name" name="name" class="form-input" required placeholder="<?php esc_attr_e( 'Your name', 'automind-labs' ); ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="email" class="form-label"><?php esc_html_e( 'Email', 'automind-labs' ); ?> *</label>
                            <input type="email" id="email" name="email" class="form-input" required placeholder="<?php esc_attr_e( 'your@email.com', 'automind-labs' ); ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="subject" class="form-label"><?php esc_html_e( 'Subject', 'automind-labs' ); ?></label>
                            <input type="text" id="subject" name="subject" class="form-input" placeholder="<?php esc_attr_e( 'How can we help?', 'automind-labs' ); ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="message" class="form-label"><?php esc_html_e( 'Message', 'automind-labs' ); ?> *</label>
                            <textarea id="message" name="message" class="form-textarea" required placeholder="<?php esc_attr_e( 'Tell us about your project or question...', 'automind-labs' ); ?>"></textarea>
                        </div>
                        
                        <div class="form-message" style="display: none; padding: 1rem; border-radius: var(--radius); margin-bottom: 1rem;"></div>
                        
                        <button type="submit" class="btn btn-primary btn-lg btn-full">
                            <?php esc_html_e( 'Send Message', 'automind-labs' ); ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                        </button>
                    </form>
                </div>

                <!-- Contact Info -->
                <div class="reveal-right">
                    <h2 style="margin-bottom: 1.5rem;"><?php esc_html_e( 'Get in Touch', 'automind-labs' ); ?></h2>
                    
                    <div style="margin-bottom: 2rem;">
                        <p class="text-muted">
                            <?php esc_html_e( 'Ready to transform your business with AI automation? Reach out to us and let\'s start a conversation about your needs.', 'automind-labs' ); ?>
                        </p>
                    </div>
                    
                    <div class="contact-info-items">
                        <?php 
                        $email = get_theme_mod( 'contact_email', 'hello@automindlabs.ai' );
                        if ( $email ) : ?>
                            <div class="card" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                                <div class="service-icon" style="margin: 0; width: 48px; height: 48px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <div>
                                    <h4 style="margin-bottom: 0.25rem; font-size: 1rem;"><?php esc_html_e( 'Email', 'automind-labs' ); ?></h4>
                                    <a href="mailto:<?php echo esc_attr( $email ); ?>" class="text-primary"><?php echo esc_html( $email ); ?></a>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                        <div class="card" style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <div class="service-icon" style="margin: 0; width: 48px; height: 48px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0.25rem; font-size: 1rem;"><?php esc_html_e( 'Book a Call', 'automind-labs' ); ?></h4>
                                <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="text-primary"><?php esc_html_e( 'Schedule a free consultation', 'automind-labs' ); ?></a>
                            </div>
                        </div>
                        
                        <div class="card" style="display: flex; align-items: center; gap: 1rem;">
                            <div class="service-icon" style="margin: 0; width: 48px; height: 48px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0.25rem; font-size: 1rem;"><?php esc_html_e( 'Response Time', 'automind-labs' ); ?></h4>
                                <p class="text-muted" style="margin: 0;"><?php esc_html_e( 'Within 24 hours', 'automind-labs' ); ?></p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Links -->
                    <div style="margin-top: 2rem;">
                        <h4 style="margin-bottom: 1rem;"><?php esc_html_e( 'Follow Us', 'automind-labs' ); ?></h4>
                        <?php automind_labs_social_icons(); ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<style>
.form-message.success {
    background: hsl(142 76% 36% / 0.1);
    border: 1px solid hsl(142 76% 36%);
    color: hsl(142 76% 36%);
}
.form-message.error {
    background: hsl(0 84% 60% / 0.1);
    border: 1px solid hsl(0 84% 60%);
    color: hsl(0 84% 60%);
}
</style>

<?php
get_footer();
