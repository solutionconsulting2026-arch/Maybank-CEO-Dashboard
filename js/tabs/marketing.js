/**
 * CEO / CXO COMMAND CENTRE - TAB 3: MARKETING EFFECTIVENESS
 * Omnichannel Engagement, Campaign ROI, and AI Personalization Lift
 */

window.CXO_TAB_MARKETING = {
  render: function () {
    const data = window.CXO_ENGINE.getData();

    const campaignFunnelStages = [
      { label: "1. Audience Reach", value: data.campaignReach, sublabel: "Targeted Customer Segments" },
      { label: "2. Responses / Clicks", value: data.campaignResponses, sublabel: `${data.campaignResponseRate.toFixed(1)}% Response Rate` },
      { label: "3. Qualified Leads", value: Math.round(data.campaignResponses * 0.45), sublabel: "45.0% Lead Qualification" },
      { label: "4. New Customer Conversions", value: data.campaignConversions, sublabel: `${data.campaignConversionRate.toFixed(1)}% Conversion Rate` }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Marketing Effectiveness & Growth Engine</h2>
          <p class="section-subtitle">Omnichannel campaign attribution, CAC efficiency, and AI-driven personalization lift</p>
        </div>
      </div>

      <!-- 1. MARKETING KPI CARDS -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-reach",
          title: "Audience Reach",
          value: (data.campaignReach / 1000000).toFixed(2) + "M",
          target: "8.00M",
          variancePct: ((data.campaignReach - 8000000) / 8000000) * 100,
          status: "ontrack",
          definitionKey: "leadConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-conv",
          title: "Campaign Conversion Rate",
          value: data.campaignConversionRate.toFixed(1) + "%",
          target: "12.0%",
          variancePct: data.campaignConversionRate - 12.0,
          status: "ontrack",
          definitionKey: "leadConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-cpl",
          title: "Cost Per Lead (CPL)",
          value: "$" + data.costPerLead.toFixed(1),
          target: "$45.0",
          variancePct: ((data.costPerLead - 45) / 45) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "leadConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-cpa",
          title: "Cost Per Acquisition (CPA)",
          value: "$" + data.costPerAcquisition.toFixed(0),
          target: "$350",
          variancePct: ((data.costPerAcquisition - 350) / 350) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "leadConversion"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-roi",
          title: "Campaign ROI",
          value: data.campaignRoi.toFixed(1) + "x",
          target: "10.0x",
          variancePct: ((data.campaignRoi - 10) / 10) * 100,
          status: "ontrack",
          definitionKey: "revenueGrowth"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-mkt-nbo",
          title: "Personalized Offer Uptake",
          value: "26.4%",
          target: "20.0%",
          variancePct: 32.0,
          status: "ontrack",
          definitionKey: "leadConversion"
        })}
      </div>

      <!-- 2. CAMPAIGN FUNNEL & PERSONALIZATION IMPACT -->
      <div class="grid-2col">
        <!-- Campaign Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Omnichannel Campaign Conversion Funnel</h3>
              <p>End-to-end engagement from impression to funded customer</p>
            </div>
            <span class="status-badge ontrack">${data.campaignConversionRate.toFixed(1)}% Conversion</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(campaignFunnelStages)}
        </div>

        <!-- AI Personalization Impact Lift -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>AI-Driven Personalization & Next-Best-Offer (NBO) Lift</h3>
              <p>A/B performance comparison: Next-Best-Offer AI vs Standard Broadcasts</p>
            </div>
            <span class="status-badge ontrack">+136% Revenue Lift</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 0.5rem;">
            <!-- Metric 1: Response Rate -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span>Customer Response Rate</span>
                <span style="color: #059669;">2.6x Uplift (12.6% vs 4.8%)</span>
              </div>
              <div style="display: flex; height: 16px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 27%; background: #94a3b8;" title="Standard Campaign: 4.8%"></div>
                <div style="width: 73%; background: #2563eb;" title="AI Personalized: 12.6%"></div>
              </div>
            </div>

            <!-- Metric 2: Conversion Rate -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span>Offer-to-Conversion Rate</span>
                <span style="color: #059669;">2.4x Uplift (26.4% vs 11.2%)</span>
              </div>
              <div style="display: flex; height: 16px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 30%; background: #94a3b8;" title="Standard: 11.2%"></div>
                <div style="width: 70%; background: #059669;" title="AI Personalized: 26.4%"></div>
              </div>
            </div>

            <!-- Metric 3: Avg Revenue per Converted User -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span>Avg Revenue per Customer</span>
                <span style="color: #059669;">2.3x Uplift ($980 vs $420)</span>
              </div>
              <div style="display: flex; height: 16px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 30%; background: #94a3b8;" title="Standard: $420"></div>
                <div style="width: 70%; background: #1e3a8a;" title="AI Personalized: $980"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. CAMPAIGN LEADERBOARD & CHANNEL MIX -->
      <div class="surface-card">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3>Enterprise Campaign Portfolio & Attribution Deep-Dive</h3>
            <p>Audited performance and return on marketing spend across key campaigns</p>
          </div>
        </div>

        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Channel / Motion</th>
                <th>Target Segment</th>
                <th>Responses</th>
                <th>Conversions</th>
                <th>Spend ($M)</th>
                <th>Revenue ($M)</th>
                <th>ROI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${window.CXO_DATASET.campaigns.map(c => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td>${c.channel}</td>
                  <td><span class="alert-bu-tag">${c.segment}</span></td>
                  <td>${c.responses.toLocaleString()}</td>
                  <td><strong>${c.conversions.toLocaleString()}</strong></td>
                  <td>$${c.spend.toFixed(2)}M</td>
                  <td><strong>$${c.revenue.toFixed(1)}M</strong></td>
                  <td><strong style="color: #059669;">${c.roi.toFixed(1)}x</strong></td>
                  <td><span class="status-badge ${c.status === 'ON TRACK' ? 'ontrack' : 'watch'}">${c.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
