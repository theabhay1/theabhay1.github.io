// ==========================================
// 1. DATA INJECTION ENGINE (CMS)
// ==========================================
const data = window.portfolioData;
if (data) {
    // Inject Personal & Hero Info
    document.getElementById('nav-logo').innerHTML = data.personal.logoText;
    document.getElementById('hero-first').innerHTML = data.personal.firstName;
    document.getElementById('hero-last').innerHTML = data.personal.lastName;
    document.getElementById('hero-subtitle').innerHTML = data.personal.subtitle;
    document.getElementById('hero-desc-text').innerHTML = data.personal.heroDescription;
    document.getElementById('bg-marquee').innerHTML = data.personal.bgMarqueeText;
    
    // Inject Hero Carousel Words
    document.getElementById('hero-carousel').innerHTML = data.personal.heroCarouselWords.map(word => 
        `<span>${word}</span>`
    ).join('');

    // Inject About Section
    document.getElementById('about-headline').innerHTML = data.personal.aboutHeadline;
    document.getElementById('about-desc').innerHTML = data.personal.aboutDescription;
    
    // Inject Skills
    document.getElementById('skills-container').innerHTML = data.personal.skills.map(skill => 
        `<span class="px-6 py-2 rounded-full border border-white/20 font-mono text-sm">${skill}</span>`
    ).join('');

    // Inject Stats
    document.getElementById('stats-container').innerHTML = data.stats.map((stat, i) => `
        <a href="${stat.link || '#'}" target="_blank" class="b-card glow-card p-16 flex flex-col items-center justify-center rounded-sm cursor-pointer hover:border-white/20 transition-all duration-300 relative group block">
            <h3 class="text-7xl font-black mb-4 ${stat.highlight ? 'text-accent' : ''}">
                <span class="count-up" id="stat-val-${i}" data-target="${stat.target}">${stat.target}</span>${stat.suffix}
            </h3>
            <p class="font-mono text-sm ${stat.highlight ? 'text-accent' : 'text-gray-400'} tracking-widest flex items-center justify-center gap-2">
                ${stat.label}
                <i data-lucide="external-link" class="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
            </p>
        </a>
    `).join('');

    // Background Live Data Fetcher (CORS-Free Proxy Engine)
    data.stats.forEach((stat, i) => {
        if (stat.apiUrl && stat.apiPath) {
            fetch(stat.apiUrl)
                .then(res => res.json())
                .then(json => {
                    const liveVal = stat.apiPath.split('.').reduce((o, key) => o[key], json);
                    if (liveVal !== undefined && !isNaN(liveVal)) {
                        document.getElementById(`stat-val-${i}`).setAttribute('data-target', liveVal);
                    }
                }).catch(err => console.log("Live fetch failed, defaulting to hardcoded target:", err));
        }
    });

    // Inject Projects
    const projectContainer = document.getElementById('project-container');
    if (projectContainer && data.projects.length > 0) {
        projectContainer.style.width = `${data.projects.length * 100}vw`;
        projectContainer.innerHTML = data.projects.map((proj, i) => `
            <div class="panel px-12 md:px-32 flex flex-col justify-center">
                <div class="watermark">0${i + 1}</div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto relative z-10">
                    <div>
                        <span class="font-mono text-accent tracking-widest text-sm mb-4 block">0${i + 1} / ${proj.category}</span>
                        <h3 class="text-6xl md:text-8xl font-black mb-8 leading-none">${proj.title}</h3>
                        <p class="text-gray-400 text-lg mb-8 max-w-md">${proj.description}</p>
                        <a href="${proj.link}" target="_blank" class="magnetic inline-flex items-center gap-4 text-white hover:text-accent transition-colors pb-2 border-b border-white hover:border-accent">
                            View Source <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                        </a>
                    </div>
                    <div class="aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden group shadow-2xl" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1000">
                        <i data-lucide="${proj.icon}" class="w-32 h-32 text-white/20 group-hover:scale-110 group-hover:text-accent transition-all duration-700"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Inject Contact & Footer
    document.getElementById('contact-email').href = `mailto:${data.personal.contactEmail}`;
    document.getElementById('footer-copyright').innerHTML = `© ${data.personal.copyrightYear} ${data.personal.copyrightName}`;
    document.getElementById('footer-github').href = data.personal.githubUrl;
    document.getElementById('footer-linkedin').href = data.personal.linkedinUrl;
}

// Initialize Icons (After DOM injection to capture new icons)
lucide.createIcons();

// ==========================================
// 2. PHYSICS ENGINE (Lenis & VanillaTilt)
// ==========================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

// ==========================================
// 3. CURSOR & INTERACTIVITY
// ==========================================
const cursor = document.getElementById('cursor');
const glow = document.getElementById('ambient-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const speed = 0.2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    if(cursor) cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    if(glow) glow.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Magnetic Links
const magnetics = document.querySelectorAll('.magnetic');
magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const pos = el.getBoundingClientRect();
        const mx = e.clientX - pos.left - pos.width/2;
        const my = e.clientY - pos.top - pos.height/2;
        gsap.to(el, { x: mx * 0.3, y: my * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
    el.addEventListener('mouseenter', () => { if(cursor) cursor.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', () => { if(cursor) cursor.classList.remove('cursor-hover'); });
});

// Stripe-style Glow Cards
document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ==========================================
// 4. GSAP ANIMATIONS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Cinematic Loader
const percentEl = document.getElementById('loader-percent');
let progress = { val: 0 };
gsap.to(progress, {
    val: 100,
    duration: 1.5,
    roundProps: "val",
    ease: "power3.inOut",
    onUpdate: () => { if(percentEl) percentEl.innerHTML = progress.val + "%"; },
    onComplete: () => {
        gsap.to("#preloader", {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: initInteractions
        });
    }
});

function initInteractions() {
    gsap.to('.hero-line', {
        y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out"
    });
    gsap.to('#hero-desc', {
        opacity: 1, duration: 2, delay: 0.5, ease: "power2.out"
    });
    gsap.to('.hero-line', {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.from(".img-reveal", {
        scrollTrigger: { trigger: "#about", start: "top 70%" },
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 1.2, ease: "power4.inOut"
    });

    const panels = gsap.utils.toArray(".panel");
    if(panels.length > 0) {
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-scroll-wrapper",
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + document.querySelector(".horizontal-scroll-wrapper").offsetWidth
            }
        });
    }

    gsap.utils.toArray('.count-up').forEach(counter => {
        counter.innerHTML = "0";
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                gsap.to(counter, {
                    innerHTML: target, duration: 2.5, snap: { innerHTML: 1 }, ease: "expo.out"
                });
            }
        });
    });
}
