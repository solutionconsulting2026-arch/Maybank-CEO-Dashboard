/**
 * CEO / CXO COMMAND CENTRE - TAB 2: SALES & REVENUE
 * Commercial Pipeline, Conversion Velocity, and RM Sales Capacity
 */

window.CXO_TAB_SALES = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const periodDataset = window.CXO_DATASET.periodData[window.CXO_ENGINE.getState().period] || window.CXO_DATASET.periodData.YTD;

    const salesFunnelStages = [
      { label: "1. Total Leads", value: data.totalLeads, sublabel: "Omnichannel Inbound & Outbound" },
      { label: "2. Qualified Leads", value: data.qualifiedLeads, sublabel: `${((data.qualifiedLeads / (data.totalLeads || 1)) * 100).toFixed(1)}% Qualification Rate` },
      { label: "3. Sales Opportunities", value: data.totalOpportunities, sublabel: `${((data.totalOpportunities / (data.qualifiedLeads || 1)) * 100).toFixed(1)}% Conversion to Opp` },
      { label: "4. Won Deals (Closed)", value: data.wonOpportunities, sublabel: `${data.opportunityWinRate.toFixed(1)}% Opportunity Win Rate` }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Sales Execution & Revenue Velocity</h2>
          <p class="section-subtitle">Real-time pipeline progression, win rates, and commercial productivity metrics</p>
        </div>
      </div>

      <!-- 1. SALES KPI CARDS DECK -->
      <div class="grid-cards-5">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-sales-rev",
          title: "Actual Revenue",
          value: "$" + data.revenueActual.toFixed(1) + "M",
          target: "$" + data.revenueTarget.toFixed(1) + "M",
          variancePct: data.revenueAchievementPct - 100,
          status: window.CXO_ENGINE.evaluateStatus("revenueAchievement", data.revenueActual, data.revenueTarget),
          definitionKey: "revenueAchievement"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-pipeline-val",
          title: "Pipeline Value",
          value: "$" + data.pipelineValue.toFixed(1) + "M",
          target: "$" + (data.revenueTarget * 2.5).toFixed(1) + "M",
          variancePct: ((data.pipelineValue - data.revenueTarget * 2.5) / (data.revenueTarget * 2.5)) * 100,
          status: "ontrack",
          definitionKey: "opportunityWinRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-pipeline-cov",
          title: "Pipeline Coverage",
          value: data.pipelineCoverage.toFixed(2) + "x",
          target: "2.50x",
          variancePct: ((data.pipelineCoverage - 2.5) / 2.5) * 100,
          status: data.pipelineCoverage >= 2.5 ? "ontrack" : "watch",
          definitionKey: "opportunityWinRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-opp-win",
          title: "Opportunity Win Rate",
          value: data.opportunityWinRate.toFixed(1) + "%",
          target: "52.0%",
          variancePct: data.opportunityWinRate - 52.0,
          status: window.CXO_ENGINE.evaluateStatus("opportunityWinRate", data.opportunityWinRate, 52.0),
          definitionKey: "opportunityWinRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-avg-deal",
          title: "Average Deal Size",
          value: "$" + (data.avgDealSize / 1000).toFixed(1) + "K",
          target: "$40.0K",
          variancePct: ((data.avgDealSize - 40000) / 40000) * 100,
          status: "ontrack",
          definitionKey: "opportunityWinRate"
        })}
      </div>

      <!-- 2. REVENUE TREND & RECONCILED SALES FUNNEL -->
      <div class="grid-2col">
        <!-- Monthly Actual vs Target -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Monthly Revenue Trajectory vs Target Plan ($M)</h3>
              <p>Committed revenue pacing over 12-month budget cycle</p>
            </div>
            <span class="status-badge ontrack">Pacing +4.8% Ahead</span>
          </div>
          ${window.CXO_CHARTS.renderMonthlyRevenueChart(window.CXO_DATASET.monthlyTrends)}
        </div>

        <!-- Reconciled Sales Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Reconciled Sales Conversion Funnel</h3>
              <p>End-to-end qualification and deal progression (Volume & Ratios)</p>
            </div>
            <span class="status-badge ontrack">${data.leadConversionRate.toFixed(1)}% End-to-End Conv</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(salesFunnelStages)}
        </div>
      </div>

      <!-- 3. PIPELINE BY STAGE & SALES VELOCITY -->
      <div class="grid-2col">
        <!-- Pipeline by Stage Table -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Active Pipeline by Stage & Weighted Value</h3>
              <p>Risk-adjusted forecast based on historic stage probabilities</p>
            </div>
          </div>
          <div class="scorecard-table-wrap">
            <table class="scorecard-table">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Opportunities</th>
                  <th>Total Pipeline</th>
                  <th>Win Prob</th>
                  <th>Weighted Value</th>
                </tr>
              </thead>
              <tbody>
                ${window.CXO_DATASET.pipelineStages.map(st => `
                  <tr>
                    <td><strong>${st.stage}</strong></td>
                    <td>${st.oppCount.toLocaleString()}</td>
                    <td><strong>$${st.totalValue.toFixed(1)}M</strong></td>
                    <td><span class="alert-bu-tag">${st.winProbability}%</span></td>
                    <td><strong style="color: var(--brand-primary);">$${st.weightedValue.toFixed(1)}M</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- RM Productivity Breakdown -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Relationship Manager (RM) Productivity Matrix</h3>
              <p>Front-office commercial throughput per licensed sales officer</p>
            </div>
            <span class="status-badge ontrack">$${(data.revenuePerRm / 1000).toFixed(0)}K / RM</span>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 0.5rem;">
            <div class="dimension-subcard">
              <div class="dimension-name">Leads Handled / RM</div>
              <div class="dimension-score">${(data.totalLeads / (data.rmUsers || 1)).toFixed(0)}</div>
              <div style="font-size: 0.725rem; color: #059669; font-weight: 600;">+24% vs baseline</div>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">Opportunities / RM</div>
              <div class="dimension-score">${data.opportunitiesPerRm.toFixed(1)}</div>
              <div style="font-size: 0.725rem; color: #059669; font-weight: 600;">+32% vs baseline</div>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">Average Sales Cycle</div>
              <div class="dimension-score" style="color: #059669;">${data.avgSalesCycleDays.toFixed(1)} <span style="font-size: 0.8rem; color: #64748b;">days</span></div>
              <div style="font-size: 0.725rem; color: #059669; font-weight: 600;">-45.5% faster vs baseline</div>
            </div>

            <div class="dimension-subcard">
              <div class="dimension-name">Customer Interactions / RM</div>
              <div class="dimension-score">${data.activitiesPerRm.toFixed(0)}</div>
              <div style="font-size: 0.725rem; color: #059669; font-weight: 600;">+58% logged in CRM</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
