(function (window, document) {
  "use strict";

  var SPRITE_ID = "aurora-sprite";
  var LOGO_LIGHT = "https://assets.example.com/net-aurora/logo-light.svg";
  var LOGO_DARK = "https://assets.example.com/net-aurora/logo-dark.svg";
  var TOAST_DURATION = 4200;

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function throttle(fn, wait) {
    var timeout = null;
    var last = 0;
    return function () {
      var now = Date.now();
      var remaining = wait - (now - last);
      var context = this;
      var args = arguments;
      if (remaining <= 0) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        last = now;
        fn.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(function () {
          last = Date.now();
          timeout = null;
          fn.apply(context, args);
        }, remaining);
      }
    };
  }

  function ensureSprite() {
    if (document.getElementById(SPRITE_ID)) {
      return;
    }
    var sprite = document.createElement("div");
    sprite.style.display = "none";
    sprite.setAttribute("aria-hidden", "true");
    sprite.innerHTML = [
      '<svg xmlns="http://www.w3.org/2000/svg" id="' + SPRITE_ID + '" style="display:none">',
      '<symbol id="aurora-home" viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V21a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1z"/></symbol>',
      '<symbol id="aurora-users" viewBox="0 0 24 24"><path d="M8 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm8 0a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 16 12zm-8 2c-3.31 0-6 2.24-6 5v1h12v-1c0-2.76-2.69-5-6-5zm8 .5a5.5 5.5 0 0 1 5.5 5.5v1H14v-1a5.5 5.5 0 0 1 2-4.22z"/></symbol>',
      '<symbol id="aurora-callcenter" viewBox="0 0 24 24"><path d="M6 6a6 6 0 0 1 12 0v3h1a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-1v-2h1a3 3 0 0 0 3-3v-3h-1v1a2 2 0 0 1-2 2h-1v-8a4 4 0 0 0-8 0v8H9a2 2 0 0 1-2-2v-1H6v3a3 3 0 0 0 3 3h1v2H9a5 5 0 0 1-5-5v-3a2 2 0 0 1 2-2h1z"/></symbol>',
      '<symbol id="aurora-conferences" viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm1 3v6h12V8z"/></symbol>',
      '<symbol id="aurora-autoattendants" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9 9 9 0 0 1 9-9zm0 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm-.75 3.5h1.5v3.19l2.76 1.59-.75 1.3L11.25 13z"/></symbol>',
      '<symbol id="aurora-queues" viewBox="0 0 24 24"><path d="M4 5h16v3H4zm2 5h12v3H6zm2 5h8v3H8z"/></symbol>',
      '<symbol id="aurora-timeframes" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9 9 9 0 0 1 9-9zm0 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm-.75 2.5h1.5v4.44l3 1.73-.75 1.3-3.75-2.17z"/></symbol>',
      '<symbol id="aurora-moh" viewBox="0 0 24 24"><path d="M6 5h2l2 4 2-4h2l2 4 2-4h2l-3 7 3 7h-2l-2-4-2 4h-2l-2-4-2 4H6l3-7z"/></symbol>',
      '<symbol id="aurora-routes" viewBox="0 0 24 24"><path d="M6 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm12 8a3 3 0 1 1-3 3 3 3 0 0 1 3-3zM8.41 8.41 11 11h2l2 2-2 2h-2l-2.59 2.59L6 15l3-3-3-3z"/></symbol>',
      '<symbol id="aurora-inventory" viewBox="0 0 24 24"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-8-4-8 4z"/></symbol>',
      '<symbol id="aurora-smartrouting" viewBox="0 0 24 24"><path d="M5 4h4l2 3h4l4 6-4 6h-4l-2-3H5l-4-6z"/></symbol>',
      '<symbol id="aurora-analytics" viewBox="0 0 24 24"><path d="M4 5h3v14H4zm13 0h3v14h-3zM9 11h3v8H9zm5-4h3v12h-3z"/></symbol>',
      '<symbol id="aurora-callhistory" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9H5a7 7 0 1 0 7-7 1 1 0 0 1 0-2zm-.75 4.5h1.5V12h3v1.5h-4.5z"/></symbol>',
      '<symbol id="aurora-plus" viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></symbol>',
      '<symbol id="aurora-flash" viewBox="0 0 24 24"><path d="M7 2h10l-3.5 6H18l-8 14 2.5-9H7z"/></symbol>',
      '<symbol id="aurora-check" viewBox="0 0 24 24"><path d="m9.5 16.5-4-4L7 11l2.5 2.5L17 6l1.5 1.5z"/></symbol>',
      '</svg>'
    ].join("");
    document.body.insertBefore(sprite, document.body.firstChild);
  }

  function iconElement(id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("ns-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#aurora-" + id);
    use.setAttribute("href", "#aurora-" + id);
    svg.appendChild(use);
    return svg;
  }

  function textContentWithoutChrome(node) {
    if (!node) {
      return "";
    }
    var clone = node.cloneNode(true);
    Array.prototype.slice.call(clone.querySelectorAll(".nav-bg-image, svg, img, use, picture, .ns-icon")).forEach(function (child) {
      child.remove();
    });
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function applyIconToTarget(target, id) {
    if (!target || !id) {
      return null;
    }
    var link = target.matches && target.matches("a, button") ? target : target.querySelector && target.querySelector("a, button");
    if (!link) {
      return null;
    }
    if (link.dataset.auroraIcon === id) {
      Array.prototype.slice.call(link.querySelectorAll("div.nav-bg-image, span.nav-bg-image")).forEach(function (legacy) {
        legacy.remove();
      });
      return link;
    }
    link.dataset.auroraIcon = id;
    Array.prototype.slice.call(link.querySelectorAll("i, span[class*='icon'], span.nav-bg-image, div.nav-bg-image, svg.ns-icon"))
      .forEach(function (node) {
        node.remove();
      });
    link.insertBefore(iconElement(id), link.firstChild);
    var label = textContentWithoutChrome(link);
    if (label && !link.getAttribute("aria-label")) {
      link.setAttribute("aria-label", label);
    }
    if (!link.getAttribute("title")) {
      link.setAttribute("title", link.getAttribute("aria-label") || id);
    }
    Array.prototype.slice.call((target.matches && target.matches("li, div")) ? target.querySelectorAll(".nav-bg-image") : [])
      .forEach(function (legacyIcon) {
        legacyIcon.remove();
      });
    return link;
  }

  function decorateHeader() {
    var bar = document.querySelector(".navigation-subbar") ||
      document.querySelector("#ns-topbar") ||
      document.querySelector(".header-bar") ||
      document.querySelector(".navbar");

    if (!bar) {
      return null;
    }

    if (!bar.querySelector(".ns-brand")) {
      var brand = document.createElement("div");
      brand.className = "ns-brand";
      var picture = document.createElement("picture");
      var source = document.createElement("source");
      source.media = "(prefers-color-scheme: dark)";
      source.srcset = LOGO_DARK;
      picture.appendChild(source);
      var img = document.createElement("img");
      img.className = "ns-brand__logo";
      img.src = LOGO_LIGHT;
      img.alt = "NetSapiens Portal";
      img.decoding = "async";
      img.loading = "lazy";
      picture.appendChild(img);
      brand.appendChild(picture);
      bar.insertBefore(brand, bar.firstChild);
    }

    if (!bar.querySelector(".ns-header-actions")) {
      var actions = document.createElement("div");
      actions.className = "ns-header-actions";
      bar.appendChild(actions);
    }

    var host = bar.querySelector(".ns-header-actions");

    if (host && !host.querySelector(".ns-header-time")) {
      var clock = document.createElement("span");
      clock.className = "ns-header-time";
      clock.setAttribute("aria-live", "polite");
      clock.textContent = formatClock(new Date());
      host.appendChild(clock);
      setInterval(function () {
        clock.textContent = formatClock(new Date());
      }, 60000);
    }

    if (host && !host.querySelector("[data-aurora-billing]")) {
      var billing = document.createElement("button");
      billing.type = "button";
      billing.className = "ns-header-button";
      billing.dataset.auroraBilling = "trigger";
      billing.setAttribute("aria-haspopup", "dialog");
      billing.setAttribute("aria-expanded", "false");
      billing.appendChild(iconElement("analytics"));
      billing.appendChild(document.createTextNode("Billing"));
      host.appendChild(billing);
    }

    window.addEventListener("scroll", throttle(function () {
      var scrolled = window.scrollY > 12;
      bar.classList.toggle("is-scrolled", scrolled);
    }, 120), { passive: true });

    return bar;
  }

  function formatClock(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function applyNavigationIcons() {
    var iconMap = {
      "#menu-home": "home",
      "#menu-users": "users",
      "#menu-callcenter": "callcenter",
      "#menu-conferences": "conferences",
      "#menu-autoattendants": "autoattendants",
      "#menu-queues": "queues",
      "#menu-timeframes": "timeframes",
      "#menu-moh": "moh",
      "#menu-routes": "routes",
      "#menu-inventory": "inventory",
      "#menu-smartrouting": "smartrouting",
      "#menu-analytics": "analytics",
      "#menu-callhistory": "callhistory"
    };

    Object.keys(iconMap).forEach(function (selector) {
      var target = document.querySelector(selector);
      if (!target) {
        return;
      }
      applyIconToTarget(target, iconMap[selector]);
    });
  }

  function hydrateLegacyNavigation() {
    var labelMap = {
      "home": "home",
      "dashboard": "home",
      "call center": "callcenter",
      "call queues": "queues",
      "queues": "queues",
      "users": "users",
      "conferences": "conferences",
      "conference": "conferences",
      "auto attendants": "autoattendants",
      "auto attendant": "autoattendants",
      "time frames": "timeframes",
      "music on hold": "moh",
      "route profiles": "routes",
      "routes": "routes",
      "inventory": "inventory",
      "smart routing": "smartrouting",
      "analytics": "analytics",
      "call history": "callhistory"
    };

    var legacyIcons = document.querySelectorAll(".nav-bg-image");
    if (!legacyIcons.length) {
      return;
    }

    Array.prototype.forEach.call(legacyIcons, function (node) {
      var host = node.closest("a, button, li, .nav-item") || node.parentElement;
      if (!host) {
        return;
      }
      var link = host.matches && host.matches("a, button") ? host : host.querySelector && host.querySelector("a, button");
      var textSource = link || host;
      var label = textContentWithoutChrome(textSource).toLowerCase();
      var iconId = labelMap[label];
      if (!iconId) {
        Object.keys(labelMap).some(function (key) {
          if (label.indexOf(key) !== -1) {
            iconId = labelMap[key];
            return true;
          }
          return false;
        });
      }
      if (!iconId) {
        return;
      }
      applyIconToTarget(host, iconId);
      if (node.parentNode) {
        node.remove();
      }
    });
  }

  function findContainer() {
    return document.querySelector(".content-wrapper") ||
      document.querySelector(".page-content") ||
      document.querySelector("main") ||
      document.querySelector("#content") ||
      document.querySelector(".container-fluid") ||
      document.body;
  }

  function injectHero(container) {
    if (!container || container.querySelector(".ns-hero")) {
      return;
    }
    var hero = document.createElement("section");
    hero.className = "ns-hero";
    hero.innerHTML = [
      '<div class="ns-hero__eyebrow">Control Center</div>',
      '<h1 class="ns-hero__title">Craft premium calling experiences for every customer.</h1>',
      '<p class="ns-hero__subtitle">Monitor live calls, update routing, and jump into action faster with an immersive Aurora workspace designed for service providers.</p>',
      '<div class="ns-hero__meta" aria-live="polite">' + greeting() + '</div>'
    ].join("");
    container.insertBefore(hero, container.firstChild);
  }

  function greeting() {
    var hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    }
    if (hour < 18) {
      return "Good afternoon";
    }
    return "Good evening";
  }

  function ensureQuickActions(container) {
    if (!container || container.querySelector(".ns-quick-actions")) {
      return;
    }
    var section = document.createElement("section");
    section.className = "ns-surface";
    section.setAttribute("aria-label", "Quick actions");
    var body = document.createElement("div");
    body.className = "panel-body";

    var header = document.createElement("header");
    header.className = "panel-heading";
    header.innerHTML = '<div><div class="ns-badge">Quick launch</div><h2>Quick actions</h2></div>' +
      '<button type="button" class="ns-header-button" data-aurora-refresh>Refresh view</button>';
    section.appendChild(header);

    var wrap = document.createElement("div");
    wrap.className = "ns-quick-actions";

    var actions = [
      { label: "Provision user", icon: "plus", message: "Pretend we opened the user provisioning wizard." },
      { label: "Create call queue", icon: "queues", message: "Queue builder launched in a separate view (imagine)." },
      { label: "Schedule meeting", icon: "conferences", message: "Meeting template created with defaults." },
      { label: "Launch analytics", icon: "analytics", message: "Analytics dashboard would open in a new tab." }
    ];

    actions.forEach(function (action) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ns-quick-actions__btn";
      btn.setAttribute("data-action", action.label);
      btn.appendChild(iconElement(action.icon));
      btn.appendChild(document.createTextNode(action.label));
      btn.addEventListener("click", function () {
        showToast(action.message);
      });
      wrap.appendChild(btn);
    });

    body.appendChild(wrap);
    section.appendChild(body);
    container.insertBefore(section, container.querySelector(".ns-hero") ? container.children[1] : container.firstChild);

    var refresh = section.querySelector("[data-aurora-refresh]");
    if (refresh) {
      refresh.addEventListener("click", function () {
        showToast("Dashboard refreshed — data is simulated.");
      });
    }
  }

  function ensureMetrics(container) {
    if (!container || container.querySelector(".ns-metric-grid")) {
      return;
    }
    var metrics = document.createElement("section");
    metrics.className = "ns-surface";
    metrics.innerHTML = [
      '<header class="panel-heading"><div><div class="ns-badge">Health</div><h2>Service snapshot</h2></div></header>',
      '<div class="panel-body">',
      '<div class="ns-metric-grid">',
      metricCard("Active calls", "128", "+12% vs yesterday"),
      metricCard("Average wait", "00:43", "Down 6% this hour", "warning"),
      metricCard("SLA compliance", "99.2%", "On track", "success"),
      metricCard("Tickets open", "18", "5 require follow-up", "danger"),
      '</div></div>'
    ].join("");
    container.insertBefore(metrics, container.querySelector(".ns-hero") ? container.children[2] : container.firstChild);
  }

  function metricCard(label, value, trend, tone) {
    var className = "ns-metric";
    if (tone) {
      className += " ns-metric--" + tone;
    }
    return [
      '<article class="' + className + '" tabindex="0">',
      '<div class="ns-metric__label">' + label + '</div>',
      '<div class="ns-metric__value">' + value + '</div>',
      '<div class="ns-metric__trend">' + trend + '</div>',
      '</article>'
    ].join("");
  }

  function ensureSearch(container) {
    if (!container || container.querySelector(".ns-search")) {
      return;
    }
    var section = document.createElement("section");
    section.className = "ns-search";
    section.innerHTML = '<label for="aurora-search">Global search</label>' +
      '<input type="search" id="aurora-search" placeholder="Search cards, calls, and settings" autocomplete="off" aria-describedby="aurora-search-help">' +
      '<small id="aurora-search-help" class="ns-text-subtle">Filtering is instant and client-side.</small>';
    container.insertBefore(section, container.querySelector(".ns-surface") || container.querySelector(".panel"));

    var empty = document.createElement("div");
    empty.className = "ns-empty-state";
    empty.textContent = "No matching modules. Try adjusting your keywords.";
    empty.hidden = true;
    container.appendChild(empty);

    var cards = [];

    function catalog() {
      cards = [];
      Array.prototype.forEach.call(container.querySelectorAll(".panel, .card, .ns-surface, .dashboard-card, .tile, .portlet"), function (panel) {
        var text = (panel.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        cards.push({ node: panel, text: text, display: panel.style.display || "" });
      });
    }

    function applyFilter(value) {
      var query = (value || "").trim().toLowerCase();
      if (!cards.length) {
        catalog();
      }
      var visible = 0;
      cards.forEach(function (entry) {
        var match = !query || entry.text.indexOf(query) !== -1;
        entry.node.style.display = match ? entry.display : "none";
        entry.node.setAttribute("aria-hidden", match ? "false" : "true");
        if (match) {
          visible += 1;
        }
      });
      empty.hidden = visible !== 0;
    }

    catalog();

    section.querySelector("input").addEventListener("input", function (event) {
      applyFilter(event.target.value);
    });
  }

  function showToast(message) {
    var stack = document.querySelector(".ns-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "ns-toast-stack";
      stack.setAttribute("aria-live", "polite");
      stack.setAttribute("aria-atomic", "false");
      document.body.appendChild(stack);
    }
    var toast = document.createElement("div");
    toast.className = "ns-toast";
    toast.dataset.state = "enter";
    toast.setAttribute("role", "status");
    var icon = document.createElement("span");
    icon.className = "ns-toast__icon";
    icon.appendChild(iconElement("check"));
    var text = document.createElement("div");
    text.className = "ns-toast__message";
    text.textContent = message;
    var close = document.createElement("button");
    close.type = "button";
    close.className = "ns-toast__close";
    close.setAttribute("aria-label", "Dismiss notification");
    close.textContent = "×";
    close.addEventListener("click", function () {
      removeToast(toast);
    });
    toast.appendChild(icon);
    toast.appendChild(text);
    toast.appendChild(close);
    stack.appendChild(toast);

    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var duration = reduced ? 2200 : TOAST_DURATION;

    var timer = setTimeout(function () {
      removeToast(toast);
    }, duration);

    toast.addEventListener("mouseenter", function () {
      clearTimeout(timer);
    });
    toast.addEventListener("mouseleave", function () {
      timer = setTimeout(function () {
        removeToast(toast);
      }, duration / 2);
    });
  }

  function removeToast(toast) {
    if (!toast || !toast.parentNode) {
      return;
    }
    toast.dataset.state = "leave";
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 180);
  }

  function modernizeTables() {
    var tables = document.querySelectorAll("#calls_table, #calls_table_meetings");
    if (!tables.length) {
      return;
    }
    tables.forEach(function (table) {
      var headers = [];
      var thead = table.querySelector("thead");
      if (thead) {
        headers = Array.prototype.map.call(thead.querySelectorAll("th, td"), function (cell) {
          return (cell.textContent || "").trim();
        });
      }
      table.classList.add("ns-call-table");
      Array.prototype.forEach.call(table.querySelectorAll("tbody tr"), function (row) {
        if (!row.getAttribute("tabindex")) {
          row.setAttribute("tabindex", "0");
        }
        row.classList.add("ns-call-card");
        var cells = row.querySelectorAll("td");
        Array.prototype.forEach.call(cells, function (cell, index) {
          if (!cell.hasAttribute("data-label") && headers[index]) {
            cell.setAttribute("data-label", headers[index]);
          }
          var value = (cell.textContent || "").trim();
          if (index === 2 && value) {
            ensureBadge(cell, value);
          }
        });
        if (!row.getAttribute("aria-label")) {
          var summary = cells[0] ? (cells[0].textContent || "").trim() : "Row";
          row.setAttribute("aria-label", summary);
        }
      });

      if (!table.dataset.auroraObserver) {
        var observer = new MutationObserver(function () {
          modernizeTables();
        });
        observer.observe(table, { childList: true, subtree: true });
        table.dataset.auroraObserver = "true";
      }
    });
  }

  function ensureBadge(cell, value) {
    if (cell.querySelector(".ns-call-badge")) {
      return;
    }
    var tone = value.toLowerCase();
    var badge = document.createElement("span");
    badge.className = "ns-call-badge";
    if (tone.indexOf("park") !== -1 || tone.indexOf("hold") !== -1) {
      badge.style.background = "rgba(244, 176, 0, 0.18)";
      badge.style.color = "#f4b000";
      badge.textContent = "On Hold";
    } else if (tone.indexOf("voicemail") !== -1) {
      badge.style.background = "rgba(249, 104, 108, 0.18)";
      badge.style.color = "#f9686c";
      badge.textContent = "Voicemail";
    } else {
      badge.textContent = "Live";
    }
    cell.insertBefore(badge, cell.firstChild);
  }

  function ensureDrawer() {
    var overlay = document.querySelector(".ns-drawer-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "ns-drawer-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    var drawer = document.querySelector(".ns-drawer");
    if (!drawer) {
      drawer = document.createElement("aside");
      drawer.className = "ns-drawer";
      drawer.setAttribute("role", "dialog");
      drawer.setAttribute("aria-modal", "true");
      drawer.setAttribute("aria-labelledby", "aurora-drawer-title");
      drawer.innerHTML = [
        '<div class="ns-drawer__header">',
        '<h2 class="ns-drawer__title" id="aurora-drawer-title">Billing overview</h2>',
        '<button type="button" class="ns-drawer__close" aria-label="Close billing panel">×</button>',
        '</div>',
        '<div class="ns-drawer__body">',
        '<p class="ns-text-subtle">Preview billing summaries, upcoming renewals, and credit usage. Integrate your provider API to populate these values in production.</p>',
        '<ul class="ns-stack">',
        '<li><strong>Current balance:</strong> $0.00 (demo)</li>',
        '<li><strong>Next invoice:</strong> June 30</li>',
        '<li><strong>Auto-pay:</strong> Enabled for ACH ending in ••28</li>',
        '<li><strong>Recent credit packs:</strong> None</li>',
        '</ul>',
        '</div>'
      ].join("");
      document.body.appendChild(drawer);
    }

    var trigger = document.querySelector('[data-aurora-billing="trigger"]');
    if (!trigger) {
      return;
    }

    var closeBtn = drawer.querySelector(".ns-drawer__close");
    var state = { open: false, lastFocus: null };

    function open() {
      if (state.open) {
        return;
      }
      state.open = true;
      state.lastFocus = document.activeElement;
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("ns-drawer-open");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () {
        var focusable = drawer.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        (focusable || drawer).focus();
      }, 20);
    }

    function close() {
      if (!state.open) {
        return;
      }
      state.open = false;
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("ns-drawer-open");
      trigger.setAttribute("aria-expanded", "false");
      if (state.lastFocus && typeof state.lastFocus.focus === "function") {
        state.lastFocus.focus();
      }
    }

    trigger.addEventListener("click", function () {
      state.open ? close() : open();
    });

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        close();
      }
    });

    [drawer, document].forEach(function (node) {
      node.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && state.open) {
          event.preventDefault();
          close();
        } else if (event.key === "Tab" && state.open) {
          trapFocus(drawer, event);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", close);
    }
  }

  function trapFocus(container, event) {
    var focusable = container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) {
      event.preventDefault();
      container.focus();
      return;
    }
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setupGlobalObservers() {
    if (window.__auroraNavObserver) {
      return;
    }
    window.__auroraNavObserver = new MutationObserver(function (records) {
      var shouldUpdate = records.some(function (record) {
        return Array.prototype.some.call(record.addedNodes || [], function (node) {
          return node.nodeType === 1 && (
            (node.matches && node.matches("#menu-home, #menu-users, #menu-callcenter, #menu-conferences")) ||
            (node.matches && node.matches(".nav-bg-image")) ||
            (node.querySelector && node.querySelector("#menu-home, #menu-users, #menu-callcenter, #menu-conferences, .nav-bg-image"))
          );
        });
      });
      if (shouldUpdate) {
        applyNavigationIcons();
        hydrateLegacyNavigation();
      }
    });
    window.__auroraNavObserver.observe(document.body, { childList: true, subtree: true });
  }

  onReady(function () {
    if (!document.body) {
      return;
    }
    ensureSprite();
    decorateHeader();
    applyNavigationIcons();
    hydrateLegacyNavigation();
    setupGlobalObservers();
    var container = findContainer();
    injectHero(container);
    ensureQuickActions(container);
    ensureMetrics(container);
    ensureSearch(container);
    modernizeTables();
    ensureDrawer();
  });

}(window, document));
