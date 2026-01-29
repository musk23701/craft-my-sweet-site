<?php
/**
 * Template Name: Portfolio Page
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
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio-hero.jpg' ); ?>" alt="">
        </div>
        <div class="page-hero-content container">
            <h1 class="animate-fade-up"><?php esc_html_e( 'Our Work', 'automind-labs' ); ?></h1>
            <p class="text-muted animate-fade-up delay-100"><?php esc_html_e( 'Explore our portfolio of AI automation projects', 'automind-labs' ); ?></p>
        </div>
    </div>

    <!-- Portfolio Grid -->
    <section class="section">
        <div class="container">
            <div class="portfolio-grid">
                <!-- Portfolio Item 1 -->
                <div class="portfolio-card card hover-lift reveal">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-1.jpg' ); ?>" alt="E-commerce Automation">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'E-commerce', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'Automated Order Processing', 'automind-labs' ); ?></h3>
                    </div>
                </div>
                
                <!-- Portfolio Item 2 -->
                <div class="portfolio-card card hover-lift reveal delay-100">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-2.jpg' ); ?>" alt="AI Chatbot">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'Customer Service', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'AI Customer Support Bot', 'automind-labs' ); ?></h3>
                    </div>
                </div>
                
                <!-- Portfolio Item 3 -->
                <div class="portfolio-card card hover-lift reveal delay-200">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-3.jpg' ); ?>" alt="Data Pipeline">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'Data Analytics', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'Real-time Data Pipeline', 'automind-labs' ); ?></h3>
                    </div>
                </div>
                
                <!-- Portfolio Item 4 -->
                <div class="portfolio-card card hover-lift reveal delay-300">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-4.jpg' ); ?>" alt="Lead Qualification">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'Sales', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'AI Lead Qualification System', 'automind-labs' ); ?></h3>
                    </div>
                </div>
                
                <!-- Portfolio Item 5 -->
                <div class="portfolio-card card hover-lift reveal delay-400">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-5.jpg' ); ?>" alt="Content Automation">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'Marketing', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'Content Generation Pipeline', 'automind-labs' ); ?></h3>
                    </div>
                </div>
                
                <!-- Portfolio Item 6 -->
                <div class="portfolio-card card hover-lift reveal delay-500">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/portfolio/project-6.jpg' ); ?>" alt="Workflow Optimization">
                    <div class="portfolio-overlay">
                        <span class="portfolio-category"><?php esc_html_e( 'Operations', 'automind-labs' ); ?></span>
                        <h3 class="portfolio-title"><?php esc_html_e( 'End-to-End Workflow Automation', 'automind-labs' ); ?></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Case Study Highlight -->
    <section class="section" style="background: hsl(var(--card));">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'Featured Case Study', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'E-commerce Automation Success', 'automind-labs' ); ?></h2>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="reveal-left">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/case-study.jpg' ); ?>" alt="Case Study" class="rounded-lg">
                </div>
                <div class="reveal-right">
                    <h3><?php esc_html_e( 'The Challenge', 'automind-labs' ); ?></h3>
                    <p class="text-muted">
                        <?php esc_html_e( 'A growing e-commerce company was spending 30+ hours per week manually processing orders, updating inventory, and responding to customer inquiries.', 'automind-labs' ); ?>
                    </p>
                    
                    <h3 style="margin-top: 1.5rem;"><?php esc_html_e( 'The Solution', 'automind-labs' ); ?></h3>
                    <p class="text-muted">
                        <?php esc_html_e( 'We implemented an end-to-end automation system including automated order processing, real-time inventory sync, and an AI chatbot for customer support.', 'automind-labs' ); ?>
                    </p>
                    
                    <div class="grid sm:grid-cols-3 gap-6" style="margin-top: 2rem;">
                        <div class="text-center">
                            <div class="stat-value text-primary" style="font-size: 2rem;">85%</div>
                            <div class="text-muted" style="font-size: 0.875rem;"><?php esc_html_e( 'Time Saved', 'automind-labs' ); ?></div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value text-primary" style="font-size: 2rem;">24/7</div>
                            <div class="text-muted" style="font-size: 0.875rem;"><?php esc_html_e( 'Support', 'automind-labs' ); ?></div>
                        </div>
                        <div class="text-center">
                            <div class="stat-value text-primary" style="font-size: 2rem;">3x</div>
                            <div class="text-muted" style="font-size: 0.875rem;"><?php esc_html_e( 'Order Volume', 'automind-labs' ); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
        <div class="container">
            <div class="cta-content reveal">
                <h2 class="cta-title"><?php esc_html_e( 'Want Results Like These?', 'automind-labs' ); ?></h2>
                <p class="cta-description text-muted">
                    <?php esc_html_e( 'Let\'s discuss how we can create a custom automation solution for your business.', 'automind-labs' ); ?>
                </p>
                <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary btn-lg">
                    <?php esc_html_e( 'Start Your Project', 'automind-labs' ); ?>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
