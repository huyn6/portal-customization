(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function createSupportButton(navList) {
    var existing = navList.querySelector('a[href="https://support.example.com"], a[href="https://support.example.com/"]');
    if (existing) {
      return;
    }

    var listItem = document.createElement('li');
    listItem.className = (listItem.className ? listItem.className + ' ' : '') + 'support-button';

    var link = document.createElement('a');
    link.href = 'https://support.example.com';
    link.textContent = 'Support';
    link.className = (link.className ? link.className + ' ' : '') + 'support-button-link support-button';
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    listItem.appendChild(link);

    if (navList.tagName && navList.tagName.toLowerCase() === 'ul') {
      navList.appendChild(listItem);
    } else {
      navList.appendChild(link);
    }
  }

  ready(function () {
    var navList = document.querySelector('.navbar-nav') ||
      document.querySelector('.nav.navbar-nav') ||
      document.querySelector('.navbar .nav') ||
      document.querySelector('#ns-topbar .nav') ||
      document.querySelector('.top-nav .nav') ||
      document.querySelector('.nav');

    if (!navList) {
      return;
    }

    createSupportButton(navList);
  });
})();
