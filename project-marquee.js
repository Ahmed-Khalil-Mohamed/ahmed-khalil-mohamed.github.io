(() => {
  const marquee = document.querySelector('.project-marquee');
  const toggle = document.querySelector('.marquee-toggle');
  if (!marquee || !toggle) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = !('IntersectionObserver' in window);

  marquee.querySelectorAll('.marquee-track').forEach(track => {
    const original = track.querySelector('.marquee-group');
    const copy = original.cloneNode(true);
    copy.classList.add('marquee-copy');
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    copy.querySelectorAll('button').forEach((button, index) => {
      button.tabIndex = -1;
      button.removeAttribute('aria-labelledby');
      button.removeAttribute('aria-describedby');
      // Reuse the real trigger so the dialog returns focus to an accessible card.
      button.addEventListener('click', () => original.querySelectorAll('button')[index].click());
    });
    track.append(copy);
  });

  function sync() {
    marquee.classList.toggle('is-running', visible && !document.hidden && !paused && !reducedMotion.matches);
    marquee.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    const label = toggle.querySelector('span');
    label.dataset.en = paused ? 'Resume motion' : 'Pause motion';
    label.dataset.ar = paused ? 'تشغيل الحركة' : 'إيقاف الحركة';
    label.textContent = label.dataset[document.documentElement.lang === 'ar' ? 'ar' : 'en'];
    toggle.querySelector('use').setAttribute('href', `icons.svg?v=11#${paused ? 'play' : 'pause'}`);
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  marquee.addEventListener('focusin', event => {
    if (!event.target.matches('button:focus-visible')) return;
    requestAnimationFrame(() => event.target.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'}));
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, {threshold: 0}).observe(marquee);
  }
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  new MutationObserver(sync).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  marquee.classList.add('is-ready');
  toggle.hidden = false;
  sync();
})();
