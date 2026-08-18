/**
 * CEO / CXO COMMAND CENTRE - STANDARDIZED KPI CARD COMPONENT
 * Renders executive KPI tiles with definition tooltips, status badges, and sparklines.
 */

window.CXO_KPI_CARD = {
  render: function (options) {
    const {
      id,
      title,
      value,
      valuePrefix = "",
      valueSuffix = "",
      target,
      targetPrefix = "",
      targetSuffix = "",
      variancePct,
      isPositiveGood = true,
      status = "ontrack", // 'ontrack', 'watch', 'atrisk'
      definitionKey = "",
      sparklinePoints = [40, 45, 42, 48, 52, 50, 58, 62]
    } = options;

    const isPositive = variancePct >= 0;
    const isGood = isPositiveGood ? isPositive : !isPositive;
    const varianceClass = isGood ? "positive" : "negative";
    const arrow = isPositive ? "↑" : "↓";
    const statusLabel = status === "ontrack" ? "ON TRACK" : status === "watch" ? "WATCH" : "AT RISK";

    return `
      <div class="kpi-card" data-kpi-id="${id}" data-def-key="${definitionKey}">
        <div class="kpi-top-row">
          <div class="kpi-title-area">
            <span class="kpi-title">${title}</span>
            ${definitionKey ? `<span class="kpi-info-trigger" onclick="window.CXO_APP.showKpiInfo('${definitionKey}', event)" title="View KPI Definition & Calculation">ℹ</span>` : ""}
          </div>
          <span class="status-badge ${status}">${statusLabel}</span>
        </div>

        <div class="kpi-main-val-row">
          <span class="kpi-value">${valuePrefix}${value}${valueSuffix}</span>
          ${target !== undefined && target !== null ? `
            <div class="kpi-target-tag">
              Target: <span class="kpi-target-val">${targetPrefix}${target}${targetSuffix}</span>
            </div>
          ` : ""}
        </div>

        <div class="kpi-footer-row">
          <div class="kpi-variance ${varianceClass}">
            <span>${arrow} ${Math.abs(variancePct).toFixed(1)}%</span>
            <span style="color: var(--text-tertiary); font-weight: normal; font-size: 0.7rem;">vs prev period</span>
          </div>
          <svg class="kpi-sparkline-canvas" viewBox="0 0 70 24" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="${isGood ? '#059669' : '#dc2626'}"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="${this.generateSparklinePoints(sparklinePoints)}"
            />
          </svg>
        </div>
      </div>
    `;
  },

  generateSparklinePoints: function (arr) {
    if (!arr || arr.length === 0) return "0,12 70,12";
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min || 1;
    const width = 70;
    const height = 20;

    return arr
      .map((val, idx) => {
        const x = (idx / (arr.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) + 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }
};
