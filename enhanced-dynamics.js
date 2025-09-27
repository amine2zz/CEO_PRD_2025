// Enhanced Dynamic Features for CEO Strategy Hub
class DynamicEnhancements {
    constructor() {
        this.initializeAnimations();
        this.setupInteractiveElements();
        this.startRealTimeUpdates();
    }

    initializeAnimations() {
        // Particle background animation
        this.createParticleBackground();
        
        // Smooth scroll with easing
        this.setupSmoothScroll();
        
        // Typing animation for hero text
        this.setupTypingAnimation();
        
        // Floating elements
        this.setupFloatingElements();
    }

    createParticleBackground() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particleCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
        animate();
        
        window.addEventListener('resize', resizeCanvas);
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupTypingAnimation() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.feature-card, .content-card');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            .feature-card:hover, .content-card:hover {
                animation-play-state: paused;
                transform: translateY(-15px) scale(1.02);
            }
        `;
        document.head.appendChild(style);
    }

    setupInteractiveElements() {
        // Enhanced hover effects
        this.setupEnhancedHovers();
        
        // Interactive counters
        this.setupCounterAnimations();
        
        // Progress bars with animation
        this.setupProgressBars();
        
        // Interactive tooltips
        this.setupTooltips();
    }

    setupEnhancedHovers() {
        const cards = document.querySelectorAll('.feature-card, .content-card, .metric-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-item h3, .metric-value, .kpi-value');
        
        const animateCounter = (element) => {
            const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const prefix = element.textContent.match(/^\D*/)[0];
                const suffix = element.textContent.match(/\D*$/)[0];
                element.textContent = prefix + Math.floor(current) + suffix;
            }, 30);
        };
        
        // Intersection Observer for counter animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    bar.style.transition = 'width 2s ease-out';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    
                    observer.unobserve(bar);
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'dynamic-tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 0.9em;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => tooltip.style.opacity = '1', 10);
                
                this.addEventListener('mouseleave', () => {
                    tooltip.remove();
                }, { once: true });
            });
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateRealTimeMetrics();
        }, 5000);
        
        // Update charts periodically
        setInterval(() => {
            this.updateChartData();
        }, 10000);
    }

    updateRealTimeMetrics() {
        const metrics = document.querySelectorAll('.real-time-metric');
        metrics.forEach(metric => {
            const currentValue = parseInt(metric.textContent);
            const change = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(0, currentValue + change);
            
            metric.style.transition = 'all 0.5s ease';
            metric.style.transform = 'scale(1.1)';
            metric.textContent = newValue;
            
            setTimeout(() => {
                metric.style.transform = 'scale(1)';
            }, 500);
        });
    }

    updateChartData() {
        // Update existing charts with new data
        if (window.charts) {
            Object.values(window.charts).forEach(chart => {
                if (chart && chart.data && chart.data.datasets) {
                    chart.data.datasets.forEach(dataset => {
                        dataset.data = dataset.data.map(value => 
                            value + (Math.random() - 0.5) * value * 0.1
                        );
                    });
                    chart.update('none');
                }
            });
        }
    }
}

// Enhanced Chart Configurations
class EnhancedCharts {
    static getGradient(ctx, color1, color2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    static getAnimationConfig() {
        return {
            duration: 2000,
            easing: 'easeOutQuart'
        };
    }

    static getResponsiveConfig() {
        return {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicEnhancements();
});

// Export for use in other files
window.DynamicEnhancements = DynamicEnhancements;
window.EnhancedCharts = EnhancedCharts;