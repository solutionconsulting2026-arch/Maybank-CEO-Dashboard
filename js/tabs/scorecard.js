/**
 * CEO / CXO COMMAND CENTRE - TAB 8: BUSINESS UNIT / CXO SCORECARD
 * Comprehensive Senior Management Scorecard with Multi-Level Drill-Down
 */

window.CXO_TAB_SCORECARD = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const periodDataset = window.CXO_DATASET.periodData[window.CXO_ENGINE.getState().period] || window.CXO_DATASET.periodData.YTD;

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Business Unit Executive Management Scorecard</h2>
          <p class="section-subtitle">Cross-divisional executive matrix for Board & CXO operational governance</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="action-btn" onclick="window.CXO_DRILLDOWN.open('north_america')">
            🔍 Regional & Branch Drill-Down
          </button>
          <button class="action-btn primary" onclick="window.print()">
            🖨️ Export PDF Scorecard
          </button>
        </div>
      </div>

      <!-- 1. HIGH-DENSITY EXECUTIVE SCORECARD MATRIX -->
      <div class="surface-card">
        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Business Unit / Division</th>
                <th>Revenue vs Target</th>
                <th>YoY Growth</th>
                <th>Pipeline Coverage</th>
                <th>Lead-to-Cust Conv</th>
                <th>NPS / CX</th>
                <th>RM Productivity</th>
                <th>CRM Adoption</th>
                <th>Realised Value</th>
                <th>Executive Status</th>
              </tr>
            </thead>
            <tbody>
              ${window.CXO_DATASET.businessUnits.filter(b => b.id !== 'all').map(bu => {
                const bData = periodDataset[bu.id];
                if (!bData) return "";
                const achPct = (bData.revenueActual / bData.revenueTarget) * 100;
                const growth = ((bData.revenueActual - bData.revenuePrevYear) / bData.revenuePrevYear) * 100;
                const conv = (bData.convertedLeads / bData.totalLeads) * 100;
                const adopt = (bData.activeCrmUsers / bData.totalCrmUsers) * 100;
                const prod = (bData.revenueActual * 1000) / bData.rmUsers;
                const pipeCov = bData.pipelineValue / bData.revenueActual;
                const realisedVal = (bData.revenueActual - bData.revenueBaseline) + (bData.rmUsers * 0.08 * (adopt/100) * 100);
                
                const status = achPct >= 100 ? "ontrack" : achPct >= 92 ? "watch" : "atrisk";
                const statusLabel = status === "ontrack" ? "ON TRACK" : status === "watch" ? "WATCH" : "AT RISK";

                return `
                  <tr onclick="window.CXO_DRILLDOWN.open('north_america', '${bu.id}')" title="Click to view detailed branch drilldown for ${bu.name}">
                    <td>
                      <div class="scorecard-bu-name">
                        <span class="alert-bu-tag">${bu.code}</span>
                        <div>
                          <strong>${bu.name}</strong>
                          <div style="font-size: 0.7rem; color: var(--brand-accent); cursor: pointer;">View Regional Hierarchy →</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>$${bData.revenueActual.toFixed(1)}M</strong>
                      <div style="font-size: 0.725rem; font-weight: 700; color: ${achPct >= 100 ? '#059669' : '#d97706'};">
                        ${achPct.toFixed(1)}% of $${bData.revenueTarget.toFixed(1)}M
                      </div>
                    </td>
                    <td><strong style="color: ${growth >= 0 ? '#059669' : '#dc2626'};">${(growth >= 0 ? "+" : "") + growth.toFixed(1)}%</strong></td>
                    <td><strong>${pipeCov.toFixed(2)}x</strong> ($${bData.pipelineValue.toFixed(1)}M)</td>
                    <td>${conv.toFixed(1)}%</td>
                    <td><strong>+${bData.npsScore}</strong> <span style="font-size: 0.7rem; color: #64748b;">(CSAT ${bData.csatScore}%)</span></td>
                    <td><strong>$${prod.toFixed(0)}K</strong> / RM</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <span style="font-weight: 700; color: ${adopt >= 85 ? '#059669' : '#d97706'};">${adopt.toFixed(1)}%</span>
                        <div class="progress-mini-bar" style="width: 50px; height: 5px;">
                          <div class="progress-mini-fill" style="width: ${adopt}%; background: ${adopt >= 85 ? '#059669' : '#d97706'};"></div>
                        </div>
                      </div>
                    </td>
                    <td><strong style="color: #1e3a8a;">+$${realisedVal.toFixed(1)}M</strong></td>
                    <td><span class="status-badge ${status}">${statusLabel}</span></td>
                  </tr>
                `;
              }).join("")}

              <!-- ALL-BU AGGREGATE TOTAL ROW -->
              <tr style="background: var(--bg-surface-subtle); border-top: 2px solid var(--border-default);">
                <td>
                  <div class="scorecard-bu-name">
                    <span class="alert-bu-tag" style="background: var(--brand-primary); color: white;">TOTAL</span>
                    <strong>Enterprise Total (All BUs)</strong>
                  </div>
                </td>
                <td>
                  <strong>$${data.revenueActual.toFixed(1)}M</strong>
                  <div style="font-size: 0.725rem; font-weight: 700; color: #059669;">
                    ${data.revenueAchievementPct.toFixed(1)}% of $${data.revenueTarget.toFixed(1)}M
                  </div>
                </td>
                <td><strong style="color: #059669;">+${data.revenueGrowthYoY.toFixed(1)}%</strong></td>
                <td><strong>${data.pipelineCoverage.toFixed(2)}x</strong> ($${data.pipelineValue.toFixed(1)}M)</td>
                <td>${data.leadConversionRate.toFixed(1)}%</td>
                <td><strong>+${data.npsScore}</strong></td>
                <td><strong>$${(data.revenuePerRm / 1000).toFixed(0)}K</strong> / RM</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <strong style="color: #059669;">${data.crmAdoptionRate.toFixed(1)}%</strong>
                  </div>
                </td>
                <td><strong style="color: #1e3a8a; font-size: 0.95rem;">+$${data.valueWaterfall.totalRealised.toFixed(1)}M</strong></td>
                <td><span class="status-badge ontrack">ON TRACK</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. EXECUTIVE GOVERNANCE NOTES -->
      <div class="grid-2col" style="margin-top: 1.75rem;">
        <div class="surface-card">
          <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            📋 Executive Performance Summary
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
            4 of 5 commercial lines of business are currently <strong>ON TRACK</strong> against their FY2026 value realization commitments. 
            Corporate Banking is on <strong>WATCH</strong> status solely due to credit approval documentation cycles, while Retail and Wealth Management are exceeding expectations.
          </p>
        </div>

        <div class="surface-card">
          <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            🎯 Recommended Executive Interventions
          </h4>
          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
            1. Scale AI-driven Next-Best-Offer into Retail Branch Teller network to eliminate the insurance cross-sell plateau.<br/>
            2. Launch the accelerated mobile onboarding track for LATAM commercial relationship managers.<br/>
            3. Deploy DocuSign automated integration into Corporate Credit syndication.
          </p>
        </div>
      </div>
    `;
  }
};
