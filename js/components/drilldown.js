/**
 * CEO / CXO BANKING COMMAND CENTRE - DRILL-DOWN EXPLORER
 * Hierarchy Navigation: CEO -> Business Unit -> Region -> Branch Network -> Senior RM
 */

window.CXO_DRILLDOWN = {
  open: function (regionKey = "north", buKey = "retail") {
    const region = window.CXO_DATASET.hierarchy[regionKey] || window.CXO_DATASET.hierarchy.north;
    const modalEl = document.getElementById("drilldown-modal");
    if (!modalEl) return;

    const bodyEl = document.getElementById("drilldown-modal-body");
    bodyEl.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${region.name}</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">${region.leadExecutive}</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--brand-primary);">₹${region.revenue.toFixed(1)} Cr Revenue</div>
            <div style="font-size: 0.75rem; color: #059669; font-weight: 700;">${((region.revenue / region.target) * 100).toFixed(0)}% of Plan</div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 1rem; border-bottom: 1px solid var(--border-default); padding-bottom: 0.75rem;">
          <button class="action-btn ${regionKey === 'north' ? 'primary' : ''}" onclick="window.CXO_DRILLDOWN.open('north')">North Region</button>
          <button class="action-btn ${regionKey === 'west' ? 'primary' : ''}" onclick="window.CXO_DRILLDOWN.open('west')">West Region</button>
          <button class="action-btn ${regionKey === 'south' ? 'primary' : ''}" onclick="window.CXO_DRILLDOWN.open('south')">South Region</button>
          <button class="action-btn ${regionKey === 'east' ? 'primary' : ''}" onclick="window.CXO_DRILLDOWN.open('east')">East Region</button>
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 0.75rem;">
          Flagship Branch Network & Lead RMs (${region.branches.length} Locations)
        </h4>
        <div class="scorecard-table-wrap">
          <table class="scorecard-table">
            <thead>
              <tr>
                <th>Branch & Location</th>
                <th>Code</th>
                <th>Revenue (₹ Cr)</th>
                <th>Target (₹ Cr)</th>
                <th>CRM Adoption</th>
                <th>NPS</th>
                <th>Active RMs</th>
                <th>Lead RM</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${region.branches.map(b => {
                const achPct = (b.revenue / b.target) * 100;
                const status = achPct >= 100 ? "ontrack" : achPct >= 92 ? "watch" : "atrisk";
                const statusText = status === "ontrack" ? "ON TRACK" : status === "watch" ? "WATCH" : "AT RISK";
                return `
                  <tr>
                    <td><strong>${b.name}</strong></td>
                    <td><span class="alert-bu-tag">${b.code}</span></td>
                    <td><strong>₹${b.revenue.toFixed(1)} Cr</strong></td>
                    <td>₹${b.target.toFixed(1)} Cr</td>
                    <td>
                      <span style="font-weight: 700; color: ${b.adoption >= 85 ? '#059669' : '#d97706'};">
                        ${b.adoption.toFixed(1)}%
                      </span>
                    </td>
                    <td>+${b.nps}</td>
                    <td>${b.rmCount}</td>
                    <td><strong>${b.leadRM}</strong></td>
                    <td><span class="status-badge ${status}">${statusText}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    modalEl.classList.add("active");
  },

  close: function () {
    const modalEl = document.getElementById("drilldown-modal");
    if (modalEl) modalEl.classList.remove("active");
  }
};
