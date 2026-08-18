/**
 * CEO / CXO BANKING COMMAND CENTRE - VECTOR CHART ENGINE
 * Executive SVG Charting for Revenue Trajectory, Funnels, Gauges & Correlation Plots
 */

window.CXO_CHARTS = {
  renderRadialGauge: function (score, max = 100) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / max) * circumference;
    const strokeColor = score >= 85 ? "#059669" : score >= 70 ? "#2563eb" : "#d97706";

    return `
      <div class="gauge-wrapper">
        <svg class="gauge-svg" viewBox="0 0 140 140">
          <circle class="gauge-circle-bg" cx="70" cy="70" r="${radius}" />
          <circle
            class="gauge-circle-progress"
            cx="70"
            cy="70"
            r="${radius}"
            stroke="${strokeColor}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
          />
        </svg>
        <div class="gauge-score-label">
          <div class="gauge-score-num" style="color: ${strokeColor}; font-size: 2.1rem;">${score}</div>
          <div class="gauge-score-max">/ ${max} Score</div>
        </div>
      </div>
    `;
  },

  renderFunnel: function (stages) {
    if (!stages || stages.length === 0) return "";
    const maxVal = stages[0].value || 1;

    return `
      <div class="funnel-container">
        ${stages.map((st, i) => {
          const widthPct = Math.max(12, (st.value / maxVal) * 100);
          const convRate = i > 0 ? ((st.value / stages[i - 1].value) * 100).toFixed(1) + "% step" : "100% base";
          return `
            <div class="funnel-stage-row">
              <div class="funnel-stage-meta">
                <div class="funnel-stage-name">${st.label}</div>
                <div class="funnel-stage-count">${typeof st.value === 'number' ? st.value.toLocaleString() : st.value}</div>
              </div>
              <div class="funnel-bar-track">
                <div class="funnel-bar-fill" style="width: ${widthPct}%;">
                  <span>${st.sublabel || ''}</span>
                </div>
              </div>
              <div class="funnel-conversion-rate">${convRate}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  renderMonthlyRevenueChart: function (monthlyTrends) {
    if (!monthlyTrends || monthlyTrends.length === 0) return "";
    const width = 640;
    const height = 220;
    const pad = { top: 20, right: 25, bottom: 35, left: 45 };

    const maxVal = 55; // ₹55 Cr max
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;
    const step = chartW / monthlyTrends.length;
    const barWidth = step * 0.45;

    let barsSvg = "";
    let linePoints = [];

    monthlyTrends.forEach((m, idx) => {
      const x = pad.left + idx * step + step * 0.25;
      const actualH = (m.actual / maxVal) * chartH;
      const actualY = pad.top + chartH - actualH;
      
      const targetH = (m.target / maxVal) * chartH;
      const targetY = pad.top + chartH - targetH;

      linePoints.push(`${x + barWidth / 2},${targetY}`);

      barsSvg += `
        <rect x="${x}" y="${actualY}" width="${barWidth}" height="${actualH}" fill="#2563eb" rx="2" opacity="0.85">
          <title>${m.month} Actual: ₹${m.actual} Cr</title>
        </rect>
        <circle cx="${x + barWidth / 2}" cy="${targetY}" r="3" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5">
          <title>${m.month} Target: ₹${m.target} Cr</title>
        </circle>
        <text x="${x + barWidth / 2}" y="${height - 10}" font-size="10" font-weight="600" fill="#64748b" text-anchor="middle">${m.month}</text>
      `;
    });

    return `
      <div style="position: relative; width: 100%; overflow-x: auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; max-height: 240px; font-family: var(--font-body);">
          <line x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="${pad.left}" y1="${pad.top + chartH * 0.5}" x2="${width - pad.right}" y2="${pad.top + chartH * 0.5}" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="${pad.left}" y1="${pad.top + chartH}" x2="${width - pad.right}" y2="${pad.top + chartH}" stroke="#cbd5e1"/>

          <text x="${pad.left - 6}" y="${pad.top + 4}" font-size="9" fill="#94a3b8" text-anchor="end">₹50 Cr</text>
          <text x="${pad.left - 6}" y="${pad.top + chartH * 0.5 + 4}" font-size="9" fill="#94a3b8" text-anchor="end">₹25 Cr</text>
          <text x="${pad.left - 6}" y="${pad.top + chartH + 4}" font-size="9" fill="#94a3b8" text-anchor="end">₹0</text>

          ${barsSvg}

          <polyline fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${linePoints.join(' ')}"/>
        </svg>
        <div style="display: flex; justify-content: center; gap: 1.5rem; font-size: 0.725rem; color: var(--text-secondary); margin-top: 0.35rem;">
          <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 9px; height: 9px; background: #2563eb; border-radius: 2px;"></span> Actual Revenue (₹ Cr)</span>
          <span style="display: inline-flex; align-items: center; gap: 0.35rem;"><span style="display: inline-block; width: 9px; height: 9px; background: #f59e0b; border-radius: 50%;"></span> Target Plan (₹ Cr)</span>
        </div>
      </div>
    `;
  },

  renderScatterPlot: function (type = "revenue") {
    const points = type === "revenue" ? [
      { name: "Mumbai Nariman Point", x: 94.0, y: 16.4, size: 8 },
      { name: "Delhi Connaught Place", x: 92.4, y: 14.8, size: 7 },
      { name: "Bengaluru MG Road", x: 91.0, y: 15.2, size: 8 },
      { name: "Pune SB Road", x: 89.5, y: 13.0, size: 7 },
      { name: "Chandigarh Sector 17", x: 88.0, y: 11.5, size: 6 },
      { name: "Jaipur MI Road", x: 87.5, y: 10.8, size: 6 },
      { name: "Chennai Anna Salai", x: 85.5, y: 9.8, size: 6 },
      { name: "Hyderabad Banjara Hills", x: 84.0, y: 9.2, size: 6 },
      { name: "Kolkata Park Street", x: 78.0, y: 5.4, size: 5 },
      { name: "Bhubaneswar Janpath", x: 74.0, y: 4.2, size: 5 }
    ] : [
      { name: "Mumbai Nariman Point", x: 94.0, y: 22.5, size: 8 },
      { name: "Delhi Connaught Place", x: 92.4, y: 20.8, size: 7 },
      { name: "Bengaluru MG Road", x: 91.0, y: 19.5, size: 8 },
      { name: "Pune SB Road", x: 89.5, y: 18.2, size: 7 },
      { name: "Chandigarh Sector 17", x: 88.0, y: 16.5, size: 6 },
      { name: "Jaipur MI Road", x: 87.5, y: 15.8, size: 6 },
      { name: "Chennai Anna Salai", x: 85.5, y: 14.2, size: 6 },
      { name: "Hyderabad Banjara Hills", x: 84.0, y: 13.5, size: 6 },
      { name: "Kolkata Park Street", x: 78.0, y: 9.0, size: 5 },
      { name: "Bhubaneswar Janpath", x: 74.0, y: 7.8, size: 5 }
    ];

    const yLabel = type === "revenue" ? "Revenue Growth YoY (%)" : "RM Productivity (₹ Lakhs / RM / mo)";
    const yMax = type === "revenue" ? 20 : 25;

    const width = 440;
    const height = 210;
    const pad = { top: 15, right: 15, bottom: 35, left: 40 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;

    const dots = points.map(p => {
      const cx = pad.left + ((p.x - 70) / 30) * chartW;
      const cy = pad.top + chartH - (p.y / yMax) * chartH;
      return `
        <circle cx="${cx}" cy="${cy}" r="${p.size}" fill="#2563eb" opacity="0.75" stroke="#ffffff" stroke-width="1.5">
          <title>${p.name}: Adoption ${p.x}%, ${yLabel}: ${p.y}</title>
        </circle>
      `;
    }).join("");

    const x1 = pad.left;
    const y1 = pad.top + chartH - (type === 'revenue' ? 0.2 : 0.25) * chartH;
    const x2 = pad.left + chartW;
    const y2 = pad.top + chartH - (type === 'revenue' ? 0.88 : 0.9) * chartH;

    return `
      <div style="width: 100%; position: relative;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; max-height: 220px; font-family: var(--font-body);">
          <line x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="${pad.left}" y1="${pad.top + chartH * 0.5}" x2="${width - pad.right}" y2="${pad.top + chartH * 0.5}" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="${pad.left}" y1="${pad.top + chartH}" x2="${width - pad.right}" y2="${pad.top + chartH}" stroke="#cbd5e1"/>

          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#059669" stroke-width="2" stroke-dasharray="4,4"/>

          ${dots}

          <text x="${pad.left}" y="${height - 10}" font-size="9" fill="#64748b">70%</text>
          <text x="${pad.left + chartW * 0.5}" y="${height - 10}" font-size="9" fill="#64748b" text-anchor="middle">85% CRM Adoption</text>
          <text x="${width - pad.right}" y="${height - 10}" font-size="9" fill="#64748b" text-anchor="end">100%</text>

          <text x="${pad.left - 4}" y="${pad.top + 4}" font-size="9" fill="#64748b" text-anchor="end">${yMax}${type === 'revenue' ? '%' : 'L'}</text>
          <text x="${pad.left - 4}" y="${pad.top + chartH}" font-size="9" fill="#64748b" text-anchor="end">0</text>
        </svg>
        <div style="font-size: 0.7rem; color: #059669; font-weight: 700; text-align: right; margin-top: -3px;">
          Strong Positive Correlation (r = 0.88, p < 0.001)
        </div>
      </div>
    `;
  }
};
