/**
 * CEO / CXO COMMAND CENTRE - TAB 6: CRM ADOPTION & TRANSFORMATION
 * Telemetry, Feature Usage Depth, and Correlation with Commercial Outcomes
 */

window.CXO_TAB_ADOPTION = {
  render: function () {
    const data = window.CXO_ENGINE.getData();

    const adoptionFunnelStages = [
      { label: "1. Licensed Users", value: data.totalCrmUsers, sublabel: "Total Provisioned Enterprise Licenses" },
      { label: "2. Monthly Active (MAU)", value: data.mauUsers, sublabel: `${data.crmAdoptionRate.toFixed(1)}% Active Rate` },
      { label: "3. Daily Active (DAU)", value: data.dauUsers, sublabel: `${data.dauMauStickiness.toFixed(1)}% Daily Stickiness` },
      { label: "4. Power Users (>50 acts/wk)", value: Math.round(data.dauUsers * 0.68), sublabel: "68.0% Power Users" }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">CRM Adoption & Digital Transformation</h2>
          <p class="section-subtitle">Demonstrating that software adoption directly correlates with commercial value creation</p>
        </div>
      </div>

      <!-- 1. ADOPTION KPI CARDS -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-active",
          title: "Active CRM Users",
          value: data.crmAdoptionRate.toFixed(1) + "%",
          target: "85.0%",
          variancePct: data.crmAdoptionRate - 85.0,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-dau",
          title: "Daily Active Users (DAU)",
          value: data.dauUsers.toLocaleString(),
          target: (data.totalCrmUsers * 0.75).toFixed(0),
          variancePct: ((data.dauUsers - data.totalCrmUsers * 0.75) / (data.totalCrmUsers * 0.75)) * 100,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-stickiness",
          title: "DAU / MAU Stickiness",
          value: data.dauMauStickiness.toFixed(1) + "%",
          target: "78.0%",
          variancePct: data.dauMauStickiness - 78.0,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-mobile",
          title: "Mobile CRM Users",
          value: data.mobileAdoptionRate.toFixed(1) + "%",
          target: "65.0%",
          variancePct: data.mobileAdoptionRate - 65.0,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-logging",
          title: "Interaction Logging SLA",
          value: "94.8%",
          target: "90.0%",
          variancePct: 5.3,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-adopt-workflow",
          title: "Digital Workflow Adoption",
          value: "91.2%",
          target: "85.0%",
          variancePct: 7.3,
          status: "ontrack",
          definitionKey: "stpRate"
        })}
      </div>

      <!-- 2. PROOF OF VALUE: CORRELATION SCATTER PLOTS -->
      <div class="surface-card" style="margin-bottom: 1.75rem; border-left: 4px solid var(--brand-accent);">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3 style="font-size: 1.05rem;">Proof of Value: CRM Adoption Directly Drives Commercial Outcomes</h3>
            <p>Empirical branch & RM-level correlation analysis validating the transformation hypothesis</p>
          </div>
          <span class="status-badge ontrack">Statistically Proven (r = 0.88)</span>
        </div>

        <div class="grid-2col" style="margin-bottom: 0;">
          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Correlation 1: CRM Adoption % vs Revenue Growth (%)
            </h4>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Branches with >90% CRM adoption achieve <strong>2.8x higher revenue growth</strong> than low-adoption peers.
            </p>
            ${window.CXO_CHARTS.renderScatterPlot("revenue")}
          </div>

          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Correlation 2: CRM Adoption % vs RM Productivity ($K / RM)
            </h4>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Front-line officers actively utilizing CRM generate <strong>+$42.5K more revenue per month</strong> through automated pipeline follow-up.
            </p>
            ${window.CXO_CHARTS.renderScatterPlot("productivity")}
          </div>
        </div>
      </div>

      <!-- 3. ADOPTION FUNNEL & PROCESS DEPTH -->
      <div class="grid-2col">
        <!-- User Adoption Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Enterprise User Adoption & Engagement Funnel</h3>
              <p>Progression from licensed seats to daily power users</p>
            </div>
            <span class="status-badge ontrack">${data.crmAdoptionRate.toFixed(1)}% Adoption</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(adoptionFunnelStages)}
        </div>

        <!-- CRM Process Depth -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Core CRM Process Adoption (% Digitized)</h3>
              <p>Audit of front-office and back-office operating workflows executing via CRM</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Lead & Prospect Management</span>
                <span style="color: #059669;">98.4% via CRM</span>
              </div>
              <div class="progress-mini-bar"><div class="progress-mini-fill" style="width: 98.4%; background: #059669;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Opportunity & Deal Stage Pipeline</span>
                <span style="color: #059669;">95.2% via CRM</span>
              </div>
              <div class="progress-mini-bar"><div class="progress-mini-fill" style="width: 95.2%; background: #059669;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Customer Interaction & Call Logging</span>
                <span style="color: #059669;">91.8% via CRM</span>
              </div>
              <div class="progress-mini-bar"><div class="progress-mini-fill" style="width: 91.8%; background: #059669;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Customer Service Case Resolution</span>
                <span style="color: #059669;">96.5% via CRM</span>
              </div>
              <div class="progress-mini-bar"><div class="progress-mini-fill" style="width: 96.5%; background: #059669;"></div></div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Credit Approval & Executive Sign-offs</span>
                <span style="color: #2563eb;">84.0% via CRM</span>
              </div>
              <div class="progress-mini-bar"><div class="progress-mini-fill" style="width: 84.0%; background: #2563eb;"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
