/**
 * CEO / CXO BANKING COMMAND CENTRE - TAB 1: CEO EXECUTIVE OVERVIEW
 * Single-Pane-of-Glass Executive Command Centre (30-Second Business Health View)
 */

window.CXO_TAB_OVERVIEW = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const alerts = window.CXO_ENGINE.generateExecutiveAlerts();
    const periodDataset = window.CXO_DATASET.periodData[window.CXO_ENGINE.getState().period] || window.CXO_DATASET.periodData.YTD;

    return `
      <!-- 1. TOP EXECUTIVE KPI STRIP (7-8 CORE METRICS) -->
      <div class="grid-cards-8" style="margin-bottom: 1.5rem;">
        <!-- 1. Revenue vs Plan (Primary KPI) -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-rev-plan",
          title: "Revenue vs Plan",
          value: "₹" + data.revenueActual.toFixed(0) + " Cr",
          target: "₹" + data.revenueTarget.toFixed(0) + " Cr",
          variancePct: data.revenueGrowthYoY,
          status: "ontrack",
          definitionKey: "revenueVsPlan",
          sparklinePoints: [35, 38, 39, 41, 40, 42, 46, 48.5]
        })}

        <!-- 2. Revenue Growth -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-rev-growth",
          title: "Revenue Growth",
          value: "+" + data.revenueGrowthBaseline.toFixed(1) + "%",
          target: "+10.0%",
          variancePct: data.revenueGrowthBaseline - 10.0,
          status: "ontrack",
          definitionKey: "revenueGrowth",
          sparklinePoints: [8.2, 9.1, 9.8, 10.5, 11.2, 11.8, 12.1, 12.4]
        })}

        <!-- 3. Customer Growth -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-growth",
          title: "Customer Growth",
          value: "+" + data.customerGrowthPct.toFixed(1) + "%",
          target: "+7.5%",
          variancePct: data.customerGrowthPct - 7.5,
          status: "ontrack",
          definitionKey: "customerGrowth",
          sparklinePoints: [5.2, 5.8, 6.4, 7.0, 7.5, 7.9, 8.2, 8.6]
        })}

        <!-- 4. Sales Conversion -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-sales-conv",
          title: "Sales Conversion",
          value: data.salesConversionRate.toFixed(1) + "%",
          target: "16.0%",
          variancePct: data.salesConversionRate - 16.0,
          status: "ontrack",
          definitionKey: "salesConversion",
          sparklinePoints: [14.2, 14.8, 15.5, 16.1, 16.8, 17.4, 18.0, 18.4]
        })}

        <!-- 5. Customer Retention -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-retention",
          title: "Customer Retention",
          value: data.retentionRate.toFixed(1) + "%",
          target: "94.0%",
          variancePct: data.retentionRate - 94.0,
          status: "ontrack",
          definitionKey: "retentionRate",
          sparklinePoints: [91.0, 91.8, 92.5, 93.0, 93.4, 93.8, 94.0, 94.2]
        })}

        <!-- 6. NPS -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-nps",
          title: "Net Promoter Score",
          value: "+" + data.npsScore,
          target: "+40",
          variancePct: ((data.npsScore - 40) / 40) * 100,
          status: "ontrack",
          definitionKey: "npsScore",
          sparklinePoints: [22, 26, 30, 34, 36, 38, 40, 41]
        })}

        <!-- 7. RM Productivity -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod",
          title: "RM Productivity",
          value: "+18%",
          target: "+15%",
          variancePct: 3.0,
          status: "ontrack",
          definitionKey: "productivity",
          sparklinePoints: [10, 11, 12, 14, 15, 16, 17, 18]
        })}

        <!-- 8. CRM Adoption -->
        ${window.CXO_KPI_CARD.render({
          id: "kpi-adoption",
          title: "CRM Adoption",
          value: data.crmAdoptionRate.toFixed(0) + "%",
          target: "85%",
          variancePct: data.crmAdoptionRate - 85,
          status: "ontrack",
          definitionKey: "crmAdoption",
          sparklinePoints: [72, 75, 78, 81, 83, 85, 86, 87]
        })}
      </div>

      <!-- 2. CEO BUSINESS HEALTH SCORE & PERFORMANCE TREND -->
      <div class="grid-1-2col" style="margin-bottom: 1.5rem;">
        <!-- Compact Business Health Score -->
        <div class="surface-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">
              Executive Composite
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
              Business Health
            </h3>
            <p style="font-size: 0.775rem; color: var(--text-secondary); margin-top: 0.15rem;">
              Consolidated 5-pillar operational barometer
            </p>
          </div>

          <div style="display: flex; align-items: center; justify-content: center; padding: 0.5rem 0;">
            ${window.CXO_CHARTS.renderRadialGauge(data.healthScore.overall, 100)}
          </div>

          <!-- 5 Dimensions Table -->
          <div style="background: var(--bg-surface-subtle); border-radius: var(--radius-md); padding: 0.75rem; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span>Growth</span>
              <strong style="color: #2563eb;">${data.healthScore.growth} / 100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span>Customer</span>
              <strong style="color: #059669;">${data.healthScore.customer} / 100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span>Productivity</span>
              <strong style="color: #10b981;">${data.healthScore.productivity} / 100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.25rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span>Service</span>
              <strong style="color: #0284c7;">${data.healthScore.service} / 100</strong>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 0.25rem 0;">
              <span>Adoption</span>
              <strong style="color: #4338ca;">${data.healthScore.adoption} / 100</strong>
            </div>
          </div>
        </div>

        <!-- ONE Large Clean Performance Trend: Revenue vs Plan -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Revenue vs Plan Trajectory (Trailing 12 Months)</h3>
              <p>Are we ahead or behind plan? Actual: <strong>₹${data.revenueActual.toFixed(0)} Cr</strong> vs Target: <strong>₹${data.revenueTarget.toFixed(0)} Cr</strong></p>
            </div>
            <span class="status-badge ontrack">108% of Plan (Ahead)</span>
          </div>
          ${window.CXO_CHARTS.renderMonthlyRevenueChart(window.CXO_DATASET.monthlyTrends)}
        </div>
      </div>

      <!-- 3. EXECUTIVE ATTENTION REQUIRED (MAX 3-4 EXCEPTIONS ONLY) -->
      <div class="surface-card" style="margin-bottom: 1.5rem;">
        <div class="card-header-flex" style="margin-bottom: 0.75rem;">
          <div class="card-title-wrap">
            <h3 style="font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>⚠️</span> Executive Attention Required
            </h3>
            <p>Data-driven management exceptions requiring C-level focus</p>
          </div>
          <span class="rfp-pill">3 Active Signals</span>
        </div>

        <div class="alerts-grid" style="grid-template-columns: repeat(3, 1fr);">
          ${alerts.map(a => `
            <div class="alert-card ${a.type === 'AT RISK' ? 'high' : a.type === 'WATCH' ? 'medium' : ''}" style="${a.type === 'POSITIVE' ? 'border-left: 4px solid #059669; background: #ecfdf5;' : ''}">
              <div class="alert-content" style="width: 100%;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                  <span class="status-badge ${a.badgeClass}">${a.type}</span>
                  <span class="alert-bu-tag">${a.bu}</span>
                </div>
                <h4 style="font-size: 0.825rem; font-weight: 700; margin-top: 0.35rem;">${a.title}</h4>
                <p style="font-size: 0.775rem; color: var(--text-secondary); margin: 0.25rem 0;">${a.description}</p>
                <div style="font-size: 0.725rem; font-weight: 700; color: ${a.type === 'AT RISK' ? '#991b1b' : a.type === 'WATCH' ? '#92400e' : '#065f46'};">
                  Impact: ${a.impact}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- 4. BUSINESS UNIT PERFORMANCE SCORECARD -->
      <div class="surface-card">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3>Business Unit Performance Scorecard</h3>
            <p>Click any business unit to drill down into regional and branch details</p>
          </div>
          <button class="action-btn" onclick="window.CXO_DRILLDOWN.open('north')">
            🔍 Hierarchy Drill-Down
          </button>
        </div>

        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Business Unit</th>
                <th>Revenue vs Plan</th>
                <th>Growth (YoY)</th>
                <th>NPS</th>
                <th>Productivity</th>
                <th>CRM Adoption</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${window.CXO_DATASET.businessUnits.filter(b => b.id !== 'all').map(bu => {
                const bData = periodDataset[bu.id];
                if (!bData) return "";
                const achPct = (bData.revenueActual / bData.revenueTarget) * 100;
                const growth = ((bData.revenueActual - bData.revenuePrevYear) / bData.revenuePrevYear) * 100;
                const adopt = (bData.activeCrmUsers / bData.totalCrmUsers) * 100;
                const prodCr = bData.revenueActual / bData.rmUsers;
                const status = achPct >= 100 ? "ontrack" : achPct >= 92 ? "watch" : "atrisk";
                const statusLabel = status === "ontrack" ? "ON TRACK" : status === "watch" ? "WATCH" : "AT RISK";

                return `
                  <tr onclick="window.CXO_DRILLDOWN.open('north', '${bu.id}')" title="Click to view branch drilldown">
                    <td>
                      <div class="scorecard-bu-name">
                        <span class="alert-bu-tag">${bu.code}</span>
                        <strong>${bu.name}</strong>
                      </div>
                    </td>
                    <td>
                      <strong>₹${bData.revenueActual.toFixed(1)} Cr</strong>
                      <span style="font-size: 0.725rem; font-weight: 700; color: ${achPct >= 100 ? '#059669' : '#d97706'};">
                        (${achPct.toFixed(0)}% of Plan)
                      </span>
                    </td>
                    <td><strong style="color: #059669;">+${growth.toFixed(1)}%</strong></td>
                    <td><strong>+${bData.npsScore}</strong></td>
                    <td>₹${(prodCr * 100).toFixed(0)} Lakhs / RM</td>
                    <td>
                      <span style="font-weight: 700; color: ${adopt >= 85 ? '#059669' : '#d97706'};">
                        ${adopt.toFixed(0)}%
                      </span>
                    </td>
                    <td><span class="status-badge ${status}">${statusLabel}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
