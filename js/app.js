/**
 * CEO / CXO BANKING COMMAND CENTRE - APPLICATION ENTRY POINT & 4-TAB ROUTER
 */

window.CXO_APP = {
  activeTab: "tab-overview",

  init: function () {
    console.log("Initializing CEO / CXO Banking Value Realisation Command Centre...");
    
    // 1. Render Header & Filter Strip
    window.CXO_HEADER.render();

    // 2. Render Initial Active Tab (Tab 1: CEO Executive Overview)
    this.renderTab(this.activeTab);

    // 3. Setup Global Listeners & Keyboard Shortcuts
    this.setupGlobalEvents();
  },

  switchTab: function (tabId) {
    this.activeTab = tabId;

    // Update Tab Buttons UI
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      if (btn.getAttribute("data-tab-target") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Render Tab Content
    this.renderTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  renderTab: function (tabId) {
    const mainEl = document.getElementById("main-content-canvas");
    if (!mainEl) return;

    let contentHtml = "";

    switch (tabId) {
      case "tab-overview":
        contentHtml = window.CXO_TAB_OVERVIEW.render();
        break;
      case "tab-growth":
        contentHtml = window.CXO_TAB_GROWTH.render();
        break;
      case "tab-customer":
        contentHtml = window.CXO_TAB_CUSTOMER.render();
        break;
      case "tab-value":
        contentHtml = window.CXO_TAB_VALUE.render();
        break;
      default:
        contentHtml = window.CXO_TAB_OVERVIEW.render();
    }

    mainEl.innerHTML = `
      <div class="tab-pane active" id="${tabId}">
        ${contentHtml}
      </div>
    `;
  },

  refreshActiveTab: function () {
    this.renderTab(this.activeTab);
  },

  showKpiInfo: function (defKey, event) {
    if (event) {
      event.stopPropagation();
    }

    const def = window.CXO_DATASET.kpiDefinitions[defKey];
    if (!def) return;

    const popupEl = document.getElementById("kpi-tooltip-popup");
    if (!popupEl) return;

    popupEl.innerHTML = `
      <div class="tooltip-title">${def.name}</div>
      <div class="tooltip-row"><strong>Definition:</strong> ${def.definition}</div>
      <div class="tooltip-row"><strong>Calculation:</strong> <code>${def.calculation}</code></div>
      <div class="tooltip-row"><strong>Source:</strong> ${def.source}</div>
      <div class="tooltip-row"><strong>Target:</strong> ${def.target}</div>
      <div class="tooltip-row"><strong>Executive Meaning:</strong> ${def.meaning}</div>
    `;

    const rect = event.target.getBoundingClientRect();
    popupEl.style.top = `${rect.bottom + window.scrollY + 8}px`;
    popupEl.style.left = `${Math.min(window.innerWidth - 300, rect.left + window.scrollX - 20)}px`;
    popupEl.classList.add("active");

    const closeHandler = () => {
      popupEl.classList.remove("active");
      document.removeEventListener("click", closeHandler);
    };
    setTimeout(() => {
      document.addEventListener("click", closeHandler);
    }, 50);
  },

  setupGlobalEvents: function () {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        window.CXO_DRILLDOWN.close();
        window.CXO_SIMULATOR.close();
        window.CXO_HEADER.closeBriefModal();
      }
      
      // Keys 1-4 switch between the 4 executive tabs
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
        const tabsMap = {
          "1": "tab-overview",
          "2": "tab-growth",
          "3": "tab-customer",
          "4": "tab-value"
        };
        if (tabsMap[e.key]) {
          this.switchTab(tabsMap[e.key]);
        }
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.CXO_APP.init();
});
