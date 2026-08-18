/**
 * CEO / CXO BANKING COMMAND CENTRE - MINIMAL EXECUTIVE HEADER & 4-TAB CONTROLLER
 */

window.CXO_HEADER = {
  render: function () {
    const headerEl = document.getElementById("app-header");
    const filterBarEl = document.getElementById("filter-bar");
    const navStripEl = document.getElementById("tab-navigation-strip");

    if (headerEl) {
      headerEl.innerHTML = `
        <div class="header-brand">
          <div class="brand-logo-badge">BN</div>
          <div class="brand-titles">
            <h1>
              CEO CRM COMMAND CENTRE
              <span class="rfp-pill">Illustrative Data – RFP Demonstration</span>
            </h1>
            <p>Business Performance & Value Realisation | Executive View</p>
          </div>
        </div>

        <div class="header-actions">
          <button class="action-btn" onclick="window.CXO_HEADER.generateAiBrief()" title="Generate AI Executive Brief for Board Meeting">
            ✨ Executive Brief
          </button>
          <button class="action-btn" onclick="window.CXO_SIMULATOR.open()" title="What-If Value Realisation Simulator">
            🧮 What-If Simulator
          </button>
          <button class="action-btn primary" onclick="window.print()" title="Export Executive Board Pack">
            📄 Export Pack
          </button>
        </div>
      `;
    }

    if (filterBarEl) {
      filterBarEl.innerHTML = `
        <div class="filter-group">
          <span class="filter-label">Period:</span>
          <div class="period-pill-group">
            <button class="period-pill ${window.CXO_ENGINE.getState().period === 'MTD' ? 'active' : ''}" onclick="window.CXO_HEADER.setPeriod('MTD')">MTD</button>
            <button class="period-pill ${window.CXO_ENGINE.getState().period === 'QTD' ? 'active' : ''}" onclick="window.CXO_HEADER.setPeriod('QTD')">QTD</button>
            <button class="period-pill ${window.CXO_ENGINE.getState().period === 'YTD' ? 'active' : ''}" onclick="window.CXO_HEADER.setPeriod('YTD')">YTD</button>
          </div>
        </div>

        <div class="filter-group">
          <span class="filter-label">Business Unit:</span>
          <select class="filter-select" id="filter-bu" onchange="window.CXO_HEADER.setBU(this.value)">
            ${window.CXO_DATASET.businessUnits.map(b => `<option value="${b.id}">${b.name}</option>`).join("")}
          </select>
        </div>

        <div class="filter-group">
          <span class="filter-label">Geography:</span>
          <select class="filter-select" id="filter-region" onchange="window.CXO_HEADER.setRegion(this.value)">
            ${window.CXO_DATASET.regions.map(r => `<option value="${r.id}">${r.name}</option>`).join("")}
          </select>
        </div>

        <div class="filter-meta">
          <span>🕒 Last Updated: <strong>Today 08:30 IST</strong></span>
        </div>
      `;
    }

    if (navStripEl) {
      const tabs = [
        { id: "tab-overview", label: "CEO Executive Overview", num: "1", icon: "🏛️" },
        { id: "tab-growth", label: "Business Growth", num: "2", icon: "📈" },
        { id: "tab-customer", label: "Customer & Service", num: "3", icon: "🤝" },
        { id: "tab-value", label: "Productivity & Value", num: "4", icon: "💎", badge: "CORE" }
      ];

      navStripEl.innerHTML = tabs.map((t, idx) => `
        <button class="nav-tab-btn ${idx === 0 ? 'active' : ''}" data-tab-target="${t.id}" onclick="window.CXO_APP.switchTab('${t.id}')">
          <span>${t.icon} ${t.label}</span>
          ${t.badge ? `<span class="tab-badge" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe;">${t.badge}</span>` : ""}
        </button>
      `).join("");
    }
  },

  setPeriod: function (period) {
    window.CXO_ENGINE.setPeriod(period);
    this.render();
    window.CXO_APP.refreshActiveTab();
  },

  setBU: function (bu) {
    window.CXO_ENGINE.setBusinessUnit(bu);
    window.CXO_APP.refreshActiveTab();
  },

  setRegion: function (reg) {
    window.CXO_ENGINE.setRegion(reg);
    window.CXO_APP.refreshActiveTab();
  },

  generateAiBrief: function () {
    const data = window.CXO_ENGINE.getData();
    const state = window.CXO_ENGINE.getState();
    const modalEl = document.getElementById("brief-modal");
    if (!modalEl) return;

    const bodyEl = document.getElementById("brief-modal-body");
    bodyEl.innerHTML = `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #1e3a8a; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem;">
          <span>✨</span> Bank CEO Executive Brief: ${state.period} Performance
        </div>
        <div style="font-size: 0.75rem; color: #64748b;">
          Scope: ${state.businessUnit.toUpperCase()} | Geography: ${state.region.toUpperCase()}
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem; color: #334155; line-height: 1.55;">
        <div>
          <strong style="color: #0f172a;">1. Financial & Business Targets:</strong><br/>
          Total revenue generated is <strong>₹${data.revenueActual.toFixed(1)} Cr</strong> (${data.revenueAchievementPct.toFixed(0)}% of plan, +${data.revenueGrowthYoY.toFixed(1)}% YoY), pacing <strong>8.2% ahead of budget</strong>. Active customer base expanded by <strong>+${data.customerGrowthPct}%</strong>.
        </div>

        <div>
          <strong style="color: #0f172a;">2. Customer & Service Health:</strong><br/>
          NPS improved to <strong>+${data.npsScore}</strong> (vs target +40) and Retention reached <strong>${data.retentionRate.toFixed(1)}%</strong>. First Contact Resolution (FCR) of <strong>${data.fcrRate.toFixed(1)}%</strong> reduced average turnaround time from 12.5 hrs to 3.8 hrs.
        </div>

        <div>
          <strong style="color: #0f172a;">3. Productivity & Adoption:</strong><br/>
          CRM Adoption reached <strong>${data.crmAdoptionRate.toFixed(0)}%</strong> with RM Productivity up <strong>+${data.rmProdImprovementPct}%</strong> (₹${(data.revenuePerRmCr).toFixed(2)} Cr / RM). Sales cycle times contracted by <strong>45%</strong>.
        </div>

        <div>
          <strong style="color: #0f172a;">4. Total Realised Transformation Value:</strong><br/>
          Measured value realised is <strong>₹${data.realisedValueCr.toFixed(1)} Cr</strong> against a transformation score of <strong>84%</strong> (Target: 90%).
        </div>
      </div>
    `;

    modalEl.classList.add("active");
  },

  closeBriefModal: function () {
    const modalEl = document.getElementById("brief-modal");
    if (modalEl) modalEl.classList.remove("active");
  }
};
