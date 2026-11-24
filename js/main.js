// Cargoland Energy — site scripts
(function () {
  // mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.querySelector('nav.main');
  if (btn && nav) btn.addEventListener('click', function () { nav.classList.toggle('open'); });

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // photo slots: use /images/<name>.jpg when present, otherwise branded fallback
  document.querySelectorAll('[data-photo]').forEach(function (el) {
    var src = el.getAttribute('data-photo');
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + src + "')"; el.classList.remove('fallback'); };
    img.onerror = function () {
      var illus = el.getAttribute('data-illus');
      if (illus) {
        el.style.backgroundImage = "url('" + illus + "')";
        el.classList.add(illus.indexOf('brand-panel') > -1 ? 'illus-tall' : 'illus');
      }
      else el.classList.add('fallback');
    };
    img.src = src;
  });

  // forms: open the visitor's email app with the message filled in
  // (replace with a form service such as Formspree once hosting is set up — see README)
  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var to = form.getAttribute('data-mailto');
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var lines = [];
      Array.prototype.forEach.call(form.elements, function (f) {
        if (f.name && f.value) lines.push(f.getAttribute('data-label') + ': ' + f.value);
      });
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Your email app should now open with your message. If it does not, email us at ' + to + '.';
    });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
