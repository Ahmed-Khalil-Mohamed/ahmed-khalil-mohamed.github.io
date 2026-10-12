(() => {
  const selector = '.button,.icon-button,.text-link,.work-visit,.work-details,.drawer-language,.project-image,.gallery-dot,.intro-skip,.desktop-nav a,.mobile-nav a,.footer a';
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let pending;
  window.setupGlassControls = (scope = document) => scope.querySelectorAll(selector).forEach(el => el.classList.add('glass-control'));
  window.setupGlassControls();
  // Event delegation also covers gallery controls created after page load.
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
    const target = event.target.closest('.glass-control');
    if (!target) return;
    pending = {target, x:event.clientX, y:event.clientY};
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const {target, x, y} = pending;
      if (!target.isConnected) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--shine-x', `${x - rect.left}px`);
      target.style.setProperty('--shine-y', `${y - rect.top}px`);
    });
  }, {passive:true});
})();
