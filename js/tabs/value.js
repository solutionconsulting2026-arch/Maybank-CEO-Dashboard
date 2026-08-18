/**
 * CEO / CXO BANKING COMMAND CENTRE - TAB 4: PRODUCTIVITY & VALUE (KEY DIFFERENTIATOR)
 * Executive Question: "Is CRM adoption actually creating measurable business value?"
 */

window.CXO_TAB_VALUE = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const valueModel = window.CXO_DATASET.valueRealisationPillars;

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Productivity Gains & Transformation Value Realisation</h2>
          <p class="section-subtitle">Connecting CRM adoption directly to measurable operational and shareholder value</p>
        </div>
      </div>

      <!-- 1. 6 KPI STRIP -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-prod",
          title: "Productivity Improvement",
          value: "+18%",
          target: "+15%",
          variancePct: 3.0,
          status: "ontrack",
          definitionKey: "productivity"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-cycle",
          title: "Sales Cycle Reduction",
          value: "-45%",
          target: "-35%",
          variancePct: 10.0,
          status: "ontrack",
          definitionKey: "salesConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-res",
          title: "Resolution Time Reduction",
          value: "-69%",
          target: "-50%",
          variancePct: 19.0,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-adopt",
          title: "CRM Active Users",
          value: data.crmAdoptionRate.toFixed(0) + "%",
          target: "85%",
          variancePct: data.crmAdoptionRate - 85,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-proc",
          title: "Core Process Adoption",
          value: "91.2%",
          target: "85.0%",
          variancePct: 6.2,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-val-realised",
          title: "Realised Business Value",
          value: "₹" + data.realisedValueCr.toFixed(0) + " Cr",
          target: "₹130 Cr",
          variancePct: ((data.realisedValueCr - 130) / 130) * 100,
          status: "ontrack",
          definitionKey: "revenueVsPlan"
        })}
      </div>

      <!-- 2. PRODUCTIVITY GAINS & 4 ADOPTION METRICS -->
      <div class="grid-2col">
        <!-- Productivity Gains (Current vs Baseline) -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Productivity Gains (Current vs Baseline)</h3>
              <p>Direct efficiency improvements across front-office & back-office</p>
            </div>
            <span class="status-badge ontrack">+18% Efficiency</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.15rem; margin-top: 0.5rem;">
            <div class="dimension-subcard" style="text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div class="dimension-name">RM Revenue Productivity</div>
                <div class="dimension-score" style="font-size: 1.25rem; color: #059669;">₹1.85 Cr / RM <span style="font-size: 0.75rem; color: #64748b;">(vs ₹1.57 Cr Baseline)</span></div>
              </div>
              <span class="status-badge ontrack">+18% Lift</span>
            </div>

            <div class="dimension-subcard" style="text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div class="dimension-name">Commercial Sales Deal Cycle</div>
                <div class="dimension-score" style="font-size: 1.25rem; color: #059669;">18.5 days <span style="font-size: 0.75rem; color: #64748b;">(vs 34.0 days Baseline)</span></div>
              </div>
              <span class="status-badge ontrack">-45% Faster</span>
            </div>

            <div class="dimension-subcard" style="text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div class="dimension-name">Customer Service Resolution Time</div>
                <div class="dimension-score" style="font-size: 1.25rem; color: #059669;">3.8 hours <span style="font-size: 0.75rem; color: #64748b;">(vs 12.5 hrs Baseline)</span></div>
              </div>
              <span class="status-badge ontrack">-69% Faster</span>
            </div>
          </div>
        </div>

        <!-- 4 Core CRM Adoption Metrics -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>CRM Adoption in Real Business Processes</h3>
              <p>Platform telemetry verifying genuine operational adoption</p>
            </div>
            <span class="status-badge ontrack">87% Active</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 0.5rem;">
            <div class="dimension-subcard">
              <div class="dimension-name">1. Active CRM Users</div>
              <div class="dimension-score" style="color: #2563eb;">87%</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">6,700+ active weekly bank staff</p>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">2. Daily Regular Usage</div>
              <div class="dimension-score" style="color: #2563eb;">85%</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">DAU / MAU engagement stickiness</p>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">3. Core Process Adoption</div>
              <div class="dimension-score" style="color: #059669;">91.2%</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">Leads, deals & service tickets in CRM</p>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">4. Workflow via CRM</div>
              <div class="dimension-score" style="color: #059669;">94.8%</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">Automated credit & service approvals</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. ADOPTION -> BUSINESS OUTCOME CORRELATION -->
      <div class="surface-card" style="margin-bottom: 1.5rem;">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3>CRM Adoption vs Business Performance (Branch Correlation)</h3>
            <p>Empirical relationship demonstrating higher platform adoption correlates with revenue acceleration</p>
          </div>
          <span class="rfp-pill">Illustrative Relationship – RFP Demonstration</span>
        </div>

        <div class="grid-2col" style="margin-bottom: 0;">
          <div>
            <h4 style="font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              CRM Adoption % vs Revenue Growth (%)
            </h4>
            ${window.CXO_CHARTS.renderScatterPlot("revenue")}
          </div>

          <div>
            <h4 style="font-size: 0.825rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              CRM Adoption % vs RM Productivity (₹ Lakhs / RM / mo)
            </h4>
            ${window.CXO_CHARTS.renderScatterPlot("productivity")}
          </div>
        </div>
      </div>

      <!-- 4. VALUE REALISATION SCORE & 4-PILLAR MODEL -->
      <div class="surface-card">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3>Value Realisation Transformation Model (Baseline → Realised)</h3>
            <p>Audited reconciliation showing value generated across 4 core business pillars</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #1e3a8a;">
              VALUE REALISATION: ${valueModel.overallScore}%
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">Target: ${valueModel.targetScore}%</div>
          </div>
        </div>

        <!-- 4 Pillars Breakdown -->
        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Pillar</th>
                <th>Score</th>
                <th>Baseline</th>
                <th>Current State</th>
                <th>Target Plan</th>
                <th>Realised Value</th>
                <th>Business Impact</th>
              </tr>
            </thead>
            <tbody>
              ${valueModel.pillars.map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td><strong style="color: #059669;">${p.score}%</strong></td>
                  <td>${p.baseline}</td>
                  <td><strong>${p.current}</strong></td>
                  <td>${p.target}</td>
                  <td><strong style="color: #1e3a8a; font-size: 0.95rem;">${p.realisedValue}</strong></td>
                  <td><span style="font-size: 0.775rem; color: var(--text-secondary);">${p.narrative}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
