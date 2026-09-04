/**
 * ==============================================================================
 * MAIN PORTFOLIO CONTROLLER
 * ==============================================================================
 * Manages core portfolio interactions:
 * - Dark/Light Theme Switcher & System Preferences
 * - Navigation Drawer & Active Scrollspy Observer
 * - Reading Progress Bar & Header Elevation
 * - Intersection Observer Reveal Animations
 * - Interactive Interactive Architectural Tab Controller
 * - Smooth Anchor Scrolling & One-Click Contact Copy
 * - Back to Top & Dynamic Footer Year
 */

(function () {
    "use strict";

    const root = document.documentElement;
    const body = document.body;
    const header = document.getElementById("site-header");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const themeToggle = document.getElementById("theme-toggle");
    const themeLabel = document.getElementById("theme-label");
    const progressBar = document.getElementById("progress-bar");
    const backToTopBtn = document.getElementById("back-to-top");
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ======================================================================
       Theme Switcher (Dark / Light)
       ====================================================================== */
    const THEME_KEY = "portfolio-theme-v4-orange";

    function getPreferredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === "light" || stored === "dark") return stored;
        return "dark";
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);

        const next = theme === "dark" ? "light" : "dark";
        if (themeToggle) themeToggle.setAttribute("aria-label", `Switch to ${next} mode`);
        if (themeLabel) themeLabel.textContent = next === "dark" ? "Dark" : "Light";

        // Read background token directly from CSS variables
        if (themeMeta) {
            const themeBg = getComputedStyle(root).getPropertyValue("--bg").trim();
            if (themeBg) themeMeta.setAttribute("content", themeBg);
        }
    }

    applyTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
        });
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });

    /* ======================================================================
       Mobile Navigation Drawer
       ====================================================================== */
    function closeNav() {
        body.classList.remove("nav-open");
        if (navLinks) navLinks.classList.remove("is-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }

    function openNav() {
        body.classList.add("nav-open");
        if (navLinks) navLinks.classList.add("is-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "true");
    }

    if (navToggle) {
        navToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            isOpen ? closeNav() : openNav();
        });
    }

    if (navLinks) {
        navLinks.addEventListener("click", function (e) {
            const link = e.target.closest("a");
            if (link) {
                closeNav();
            }
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeNav();
        }
    });

    window.matchMedia("(min-width: 769px)").addEventListener("change", function (e) {
        if (e.matches) {
            closeNav();
        }
    });

    /* ======================================================================
       Scroll Updates (Header Elevation, Progress Bar, Back-To-Top)
       ====================================================================== */
    let isTickingScroll = false;

    function handleScrollUpdates() {
        const scrollTop = window.scrollY;

        if (header) {
            header.classList.toggle("is-elevated", scrollTop > 15);
        }

        if (progressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = Math.min(progress, 100) + "%";
        }

        if (backToTopBtn) {
            backToTopBtn.classList.toggle("is-visible", scrollTop > 400);
        }

        isTickingScroll = false;
    }

    window.addEventListener("scroll", function () {
        if (!isTickingScroll) {
            requestAnimationFrame(handleScrollUpdates);
            isTickingScroll = true;
        }
    }, { passive: true });

    handleScrollUpdates();

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion.matches ? "auto" : "smooth"
            });
        });
    }

    /* ======================================================================
       Active Nav Observer (Scrollspy)
       ====================================================================== */
    function setupActiveNav() {
        const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
        const sections = [];

        navAnchors.forEach(function (link) {
            const id = link.getAttribute("href");
            const section = document.querySelector(id);
            if (section) sections.push({ link: link, section: section });
        });

        const openingSection = document.getElementById("opening");

        if (!sections.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.target === openingSection) {
                    if (entry.isIntersecting) {
                        sections.forEach(function (item) {
                            item.link.classList.remove("is-active");
                        });
                    }
                    return;
                }

                if (!entry.isIntersecting) return;
                sections.forEach(function (item) {
                    const isActive = item.section === entry.target;
                    item.link.classList.toggle("is-active", isActive);
                });
            });
        }, {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        });

        sections.forEach(function (item) {
            observer.observe(item.section);
        });
        if (openingSection) {
            observer.observe(openingSection);
        }
    }

    setupActiveNav();

    /* ======================================================================
       Scroll Reveal Animations
       ====================================================================== */
    function setupReveal() {
        const items = document.querySelectorAll(".reveal");

        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("is-visible"); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.05
        });

        items.forEach(function (el) { observer.observe(el); });
    }

    setupReveal();

    /* ======================================================================
       Interactive Tablist Switcher (System Flows)
       ====================================================================== */
    const tabList = document.querySelector('[role="tablist"]');
    const tabs = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    if (tabList && tabs.length && panels.length) {
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => switchTab(index));

            tab.addEventListener("keydown", (e) => {
                let targetIndex = null;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    targetIndex = (index + 1) % tabs.length;
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    targetIndex = (index - 1 + tabs.length) % tabs.length;
                } else if (e.key === "Home") {
                    targetIndex = 0;
                } else if (e.key === "End") {
                    targetIndex = tabs.length - 1;
                }

                if (targetIndex !== null) {
                    e.preventDefault();
                    tabs[targetIndex].focus();
                    switchTab(targetIndex);
                }
            });
        });

        function switchTab(index) {
            tabs.forEach((t, i) => {
                const isSelected = i === index;
                t.setAttribute("aria-selected", isSelected ? "true" : "false");
                t.setAttribute("tabindex", isSelected ? "0" : "-1");
            });

            panels.forEach((p, i) => {
                const isActive = i === index;
                p.hidden = !isActive;
                p.classList.toggle("active", isActive);

                if (isActive) {
                    const nodes = p.querySelectorAll(".flow-node");
                    nodes.forEach((node, nodeIdx) => {
                        node.classList.remove("active");
                        setTimeout(() => {
                            node.classList.add("active");
                        }, nodeIdx * 150);
                    });
                }
            });
        }

        const initialNodes = panels[0].querySelectorAll(".flow-node");
        initialNodes.forEach((node, nodeIdx) => {
            setTimeout(() => {
                node.classList.add("active");
            }, nodeIdx * 150);
        });
    }

    /* ======================================================================
       Smooth Anchor Navigation
       ====================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: reduceMotion.matches ? "auto" : "smooth"
            });

            history.pushState(null, "", targetId);
        });
    });

    /* ======================================================================
       One-Click Contact Info Copy with Error Fallbacks
       ====================================================================== */
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const phoneLink = document.querySelector('a[href^="tel:"]');

    function handleCopy(e, text, fallbackUrl) {
        e.preventDefault();
        const targetEl = e.currentTarget;
        const detailEl = targetEl.querySelector(".contact-detail");

        function showFeedback(msg, color) {
            if (!detailEl) return;
            const originalText = detailEl.dataset.original || detailEl.textContent;
            detailEl.dataset.original = originalText;
            detailEl.textContent = msg;
            if (color) detailEl.style.color = color;

            setTimeout(() => {
                detailEl.textContent = originalText;
                detailEl.style.color = "";
            }, 2200);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    showFeedback("Copied to Clipboard! ✓", "#10b981");
                })
                .catch(() => {
                    if (fallbackUrl) {
                        window.location.href = fallbackUrl;
                    } else {
                        showFeedback("Select to copy", "#f59e0b");
                    }
                });
        } else if (fallbackUrl) {
            window.location.href = fallbackUrl;
        }
    }

    if (emailLink) {
        emailLink.addEventListener("click", function (e) {
            handleCopy(e, "pruthvi.r0006@gmail.com", "mailto:pruthvi.r0006@gmail.com");
        });
    }

    if (phoneLink) {
        phoneLink.addEventListener("click", function (e) {
            handleCopy(e, "+919538118708", "tel:+919538118708");
        });
    }

    /* ======================================================================
       Dynamic Current Year
       ====================================================================== */
    const currentYearEl = document.getElementById("current-year");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

})();
