/**
 * CEO / CXO COMMAND CENTRE - WHAT-IF VALUE REALISATION SIMULATOR
 * Interactive modeling tool allowing CXOs to simulate adoption and efficiency lifts.
 */

window.CXO_SIMULATOR = {
  open: function () {
    const modalEl = document.getElementById("simulator-modal");
    if (!modalEl) return;
    this.recalculate();
    modalEl.classList.add("active");
  },

  close: function () {
    const modalEl = document.getElementById("simulator-modal");
    if (modalEl) modalEl.classList.remove("active");
  },

  recalculate: function () {
    const adoptionSlider = document.getElementById("sim-slider-adoption");
    const cycleSlider = document.getElementById("sim-slider-cycle");
    const stpSlider = document.getElementById("sim-slider-stp");

    const adoptionLift = adoptionSlider ? parseFloat(adoptionSlider.value) : 5;
    const cycleReduction = cycleSlider ? parseFloat(cycleSlider.value) : 15;
    const stpLift = stpSlider ? parseFloat(stpSlider.value) : 10;

    // Display labels
    if (document.getElementById("sim-val-adoption")) {
      document.getElementById("sim-val-adoption").innerText = `+${adoptionLift}%`;
    }
    if (document.getElementById("sim-val-cycle")) {
      document.getElementById("sim-val-cycle").innerText = `-${cycleReduction}%`;
    }
    if (document.getElementById("sim-val-stp")) {
      document.getElementById("sim-val-stp").innerText = `+${stpLift}%`;
    }

    // Mathematical projection based on baseline enterprise figures ($1.6B revenue baseline)
    const baseRevenue = 1600.7; // $M
    const baseCostToServe = 64.8; // $M
    
    // Each 1% adoption lift contributes ~0.65% revenue velocity and RM capacity
    const incrementalRevenue = (baseRevenue * (adoptionLift * 0.0065)) + (baseRevenue * (cycleReduction * 0.004));
    
    // Each 1% STP lift saves operational processing cost
    const operationalSavings = (baseCostToServe * (stpLift * 0.015)) + (adoptionLift * 1.8);
    
    const totalSimulatedBenefit = incrementalRevenue + operationalSavings;
    const projectedRoi = (totalSimulatedBenefit / 18.5); // against typical CRM program investment

    const outRevEl = document.getElementById("sim-out-rev");
    const outCostEl = document.getElementById("sim-out-cost");
    const outTotalEl = document.getElementById("sim-out-total");
    const outRoiEl = document.getElementById("sim-out-roi");

    if (outRevEl) outRevEl.innerText = `+$${incrementalRevenue.toFixed(1)}M`;
    if (outCostEl) outCostEl.innerText = `+$${operationalSavings.toFixed(1)}M`;
    if (outTotalEl) outTotalEl.innerText = `+$${totalSimulatedBenefit.toFixed(1)}M`;
    if (outRoiEl) outRoiEl.innerText = `${projectedRoi.toFixed(1)}x ROI`;
  }
};
