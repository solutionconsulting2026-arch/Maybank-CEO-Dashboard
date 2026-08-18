/**
 * CEO / CXO COMMAND CENTRE - TAB 4: CUSTOMER SERVICE & EXPERIENCE
 * Omnichannel Service Quality, First Contact Resolution, and Cost-to-Serve Economics
 */

window.CXO_TAB_SERVICE = {
  render: function () {
    const data = window.CXO_ENGINE.getData();

    const caseFunnelStages = [
      { label: "1. Cases Ingested", value: data.serviceCasesCreated, sublabel: "Omnichannel Inbound Tickets" },
      { label: "2. Triaged & Assigned", value: Math.round(data.serviceCasesCreated * 0.99), sublabel: "AI Auto-Classification (99.0%)" },
      { label: "3. In Progress (SLA)", value: Math.round(data.serviceCasesCreated * 0.98), sublabel: "Within Resolution SLA" },
      { label: "4. Resolved Cases", value: data.serviceCasesResolved, sublabel: `${((data.serviceCasesResolved / (data.serviceCasesCreated || 1)) * 100).toFixed(1)}% Resolution Rate` },
      { label: "5. First Contact Resolution", value: data.serviceCasesFCR, sublabel: `${data.fcrRate.toFixed(1)}% FCR Rate` }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Customer Service & Experience Excellence</h2>
          <p class="section-subtitle">Real-time service velocity, first contact resolution, and cost-to-serve optimization</p>
        </div>
      </div>

      <!-- 1. SERVICE KPI CARDS -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-nps",
          title: "Net Promoter Score (NPS)",
          value: "+" + data.npsScore,
          target: "+60",
          variancePct: ((data.npsScore - 60) / 60) * 100,
          status: "ontrack",
          definitionKey: "npsScore"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-csat",
          title: "Customer Satisfaction (CSAT)",
          value: data.csatScore.toFixed(1) + "%",
          target: "90.0%",
          variancePct: data.csatScore - 90.0,
          status: "ontrack",
          definitionKey: "npsScore"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-fcr",
          title: "First Contact Resolution (FCR)",
          value: data.fcrRate.toFixed(1) + "%",
          target: "75.0%",
          variancePct: data.fcrRate - 75.0,
          status: "ontrack",
          definitionKey: "fcrRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-art",
          title: "Avg Resolution Time",
          value: data.avgResolutionTimeHours.toFixed(1) + " hrs",
          target: "6.0 hrs",
          variancePct: ((data.avgResolutionTimeHours - 6.0) / 6.0) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "fcrRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-sla",
          title: "Service SLA Compliance",
          value: data.slaCompliance.toFixed(1) + "%",
          target: "95.0%",
          variancePct: data.slaCompliance - 95.0,
          status: "ontrack",
          definitionKey: "fcrRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-srv-cts",
          title: "Cost-to-Serve / Case",
          value: "$" + data.costToServe.toFixed(2),
          target: "$28.00",
          variancePct: ((data.costToServe - 28.0) / 28.0) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "stpRate"
        })}
      </div>

      <!-- 2. SERVICE FUNNEL & SLA BREAKDOWN -->
      <div class="grid-2col">
        <!-- Service Case Funnel -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Service Case Lifecycle & FCR Funnel</h3>
              <p>Reconciled case volumes from ingestion to first-contact closure</p>
            </div>
            <span class="status-badge ontrack">${data.fcrRate.toFixed(1)}% FCR</span>
          </div>
          ${window.CXO_CHARTS.renderFunnel(caseFunnelStages)}
        </div>

        <!-- Cost-to-Serve Optimization Breakdown -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Cost-to-Serve Benchmarking by Channel ($ / Case)</h3>
              <p>Unit economic comparison showing digital self-service dividend</p>
            </div>
            <span class="status-badge ontrack">-46% vs Baseline</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Digital Self-Service (Mobile/Web Bot)</span>
                <strong style="color: #059669;">$1.85 / interaction</strong>
              </div>
              <div class="progress-mini-bar" style="height: 10px;">
                <div class="progress-mini-fill" style="width: 8%; background: #059669;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>AI-Assisted Contact Centre Agent</span>
                <strong style="color: #2563eb;">$12.40 / interaction</strong>
              </div>
              <div class="progress-mini-bar" style="height: 10px;">
                <div class="progress-mini-fill" style="width: 35%; background: #2563eb;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Branch Teller / Desk Assist</span>
                <strong style="color: #d97706;">$24.50 / interaction</strong>
              </div>
              <div class="progress-mini-bar" style="height: 10px;">
                <div class="progress-mini-fill" style="width: 60%; background: #d97706;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Dedicated Relationship Manager (High-Touch)</span>
                <strong style="color: #475569;">$65.00 / interaction</strong>
              </div>
              <div class="progress-mini-bar" style="height: 10px;">
                <div class="progress-mini-fill" style="width: 95%; background: #64748b;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. COMPLAINT ROOT-CAUSE ANALYSIS -->
      <div class="surface-card">
        <div class="card-header-flex">
          <div class="card-title-wrap">
            <h3>Customer Feedback & Root-Cause Complaint Resolution</h3>
            <p>Categorized escalations and automated remediation cycle times</p>
          </div>
          <span class="status-badge ontrack">98.2% Resolved within SLA</span>
        </div>

        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Complaints</th>
                <th>Avg Resolution (Hrs)</th>
                <th>SLA Compliance</th>
                <th>Repeat Rate</th>
                <th>Root Cause Fix</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mobile App Login / 2FA</strong></td>
                <td>3,240</td>
                <td>1.4 hrs</td>
                <td>99.2%</td>
                <td>2.1%</td>
                <td>Biometric fallback flow implemented</td>
                <td><span style="color: #059669; font-weight: 700;">↓ -42%</span></td>
              </tr>
              <tr>
                <td><strong>Fee Dispute / Billing Transparency</strong></td>
                <td>2,180</td>
                <td>4.2 hrs</td>
                <td>97.5%</td>
                <td>3.4%</td>
                <td>Automated micro-waiver workflow</td>
                <td><span style="color: #059669; font-weight: 700;">↓ -28%</span></td>
              </tr>
              <tr>
                <td><strong>Credit Card Instant Issuance</strong></td>
                <td>1,840</td>
                <td>3.8 hrs</td>
                <td>98.0%</td>
                <td>1.8%</td>
                <td>Virtual card provisioning in Apple Wallet</td>
                <td><span style="color: #059669; font-weight: 700;">↓ -35%</span></td>
              </tr>
              <tr>
                <td><strong>Commercial Loan Documentation</strong></td>
                <td>420</td>
                <td>12.5 hrs</td>
                <td>96.1%</td>
                <td>5.2%</td>
                <td>DocuSign + CRM auto-indexing integration</td>
                <td><span style="color: #059669; font-weight: 700;">↓ -18%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
