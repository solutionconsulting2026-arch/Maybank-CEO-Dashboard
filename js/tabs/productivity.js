/**
 * CEO / CXO COMMAND CENTRE - TAB 5: PRODUCTIVITY & COST EFFICIENCY
 * Operational Throughput, Sales Velocity Acceleration, and Straight-Through Processing (STP)
 */

window.CXO_TAB_PRODUCTIVITY = {
  render: function () {
    const data = window.CXO_ENGINE.getData();

    return `
      <div class="section-header">
        <div>
          <h2 class="section-title">Productivity & Cost Efficiency Engine</h2>
          <p class="section-subtitle">Quantifying hours saved, automated Straight-Through Processing, and commercial capacity gains</p>
        </div>
      </div>

      <!-- 1. PRODUCTIVITY KPI CARDS -->
      <div class="grid-cards-6">
        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-rm",
          title: "Revenue / RM",
          value: "$" + (data.revenuePerRm / 1000).toFixed(0) + "K",
          target: "$90K",
          variancePct: ((data.revenuePerRm - 90000) / 90000) * 100,
          status: "ontrack",
          definitionKey: "rmProductivity"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-cycle",
          title: "Avg Sales Cycle Time",
          value: data.avgSalesCycleDays.toFixed(1) + " days",
          target: "28.0 days",
          variancePct: ((data.avgSalesCycleDays - 28) / 28) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "opportunityWinRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-art",
          title: "Service Resolution Time",
          value: data.avgResolutionTimeHours.toFixed(1) + " hrs",
          target: "6.0 hrs",
          variancePct: ((data.avgResolutionTimeHours - 6.0) / 6.0) * 100,
          isPositiveGood: false,
          status: "ontrack",
          definitionKey: "fcrRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-stp",
          title: "Straight-Through Processing (STP)",
          value: data.stpRate.toFixed(1) + "%",
          target: "70.0%",
          variancePct: data.stpRate - 70.0,
          status: "ontrack",
          definitionKey: "stpRate"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-acts",
          title: "Activities Logged / RM",
          value: data.activitiesPerRm.toFixed(0),
          target: "800",
          variancePct: ((data.activitiesPerRm - 800) / 800) * 100,
          status: "ontrack",
          definitionKey: "crmAdoption"
        })}

        ${window.CXO_KPI_CARD.render({
          id: "kpi-prod-savings",
          title: "Annual Operational Savings",
          value: "$" + data.valueWaterfall.costReduction.toFixed(1) + "M",
          target: "$55.0M",
          variancePct: ((data.valueWaterfall.costReduction - 55) / 55) * 100,
          status: "ontrack",
          definitionKey: "stpRate"
        })}
      </div>

      <!-- 2. CYCLE TIME COMPRESSION & STP AUTOMATION -->
      <div class="grid-2col">
        <!-- Sales Cycle Compression vs Baseline -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>Sales Deal Cycle Compression vs Baseline (Days)</h3>
              <p>Duration from initial qualification to executed contract</p>
            </div>
            <span class="status-badge ontrack">-45.5% Cycle Acceleration</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 0.5rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Retail Banking Loan Origination</span>
                <span style="color: #059669;">16.5 days vs 28.0 days Baseline (-41%)</span>
              </div>
              <div style="display: flex; height: 14px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 58%; background: #059669;" title="Current: 16.5 days"></div>
                <div style="width: 42%; background: #94a3b8;" title="Baseline: 28.0 days"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>SME Commercial Credit Facility</span>
                <span style="color: #059669;">24.0 days vs 45.0 days Baseline (-47%)</span>
              </div>
              <div style="display: flex; height: 14px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 53%; background: #059669;" title="Current: 24.0 days"></div>
                <div style="width: 47%; background: #94a3b8;" title="Baseline: 45.0 days"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Corporate Syndicated Debt / Trade Finance</span>
                <span style="color: #059669;">62.0 days vs 105.0 days Baseline (-41%)</span>
              </div>
              <div style="display: flex; height: 14px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 59%; background: #059669;" title="Current: 62.0 days"></div>
                <div style="width: 41%; background: #94a3b8;" title="Baseline: 105.0 days"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem;">
                <span>Wealth Management Discretionary Mandates</span>
                <span style="color: #059669;">28.0 days vs 52.0 days Baseline (-46%)</span>
              </div>
              <div style="display: flex; height: 14px; border-radius: 4px; overflow: hidden; background: #e2e8f0;">
                <div style="width: 54%; background: #059669;" title="Current: 28.0 days"></div>
                <div style="width: 46%; background: #94a3b8;" title="Baseline: 52.0 days"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- RM Activity Mix & Value-Add Ratio -->
        <div class="surface-card">
          <div class="card-header-flex">
            <div class="card-title-wrap">
              <h3>RM Working Hours & Activity Breakdown</h3>
              <p>Shift from administrative friction to high-value customer advisory</p>
            </div>
            <span class="status-badge ontrack">+6.2 hrs/week Advisory</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 0.5rem;">
            <div class="dimension-subcard" style="background: #ecfdf5; border-color: #a7f3d0;">
              <div class="dimension-name" style="color: #065f46;">High-Value Advisory Time</div>
              <div class="dimension-score" style="color: #065f46;">68% <span style="font-size: 0.75rem;">of week</span></div>
              <p style="font-size: 0.725rem; color: #047857;">Client meetings, structuring & closing deals (vs 32% baseline)</p>
            </div>

            <div class="dimension-subcard" style="background: #f1f5f9; border-color: #cbd5e1;">
              <div class="dimension-name" style="color: #475569;">Admin & Data Entry</div>
              <div class="dimension-score" style="color: #475569;">32% <span style="font-size: 0.75rem;">of week</span></div>
              <p style="font-size: 0.725rem; color: #64748b;">Automated via 1-click logging & smart telephony integration</p>
            </div>
          </div>

          <div style="margin-top: 1.25rem;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.5rem;">
              Logged Enterprise Activity Portfolio (${(data.activitiesLogged / 1000).toFixed(0)}K Total Events)
            </div>
            <div style="display: flex; height: 18px; border-radius: 4px; overflow: hidden;">
              <div style="width: 35%; background: #1e3a8a;" title="Client Meetings: 35%"></div>
              <div style="width: 30%; background: #2563eb;" title="Phone Calls & Interactions: 30%"></div>
              <div style="width: 20%; background: #0284c7;" title="Proposals & Financial Plans: 20%"></div>
              <div style="width: 15%; background: #059669;" title="Service Tasks & Follow-ups: 15%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-tertiary); margin-top: 0.4rem;">
              <span>■ Meetings (35%)</span>
              <span>■ Advisory Calls (30%)</span>
              <span>■ Proposals (20%)</span>
              <span>■ Tasks (15%)</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
