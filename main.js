// MARBLE AQWAS - Main JavaScript


// Parallax animation
let mouseX = 0;
let mouseY = 0;
let heroX = 0;
let heroY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // Disable parallax on mobile for better battery performance
    if (window.innerWidth < 768) return;

    // Reduced sensitivity for smoother effect
    const targetHeroX = (mouseX - window.innerWidth / 2) * 0.005;
    const targetHeroY = (mouseY - window.innerHeight / 2) * 0.005;

    heroX += (targetHeroX - heroX) * 0.1;
    heroY += (targetHeroY - heroY) * 0.1;

    // Apply only to background/logo instead of entire container
    const logo = document.querySelector('.logo');
    const heroSection = document.querySelector('.hero-section');

    if (logo) {
        logo.style.transform = `translate(${heroX}px, ${heroY}px)`;
    }

    // Subtle background movement
    if (heroSection) {
        heroSection.style.backgroundPosition = `calc(50% + ${heroX * 0.5}px) calc(40% + ${heroY * 0.5}px)`;
    }

    requestAnimationFrame(animate);
}

animate();

// Logo Animation & Typewriter
let typewriterInterval = null;
let hasTyped = false;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    const navLogo = document.querySelector('.nav-logo');
    const navLogoText = document.querySelector('.nav-logo-text');
    const heroLogo = document.querySelector('.logo-container');

    const scrollY = window.scrollY;
    const triggerPoint = 100; // px where transition starts
    const fadeRange = 150; // px duration of transition

    // 1. Navbar Background
    if (scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // 2. Smooth Transition Logic
    if (scrollY < triggerPoint) {
        // --- Phase 1: Hero Logo is dominant ---

        // Reset flags
        hasTyped = false;

        // Hero Logo: Visible & Centered
        if (heroLogo) {
            heroLogo.style.opacity = '1';
            heroLogo.style.transform = 'translate(0, 0) scale(1)';
            heroLogo.style.pointerEvents = 'auto';
        }

        // Nav Logo: Hidden
        if (navLogo) {
            navLogo.style.opacity = '0';
            navLogo.style.transform = 'translateY(-10px)';
            navLogo.classList.remove('visible');
        }

        // Reset Text
        if (navLogoText) {
            clearInterval(typewriterInterval);
            navLogoText.textContent = '';
            navLogoText.removeAttribute('data-typing');
        }

    } else if (scrollY >= triggerPoint && scrollY < (triggerPoint + fadeRange)) {
        // --- Phase 2: Transition (Moving & Fading) ---

        // Calculate progress (0 to 1)
        const progress = (scrollY - triggerPoint) / fadeRange;

        // Hero Logo: Moves up and fades out
        if (heroLogo) {
            const scale = 1 - (progress * 0.6); // 1 -> 0.4
            const y = progress * -100; // 0 -> -100px
            heroLogo.style.opacity = 1 - progress; // 1 -> 0
            heroLogo.style.transform = `translate(0, ${y}px) scale(${scale})`;
            heroLogo.style.pointerEvents = 'none';
        }

        // Nav Logo: Fades in
        if (navLogo) {
            navLogo.style.opacity = progress; // 0 -> 1
            navLogo.style.transform = `translateY(${(1 - progress) * -10}px)`; // Slide down
        }

    } else {
        // --- Phase 3: Docked in Corner ---

        // Hero Logo: Gone
        if (heroLogo) {
            heroLogo.style.opacity = '0';
            heroLogo.style.pointerEvents = 'none';
        }

        // Nav Logo: Fully Visible
        if (navLogo) {
            navLogo.style.opacity = '1';
            navLogo.style.transform = 'translateY(0)';
            navLogo.classList.add('visible');
        }

        // Start Typewriter (Once)
        if (!hasTyped && navLogoText) {
            // Clearance Check logic
            if (navLogoText.getAttribute('data-typing') === 'true') return;

            hasTyped = true;
            clearInterval(typewriterInterval);

            // FIX: Delay to prevent reflow collision with transition
            setTimeout(() => {
                typeText(navLogoText);
            }, 100);
        }
    }
}, { passive: true });

function typeText(element) {
    if (!element) return;

    // Prevent overlap
    if (element.getAttribute('data-typing') === 'true') {
        clearInterval(typewriterInterval);
    }
    element.setAttribute('data-typing', 'true');

    // Get text and clean it
    let text = element.getAttribute('data-text') || 'MARBLE AQWAS';
    text = text.trim(); // Remove any whitespace artifacts

    let index = 0;
    element.textContent = '';

    clearInterval(typewriterInterval);
    typewriterInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typewriterInterval);
            element.removeAttribute('data-typing');
        }
    }, 80); // 80ms per char
}

// Translation System - FIX: Works with both desktop and mobile toggles
(function () {
    const langToggle = document.getElementById('lang-toggle'); // Desktop toggle (primary)
    const mobileLangToggle = document.getElementById('mobile-lang-toggle'); // Mobile toggle (secondary)

    // Primary is desktop, fallback to mobile
    const primaryToggle = langToggle || mobileLangToggle;
    if (!primaryToggle) return;

    const translations = {
        en: {
            essence: "The Essence",
            collection: "Collection",
            testimonials: "Testimonials",
            connect: "Connect",
            heroTitle: "MARBLE AQWAS",
            heroTagline: "Premium Marble Selection",
            essenceTitle: "The Essence",
            essenceText: "MARBLE AQWAS focuses on delivering high-quality stone with reliable craftsmanship. Each piece is selected to provide durability, clarity, and a refined visual presence.",
            collectionTitle: "Premium Stone Selection",
            collectionSubtitle: "A curated range of natural marble finishes",
            item1: "Natural Granite",
            item1Desc: "The ultimate choice for surfaces facing daily heavy use. Renowned for its superior resistance to scratches, heat, and stains, making it the king of countertops and outdoor flooring. Natural beauty built to last for generations.",
            item2: "Natural Marble",
            item2Desc: "The essence of luxury and prestige. Featuring unique natural veining that turns every slab into a masterpiece. Adds a regal touch and natural coolness to high-end interiors and majlis areas.",
            item3: "Engineered Stone",
            item3Desc: "A modern fusion of style and innovation. Offering limitless designs with a non-porous surface for effortless maintenance and hygiene. The smart solution for contemporary living.",
            testimonialsTitle: "Client Testimonials",
            testimonial1: "\"Great quality and smooth service.\"",
            testimonial1Author: "— Client",
            testimonial2: "\"Our home renovation improved significantly.\"",
            testimonial2Author: "— Customer",
            testimonial3: "\"Reliable materials and professional handling.\"",
            testimonial3Author: "— Homeowner",
            connectTitle: "Connect With Us",
            namePlaceholder: "Name",
            emailPlaceholder: "Email",
            messagePlaceholder: "Message",
            inquire: "Inquire Now",
            mobileContactBtn: "Contact Us",
            footerAbout: "About",
            footerOurStory: "Our Story",
            footerTeam: "Team",
            footerCareers: "Careers",
            footerServices: "Services",
            footerInstallation: "Installation",
            footerConsultation: "Consultation",
            footerMaintenance: "Maintenance",
            footerContact: "Contact",
            footerAddress: "Asilah",
            footerFollow: "Follow Us",
            footerInstagram: "Instagram",
            footerFacebook: "Facebook",
            footerLinkedin: "LinkedIn",
            footerCopyright: "© 2025 MARBLE AQWAS. All Rights Reserved.",
            footerPrivacy: "Privacy Policy",
            footerTerms: "Terms of Service"
        },
        ar: {
            essence: "الجوهر",
            collection: "مجموعة الأعمال",
            testimonials: "آراء العملاء",
            connect: "تواصل",
            heroTitle: "رخام أقواس",
            heroTagline: "نقدم حلولا حجرية متقنة تحسن جودة المساحات",
            essenceTitle: "الجوهر",
            essenceText: "تركز رخام أقواس على تقديم حجر معتمد ومصنوع بعناية. نختار كل قطعة لتمنح قوة ووضوحا وحضورا بصريا راقيا.",
            collectionTitle: "تشكيلة أحجار مختارة",
            collectionSubtitle: "تنوع مناسب للمساحات العصرية.",
            item1: "الجرانيت الطبيعي",
            item1Desc: "الخيار المثالي للأسطح التي تواجه ضغطاً يومياً. يتميز بمقاومة فائقة للخدش، والحرارة، والبقع، مما يجعله ملك المطابخ والأرضيات الخارجية. جماله طبيعي وقوة تحمله تدوم لأجيال.",
            item2: "الرخام الطبيعي",
            item2Desc: "عنوان الفخامة والرقي؛ يتميز بعروقه الفريدة التي تجعل من كل قطعة لوحة فنية لا تتكرر. يضفي لمسة ملكية وبرودة طبيعية على المساحات الداخلية والمجالس الراقية.",
            item3: "الرخام الصناعي",
            item3Desc: "ابتكار عصري يجمع بين الجمال والعملية. يوفر تنوعاً غير محدود في التصاميم مع سطح غير مسامي يضمن سهولة العناية والنظافة التامة. الحل الذكي للمساحات الحديثة.",
            testimonialsTitle: "آراء العملاء",
            testimonial1: "«جودة جيدة وتعامل سلس.»",
            testimonial1Author: "— عميل",
            testimonial2: "«تحسن منزلنا بشكل ملموس.»",
            testimonial2Author: "— زبون",
            testimonial3: "«مواد معتمدة وخدمة منظمة.»",
            testimonial3Author: "— صاحب منزل",
            connectTitle: "تواصل معنا",
            namePlaceholder: "الاسم",
            emailPlaceholder: "البريد الإلكتروني",
            messagePlaceholder: "الرسالة",
            inquire: "أرسل الطلب",
            mobileContactBtn: "تواصل معنا",
            footerAbout: "عن الشركة",
            footerOurStory: "قصتنا",
            footerTeam: "الفريق",
            footerCareers: "الوظائف",
            footerTerms: "شروط الخدمة"
        }
    };

    function applyTranslations(lang) {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            const text = (translations[lang] && translations[lang][key]) ||
                (translations['en'] && translations['en'][key]);

            if (text) el.textContent = text; // Only update if translation exists
        });

        document.querySelectorAll('[data-key-placeholder]').forEach(el => {
            const key = el.getAttribute('data-key-placeholder');
            const text = (translations[lang] && translations[lang][key]) || '';
            if (text) el.placeholder = text;
        });

        const navLogoText = document.querySelector('.nav-logo-text');
        if (navLogoText) {
            navLogoText.setAttribute('data-text', translations[lang].heroTitle);
        }
    }

    function applyDirection(lang) {
        const isRTL = lang === 'ar';
        document.documentElement.lang = lang;
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.classList.remove('lang-ar', 'lang-en');
        document.documentElement.classList.add(isRTL ? 'lang-ar' : 'lang-en');
    }

    function saveLang(lang) {
        try { localStorage.setItem('marble_lang', lang); } catch (e) { }
    }

    function loadLang() {
        // Default to English, but allow user to switch
        try {
            const saved = localStorage.getItem('marble_lang');
            return saved || 'en'; // If user hasn't chosen, use 'en'
        } catch (e) {
            return 'en';
        }
    }

    function updateToggleButton(lang) {
        // FIX: Update both desktop (if exists) and mobile toggle
        if (langToggle) langToggle.textContent = lang === 'en' ? 'العربية' : 'English';
        if (mobileLangToggle) mobileLangToggle.textContent = lang === 'en' ? 'العربية' : 'English';
    }

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const heroLogo = document.querySelector('.logo');
    const navLogoImg = document.querySelector('.nav-logo-img');

    // Logos
    const LOGO_LIGHT_THEME = 'assets/logo-dark.png'; // Dark logo for light bg
    const LOGO_DARK_THEME = 'assets/logo-new.png'; // Light logo for dark bg (default)

    function setTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
            if (heroLogo) heroLogo.src = LOGO_LIGHT_THEME;
            if (navLogoImg) navLogoImg.src = LOGO_LIGHT_THEME;
        } else {
            html.removeAttribute('data-theme');
            if (heroLogo) heroLogo.src = LOGO_DARK_THEME;
            if (navLogoImg) navLogoImg.src = LOGO_DARK_THEME;
        }
        localStorage.setItem('marble_theme', theme);
    }

    function loadTheme() {
        // Default to light mode, but allow user to switch
        return localStorage.getItem('marble_theme') || 'light';
    }

    // Init
    const savedTheme = loadTheme();
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Scroll Logic for Logo Handoff
    const footer = document.querySelector('.footer-section');
    const navLogo = document.querySelector('.nav-logo');
    const footerLogo = document.querySelector('.footer-logo');
    const footerLogoContainer = document.querySelector('.footer-logo-container');

    // Sync Footer Logo on Theme Change
    function updateFooterLogo(theme) {
        if (footerLogo) {
            footerLogo.src = theme === 'light' ? LOGO_LIGHT_THEME : LOGO_DARK_THEME;
        }
    }

    // Initial Sync
    updateFooterLogo(savedTheme);

    // FIX: Initialize translations - ALWAYS ENGLISH ON LOAD
    const initial = 'en'; // User requested strict English default on reload
    saveLang('en'); // Reset saved state so toggle works correctly
    applyTranslations(initial);
    applyDirection(initial);
    updateToggleButton(initial);

    // FIX: Add event listeners to both toggles
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const current = loadLang();
            const newLang = current === 'en' ? 'ar' : 'en';
            applyTranslations(newLang);
            applyDirection(newLang);
            updateToggleButton(newLang);
            saveLang(newLang);
        });
    }

    if (mobileLangToggle) {
        mobileLangToggle.addEventListener('click', () => {
            const current = loadLang();
            const newLang = current === 'en' ? 'ar' : 'en';
            applyTranslations(newLang);
            applyDirection(newLang);
            updateToggleButton(newLang);
            saveLang(newLang);

            // FIX 1: Close menu after language change
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const menuToggle = document.getElementById('menu-toggle');
            if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuOverlay.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            }
        });
    }

    // Watch for Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            updateFooterLogo(currentTheme);
        });
    }

    // Scroll Observer
    window.addEventListener('scroll', () => {
        if (!footer || !navLogo) return;

        // Trigger when the Footer LOGO is significantly visible (e.g. 300px from bottom)
        const logoRect = footerLogoContainer.getBoundingClientRect();
        const logoVisible = logoRect.top < (window.innerHeight - 300); // 300px buffer to ensure visibility

        if (logoVisible) {
            navLogo.classList.add('hiding');
            footerLogoContainer.classList.add('active');
        } else {
            navLogo.classList.remove('hiding');
            footerLogoContainer.classList.remove('active');
        }
    });

})();

// Scroll Animations & Interactions
window.addEventListener('load', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section, .footer-section').forEach(section => {
        observer.observe(section);
    });

    // Magnetic Buttons - Optimized (including WhatsApp button)
    document.querySelectorAll('.submit-btn, .nav-link, .whatsapp-btn').forEach(btn => {
        let rect = null;

        btn.addEventListener('mouseenter', () => {
            rect = btn.getBoundingClientRect();
        });

        btn.addEventListener('mousemove', (e) => {
            if (!rect) return;
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            rect = null;
        });
    });

    // Gallery Click - Golden Frame
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// WhatsApp Button Logic
(function () {
    var whatsappUrl = "https://wa.me/212666171167";
    var btn = document.createElement("a");
    btn.href = whatsappUrl;
    btn.target = "_blank";
    btn.className = "whatsapp-btn";

    // Create tooltip
    var tooltip = document.createElement("span");
    tooltip.className = "whatsapp-tooltip";
    btn.appendChild(tooltip);

    // Function to update tooltip text based on language
    function updateTooltipText() {
        try {
            const currentLang = localStorage.getItem('marble_lang') || 'en';
            tooltip.textContent = currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp';
            btn.setAttribute("aria-label", currentLang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp');
        } catch (e) {
            tooltip.textContent = 'Chat on WhatsApp';
            btn.setAttribute("aria-label", "Chat on WhatsApp");
        }
    }

    // Initial tooltip text
    updateTooltipText();

    // Listen for language changes
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
        setTimeout(updateTooltipText, 100);
    });

    // SVM format for WhatsApp icon path
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("class", "whatsapp-icon");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M16 2C8.268 2 2 8.268 2 16c0 2.47.64 4.8 1.76 6.84L2.24 29.76l6.92-1.52A13.92 13.92 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.3 0-4.48-.68-6.38-1.84l-.46-.28-4.74 1.04 1.02-4.66-.28-.46C4.04 19.34 3.5 17.74 3.5 16c0-6.9 5.6-12.5 12.5-12.5s12.5 5.6 12.5 12.5-5.6 12.5-12.5 12.5zm6.86-9.36c-.38-.18-2.22-1.1-2.56-1.22-.34-.14-.58-.18-.84.18-.24.36-1 1.22-1.2 1.48-.22.24-.46.28-.84.1-.38-.18-1.6-.58-3.04-1.86-1.14-1.02-1.92-2.28-2.14-2.66-.22-.38-.02-.58.16-.76.18-.16.38-.42.58-.64.18-.22.24-.36.36-.62.12-.24.06-.46-.02-.64-.1-.18-.84-2.02-1.14-2.76-.3-.72-.6-0.62-.84-.64-.22 0-.46-.02-.72-.02-.26 0-.68.1-1.04.48-.36.4-1.38 1.34-1.38 3.28 0 1.94 1.4 3.82 1.6 4.1.2.26 2.76 4.2 6.68 5.88 2.64 1.14 2.64.76 3.12.72.48-.04 2.22-.9 2.54-1.78.32-.88.32-1.64.22-1.78-.08-.14-.32-.24-.7-.42z");

    svg.appendChild(path);
    btn.appendChild(svg);
    document.body.appendChild(btn);
})();

// Mobile Menu Logic (Updated for separate overlay structure)
(function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;

    if (!menuToggle || !mobileMenuOverlay) return;

    function toggleMenu() {
        const isActive = mobileMenuOverlay.classList.contains('active');

        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        mobileMenuOverlay.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        // FIX: Always restore scroll - safety mechanism
        body.style.overflow = '';
        body.style.overflowX = 'hidden'; // Keep horizontal scroll disabled
        body.style.overflowY = 'auto'; // Explicitly ensure vertical scroll
    }

    // Toggle Button Click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close on Link Click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Outside Click
    document.addEventListener('click', (e) => {
        const isClickInside = mobileMenuOverlay.contains(e.target) || menuToggle.contains(e.target);
        if (!isClickInside && mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // FIX 2: Sync mobile theme toggle with main theme toggle
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mainThemeToggle = document.getElementById('theme-toggle');

    if (mobileThemeToggle && mainThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            // Trigger the main theme toggle
            mainThemeToggle.click();
        });
    }

    // FIX 3: Swipe to close support (down or right)
    let touchStartX = 0;
    let touchStartY = 0;

    mobileMenuOverlay.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    mobileMenuOverlay.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Swipe right (close for LTR) or swipe down
        if (diffX > 100 || diffY > 100) {
            closeMenu();
        }
    }, { passive: true });
})();

// Contact Form Submission (Formspree AJAX)
(function () {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");

    if (!form) return;

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // UI Feedback - sending state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        // Check current language for "Sending..." text
        const currentLang = localStorage.getItem('marble_lang') || 'en';
        submitBtn.textContent = currentLang === 'ar' ? "جاري الإرسال..." : "Sending...";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

            if (response.ok) {
                status.style.display = "block";
                status.style.color = "#4CAF50"; // Success Green

                // Check current language for success message
                const lang = localStorage.getItem('marble_lang') || 'en';
                status.innerHTML = lang === 'ar' ? "شكراً لك! تم إرسال رسالتك بنجاح." : "Thanks! Your message has been sent successfully.";

                form.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    status.style.display = 'none';
                }, 5000);
            } else {
                response.json().then(data => {
                    status.style.display = "block";
                    status.style.color = "#f44336"; // Error Red
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form";
                    }
                })
            }
        }).catch(error => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            status.style.display = "block";
            status.style.color = "#f44336";
            status.innerHTML = "Oops! There was a problem submitting your form";
        });
    }

    form.addEventListener("submit", handleSubmit);
})();

// FIX: Back to Top Functionality
(function () {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const navLogo = document.querySelector('.nav-logo');
    const footerLogo = document.querySelector('.footer-logo');

    if (navLogo) {
        navLogo.addEventListener('click', scrollToTop);
    }
    if (footerLogo) {
        footerLogo.addEventListener('click', scrollToTop);
    }
})();

