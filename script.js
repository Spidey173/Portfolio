

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    // Create Scroll Progress Bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'scroll-progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBarContainer.appendChild(progressBar);
    document.body.appendChild(progressBarContainer);
    
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Update Scroll Progress Bar
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                if (scrollHeight > 0) {
                    const scrollPercentage = (scrollTop / scrollHeight) * 100;
                    progressBar.style.width = scrollPercentage + '%';
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // Active Nav Link Highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            navObserver.observe(section);
        }
    });

    // Mobile Hamburger Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });

        // Close menu when a link is clicked
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                }
            });
        });
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.appear').forEach(el => {
        observer.observe(el);
    });

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       ADVANCED FEATURES
       ========================================= */

    // 4. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    // Track mouse coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Smooth following using requestAnimationFrame and transform3d
    function loop() {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;
        
        cursor.style.transform = `translate3d(${posX - 13}px, ${posY - 13}px, 0)`;
        follower.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
        
        requestAnimationFrame(loop);
    }
    loop();

    // Cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .card, .timeline-card, .skill-category-card, .education-card, .tag, .tag-pill, .tech-pill-small, .contact-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'), { passive: true });
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'), { passive: true });
    });

    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.hero-actions .btn-primary, .hero-actions .btn-secondary');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            btn.style.transform = `translate3d(${deltaX * 8}px, ${deltaY * 8}px, 0)`;
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate3d(0px, 0px, 0px)`;
            setTimeout(() => {
                btn.style.transform = '';
            }, 300);
        }, { passive: true });
    });

    // 5. Typewriter Effect
    const typeWriterElement = document.querySelector('.typewriter');
    if (typeWriterElement) {
        const words = ['AI-powered systems.', 'scalable backends.', 'secure REST APIs.', 'modern web apps.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Delete faster
            } else {
                typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing quickly since preloader is gone
        setTimeout(type, 300); 
    }

    // 6. Vanilla-Tilt Initialization
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".project-card, .skill-category-card, .education-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });

        VanillaTilt.init(document.querySelectorAll(".timeline-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
            axis: "y" // Only tilt vertically for timeline cards
        });
    }

    // 7. Three.js WebGL Interactive Chakra Scene & GSAP Scroll
    const canvas = document.getElementById('particle-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 200;

        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced from 2 to 1.5 to save render throughput on high DPI screens

        // Create a Premium "Chakra Wave" with optimized point density (65x65 instead of 100x100)
        // This cuts grid nodes from 10,000 to ~4,200, saving over 55% GPU/CPU overhead!
        const planeGeo = new THREE.PlaneGeometry(2000, 2000, 65, 65);
        const count = planeGeo.attributes.position.count;
        const colors = new Float32Array(count * 3);
        
        // Use the original subtle colors
        const primaryColor = new THREE.Color(0xff6b00); // Chakra Orange
        const darkColor = new THREE.Color(0xd90429);    // Deep Red

        for(let i=0; i<count; i++) {
            // Mix between orange and red randomly, but keep it mostly orange
            const mixedColor = primaryColor.clone().lerp(darkColor, Math.random() * 0.5);
            colors[i*3] = mixedColor.r;
            colors[i*3+1] = mixedColor.g;
            colors[i*3+2] = mixedColor.b;
        }
        planeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const planeMat = new THREE.PointsMaterial({
            size: 1.8, // Slightly larger size due to optimized grid spacing
            vertexColors: true,
            transparent: true,
            opacity: 0.25, // Significantly lowered opacity so it's not "too much color"
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const chakraWave = new THREE.Points(planeGeo, planeMat);
        
        // Tilt it flat and move it down so it acts like a floor/sea
        chakraWave.rotation.x = -Math.PI / 2;
        chakraWave.position.y = -100; // Low enough to not obscure hero text
        scene.add(chakraWave);

        // 3. Ambient Twinkling Stardust for atmospheric depth
        const starGroup = new THREE.Group();
        const starMaterials = [];
        
        // Create 4 layers: 3 for regular stars, 1 for bright "hero" stars (reduced counts for performance)
        for (let j = 0; j < 4; j++) {
            const isHero = j === 3;
            const numStars = isHero ? 30 : 200; // Optimized star counts
            const starGeo = new THREE.BufferGeometry();
            const starPos = new Float32Array(numStars * 3); 
            
            for(let i=0; i<numStars*3; i+=3) {
                starPos[i] = (Math.random() - 0.5) * 2500;
                starPos[i+1] = (Math.random() - 0.5) * 1500; 
                starPos[i+2] = (Math.random() - 0.5) * 800; // Brought significantly closer to camera
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
            
            let starColor;
            if (isHero) {
                starColor = 0xffffff; // Bright white for hero stars
            } else {
                starColor = j === 0 ? 0xffffff : (j === 1 ? 0xffb703 : 0xff6b00); // White, Gold, Orange
            }

            const starMat = new THREE.PointsMaterial({
                color: starColor,
                size: isHero ? (4 + Math.random() * 4) : (Math.random() * 2 + 1.5), // Hero stars are much larger
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                sizeAttenuation: true
            });
            starMaterials.push(starMat);
            const stardust = new THREE.Points(starGeo, starMat);
            starGroup.add(stardust);
        }
        scene.add(starGroup);

        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 150);
        }, { passive: true });

        // Parallax mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        }, { passive: true });

        const clock = new THREE.Clock();

        function animateCanvas() {
            requestAnimationFrame(animateCanvas);
            const time = clock.getElapsedTime();
            
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Animate the Chakra Wave (Sine Wave undulation)
            const positions = planeGeo.attributes.position.array;
            const timeX = time * 0.5;
            const timeY = time * 0.3;
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];
                
                // Complex organic wave using multiple sine functions
                positions[i3 + 2] = 
                    Math.sin(x * 0.005 + timeX) * 25 + 
                    Math.sin(y * 0.005 + timeY) * 25;
            }
            planeGeo.attributes.position.needsUpdate = true;

            // Twinkle stars by modifying opacity with sine waves at different phases
            starMaterials[0].opacity = 0.6 + Math.sin(time * 2.0) * 0.25;
            starMaterials[1].opacity = 0.5 + Math.sin(time * 1.5 + 2) * 0.25;
            starMaterials[2].opacity = 0.55 + Math.sin(time * 3.0 + 4) * 0.25;
            
            // Hero stars twinkle independently and brightly
            if(starMaterials[3]) {
                starMaterials[3].opacity = 0.8 + Math.sin(time * 4.0) * 0.2;
            }

            // Gentle rotation of the entire stardust field
            starGroup.rotation.y += 0.0003;

            // Mouse parallax smoothly interpolated
            camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 0.1 - camera.position.y + 50) * 0.02; // keeping base Y at 50

            renderer.render(scene, camera);
        }
        animateCanvas();

        // --- GSAP ScrollTrigger Integration ---
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Fly camera forward over the wave as user scrolls
            gsap.to(camera.position, {
                z: -300, 
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Slowly elevate the wave on scroll for a rising chakra effect
            gsap.to(chakraWave.position, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2
                }
            });

            // Smooth parallax for hero content
            gsap.to(".hero-content", {
                y: 100,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
            
            gsap.to(".hero-visual", {
                y: 150,
                rotateX: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }

});
