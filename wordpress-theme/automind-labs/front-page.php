<?php
/**
 * Front Page Template
 *
 * @package Automind_Labs
 */

get_header();
?>

<main id="primary" class="main-content">
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-bg">
            <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-bg.jpg' ); ?>" alt="">
        </div>
        <div class="hero-content">
            <span class="hero-badge animate-fade-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span><?php esc_html_e( '#1 AI Automation Agency', 'automind-labs' ); ?></span>
            </span>
            
            <h1 class="hero-title animate-fade-up delay-100">
                <?php esc_html_e( 'We Build', 'automind-labs' ); ?> 
                <span class="text-primary typing-text" id="typing-text"><?php esc_html_e( 'AI Automations', 'automind-labs' ); ?></span>
            </h1>
            
            <p class="hero-subtitle animate-fade-up delay-200">
                <?php esc_html_e( 'Transform your business with intelligent automation solutions. We help companies save 20+ hours per week with custom AI workflows.', 'automind-labs' ); ?>
            </p>
            
            <div class="hero-cta animate-fade-up delay-300">
                <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary btn-lg">
                    <?php esc_html_e( 'Book a Free Call', 'automind-labs' ); ?>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <a href="<?php echo esc_url( home_url( '/portfolio/' ) ); ?>" class="btn btn-outline btn-lg">
                    <?php esc_html_e( 'View Our Work', 'automind-labs' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Featured Stats Section -->
    <section class="section" style="background: hsl(var(--card));">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item reveal">
                    <div class="stat-value" data-count="50">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Happy Clients', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-100">
                    <div class="stat-value" data-count="100">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Projects Completed', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-200">
                    <div class="stat-value" data-count="20">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Hours Saved Weekly', 'automind-labs' ); ?></div>
                </div>
                <div class="stat-item reveal delay-300">
                    <div class="stat-value" data-count="5">0</div>
                    <div class="stat-label"><?php esc_html_e( 'Star Reviews', 'automind-labs' ); ?></div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="section" id="about">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'About Us', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'Your Partner in AI Automation', 'automind-labs' ); ?></h2>
                <p class="section-description">
                    <?php esc_html_e( 'We are a team of AI specialists dedicated to helping businesses automate their workflows and scale efficiently.', 'automind-labs' ); ?>
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="reveal-left">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/about-image.jpg' ); ?>" alt="About Automind Labs" class="rounded-lg">
                </div>
                <div class="reveal-right">
                    <h3><?php esc_html_e( 'Transforming Businesses Through Automation', 'automind-labs' ); ?></h3>
                    <p class="text-muted">
                        <?php esc_html_e( 'At Automind Labs, we believe in the power of automation to transform how businesses operate. Our mission is to make AI accessible and practical for companies of all sizes.', 'automind-labs' ); ?>
                    </p>
                    <p class="text-muted">
                        <?php esc_html_e( 'With years of experience in AI and automation, we deliver solutions that actually work - saving you time, reducing errors, and allowing you to focus on what matters most.', 'automind-labs' ); ?>
                    </p>
                    <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="btn btn-primary">
                        <?php esc_html_e( 'Learn More About Us', 'automind-labs' ); ?>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="section" id="services" style="background: hsl(var(--card));">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'Our Services', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'What We Do', 'automind-labs' ); ?></h2>
                <p class="section-description">
                    <?php esc_html_e( 'We offer comprehensive AI automation solutions tailored to your business needs.', 'automind-labs' ); ?>
                </p>
            </div>
            
            <div class="services-grid">
                <div class="card service-card hover-lift reveal">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'Workflow Automation', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Automate repetitive tasks and streamline your business processes with intelligent workflows.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card service-card hover-lift reveal delay-100">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'AI Chatbots', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Build intelligent chatbots that provide 24/7 customer support and lead qualification.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card service-card hover-lift reveal delay-200">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'AI Integration', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Seamlessly integrate AI capabilities into your existing tools and platforms.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card service-card hover-lift reveal delay-300">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'Data Analytics', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Transform your data into actionable insights with AI-powered analytics.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card service-card hover-lift reveal delay-400">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'Process Optimization', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Identify bottlenecks and optimize your business processes for maximum efficiency.', 'automind-labs' ); ?></p>
                </div>
                
                <div class="card service-card hover-lift reveal delay-500">
                    <div class="service-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h4 class="service-title"><?php esc_html_e( 'Consulting', 'automind-labs' ); ?></h4>
                    <p class="text-muted"><?php esc_html_e( 'Get expert advice on implementing AI solutions that fit your unique needs.', 'automind-labs' ); ?></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Who We Help Section -->
    <section class="section" id="who-we-help">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'Who We Help', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'Industries We Serve', 'automind-labs' ); ?></h2>
            </div>
            
            <div class="who-we-help-grid">
                <div class="card who-we-help-item reveal">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'Coaches', 'automind-labs' ); ?></span>
                </div>
                
                <div class="card who-we-help-item reveal delay-100">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'Agencies', 'automind-labs' ); ?></span>
                </div>
                
                <div class="card who-we-help-item reveal delay-200">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'Startups', 'automind-labs' ); ?></span>
                </div>
                
                <div class="card who-we-help-item reveal delay-300">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'Enterprise', 'automind-labs' ); ?></span>
                </div>
                
                <div class="card who-we-help-item reveal delay-400">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'Educators', 'automind-labs' ); ?></span>
                </div>
                
                <div class="card who-we-help-item reveal delay-500">
                    <div class="who-we-help-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <span class="who-we-help-label"><?php esc_html_e( 'E-commerce', 'automind-labs' ); ?></span>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="section" id="faq" style="background: hsl(var(--card));">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label"><?php esc_html_e( 'FAQ', 'automind-labs' ); ?></span>
                <h2 class="section-title"><?php esc_html_e( 'Frequently Asked Questions', 'automind-labs' ); ?></h2>
            </div>
            
            <div class="faq-list">
                <div class="faq-item reveal">
                    <button class="faq-question">
                        <span><?php esc_html_e( 'What is AI automation?', 'automind-labs' ); ?></span>
                        <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p><?php esc_html_e( 'AI automation combines artificial intelligence with workflow automation to handle complex tasks that traditionally required human decision-making. This includes processing data, responding to customers, managing schedules, and much more.', 'automind-labs' ); ?></p>
                    </div>
                </div>
                
                <div class="faq-item reveal delay-100">
                    <button class="faq-question">
                        <span><?php esc_html_e( 'How long does implementation take?', 'automind-labs' ); ?></span>
                        <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p><?php esc_html_e( 'Implementation time varies based on project complexity. Simple automations can be deployed in 1-2 weeks, while comprehensive solutions may take 4-8 weeks. We provide detailed timelines during our initial consultation.', 'automind-labs' ); ?></p>
                    </div>
                </div>
                
                <div class="faq-item reveal delay-200">
                    <button class="faq-question">
                        <span><?php esc_html_e( 'What ROI can I expect?', 'automind-labs' ); ?></span>
                        <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p><?php esc_html_e( 'Our clients typically see 20-40 hours saved per week and 30-50% reduction in operational costs within the first 3 months. The exact ROI depends on your current processes and automation scope.', 'automind-labs' ); ?></p>
                    </div>
                </div>
                
                <div class="faq-item reveal delay-300">
                    <button class="faq-question">
                        <span><?php esc_html_e( 'Do you provide ongoing support?', 'automind-labs' ); ?></span>
                        <svg class="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="faq-answer">
                        <p><?php esc_html_e( 'Yes! We offer comprehensive support and maintenance packages to ensure your automations continue running smoothly. Our team monitors performance, handles updates, and provides training as needed.', 'automind-labs' ); ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
        <div class="container">
            <div class="cta-content reveal">
                <h2 class="cta-title"><?php esc_html_e( 'Ready to Automate Your Business?', 'automind-labs' ); ?></h2>
                <p class="cta-description text-muted">
                    <?php esc_html_e( 'Book a free strategy call to discover how AI automation can transform your operations and save you 20+ hours per week.', 'automind-labs' ); ?>
                </p>
                <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="btn btn-primary btn-lg">
                    <?php esc_html_e( 'Book Your Free Call', 'automind-labs' ); ?>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
