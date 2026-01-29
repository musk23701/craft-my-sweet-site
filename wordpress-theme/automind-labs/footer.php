<?php
/**
 * The footer template
 *
 * @package Automind_Labs
 */
?>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <?php if ( has_custom_logo() ) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.png' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="footer-logo">
                <?php endif; ?>
                
                <p class="footer-tagline">
                    <?php echo esc_html( get_theme_mod( 'footer_tagline', 'Empowering businesses with intelligent automation solutions.' ) ); ?>
                </p>
                
                <div class="footer-social">
                    <?php automind_labs_social_icons(); ?>
                </div>
            </div>

            <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar( 'footer-1' ); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4 class="footer-heading"><?php esc_html_e( 'Quick Links', 'automind-labs' ); ?></h4>
                    <div class="footer-links">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-link"><?php esc_html_e( 'Home', 'automind-labs' ); ?></a>
                        <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="footer-link"><?php esc_html_e( 'About', 'automind-labs' ); ?></a>
                        <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="footer-link"><?php esc_html_e( 'Portfolio', 'automind-labs' ); ?></a>
                        <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="footer-link"><?php esc_html_e( 'Blog', 'automind-labs' ); ?></a>
                    </div>
                </div>
            <?php endif; ?>

            <?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar( 'footer-2' ); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4 class="footer-heading"><?php esc_html_e( 'Services', 'automind-labs' ); ?></h4>
                    <div class="footer-links">
                        <a href="#" class="footer-link"><?php esc_html_e( 'AI Automation', 'automind-labs' ); ?></a>
                        <a href="#" class="footer-link"><?php esc_html_e( 'Workflow Optimization', 'automind-labs' ); ?></a>
                        <a href="#" class="footer-link"><?php esc_html_e( 'Chatbot Development', 'automind-labs' ); ?></a>
                        <a href="#" class="footer-link"><?php esc_html_e( 'Consulting', 'automind-labs' ); ?></a>
                    </div>
                </div>
            <?php endif; ?>

            <?php if ( is_active_sidebar( 'footer-3' ) ) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar( 'footer-3' ); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4 class="footer-heading"><?php esc_html_e( 'Contact', 'automind-labs' ); ?></h4>
                    <div class="footer-links">
                        <?php 
                        $email = get_theme_mod( 'contact_email', 'hello@automindlabs.ai' );
                        if ( $email ) : ?>
                            <a href="mailto:<?php echo esc_attr( $email ); ?>" class="footer-link"><?php echo esc_html( $email ); ?></a>
                        <?php endif; ?>
                        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="footer-link"><?php esc_html_e( 'Contact Form', 'automind-labs' ); ?></a>
                        <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="footer-link"><?php esc_html_e( 'Book a Call', 'automind-labs' ); ?></a>
                    </div>
                </div>
            <?php endif; ?>
        </div>

        <div class="footer-bottom">
            <p class="footer-copyright">
                <?php echo esc_html( automind_labs_copyright() ); ?>
            </p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
