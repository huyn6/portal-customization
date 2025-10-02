(function (window, document) {
  "use strict";

  var LOGO_LIGHT = "https://examplecdn.com/brand/logo-light.svg";
  var LOGO_DARK = "https://examplecdn.com/brand/logo-dark.svg";
  var SPRITE_ID = "ns-modern-sprite";
  var TOAST_DURATION = 3600;

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function throttle(fn, wait) {
    var last = 0;
    var timeout;
    return function () {
      var now = Date.now();
      var remaining = wait - (now - last);
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        last = now;
        fn.apply(this, arguments);
      } else if (!timeout) {
        timeout = setTimeout(function () {
          last = Date.now();
          timeout = null;
          fn.apply(this, arguments);
        }.bind(this), remaining);
      }
    };
  }

  function ensureSprite() {
    if (document.getElementById(SPRITE_ID)) {
      return;
    }
    var wrap = document.createElement("div");
    wrap.style.display = "none";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = [
      '<svg xmlns="http://www.w3.org/2000/svg" id="' + SPRITE_ID + '" style="display:none">',
      '<symbol id="ns-home" viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1z"></path></symbol>',
      '<symbol id="ns-callcenter" viewBox="0 0 24 24"><path d="M6 6a6 6 0 0 1 12 0v3h1a2 2 0 0 1 2 2v3a5 5 0 0 1-5 5h-1v-2h1a3 3 0 0 0 3-3v-3h-1v1a2 2 0 0 1-2 2h-1v-8a4 4 0 0 0-8 0v8H9a2 2 0 0 1-2-2v-1H6v3a3 3 0 0 0 3 3h1v2H9a5 5 0 0 1-5-5v-3a2 2 0 0 1 2-2h1z"></path></symbol>',
      '<symbol id="ns-users" viewBox="0 0 24 24"><path d="M8 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm8 0a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 16 12zm-8 2c-3.31 0-6 2.24-6 5v1h12v-1c0-2.76-2.69-5-6-5zm8 .5a5.5 5.5 0 0 1 5.5 5.5v1H14v-1a5.5 5.5 0 0 1 2-4.22z"></path></symbol>',
      '<symbol id="ns-conferences" viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm1 3v6h12V8z"></path></symbol>',
      '<symbol id="ns-autoattendants" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9 9 9 0 0 1 9-9zm0 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm-.75 3.5h1.5v3.19l2.76 1.59-.75 1.3L11.25 13z"></path></symbol>',
      '<symbol id="ns-queues" viewBox="0 0 24 24"><path d="M4 5h16v3H4zm2 5h12v3H6zm2 5h8v3H8z"></path></symbol>',
      '<symbol id="ns-timeframes" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9 9 9 0 0 1 9-9zm0 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm-.75 2.5h1.5v4.44l3 1.73-.75 1.3-3.75-2.17z"></path></symbol>',
      '<symbol id="ns-moh" viewBox="0 0 24 24"><path d="M6 5h2l2 4 2-4h2l2 4 2-4h2l-3 7 3 7h-2l-2-4-2 4h-2l-2-4-2 4H6l3-7z"></path></symbol>',
      '<symbol id="ns-routes" viewBox="0 0 24 24"><path d="M6 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm12 8a3 3 0 1 1-3 3 3 3 0 0 1 3-3zM8.41 8.41 11 11h2l2 2-2 2h-2l-2.59 2.59L6 15l3-3-3-3z"></path></symbol>',
      '<symbol id="ns-inventory" viewBox="0 0 24 24"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14l-8-4-8 4z"></path></symbol>',
      '<symbol id="ns-smartrouting" viewBox="0 0 24 24"><path d="M5 4h4l2 3h4l4 6-4 6h-4l-2-3H5l-4-6z"></path></symbol>',
      '<symbol id="ns-analytics" viewBox="0 0 24 24"><path d="M4 5h3v14H4zm13 0h3v14h-3zM9 11h3v8H9zm5-4h3v12h-3z"></path></symbol>',
      '<symbol id="ns-callhistory" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 1-9 9H5a7 7 0 1 0 7-7 1 1 0 0 1 0-2zm-.75 4.5h1.5V12h3v1.5h-4.5z"></path></symbol>',
      "</svg>"
    ].join("");
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  function iconElement(id) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("ns-icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#ns-" + id);
    use.setAttribute("href", "#ns-" + id);
    svg.appendChild(use);
    return svg;
  }

  function ensureIcon(target, id) {
    if (!target) {
      return;
    }
    var link = target.matches("a, button") ? target : target.querySelector("a, button");
    if (!link || link.dataset.nsModernIcon === id) {
      return;
    }
    link.dataset.nsModernIcon = id;
    Array.prototype.forEach.call(link.querySelectorAll("i, span[class*='icon'], span[class*='fa-'], span.nav-bg-image, svg.ns-icon"), function (node) {
      node.remove();
    });
    link.insertBefore(iconElement(id), link.firstChild);
    if (!link.getAttribute("aria-label")) {
      var label = (link.textContent || "").trim();
      if (!label) {
        label = id.replace(/-/g, " ");
      }
      link.setAttribute("aria-label", label);
    }
    if (!link.getAttribute("title")) {
      link.setAttribute("title", link.getAttribute("aria-label"));
    }
  }

  function enhanceNavigation() {
    var bar = document.querySelector(".navigation-subbar") || document.querySelector("#ns-topbar") || document.querySelector(".header-bar") || document.querySelector(".navbar");
    if (!bar) {
      return;
    }
    if (!bar.querySelector(".ns-modern-topbar-brand")) {
      var brand = document.createElement("div");
      brand.className = "ns-modern-topbar-brand";
      var picture = document.createElement("picture");
      var dark = document.createElement("source");
      dark.media = "(prefers-color-scheme: dark)";
      dark.srcset = LOGO_DARK;
      var img = document.createElement("img");
      img.className = "ns-modern-logo";
      img.src = LOGO_LIGHT;
      img.alt = "NetSapiens Manager";
      img.decoding = "async";
      img.loading = "lazy";
      picture.appendChild(dark);
      picture.appendChild(img);
      brand.appendChild(picture);
      bar.insertBefore(brand, bar.firstChild);
    }
    if (!bar.querySelector(".ns-modern-header-actions")) {
      var actions = document.createElement("div");
      actions.className = "ns-modern-header-actions";
      bar.appendChild(actions);
    }
    var host = bar.querySelector(".ns-modern-header-actions");
    if (host && !host.querySelector("[data-ns-modern-billing]")) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ns-modern-header-button";
      btn.dataset.nsModernBilling = "trigger";
      btn.setAttribute("aria-haspopup", "dialog");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Billing";
      host.appendChild(btn);
    }
    window.addEventListener("scroll", throttle(function () {
      bar.classList.toggle("is-scrolled", window.scrollY > 12);
    }, 120), { passive: true });
  }

  function applyIcons() {
    var map = {
      "#menu-home": "home",
      "#menu-callcenter": "callcenter",
      "#menu-users": "users",
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
    Object.keys(map).forEach(function (selector) {
      var node = document.querySelector(selector);
      if (node) {
        ensureIcon(node, map[selector]);
      }
    });
  }

  function ensureToastStack() {
    var stack = document.querySelector(".ns-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "ns-toast-stack";
      stack.setAttribute("aria-live", "polite");
      stack.setAttribute("aria-atomic", "false");
      document.body.appendChild(stack);
    }
    return stack;
  }

  function showToast(message) {
    var stack = ensureToastStack();
    var toast = document.createElement("div");
    toast.className = "ns-toast";
    toast.setAttribute("role", "status");
    toast.dataset.state = "enter";
    toast.textContent = message;
    stack.appendChild(toast);
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var duration = reduced ? 1800 : TOAST_DURATION;
    if (!reduced) {
      setTimeout(function () {
        toast.dataset.state = "leave";
      }, duration - 400);
    }
    setTimeout(function () {
      toast.remove();
    }, duration);
  }

  function setupQuickActions(container) {
    if (!container || container.querySelector(".ns-quick-actions")) {
      return;
    }
    var actions = [
      { label: "Add User", icon: "users" },
      { label: "Create Queue", icon: "queues" },
      { label: "Open Ticket", icon: "callcenter" }
    ];
    var wrap = document.createElement("div");
    wrap.className = "ns-quick-actions";
    actions.forEach(function (action) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ns-quick-actions__btn";
      btn.setAttribute("data-action", action.label);
      btn.appendChild(iconElement(action.icon));
      var text = document.createElement("span");
      text.textContent = action.label;
      btn.appendChild(text);
      btn.addEventListener("click", function () {
        showToast("Pretend we " + action.label.toLowerCase() + ".");
      });
      wrap.appendChild(btn);
    });
    container.insertBefore(wrap, container.firstChild);
  }

  function enhanceCards() {
    var cards = [];
    [".panel", ".box", ".card", ".tile", ".dashboard-card", ".portlet", ".ns-modern-card"].forEach(function (selector) {
      Array.prototype.forEach.call(document.querySelectorAll(selector), function (card) {
        if (!card.dataset.nsModernDisplay) {
          card.dataset.nsModernDisplay = card.style.display || "";
        }
        card.dataset.nsModernSearch = (card.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        cards.push(card);
      });
    });
    return cards;
  }

  function setupSearch(container) {
    if (!container || container.querySelector(".ns-global-search")) {
      return;
    }
    var cards = enhanceCards();
    var wrap = document.createElement("div");
    wrap.className = "ns-global-search";
    wrap.innerHTML = '<label for="ns-global-search-input">Global search</label>' +
      '<input type="search" id="ns-global-search-input" placeholder="Search cards and tables" autocomplete="off" aria-describedby="ns-global-search-help">' +
      '<small id="ns-global-search-help" class="ns-muted">Type to filter visible cards instantly.</small>';
    container.insertBefore(wrap, container.firstChild);
    var input = wrap.querySelector("input");
    var empty = document.createElement("div");
    empty.className = "ns-empty-state";
    empty.textContent = "No matching results. Try a different search.";
    empty.hidden = true;
    empty.setAttribute("aria-live", "polite");
    container.appendChild(empty);
    function apply(value) {
      var query = value.trim().toLowerCase();
      var matches = 0;
      cards = enhanceCards();
      cards.forEach(function (card) {
        var haystack = card.dataset.nsModernSearch || "";
        var show = !query || haystack.indexOf(query) !== -1;
        card.style.display = show ? card.dataset.nsModernDisplay : "none";
        card.setAttribute("aria-hidden", show ? "false" : "true");
        if (show) {
          matches += 1;
        }
      });
      empty.hidden = matches !== 0;
    }
    input.addEventListener("input", function (event) {
      apply(event.target.value || "");
    });
    apply("");
  }

  function modernizeTable(table) {
    if (!table) {
      return;
    }
    table.classList.add("ns-modernized-table");
    var headers = [];
    var thead = table.querySelector("thead");
    if (thead) {
      headers = Array.prototype.map.call(thead.querySelectorAll("th, td"), function (cell) {
        return (cell.textContent || "").trim();
      });
    } else {
      var firstRow = table.querySelector("tr");
      if (firstRow) {
        headers = Array.prototype.map.call(firstRow.querySelectorAll("th, td"), function (cell) {
          return (cell.textContent || "").trim();
        });
      }
    }
    Array.prototype.forEach.call(table.querySelectorAll("tbody tr"), function (row) {
      row.setAttribute("role", "row");
      if (!row.hasAttribute("tabindex")) {
        row.setAttribute("tabindex", "0");
      }
      var cells = row.querySelectorAll("td");
      Array.prototype.forEach.call(cells, function (cell, index) {
        if (!cell.hasAttribute("data-label") && headers[index]) {
          cell.setAttribute("data-label", headers[index]);
        }
      });
      if (!row.getAttribute("aria-label")) {
        var summary = cells[0] ? (cells[0].textContent || "").trim() : "Row";
        row.setAttribute("aria-label", summary);
      }
    });
  }

  function setupTables() {
    var tables = document.querySelectorAll("#calls_table, #calls_table_meetings");
    if (!tables.length) {
      return;
    }
    Array.prototype.forEach.call(tables, function (table) {
      modernizeTable(table);
      if (!table.dataset.nsModernTableObserver) {
        var observer = new MutationObserver(function () {
          modernizeTable(table);
        });
        observer.observe(table, { childList: true, subtree: true });
        table.dataset.nsModernTableObserver = "true";
      }
    });
    if (!window.__nsModernTableObserver) {
      window.__nsModernTableObserver = new MutationObserver(function (records) {
        var refresh = records.some(function (record) {
          return Array.prototype.some.call(record.addedNodes || [], function (node) {
            return node.nodeType === 1 && ((node.matches && node.matches("#calls_table, #calls_table_meetings")) || (node.querySelector && node.querySelector("#calls_table, #calls_table_meetings")));
          });
        });
        if (refresh) {
          setupTables();
        }
      });
      window.__nsModernTableObserver.observe(document.body, { childList: true, subtree: true });
    }
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
      drawer.setAttribute("aria-labelledby", "ns-drawer-title");
      drawer.setAttribute("tabindex", "-1");
      var header = document.createElement("div");
      header.className = "ns-drawer__header";
      var title = document.createElement("h2");
      title.className = "ns-drawer__title";
      title.id = "ns-drawer-title";
      title.textContent = "Billing Overview";
      var close = document.createElement("button");
      close.type = "button";
      close.className = "ns-drawer__close";
      close.setAttribute("aria-label", "Close billing drawer");
      close.innerHTML = "&times;";
      header.appendChild(title);
      header.appendChild(close);
      var body = document.createElement("div");
      body.className = "ns-drawer__body";
      body.innerHTML = '<p class="ns-muted">This is a placeholder for billing metrics, upcoming invoices, and payment methods. Integrate with your billing provider to surface real data.</p><ul class="ns-stack"><li><strong>Current balance:</strong> $0.00 (demo)</li><li><strong>Next invoice:</strong> May 31</li><li><strong>Last payment:</strong> Apr 30 via ACH</li></ul>';
      drawer.appendChild(header);
      drawer.appendChild(body);
      document.body.appendChild(drawer);
    }
    return { overlay: overlay, drawer: drawer };
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

  function setupBillingDrawer() {
    var parts = ensureDrawer();
    var overlay = parts.overlay;
    var drawer = parts.drawer;
    var trigger = document.querySelector('[data-ns-modern-billing="trigger"]');
    if (!overlay || !drawer || !trigger) {
      return;
    }
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
      document.body.classList.add("ns-modern-drawer-open");
      trigger.setAttribute("aria-expanded", "true");
      setTimeout(function () {
        var focusTarget = drawer.querySelector('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        (focusTarget || drawer).focus();
      }, 24);
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
      document.body.classList.remove("ns-modern-drawer-open");
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
    drawer.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "Tab") {
        trapFocus(drawer, event);
      }
    });
    var closeBtn = drawer.querySelector(".ns-drawer__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", close);
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.open) {
        close();
      }
    });
  }

  onReady(function () {
    if (!document.body) {
      return;
    }
    ensureSprite();
    enhanceNavigation();
    applyIcons();
    var container = document.querySelector(".content-wrapper") || document.querySelector(".page-content") || document.querySelector("main") || document.querySelector("#content") || document.querySelector(".container-fluid") || document.body;
    setupQuickActions(container);
    setupSearch(container);
    setupTables();
    setupBillingDrawer();
  });
}(window, document));
