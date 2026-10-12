(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let started = false;
  let exitTimer;
  const textSelector = '.portrait figcaption strong, .hero-copy .eyebrow, #hero-title > span, .hero-description > *, .section-heading h2, .section-heading p, .work-category, .work-card h3, .work-summary, .more-work h3, .more-work-heading > p, .about-title h2 > span, .about-title .eyebrow, .about-content > p, .skill-group h3, .skill-group p, .contact h2, .contact-bottom p';

  function prepareText() {
    document.querySelectorAll(textSelector).forEach(element => {
      if (element.querySelector('.writing-word')) return;
      const text = element.textContent;
      const words = text.trim().split(/\s+/);
      const fragment = document.createDocumentFragment();
      const accessibleText = document.createElement('span');
      accessibleText.className = 'sr-only';
      accessibleText.textContent = text;
      fragment.append(accessibleText);
      words.forEach((word, i) => {
        const span = document.createElement('span');
        span.className = 'writing-word';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = word;
        span.style.setProperty('--word-delay', `${Math.min(i * 38, 720)}ms`);
        fragment.append(span);
        if (i < words.length - 1) fragment.append(document.createTextNode(' '));
      });
      element.replaceChildren(fragment);
      element.classList.add('writing');
      if (started) observer?.observe(element);
    });
  }
  function revealAll() {
    observer?.disconnect();
    document.querySelectorAll('.writing, .reveal, [data-ink-signature]').forEach(el => el.classList.add('visible', 'ink-written'));
  }
  function startContent() {
    if (started) return;
    started = true;
    root.classList.add('content-ready');
    if (reduce.matches || !('IntersectionObserver' in window)) { revealAll(); return; }
    root.classList.add('js-motion', 'writing-motion');
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible', 'ink-written');
      observer.unobserve(entry.target);
    }), {threshold: .12});
    document.querySelectorAll('.reveal, .writing, [data-ink-signature]:not(.intro-signature)').forEach(el => observer.observe(el));
  }
  function finishIntro() {
    clearTimeout(window.portfolioIntroFallback);
    clearTimeout(exitTimer);
    root.classList.remove('intro-pending');
    document.querySelectorAll('[data-intro-inert]').forEach(el => { el.inert = false; el.removeAttribute('data-intro-inert'); });
    const intro = document.querySelector('#site-intro');
    if (intro?.contains(document.activeElement)) document.querySelector('.brand').focus({preventScroll:true});
    if (intro) { intro.inert = true; intro.setAttribute('aria-hidden', 'true'); }
    startContent();
  }
  window.portfolioMotion = {refreshText: () => { if (started && !reduce.matches) prepareText(); }};
  document.addEventListener('portfolio:intro-ready', finishIntro);
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.brand.signature, .drawer-brand, .portrait-signature').forEach(el => {
      el.setAttribute('data-ink-signature', '');
      if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', 'AK');
    });
    document.querySelectorAll('[data-ink-signature]').forEach(el => el.innerHTML = window.signatureMark());
    // This also covers lazy primary previews; only actual pending images get a loader.
    document.querySelectorAll('.work-preview, .portrait-frame').forEach(frame => {
      const img = frame.querySelector('img');
      const loader = document.createElement('span');
      loader.className = 'image-loading';
      loader.setAttribute('aria-hidden', 'true');
      loader.innerHTML = window.signatureMark();
      frame.append(loader);
      const settle = () => { if (img.complete) loader.remove(); };
      img.addEventListener('load', settle, {once:true});
      img.addEventListener('error', settle, {once:true});
      settle();
    });
    prepareText();
    document.querySelector('.intro-skip').addEventListener('click', finishIntro);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && root.classList.contains('intro-pending')) finishIntro();
    });
    if (!root.classList.contains('intro-pending') || reduce.matches) { finishIntro(); return; }
    document.querySelectorAll('body > header, body > main, body > footer, body > .skip-link').forEach(el => {
      el.inert = true;
      el.setAttribute('data-intro-inert', '');
    });
    // A short, bounded entrance. Never hold the page for network requests or lazy images.
    exitTimer = setTimeout(finishIntro, 2800);
  });
  reduce.addEventListener('change', () => { if (reduce.matches) { finishIntro(); revealAll(); } });
  window.addEventListener('pageshow', event => { if (event.persisted) finishIntro(); });
})();
