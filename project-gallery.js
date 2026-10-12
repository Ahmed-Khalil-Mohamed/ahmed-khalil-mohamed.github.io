function setupProjectGallery({ dialog, projects, getLanguage }) {
  const content = dialog.querySelector('#dialog-content');
  const closeButton = dialog.querySelector('.close-dialog');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="icons.svg?v=8#${name}"></use></svg>`;
  let current = null;
  let timer = null;
  let opener = null;

  function stopTimer() { clearInterval(timer); timer = null; }
  function syncPlayback() {
    stopTimer();
    if (!current) return;
    const play = content.querySelector('.gallery-play');
    if (play) {
      play.setAttribute('aria-label', current.paused ? current.labels.play : current.labels.pause);
      play.innerHTML = icon(current.paused ? 'play' : 'pause');
    }
    if (dialog.open && current.images.length > 1 && !current.paused && !current.hovered && !document.hidden && !reducedMotion.matches) {
      timer = setInterval(() => showSlide(current.index + 1, false), 5000);
    }
  }
  function showSlide(index, manual = true) {
    if (!current) return;
    current.index = (index + current.images.length) % current.images.length;
    if (manual) current.paused = true;
    const image = current.images[current.index];
    content.querySelectorAll('.gallery-slide').forEach((slide, i) => {
      const active = i === current.index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    content.querySelectorAll('.gallery-dot').forEach((dot, i) => dot.setAttribute('aria-current', String(i === current.index)));
    content.querySelector('.gallery-caption').textContent = image[current.language];
    content.querySelector('.gallery-count').textContent = `${String(current.index + 1).padStart(2, '0')} / ${String(current.images.length).padStart(2, '0')}`;
    if (manual) content.querySelector('.gallery-announcement').textContent = `${image[current.language]}, ${current.index + 1} / ${current.images.length}`;
    syncPlayback();
  }
  function openProject(key, trigger) {
    const project = projects[key];
    if (!project) return;
    stopTimer();
    const language = getLanguage();
    const ar = language === 'ar';
    const copy = project[language];
    const labels = ar ? {
      gallery:'صور المشروع', previous:'الصورة السابقة', next:'الصورة التالية', play:'تشغيل عرض الصور', pause:'إيقاف عرض الصور',
      features:'ماذا يقدم المشروع؟', stack:'التقنيات والأدوات', overview:'عن المشروع', screenshot:'عرض الصورة', demo:'لقطات من الواجهة الفعلية', download:'تنزيلات Windows'
    } : {
      gallery:'Project screenshots', previous:'Previous image', next:'Next image', play:'Play slideshow', pause:'Pause slideshow',
      features:'What it does', stack:'Tools & technologies', overview:'About the project', screenshot:'Show image', demo:'Actual interface screenshots', download:'Windows downloads'
    };
    current = { images:project.images, language, labels, index:0, paused:reducedMotion.matches, hovered:false };
    opener = trigger;
    const images = project.images;
    // Project content is authored locally; escape every text/attribute before rendering.
    content.innerHTML = `<div class="project-layout">
      <section class="project-gallery" aria-label="${labels.gallery}" dir="ltr">
        <div class="gallery-stage" role="group" aria-label="${labels.gallery}" tabindex="0">
          ${images.map((image,i) => `<figure class="gallery-slide ${i === 0 ? 'is-active' : ''}" aria-hidden="${i !== 0}"><img src="${escape(image.src)}" alt="${escape(project.name + ': ' + image[language])}" decoding="async"><span class="image-loading" aria-hidden="true">${window.signatureMark()}<span class="image-load-error">${ar ? 'الصورة غير متاحة' : 'Image unavailable'}</span></span></figure>`).join('')}
        </div>
        <div class="gallery-meta"><span class="gallery-caption" dir="${ar ? 'rtl' : 'ltr'}">${escape(images[0][language])}</span><span class="gallery-count">01 / ${String(images.length).padStart(2,'0')}</span></div>
        ${images.length > 1 ? `<div class="gallery-controls"><button class="gallery-previous icon-button" aria-label="${labels.previous}">${icon('caret-left')}</button><div class="gallery-dots">${images.map((image,i) => `<button class="gallery-dot" data-slide="${i}" aria-current="${i === 0}" aria-label="${labels.screenshot} ${i+1}: ${escape(image[language])}"><span></span></button>`).join('')}</div><button class="gallery-next icon-button" aria-label="${labels.next}">${icon('caret-right')}</button><button class="gallery-play icon-button" aria-label="${labels.pause}">${icon('pause')}</button></div>` : ''}
        <p class="gallery-note" dir="${ar ? 'rtl' : 'ltr'}">${labels.demo}</p><span class="gallery-announcement sr-only" role="status" aria-live="polite"></span>
      </section>
      <section class="project-copy" dir="${ar ? 'rtl' : 'ltr'}" aria-labelledby="dialog-title">
        <div class="project-identity">${project.icon ? `<img src="${escape(project.icon)}" width="40" height="40" alt="">` : ''}<span>${escape(project.category[language])}</span></div>
        <h2 id="dialog-title" dir="ltr">${escape(project.name)}</h2><p class="project-platform">${escape(project.platform[language])}</p>
        <section class="project-copy-section"><h3>${labels.overview}</h3><p>${escape(copy.description)}</p></section>
        <section class="project-copy-section"><h3>${labels.features}</h3><ul>${copy.items.map(item => `<li>${escape(item)}</li>`).join('')}</ul></section>
        <section class="project-copy-section"><h3>${labels.stack}</h3><div class="project-stack">${project.stack.map(item => `<span dir="ltr">${escape(item)}</span>`).join('')}</div></section>
        <p class="project-license">${escape(copy.license)}</p>
        <div class="project-modal-actions"><a class="button primary" href="${escape(project.url)}" target="_blank" rel="noopener">${escape(copy.link)}<span class="icon-circle">${icon('arrow-up-right')}</span></a>${project.downloads ? `<a class="text-link" href="${escape(project.url)}/releases/latest" target="_blank" rel="noopener">${labels.download}${icon('arrow-up-right')}</a>` : ''}</div>
      </section>
    </div>`;
    content.querySelectorAll('.gallery-slide').forEach(slide => {
      const img = slide.querySelector('img');
      const settle = () => {
        if (!img.complete) return;
        slide.classList.toggle('image-ready', img.naturalWidth > 0);
        slide.classList.toggle('image-failed', img.naturalWidth === 0);
      };
      img.addEventListener('load', settle, {once:true});
      img.addEventListener('error', settle, {once:true});
      settle();
    });
    const gallery = content.querySelector('.project-gallery');
    gallery.addEventListener('pointerenter', () => { if (!current) return; current.hovered = true; syncPlayback(); });
    gallery.addEventListener('pointerleave', () => { if (!current) return; current.hovered = false; syncPlayback(); });
    gallery.addEventListener('focusin', event => {
      if (!current || event.target.closest('.gallery-play')) return;
      current.paused = true;
      syncPlayback();
    });
    gallery.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current.index + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    content.querySelector('.gallery-previous')?.addEventListener('click', () => showSlide(current.index - 1));
    content.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(current.index + 1));
    content.querySelectorAll('.gallery-dot').forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide))));
    content.querySelector('.gallery-play')?.addEventListener('click', () => { current.paused = !current.paused; syncPlayback(); });
    window.setupGlassControls?.(content);
    dialog.showModal();
    content.scrollTop = 0;
    closeButton.focus({preventScroll:true});
    syncPlayback();
  }

  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
  document.querySelectorAll('.work-card').forEach(card => card.addEventListener('click', event => {
    if (event.target.closest('a,button')) return;
    const trigger = card.querySelector('[data-project]');
    openProject(trigger.dataset.project, trigger);
  }));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { stopTimer(); current = null; content.innerHTML = ''; opener?.focus({preventScroll:true}); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button,a[href],[tabindex="0"]')];
    const first = controls[0], last = controls[controls.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => { if (current && reducedMotion.matches) current.paused = true; syncPlayback(); });
}
