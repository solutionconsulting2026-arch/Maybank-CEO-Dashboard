/**
 * CEO / CXO BANKING COMMAND CENTRE - TAB 2: BUSINESS GROWTH (SALES + MARKETING)
 * Executive Question: "Where is growth coming from, and how effectively are we converting opportunities into revenue?"
 */

window.CXO_TAB_GROWTH = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const periodDataset = window.CXO_DATASET.periodData[window.CXO_ENGINE.getState().period] || window.CXO_DATASET.periodData.YTD;

    // Exact Reconciled Funnel Numbers from Prompt Specification
    const salesFunnelStages = [
      { label: "1. Total Leads", value: 10000, sublabel: "Omnichannel Inbound & Campaigns" },
      { label: "2. Qualified Leads", value: 4200, sublabel: "42.0% Qualification Rate" },
      { label: "3. Sales Opportunities", value: 1450, sublabel: "34.5% Opportunity Conversion" },
      { label: "4. Won Deals (Closed)", value: 520, sublabel: "35.8% Win Rate | 18.4% End-to-End" }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Business Growth & Commercial Pipeline</h2>
          <p class="section-subtitle">Commercial execution, sales conversion velocity, and campaign-attributed growth</p>
        </div>
      </div>

      <!-- 1. 6 KPI STRIP -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-rev",
          title: "Revenue vs Plan",
          value: "₹" + data.revenueActual.toFixed(0) + " Cr",
          target: "₹" + data.revenueTarget.toFixed(0) + " Cr",
          variancePct: data.revenueAchievementPct - 100,
          status: "ontrack",
          definitionKey: "revenueVsPlan"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-pipe",
          title: "Pipeline Value",
          value: "₹" + data.pipelineValue.toFixed(0) + " Cr",
          target: "₹1,150 Cr",
          variancePct: ((data.pipelineValue - 1150) / 1150) * 100,
          status: "ontrack",
          definitionKey: "salesConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-cov",
          title: "Pipeline Coverage",
          value: data.pipelineCoverage.toFixed(2) + "x",
          target: "2.50x",
          variancePct: ((data.pipelineCoverage - 2.5) / 2.5) * 100,
          status: "ontrack",
          definitionKey: "salesConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-conv",
          title: "Lead Conversion Rate",
          value: data.salesConversionRate.toFixed(1) + "%",
          target: "16.0%",
          variancePct: data.salesConversionRate - 16.0,
          status: "ontrack",
          definitionKey: "salesConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-win",
          title: "Opportunity Win Rate",
          value: data.oppWinRate.toFixed(1) + "%",
          target: "34.0%",
          variancePct: data.oppWinRate - 34.0,
          status: "ontrack",
          definitionKey: "salesConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-growth-cross",
          title: "Cross-Sell Ratio",
          value: "3.2x",
          target: "2.8x",
          variancePct: 14.2,
          status: "ontrack",
          definitionKey: "customerGrowth"
        })}
      </div>

      <!-- 2. RECONCILED SALES FUNNEL & REVENUE BY BU -->
      <div class="grid-2col">
        <!-- Reconciled Sales Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Reconciled Commercial Sales Funnel</h3>
              <p>10,000 Leads ↓ 4,200 Qualified ↓ 1,450 Opportunities ↓ 520 Won</p>
            </div>
            <span class="status-badge ontrack">18.4% End-to-End Conv</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(salesFunnelStages)}
        </div>

        <!-- Revenue by Business Unit Comparison -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Revenue by Business Unit vs Target Plan (₹ Cr)</h3>
              <p>Contribution across Retail, SME, Corporate, and Wealth</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.15rem; margin-top: 0.5rem;">
            ${window.CXO_DATASET.businessUnits.filter(b => b.id !== 'all').map(bu => {
              const b = periodDataset[bu.id];
              if (!b) return "";
              const pct = (b.revenueActual / b.revenueTarget) * 100;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 700; margin-bottom: 0.3rem;">
                    <span>${bu.name}</span>
                    <span>₹${b.revenueActual.toFixed(1)} Cr <span style="color: ${pct >= 100 ? '#059669' : '#d97706'}; font-weight: 600;">(${pct.toFixed(0)}% of Plan)</span></span>
                  </div>
                  <div class="progress-mini-bar" style="height: 9px;">
                    <div class="progress-mini-fill" style="width: ${Math.min(100, pct)}%; background: ${pct >= 100 ? '#2563eb' : '#f59e0b'};"></div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>

      <!-- 3. PIPELINE HEALTH, CROSS-SELL & CONCISE MARKETING CONTRIBUTION -->
      <div class="grid-3col">
        <!-- Pipeline Health -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Pipeline Health</h3>
              <p>Risk-adjusted coverage</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="dimension-subcard">
              <div class="dimension-name">Total Pipeline Value</div>
              <div class="dimension-score">₹${data.pipelineValue.toFixed(0)} Cr</div>
            </div>
            <div class="dimension-subcard">
              <div class="dimension-name">Weighted (Risk-Adjusted)</div>
              <div class="dimension-score" style="color: #2563eb;">₹${data.weightedPipeline.toFixed(1)} Cr</div>
            </div>
            <div class="dimension-subcard" style="border-color: #fde68a; background: #fffbeb;">
              <div class="dimension-name" style="color: #92400e;">Opportunities at Risk</div>
              <div class="dimension-score" style="color: #92400e;">₹18.5 Cr</div>
            </div>
          </div>
        </div>

        <!-- Customer Growth & Cross-sell -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Customer Growth & Cross-Sell</h3>
              <p>Existing customer wallet expansion</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
            <div class="dimension-subcard" style="text-align: left;">
              <div class="dimension-name">New Customer Contribution</div>
              <div class="dimension-score" style="font-size: 1.15rem; color: #2563eb;">₹142.5 Cr (29.4%)</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">Funded accounts from new acquisition</p>
            </div>
            <div class="dimension-subcard" style="text-align: left;">
              <div class="dimension-name">Cross-Sell & Upsell Contribution</div>
              <div class="dimension-score" style="font-size: 1.15rem; color: #059669;">₹184.0 Cr (37.9%)</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">Additional credit lines, cards & investments</p>
            </div>
            <div class="dimension-subcard" style="text-align: left;">
              <div class="dimension-name">Existing Base Recurring Revenue</div>
              <div class="dimension-score" style="font-size: 1.15rem; color: #475569;">₹158.5 Cr (32.7%)</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">Core interest & fee income retained</p>
            </div>
          </div>
        </div>

        <!-- Concise Marketing Contribution -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Marketing Contribution</h3>
              <p>Campaign-attributed growth</p>
            </div>
            <span class="status-badge ontrack">13.8x ROI</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="dimension-subcard">
              <div class="dimension-name">Campaign-Attributed Leads</div>
              <div class="dimension-score">${(data.campaignLeads).toLocaleString()}</div>
              <p style="font-size: 0.725rem; color: #059669;">30% of total bank lead inflow</p>
            </div>
            <div class="dimension-subcard">
              <div class="dimension-name">Campaign Lead Conversion</div>
              <div class="dimension-score" style="color: #059669;">${data.campaignConversionRate.toFixed(1)}%</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">+4.2pp vs standard non-personalized</p>
            </div>
            <div class="dimension-subcard">
              <div class="dimension-name">Marketing Campaign ROI</div>
              <div class="dimension-score" style="color: #1e3a8a;">13.8x</div>
              <p style="font-size: 0.725rem; color: var(--text-secondary);">₹13.8 revenue per ₹1 campaign spend</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
