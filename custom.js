(function (window, document) {
  if (!window.__nsModern) {
    window.__nsModern = {};
  }
  window.__nsModern.active = true;
  if (typeof window.console !== 'undefined' && typeof window.console.log === 'function') {
    window.console.log('window.__nsModern.active = true');
  }

  var SUPPORT_ID = 'ns-modern-support-link';
  var SUPPORT_HREF = 'https://support.example.com';

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function findTopBar() {
    return document.querySelector('#ns-topbar') ||
      document.querySelector('.navbar.navbar-inverse') ||
      document.querySelector('.navbar.navbar-default') ||
      document.querySelector('.navbar') ||
      document.querySelector('.header-bar');
  }

  function findPrimaryNav(root) {
    if (!root) {
      return null;
    }
    return root.querySelector('ul.navbar-nav') ||
      root.querySelector('ul.nav') ||
      document.querySelector('#ns-topbar ul.navbar-nav') ||
      document.querySelector('.navbar-nav');
  }

  function ensureSupportLink(nav) {
    if (!nav) {
      return;
    }
    if (nav.querySelector('#' + SUPPORT_ID)) {
      return;
    }

    var listItem = document.createElement('li');
    listItem.className = 'ns-modern-support';
    listItem.setAttribute('data-ns-modern', 'support');

    var anchor = document.createElement('a');
    anchor.id = SUPPORT_ID;
    anchor.href = SUPPORT_HREF;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.textContent = 'Support';
    var templateLink = nav.querySelector('a, button');
    if (templateLink && templateLink.className) {
      anchor.className = templateLink.className;
    }
    anchor.classList.add('ns-modern-support-link', 'support-button-link');
    anchor.setAttribute('aria-label', 'Support');
    anchor.title = 'Support';

    listItem.appendChild(anchor);

    var navIsElement = typeof HTMLElement !== 'undefined' && nav instanceof HTMLElement;
    if (navIsElement && nav.tagName && nav.tagName.toLowerCase() === 'ul') {
      nav.appendChild(listItem);
    } else if (navIsElement && typeof nav.appendChild === 'function') {
      nav.appendChild(anchor);
    }
  }

  function deriveLabelFromClasses(element) {
    var iconElement = element.querySelector('[class*="fa-"]') ||
      element.querySelector('[class*="glyphicon-"]') ||
      element.querySelector('[class*="icon-"]') || element;

    if (!iconElement || !iconElement.className) {
      return '';
    }

    var classes = iconElement.className.split(/\s+/);
    for (var i = 0; i < classes.length; i += 1) {
      var cls = classes[i];
      if (!cls) {
        continue;
      }
      if (cls.indexOf('fa-') === 0 || cls.indexOf('glyphicon-') === 0 || cls.indexOf('icon-') === 0) {
        var token = cls.replace(/^fa-|^glyphicon-|^icon-/g, '').replace(/-/g, ' ');
        if (token) {
          return token.replace(/\b\w/g, function (match) { return match.toUpperCase(); });
        }
      }
    }
    return '';
  }

  function ensureIconAccessibility() {
    var containers = document.querySelectorAll('.navigation-subbar, #ns-topbar, .navbar');
    if (!containers.length) {
      return;
    }

    Array.prototype.forEach.call(containers, function (container) {
      var interactive = container.querySelectorAll('a, button, .btn');
      Array.prototype.forEach.call(interactive, function (el) {
        if (!(el instanceof HTMLElement)) {
          return;
        }
        var text = (el.textContent || '').trim();
        var aria = (el.getAttribute('aria-label') || '').trim();
        var title = (el.getAttribute('title') || '').trim();
        var label = text;

        if (!label) {
          label = aria || title || deriveLabelFromClasses(el);
        }

        if (label) {
          if (!aria) {
            el.setAttribute('aria-label', label);
          }
          if (!title) {
            el.setAttribute('title', label);
          }
        }
      });
    });
  }

  function throttle(fn, wait) {
    var lastTime = 0;
    var timeoutId;
    return function () {
      var context = this;
      var args = arguments;
      var now = Date.now();
      var remaining = wait - (now - lastTime);
      if (remaining <= 0 || remaining > wait) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastTime = now;
        fn.apply(context, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(function () {
          lastTime = Date.now();
          timeoutId = null;
          fn.apply(context, args);
        }, remaining);
      }
    };
  }

  function enableStickyTopbar(topBar) {
    if (!topBar) {
      return;
    }
    if (!topBar.classList.contains('ns-modern-topbar')) {
      topBar.classList.add('ns-modern-topbar');
    }

    var toggleClass = function () {
      var stuck = window.scrollY > 16;
      topBar.classList.toggle('ns-modern-topbar--stuck', stuck);
    };

    toggleClass();

    if (!window.__nsModern._scrollHandlerAttached) {
      window.addEventListener('scroll', throttle(toggleClass, 100), { passive: true });
      window.__nsModern._scrollHandlerAttached = true;
    }
  }

  window.__nsModern.helpers = window.__nsModern.helpers || {};
  window.__nsModern.helpers.ensureSupportLink = ensureSupportLink;
  window.__nsModern.helpers.ensureIconAccessibility = ensureIconAccessibility;
  window.__nsModern.helpers.enableStickyTopbar = enableStickyTopbar;

  onReady(function () {
    var topBar = findTopBar();
    enableStickyTopbar(topBar);
    ensureSupportLink(findPrimaryNav(topBar));
    ensureIconAccessibility();
  });
}(window, document));
