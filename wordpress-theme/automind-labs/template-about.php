<?php
/**
 * Template Name: About Page
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
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/about-hero.jpg' ); ?>" alt="">
        </div>
        <div class="page-hero-content container">
            <h1 class="animate-fade-up"><?php esc_html_e( 'About Us', 'automind-labs' ); ?></h1>
            <p class="text-muted animate-fade-up delay-100"><?php esc_html_e( 'Meet the team behind Automind Labs', 'automind-labs' ); ?></p>
        </div>
    </div>

    <!-- Mission Section -->
    <section class="section">
        <div class="container">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="reveal-left">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/mission-image.jpg' ); ?>" alt="Our Mission" class="rounded-lg">
                </div>
                <div class="reveal-right">
                    <span class="section-label"><?php esc_html_e( 'Our Mission', 'automind-labs' ); ?></span>
                    <h2><?php esc_html_e( 'Democratizing AI Automation', 'automind-labs' ); ?></h2>
                    <p class="text-muted">
                        <?php esc_html_e( 'At Automind Labs, we believe that every business deserves access to the power of AI automation, regardless of size or technical expertise.', 'automind-labs' ); ?>
                    </p>
                    <p class="text-muted">
                        <?php esc_html_e( 'Our mission is to bridge the gap between cutting-edge AI technology and practical business applications, helping companies save time, reduce errors, and focus on what truly matters - growing their business.', 'automind-labs' ); ?>
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="section" style="background: hsl(var(--card));">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'Our Values', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'What Drives Us', 'automind-labs' ); ?></h2>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="card text-center hover-lift reveal">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </div>
                    <h3><?php esc_html_e( 'Innovation', 'automind-labs' ); ?></h3>
                    <p class="text-muted"><?php esc_html_e( 'We stay at the forefront of AI technology to deliver cutting-edge solutions that give our clients a competitive advantage.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card text-center hover-lift reveal delay-100">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3><?php esc_html_e( 'Partnership', 'automind-labs' ); ?></h3>
                    <p class="text-muted"><?php esc_html_e( 'We work alongside our clients as true partners, understanding their unique challenges and goals to deliver tailored solutions.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card text-center hover-lift reveal delay-200">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h3><?php esc_html_e( 'Results', 'automind-labs' ); ?></h3>
                    <p class="text-muted"><?php esc_html_e( 'We measure our success by the tangible results we deliver - hours saved, costs reduced, and businesses transformed.', 'automind-labs' ); ?></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Story Section -->
    <section class="section">
        <div class="container">
            <div class="max-w-3xl mx-auto text-center reveal">
                <span class="section-label"><?php esc_html_e( 'Our Story', 'automind-labs' ); ?></span>
                <h2><?php esc_html_e( 'From Vision to Reality', 'automind-labs' ); ?></h2>
                <p class="text-muted">
                    <?php esc_html_e( 'Automind Labs was founded with a simple belief: that AI automation should be accessible to every business. We saw too many companies struggling with repetitive tasks, drowning in manual processes, and missing out on the transformative power of automation.', 'automind-labs' ); ?>
                </p>
                <p class="text-muted">
                    <?php esc_html_e( 'Today, we\'ve helped over 50 businesses across the USA streamline their operations, saving thousands of hours and enabling them to focus on growth and innovation.', 'automind-labs' ); ?>
                </p>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="section" style="background: hsl(var(--card));">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item reveal">
                    <div class="stat-value" data-count="50">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Clients Served', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-100">
                    <div class="stat-value" data-count="100">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Projects Completed', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-200">
                    <div class="stat-value" data-count="10000">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Hours Saved', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-300">
                    <div class="stat-value" data-count="98">0</div>
                    <div class="stat-label"><?php esc_html_e( '% Satisfaction', 'automind-labs' ); ?></div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
        <div class="container">
            <div class="cta-content reveal">
                <h2 class="cta-title"><?php esc_html_e( 'Ready to Work Together?', 'automind-labs' ); ?></h2>
                <p class="cta-description text-muted">
                    <?php esc_html_e( 'Let\'s discuss how we can help transform your business with AI automation.', 'automind-labs' ); ?>
                </p>
                <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary btn-lg">
                    <?php esc_html_e( 'Book a Free Call', 'automind-labs' ); ?>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
