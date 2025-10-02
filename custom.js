(function (window, document) {
  "use strict";

  var ns = window.__nsModern = window.__nsModern || {};
  ns.active = true;
  if (!Array.isArray(ns.log)) {
    ns.log = [];
  }

  var LOGO_LIGHT_URL = "https://examplecdn.com/brand/logo-light.svg";
  var LOGO_DARK_URL = "https://examplecdn.com/brand/logo-dark.svg";
  var SPRITE_ID = "ns-modern-sprite";
  var TOAST_DURATION = 3600;
  var REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      var context = this;
      var args = arguments;
      if (remaining <= 0 || remaining > wait) {
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

    var wrapper = document.createElement("div");
    wrapper.style.display = "none";
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.innerHTML = [
      '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" id="' + SPRITE_ID + '">',
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

    document.body.insertBefore(wrapper, document.body.firstChild);
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
    if (!link) {
      return;
    }

    if (link.dataset.nsModernIcon === id) {
      return;
    }
    link.dataset.nsModernIcon = id;

    var oldIcons = link.querySelectorAll("i, span[class*='icon'], span[class*='fa-'], svg.ns-icon");
    Array.prototype.forEach.call(oldIcons, function (node) {
      node.parentNode && node.parentNode.removeChild(node);
    });

    var svg = iconElement(id);
    link.insertBefore(svg, link.firstChild);

    var text = (link.textContent || "").trim();
    if (!text) {
      var readable = id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ");
      text = readable.charAt(0).toUpperCase() + readable.slice(1);
    }
    if (!link.getAttribute("aria-label")) {
      link.setAttribute("aria-label", text);
    }
    if (!link.getAttribute("title")) {
      link.setAttribute("title", text);
    }
  }

  function enhanceNavigation() {
    var topBar = document.querySelector(".navigation-subbar") ||
      document.querySelector("#ns-topbar") ||
      document.querySelector(".header-bar") ||
      document.querySelector(".navbar");

    if (!topBar) {
      return;
    }

    topBar.classList.add("is-modernized");

    if (!topBar.dataset.nsModernScrollListener) {
      var onScroll = throttle(function () {
        var scrolled = window.scrollY > 12;
        topBar.classList.toggle("is-scrolled", scrolled);
      }, 120);
      window.addEventListener("scroll", onScroll, { passive: true });
      topBar.dataset.nsModernScrollListener = "true";
      onScroll();
    }

    if (!topBar.querySelector(".ns-modern-topbar-brand")) {
      var brand = document.createElement("div");
      brand.className = "ns-modern-topbar-brand";
      var picture = document.createElement("picture");
      var darkSource = document.createElement("source");
      darkSource.media = "(prefers-color-scheme: dark)";
      darkSource.srcset = LOGO_DARK_URL;
      var lightImg = document.createElement("img");
      lightImg.className = "ns-modern-logo";
      lightImg.src = LOGO_LIGHT_URL;
      lightImg.alt = "NetSapiens Manager";
      lightImg.decoding = "async";
      lightImg.loading = "lazy";
      picture.appendChild(darkSource);
      picture.appendChild(lightImg);
      brand.appendChild(picture);
      topBar.insertBefore(brand, topBar.firstChild);
    }

    if (!topBar.querySelector(".ns-modern-header-actions")) {
      var actions = document.createElement("div");
      actions.className = "ns-modern-header-actions";
      topBar.appendChild(actions);
    }

    var actionsHost = topBar.querySelector(".ns-modern-header-actions");
    if (actionsHost && !actionsHost.querySelector("[data-ns-modern-billing]")) {
      var billingBtn = document.createElement("button");
      billingBtn.type = "button";
      billingBtn.className = "ns-modern-header-button";
      billingBtn.setAttribute("data-ns-modern-billing", "trigger");
      billingBtn.setAttribute("aria-haspopup", "dialog");
      billingBtn.setAttribute("aria-expanded", "false");
      billingBtn.innerHTML = '<span>Billing</span>';
      actionsHost.appendChild(billingBtn);
    }
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
      var symbol = map[selector];
      var node = document.querySelector(selector);
      if (!node) {
        return;
      }
      ensureIcon(node, symbol);
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

  function logEvent(entry) {
    try {
      var record = { timestamp: Date.now() };
      if (entry && typeof entry === "object") {
        for (var key in entry) {
          if (Object.prototype.hasOwnProperty.call(entry, key)) {
            record[key] = entry[key];
          }
        }
      }
      ns.log.push(record);
      if (ns.log.length > 50) {
        ns.log.splice(0, ns.log.length - 50);
      }
    } catch (err) {
      if (window.console && window.console.warn) {
        window.console.warn("__nsModern log error", err);
      }
    }
  }

  function showToast(message) {
    var stack = ensureToastStack();
    var toast = document.createElement("div");
    toast.className = "ns-toast";
    toast.setAttribute("role", "status");
    toast.dataset.state = "enter";
    toast.textContent = message;
    stack.appendChild(toast);

    if (REDUCED_MOTION) {
      toast.dataset.state = "";
    }

    var duration = REDUCED_MOTION ? 0 : TOAST_DURATION;
    if (duration) {
      setTimeout(function () {
        toast.dataset.state = "leave";
      }, duration - 400);
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, duration);
    } else {
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 1200);
    }
  }

  function enhanceCards() {
    var selectors = [".panel", ".box", ".card", ".tile", ".dashboard-card", ".portlet"];
    var cards = [];
    selectors.forEach(function (selector) {
      var found = document.querySelectorAll(selector);
      Array.prototype.forEach.call(found, function (card) {
        var text = (card.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        card.dataset.nsModernSearch = text;
        if (card.dataset && card.dataset.nsModernCard === "true") {
          if (!card.dataset.nsModernDisplay) {
            card.dataset.nsModernDisplay = card.style.display || "";
          }
          cards.push(card);
          return;
        }
        card.dataset.nsModernCard = "true";
        card.classList.add("ns-modern-card");
        if (!card.dataset.nsModernDisplay) {
          card.dataset.nsModernDisplay = card.style.display || "";
        }
        cards.push(card);
      });
    });
    return cards;
  }

  function ensureEmptyState(container) {
    var empty = container.querySelector(".ns-empty-state");
    if (!empty) {
      empty = document.createElement("div");
      empty.className = "ns-empty-state";
      empty.textContent = "No matching results. Try a different search.";
      empty.setAttribute("aria-live", "polite");
      empty.hidden = true;
      container.appendChild(empty);
    }
    return empty;
  }

  function setupSearch(container) {
    if (!container || container.querySelector(".ns-global-search")) {
      return;
    }

    var cards = enhanceCards();
    var wrapper = document.createElement("div");
    wrapper.className = "ns-global-search";

    var label = document.createElement("label");
    label.setAttribute("for", "ns-global-search-input");
    label.textContent = "Global search";

    var input = document.createElement("input");
    input.type = "search";
    input.id = "ns-global-search-input";
    input.placeholder = "Search cards and tables";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("aria-describedby", "ns-global-search-help");

    var helper = document.createElement("small");
    helper.id = "ns-global-search-help";
    helper.className = "ns-muted";
    helper.textContent = "Type to filter visible cards instantly.";

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(helper);

    container.insertBefore(wrapper, container.firstChild);

    var emptyState = ensureEmptyState(container);

    function updateMatches(value) {
      var matches = 0;
      var query = value.trim().toLowerCase();
      cards = enhanceCards();
      cards.forEach(function (card) {
        if (!card.dataset.nsModernDisplay) {
          card.dataset.nsModernDisplay = card.style.display || "";
        }
        var haystack = card.dataset.nsModernSearch || (card.textContent || "").toLowerCase();
        var visible = !query || haystack.indexOf(query) !== -1;
        card.style.display = visible ? card.dataset.nsModernDisplay : "none";
        card.setAttribute("aria-hidden", visible ? "false" : "true");
        if (visible) {
          matches += 1;
        }
      });
      emptyState.hidden = matches !== 0;
    }

    input.addEventListener("input", function (event) {
      updateMatches(event.target.value || "");
    });

    updateMatches("");
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
      var span = document.createElement("span");
      span.textContent = action.label;
      btn.appendChild(span);
      btn.addEventListener("click", function () {
        var message = "Pretend we " + action.label.toLowerCase() + ".";
        showToast(message);
        logEvent({ type: "quick-action", action: action.label });
      });
      wrap.appendChild(btn);
    });

    container.insertBefore(wrap, container.firstChild);
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
      drawer.setAttribute("aria-hidden", "true");

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
      body.innerHTML = "<p class=\"ns-muted\">This is a placeholder for billing metrics, upcoming invoices, and payment methods. Integrate with your billing provider to surface real data.</p><ul class=\"ns-stack\"><li><strong>Current balance:</strong> $0.00 (demo)</li><li><strong>Next invoice:</strong> May 31</li><li><strong>Last payment:</strong> Apr 30 via ACH</li></ul>";

      drawer.appendChild(header);
      drawer.appendChild(body);
      document.body.appendChild(drawer);
    }

    return { overlay: overlay, drawer: drawer };
  }

  function trapFocus(container, event) {
    var focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
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
    if (!drawer || !overlay || !trigger) {
      return;
    }

    var state = { open: false, lastFocus: null };
    ns.drawerState = state;

    function openDrawer() {
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
      logEvent({ type: "drawer", action: "open" });
      setTimeout(function () {
        var focusable = drawer.querySelector(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (focusable || drawer).focus();
      }, 20);
    }

    function closeDrawer() {
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
      logEvent({ type: "drawer", action: "close" });
      if (state.lastFocus && typeof state.lastFocus.focus === "function") {
        state.lastFocus.focus();
      }
    }
    state.close = closeDrawer;
    state.openDrawer = openDrawer;

    if (!trigger.dataset.nsModernDrawerBound) {
      trigger.addEventListener("click", function () {
        if (state.open) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
      trigger.dataset.nsModernDrawerBound = "true";
    }

    if (!overlay.dataset.nsModernDrawerBound) {
      overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
          closeDrawer();
        }
      });
      overlay.dataset.nsModernDrawerBound = "true";
    }

    if (!drawer.dataset.nsModernDrawerBound) {
      drawer.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeDrawer();
        } else if (event.key === "Tab") {
          trapFocus(drawer, event);
        }
      });
      var closeBtn = drawer.querySelector(".ns-drawer__close");
      if (closeBtn && !closeBtn.dataset.nsModernDrawerBound) {
        closeBtn.addEventListener("click", function () {
          closeDrawer();
        });
        closeBtn.dataset.nsModernDrawerBound = "true";
      }
      drawer.dataset.nsModernDrawerBound = "true";
    }

    if (!ns._drawerKeyListener) {
      ns._drawerKeyListener = function (event) {
        if (event.key === "Escape" && ns.drawerState && ns.drawerState.open) {
          ns.drawerState.close();
        }
      };
      document.addEventListener("keydown", ns._drawerKeyListener);
    }
  }

  onReady(function () {
    if (!document.body) {
      return;
    }

    ensureSprite();
    enhanceNavigation();
    applyIcons();

    var content = document.querySelector(".content-wrapper") ||
      document.querySelector(".page-content") ||
      document.querySelector("main") ||
      document.querySelector("#content") ||
      document.querySelector(".container-fluid") ||
      document.body;

    setupQuickActions(content);
    setupSearch(content);
    setupBillingDrawer();
  });
}(window, document));
