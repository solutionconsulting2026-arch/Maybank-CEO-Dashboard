/**
 * CEO / CXO BANKING COMMAND CENTRE - TAB 3: CUSTOMER & SERVICE
 * Executive Question: "Are our customers satisfied, retained and being serviced efficiently?"
 */

window.CXO_TAB_CUSTOMER = {
  render: function () {
    const data = window.CXO_ENGINE.getData();
    const periodDataset = window.CXO_DATASET.periodData[window.CXO_ENGINE.getState().period] || window.CXO_DATASET.periodData.YTD;

    const serviceStages = [
      { label: "1. Service Cases Created", value: data.serviceCasesCreated, sublabel: "Omnichannel Customer Inquiries" },
      { label: "2. Cases Resolved (Total)", value: data.serviceCasesResolved, sublabel: `${((data.serviceCasesResolved / (data.serviceCasesCreated || 1)) * 100).toFixed(1)}% Resolution Rate` },
      { label: "3. First Contact Resolution (FCR)", value: data.serviceCasesFCR, sublabel: `${data.fcrRate.toFixed(1)}% Resolved on First Contact` }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Customer Experience, Retention & Service Health</h2>
          <p class="section-subtitle">Real-time customer satisfaction metrics, First Contact Resolution, and unit cost-to-serve</p>
        </div>
      </div>

      <!-- 1. 6 KPI STRIP -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-nps",
          title: "Net Promoter Score (NPS)",
          value: "+" + data.npsScore,
          target: "+40",
          variancePct: ((data.npsScore - 40) / 40) * 100,
          status: "ontrack",
          definitionKey: "npsScore"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-ret",
          title: "Customer Retention Rate",
          value: data.retentionRate.toFixed(1) + "%",
          target: "94.0%",
          variancePct: data.retentionRate - 94.0,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-fcr",
          title: "First Contact Resolution (FCR)",
          value: data.fcrRate.toFixed(1) + "%",
          target: "75.0%",
          variancePct: data.fcrRate - 75.0,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-sla",
          title: "Complaint SLA Compliance",
          value: data.slaCompliance.toFixed(1) + "%",
          target: "95.0%",
          variancePct: data.slaCompliance - 95.0,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-art",
          title: "Avg Resolution Time",
          value: data.avgResolutionHours.toFixed(1) + " hrs",
          target: "5.0 hrs",
          variancePct: ((data.avgResolutionHours - 5.0) / 5.0) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-cust-cts",
          title: "Cost-to-Serve / Case",
          value: "₹" + data.costToServe.toFixed(0),
          target: "₹45",
          variancePct: ((data.costToServe - 45) / 45) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "retentionRate"
        })}
      </div>

      <!-- 2. NPS TRAJECTORY & RETENTION VS CHURN -->
      <div class="grid-2col">
        <!-- NPS Trajectory -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Net Promoter Score (NPS) Monthly Trend</h3>
              <p>Customer loyalty trajectory over trailing 12 months (Current: <strong>+${data.npsScore}</strong> vs Target: <strong>+40</strong>)</p>
            </div>
            <span class="status-badge ontrack">+19 pts vs Baseline</span>
          </div>

          <div style="padding: 1rem 0;">
            <svg viewBox="0 0 500 160" style="width: 100%; height: auto; font-family: var(--font-body);">
              <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" stroke-dasharray="3,3"/>
              <line x1="40" y1="80" x2="480" y2="80" stroke="#e2e8f0" stroke-dasharray="3,3"/>
              <line x1="40" y1="130" x2="480" y2="130" stroke="#cbd5e1"/>

              <!-- Target Line (+40) -->
              <line x1="40" y1="35" x2="480" y2="35" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>
              <text x="475" y="30" font-size="10" fill="#f59e0b" text-anchor="end" font-weight="700">Target (+40)</text>

              <!-- NPS Line -->
              <polyline
                fill="none"
                stroke="#059669"
                stroke-width="3"
                stroke-linecap="round"
                points="50,110 90,102 130,95 170,88 210,80 250,80 290,65 330,58 370,58 410,30 440,30 470,30"
              />
              <circle cx="470" cy="30" r="4.5" fill="#059669" stroke="#ffffff" stroke-width="2"/>
              <text x="470" y="18" font-size="11" font-weight="800" fill="#059669" text-anchor="middle">+41</text>
            </svg>
          </div>
        </div>

        <!-- Customer Retention vs Churn -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Customer Retention vs Churn Analysis</h3>
              <p>Active customer portfolio health (Total: <strong>3.6M Active Customers</strong>)</p>
            </div>
            <span class="status-badge ontrack">94.2% Retained</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 0.75rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span style="color: #059669;">● Retained Active Customers</span>
                <strong>94.2% (3,391,200 Customers)</strong>
              </div>
              <div class="progress-mini-bar" style="height: 14px;">
                <div class="progress-mini-fill" style="width: 94.2%; background: #059669;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 700; margin-bottom: 0.35rem;">
                <span style="color: #dc2626;">● Churned / Inactive Accounts</span>
                <strong>5.8% (208,800 Customers)</strong>
              </div>
              <div class="progress-mini-bar" style="height: 14px;">
                <div class="progress-mini-fill" style="width: 5.8%; background: #dc2626;"></div>
              </div>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary);">
              Preserved <strong>₹24.5 Cr in annual recurring deposits and fee margins</strong> by reducing customer churn from 10.2% baseline to 5.8%.
            </div>
          </div>
        </div>
      </div>

      <!-- 3. SERVICE HEALTH & BU CX HEATMAP -->
      <div class="grid-2col">
        <!-- Service Health Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Service Health & FCR Lifecycle</h3>
              <p>Reconciled case volumes from ingestion to first-contact resolution</p>
            </div>
            <span class="status-badge ontrack">76.0% FCR Rate</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(serviceStages)}
        </div>

        <!-- Customer Experience Heatmap by Business Unit -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Customer Experience by Business Unit</h3>
              <p>Executive CX heatmap across lines of business</p>
            </div>
          </div>

          <div class="scorecard-table-wrap">
            <table class="scorecard-table">
              <thead>
                <tr>
                  <th>Business Unit</th>
                  <th>NPS Score</th>
                  <th>Retention</th>
                  <th>Complaint SLA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${window.CXO_DATASET.businessUnits.filter(b => b.id !== 'all').map(bu => {
                  const b = periodDataset[bu.id];
                  if (!b) return "";
                  const status = b.npsScore >= 40 ? "ontrack" : b.npsScore >= 35 ? "watch" : "atrisk";
                  const statusText = status === "ontrack" ? "ON TRACK" : status === "watch" ? "WATCH" : "AT RISK";
                  return `
                    <tr>
                      <td><strong>${bu.name}</strong></td>
                      <td><strong style="color: ${b.npsScore >= 40 ? '#059669' : '#d97706'};">+${b.npsScore}</strong></td>
                      <td>${b.retentionRate.toFixed(1)}%</td>
                      <td>${b.slaComplianceRate.toFixed(1)}%</td>
                      <td><span class="status-badge ${status}">${statusText}</span></td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
};
