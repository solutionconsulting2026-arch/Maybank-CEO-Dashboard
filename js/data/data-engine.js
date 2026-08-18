/**
 * CEO / CXO BANKING COMMAND CENTRE - CALCULATION & DATA ENGINE
 */

window.CXO_ENGINE = (function () {
  const state = {
    period: "YTD", // 'MTD', 'QTD', 'YTD'
    comparisonMode: "target", // 'target', 'baseline', 'prevYear'
    businessUnit: "all",
    region: "all"
  };

  function evaluateStatus(metricKey, currentVal, targetVal) {
    if (targetVal === 0 || targetVal === null || targetVal === undefined) return "neutral";
    const lowerIsBetter = ["salesCycleDays", "costToServePerCase", "avgResolutionTimeHours"].includes(metricKey);

    if (lowerIsBetter) {
      const ratio = currentVal / targetVal;
      if (ratio <= 1.0) return "ontrack";
      if (ratio <= 1.15) return "watch";
      return "atrisk";
    } else {
      const ratio = currentVal / targetVal;
      if (ratio >= 1.0) return "ontrack";
      if (ratio >= 0.92) return "watch";
      return "atrisk";
    }
  }

  function getAggregatedData() {
    const periodDataset = window.CXO_DATASET.periodData[state.period] || window.CXO_DATASET.periodData.YTD;
    
    let buKeys = Object.keys(periodDataset);
    if (state.businessUnit !== "all") {
      buKeys = buKeys.filter(k => k === state.businessUnit);
    }

    let acc = {
      revenueActual: 0,
      revenueTarget: 0,
      revenueBaseline: 0,
      revenuePrevYear: 0,
      pipelineValue: 0,
      totalLeads: 0,
      qualifiedLeads: 0,
      totalOpportunities: 0,
      wonOpportunities: 0,
      newCustomersAcquired: 0,
      totalActiveCustomers: 0,
      serviceCasesCreated: 0,
      serviceCasesResolved: 0,
      serviceCasesFCR: 0,
      totalCrmUsers: 0,
      activeCrmUsers: 0,
      dauUsers: 0,
      mauUsers: 0,
      rmUsers: 0,
      campaignLeads: 0,
      campaignConversions: 0,
      weightedSalesCycle: 0,
      weightedResolution: 0,
      weightedNps: 0,
      weightedCsat: 0,
      weightedCostToServe: 0,
      weightedRetention: 0
    };

    buKeys.forEach(k => {
      const b = periodDataset[k];
      if (!b) return;

      acc.revenueActual += b.revenueActual;
      acc.revenueTarget += b.revenueTarget;
      acc.revenueBaseline += b.revenueBaseline;
      acc.revenuePrevYear += b.revenuePrevYear;
      acc.pipelineValue += b.pipelineValue;
      acc.totalLeads += b.totalLeads;
      acc.qualifiedLeads += b.qualifiedLeads;
      acc.totalOpportunities += b.totalOpportunities;
      acc.wonOpportunities += b.wonOpportunities;
      acc.newCustomersAcquired += b.newCustomersAcquired;
      acc.totalActiveCustomers += b.totalActiveCustomers;
      acc.serviceCasesCreated += b.serviceCasesCreated;
      acc.serviceCasesResolved += b.serviceCasesResolved;
      acc.serviceCasesFCR += b.serviceCasesFCR;
      acc.totalCrmUsers += b.totalCrmUsers;
      acc.activeCrmUsers += b.activeCrmUsers;
      acc.dauUsers += b.dauUsers;
      acc.mauUsers += b.mauUsers;
      acc.rmUsers += b.rmUsers;
      acc.campaignLeads += b.campaignLeads;
      acc.campaignConversions += b.campaignConversions;

      acc.weightedSalesCycle += b.salesCycleDays * b.wonOpportunities;
      acc.weightedResolution += b.avgResolutionTimeHours * b.serviceCasesResolved;
      acc.weightedNps += b.npsScore * b.newCustomersAcquired;
      acc.weightedCsat += b.csatScore * b.serviceCasesResolved;
      acc.weightedCostToServe += b.costToServePerCase * b.serviceCasesCreated;
      acc.weightedRetention += b.retentionRate * b.newCustomersAcquired;
    });

    // Apply Region filtering factor if selected
    let regFactor = 1.0;
    if (state.region === "north") regFactor = 0.32;
    else if (state.region === "west") regFactor = 0.36;
    else if (state.region === "south") regFactor = 0.23;
    else if (state.region === "east") regFactor = 0.09;

    if (state.region !== "all") {
      acc.revenueActual *= regFactor;
      acc.revenueTarget *= regFactor;
      acc.revenueBaseline *= regFactor;
      acc.revenuePrevYear *= regFactor;
      acc.pipelineValue *= regFactor;
      acc.totalLeads = Math.round(acc.totalLeads * regFactor);
      acc.qualifiedLeads = Math.round(acc.qualifiedLeads * regFactor);
      acc.totalOpportunities = Math.round(acc.totalOpportunities * regFactor);
      acc.wonOpportunities = Math.round(acc.wonOpportunities * regFactor);
      acc.newCustomersAcquired = Math.round(acc.newCustomersAcquired * regFactor);
      acc.totalActiveCustomers = Math.round(acc.totalActiveCustomers * regFactor);
      acc.serviceCasesCreated = Math.round(acc.serviceCasesCreated * regFactor);
      acc.serviceCasesResolved = Math.round(acc.serviceCasesResolved * regFactor);
      acc.serviceCasesFCR = Math.round(acc.serviceCasesFCR * regFactor);
      acc.totalCrmUsers = Math.round(acc.totalCrmUsers * regFactor);
      acc.activeCrmUsers = Math.round(acc.activeCrmUsers * regFactor);
      acc.dauUsers = Math.round(acc.dauUsers * regFactor);
      acc.mauUsers = Math.round(acc.mauUsers * regFactor);
      acc.rmUsers = Math.round(acc.rmUsers * regFactor);
      acc.campaignLeads = Math.round(acc.campaignLeads * regFactor);
      acc.campaignConversions = Math.round(acc.campaignConversions * regFactor);
    }

    // Derived Rates
    const revenueAchievementPct = acc.revenueTarget > 0 ? (acc.revenueActual / acc.revenueTarget) * 100 : 108.0;
    const revenueGrowthBaseline = acc.revenueBaseline > 0 ? ((acc.revenueActual - acc.revenueBaseline) / acc.revenueBaseline) * 100 : 12.4;
    const revenueGrowthYoY = acc.revenuePrevYear > 0 ? ((acc.revenueActual - acc.revenuePrevYear) / acc.revenuePrevYear) * 100 : 8.2;
    const customerGrowthPct = 8.6; // Customer base expansion

    const salesConversionRate = acc.totalLeads > 0 ? (acc.wonOpportunities / acc.totalLeads) * 100 : 18.4;
    const oppWinRate = acc.totalOpportunities > 0 ? (acc.wonOpportunities / acc.totalOpportunities) * 100 : 35.8;
    const leadToOppRate = acc.totalLeads > 0 ? (acc.totalOpportunities / acc.totalLeads) * 100 : 14.5;
    
    const pipelineCoverage = acc.revenueActual > 0 ? (acc.pipelineValue / acc.revenueActual) : 2.52;
    const weightedPipeline = acc.pipelineValue * 0.38;

    const crmAdoptionRate = acc.totalCrmUsers > 0 ? (acc.activeCrmUsers / acc.totalCrmUsers) * 100 : 87.0;
    const dauMauRatio = acc.mauUsers > 0 ? (acc.dauUsers / acc.mauUsers) * 100 : 85.0;

    const fcrRate = acc.serviceCasesResolved > 0 ? (acc.serviceCasesFCR / acc.serviceCasesResolved) * 100 : 76.0;
    const slaCompliance = 97.2;

    const avgResolutionHours = acc.serviceCasesResolved > 0 ? acc.weightedResolution / acc.serviceCasesResolved : 3.8;
    const avgSalesCycleDays = acc.wonOpportunities > 0 ? acc.weightedSalesCycle / acc.wonOpportunities : 18.5;
    const npsScore = acc.newCustomersAcquired > 0 ? Math.round(acc.weightedNps / acc.newCustomersAcquired) : 41;
    const csatScore = acc.serviceCasesResolved > 0 ? (acc.weightedCsat / acc.serviceCasesResolved) : 89.5;
    const costToServe = acc.serviceCasesCreated > 0 ? (acc.weightedCostToServe / acc.serviceCasesCreated) : 42.0;
    const retentionRate = acc.newCustomersAcquired > 0 ? (acc.weightedRetention / acc.newCustomersAcquired) : 94.2;

    const revenuePerRmCr = acc.rmUsers > 0 ? (acc.revenueActual / acc.rmUsers) : 0.185;
    const rmProdImprovementPct = 18.0; // vs baseline

    // Campaign Contribution
    const campaignConversionRate = acc.campaignLeads > 0 ? (acc.campaignConversions / acc.campaignLeads) * 100 : 18.4;
    const campaignRoi = 13.8;

    // Realised Value
    const realisedValueCr = (acc.revenueActual - acc.revenueBaseline) + 32.0 + 24.5 + 18.2;

    return {
      revenueActual: acc.revenueActual,
      revenueTarget: acc.revenueTarget,
      revenueBaseline: acc.revenueBaseline,
      revenueAchievementPct,
      revenueGrowthBaseline,
      revenueGrowthYoY,
      customerGrowthPct,
      pipelineValue: acc.pipelineValue,
      weightedPipeline,
      pipelineCoverage,
      totalLeads: acc.totalLeads,
      qualifiedLeads: acc.qualifiedLeads,
      totalOpportunities: acc.totalOpportunities,
      wonOpportunities: acc.wonOpportunities,
      salesConversionRate,
      oppWinRate,
      leadToOppRate,
      retentionRate,
      npsScore,
      csatScore,
      serviceCasesCreated: acc.serviceCasesCreated,
      serviceCasesResolved: acc.serviceCasesResolved,
      serviceCasesFCR: acc.serviceCasesFCR,
      fcrRate,
      avgResolutionHours,
      slaCompliance,
      costToServe,
      totalCrmUsers: acc.totalCrmUsers,
      activeCrmUsers: acc.activeCrmUsers,
      crmAdoptionRate,
      dauMauRatio,
      rmUsers: acc.rmUsers,
      revenuePerRmCr,
      rmProdImprovementPct,
      avgSalesCycleDays,
      campaignLeads: acc.campaignLeads,
      campaignConversions: acc.campaignConversions,
      campaignConversionRate,
      campaignRoi,
      realisedValueCr,
      // Fixed Executive Health Breakdown
      healthScore: {
        overall: 86,
        growth: 91,
        customer: 84,
        productivity: 87,
        service: 82,
        adoption: 85
      }
    };
  }

  function generateExecutiveAlerts() {
    return [
      {
        id: "alert-watch-retail",
        type: "WATCH",
        badgeClass: "watch",
        title: "Retail Banking Conversion Below Target",
        description: "Retail personal loan conversion is 4.2pp below plan due to friction in KYC document upload.",
        impact: "₹6.8 Cr potential pipeline slippage",
        bu: "Retail Banking"
      },
      {
        id: "alert-risk-sme",
        type: "AT RISK",
        badgeClass: "atrisk",
        title: "SME CRM Adoption Lagging in East Region",
        description: "SME field officers in East Region branches are 12pp below the 85% mobile adoption benchmark.",
        impact: "Delayed client visit logging & lead follow-up",
        bu: "SME Banking (East)"
      },
      {
        id: "alert-pos-service",
        type: "POSITIVE",
        badgeClass: "ontrack",
        title: "Customer Service Resolution Velocity Up +24%",
        description: "Automated case triage reduced average resolution time from 12.5 hrs to 3.8 hrs, lifting NPS to +41.",
        impact: "₹18.2 Cr operational cost savings realised",
        bu: "Customer Service"
      }
    ];
  }

  return {
    getState: () => ({ ...state }),
    setPeriod: (p) => { state.period = p; },
    setBusinessUnit: (bu) => { state.businessUnit = bu; },
    setRegion: (reg) => { state.region = reg; },
    getData: getAggregatedData,
    evaluateStatus,
    generateExecutiveAlerts
  };
})();
