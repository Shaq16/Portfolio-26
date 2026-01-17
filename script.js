document.addEventListener('DOMContentLoaded', () => {
    const floatingName = document.getElementById('floatingName');
    const headerName = document.getElementById('headerName');
    const header = document.querySelector('header');

    // Scroll threshold for capsule animation
    const scrollThreshold = 80;

    // Handle scroll for floating name capsule
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            floatingName.classList.add('visible');
            header.classList.add('hidden');
        } else {
            floatingName.classList.remove('visible');
            header.classList.remove('hidden');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        // Add staggered delay
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe section titles
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Smooth hover effect on timeline markers
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
        });
        item.addEventListener('mouseleave', () => {
            if (item.classList.contains('visible')) {
                item.style.transform = 'translateY(0)';
            }
        });
    });

    // Highlight terms on scroll
    const highlightTerms = document.querySelectorAll('.highlight-term');
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Optional: Remove to replay if scrolled out
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% visible (more reliable than 1.0)
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before bottom
    });

    highlightTerms.forEach(term => highlightObserver.observe(term));

    // More Projects Button Toggle
    const moreBtn = document.getElementById('moreProjectsBtn');
    const hiddenProjects = document.getElementById('hiddenProjects');

    if (moreBtn && hiddenProjects) {
        moreBtn.addEventListener('click', () => {
            const isExpanded = hiddenProjects.classList.contains('visible');

            if (isExpanded) {
                hiddenProjects.classList.remove('visible');
                moreBtn.classList.remove('expanded');
                moreBtn.innerHTML = '<span class="arrow">↓</span> More Projects';
            } else {
                hiddenProjects.classList.add('visible');
                moreBtn.classList.add('expanded');
                moreBtn.innerHTML = '<span class="arrow">↓</span> Less Projects';

                // Animate newly visible items
                hiddenProjects.querySelectorAll('.timeline-item').forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    setTimeout(() => item.classList.add('visible'), 50);
                });
            }
        });
    }
});
