/**
 * ==============================================================================
 * PROJECT ARCHITECTURE MODAL CONTROLLER & COMPONENT RENDERERS
 * ==============================================================================
 * Modular UI component renderers and interactive modal lifecycle manager.
 */

(function () {
    "use strict";

    const modalOverlay = document.getElementById("project-modal-overlay");
    const modalBadge = document.getElementById("modal-badge");
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    /* ==========================================================================
       COMPONENT RENDERERS
       ========================================================================== */

    /**
     * Renders tech stack badge pills
     * @param {string[]} tags
     * @returns {string} HTML
     */
    function renderTags(tags) {
        if (!tags || !tags.length) return "";
        const pills = tags.map(tag => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("");
        return `<div class="modal-tags">${pills}</div>`;
    }

    /**
     * Renders the executive project summary overview
     * @param {string} summary
     * @returns {string} HTML
     */
    function renderSummary(summary) {
        if (!summary) return "";
        return `
            <div class="modal-block modal-summary-block">
                <h4 class="modal-block-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Project Overview
                </h4>
                <p class="modal-summary-text">${escapeHtml(summary)}</p>
            </div>
        `;
    }

    /**
     * Renders key technical engineering highlights
     * @param {Array<{title: string, desc: string}>} highlights
     * @returns {string} HTML
     */
    function renderHighlights(highlights) {
        if (!highlights || !highlights.length) return "";
        const cards = highlights.map(item => `
            <div class="modal-highlight-card">
                <div class="modal-highlight-title">${escapeHtml(item.title)}</div>
                <div class="modal-highlight-desc">${escapeHtml(item.desc)}</div>
            </div>
        `).join("");

        return `
            <div class="modal-block">
                <h4 class="modal-block-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Key Technical Highlights
                </h4>
                <div class="modal-highlights-grid">
                    ${cards}
                </div>
            </div>
        `;
    }

    /**
     * Renders numbered end-to-end system flow steps
     * @param {Array<{title: string, desc: string}>} flowSteps
     * @returns {string} HTML
     */
    function renderFlow(flowSteps) {
        if (!flowSteps || !flowSteps.length) return "";
        const steps = flowSteps.map((step, idx) => `
            <div class="modal-flow-step">
                <div class="modal-step-number">${idx + 1}</div>
                <div class="modal-step-content">
                    <div class="modal-step-title">${escapeHtml(step.title.replace(/^\d+\.\s*/, ""))}</div>
                    <div class="modal-step-desc">${escapeHtml(step.desc)}</div>
                </div>
            </div>
        `).join("");

        return `
            <div class="modal-block">
                <h4 class="modal-block-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    End-to-End System Flow
                </h4>
                <div class="modal-flow-steps">
                    ${steps}
                </div>
            </div>
        `;
    }

    /**
     * Renders the ASCII system architecture diagram container
     * @param {{filename: string, code: string}} diagram
     * @returns {string} HTML
     */
    function renderDiagram(diagram) {
        if (!diagram || !diagram.code) return "";
        return `
            <div class="modal-block">
                <h4 class="modal-block-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    System Architecture Diagram
                </h4>
                <div class="modal-diagram-card">
                    <div class="diagram-window-header">
                        <div class="diagram-dots">
                            <span class="dot red"></span>
                            <span class="dot yellow"></span>
                            <span class="dot green"></span>
                        </div>
                        <span class="diagram-filename">${escapeHtml(diagram.filename || "architecture-flow.spec")}</span>
                        <span class="diagram-badge">SYSTEM SPEC</span>
                    </div>
                    <div class="diagram-scroll-hint" aria-hidden="true">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        <span>Swipe horizontally to inspect full architecture</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <pre class="diagram-code"><code>${escapeHtml(diagram.code)}</code></pre>
                </div>
            </div>
        `;
    }

    /**
     * Renders architectural trade-offs & decision rationale cards
     * @param {Array<{title: string, desc: string}>} decisions
     * @returns {string} HTML
     */
    function renderDecisions(decisions) {
        if (!decisions || !decisions.length) return "";
        const cards = decisions.map(item => `
            <div class="modal-decision-card">
                <div class="modal-decision-title">
                    <span class="decision-q-icon">?</span>
                    ${escapeHtml(item.title)}
                </div>
                <div class="modal-decision-desc">${escapeHtml(item.desc)}</div>
            </div>
        `).join("");

        return `
            <div class="modal-block">
                <h4 class="modal-block-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Architectural Decisions & Rationale
                </h4>
                <div class="modal-decisions-grid">
                    ${cards}
                </div>
            </div>
        `;
    }

    /**
     * Renders the modal footer action buttons (Live Demo / GitHub Repo)
     * @param {Array<{label: string, url: string, isPrimary: boolean}>} links
     * @returns {string} HTML
     */
    function renderFooter(links) {
        if (!links || !links.length) return "";
        const buttons = links.map(link => `
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer" class="modal-link-btn ${link.isPrimary ? "primary" : "secondary"}">
                ${escapeHtml(link.label)}
            </a>
        `).join("");

        return `<div class="modal-footer-links">${buttons}</div>`;
    }

    /**
     * Assembles the modal content from individual modular component renderers
     * @param {Object} data
     * @returns {string} Full HTML markup
     */
    function buildModalHtml(data) {
        return [
            renderTags(data.tags),
            renderSummary(data.summary),
            renderHighlights(data.highlights),
            renderFlow(data.flowSteps),
            renderDiagram(data.diagram),
            renderDecisions(data.decisions),
            renderFooter(data.links)
        ].join("");
    }

    /* ==========================================================================
       MODAL LIFECYCLE & EVENT CONTROLLER
       ========================================================================== */

    function openProjectModal(projectKey) {
        const dataSource = window.PROJECT_MODAL_DATA || (typeof PROJECT_MODAL_DATA !== "undefined" ? PROJECT_MODAL_DATA : null);
        if (!dataSource) {
            console.error("PROJECT_MODAL_DATA is not loaded.");
            return;
        }

        const data = dataSource[projectKey];
        if (!data || !modalOverlay) return;

        if (modalBadge) modalBadge.textContent = data.badge || "Architecture Deep-Dive";
        if (modalTitle) modalTitle.textContent = data.title || "Project Overview";
        if (modalBody) {
            modalBody.innerHTML = buildModalHtml(data);
            modalBody.scrollTop = 0;
        }

        modalOverlay.classList.add("is-active");
        modalOverlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (modalCloseBtn) {
            setTimeout(() => modalCloseBtn.focus(), 50);
        }
    }

    function closeProjectModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove("is-active");
        modalOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    /* ==========================================================================
       EVENT DELEGATION & LIFECYCLE LISTENERS
       ========================================================================== */

    // Single delegated listener for all modal open/close actions
    document.addEventListener("click", e => {
        // 1. Open modal trigger
        const openBtn = e.target.closest(".open-modal-btn");
        if (openBtn && openBtn.dataset.project) {
            openProjectModal(openBtn.dataset.project);
            return;
        }

        // 2. Close button trigger
        const closeBtn = e.target.closest("#modal-close-btn");
        if (closeBtn) {
            closeProjectModal();
            return;
        }

        // 3. Click-outside backdrop dismiss
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });

    // Keyboard dismiss on Escape
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("is-active")) {
            closeProjectModal();
        }
    });

    // Expose lifecycle methods globally
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;

})();
