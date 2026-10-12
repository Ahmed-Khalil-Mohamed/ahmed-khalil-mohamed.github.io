const root = document.documentElement;
let language = 'en';
const languageButton = document.querySelector('#language');
const dialog = document.querySelector('#project-dialog');
const projects = {
  clear: {
    name: 'Clear Tool', icon: 'clear-icon.png', url: 'https://github.com/Ahmed-Khalil-Mohamed/clear-tool',
    en: {description: 'A bilingual Windows desktop application for understanding your PC and handling everyday maintenance in one organized workspace.', items: ['Inspect hardware and live performance readings.', 'Review cache space before deciding what to clean.', 'Organize games and check software updates.', 'Switch between Arabic and English, and light and dark themes.'], license: 'Open-source project. MIT-licensed code.', link: 'View source'},
    ar: {description: 'تطبيق Windows بالعربية والإنجليزية لفهم مكونات جهازك وتنظيم مهام الصيانة اليومية في مكان واحد.', items: ['عرض مكونات الجهاز وقراءات الأداء المباشرة.', 'مراجعة مساحة الكاش قبل اتخاذ قرار التنظيف.', 'تنظيم الألعاب ومراجعة تحديثات البرامج.', 'واجهة عربية وإنجليزية ومظهر فاتح وداكن.'], license: 'مشروع مفتوح المصدر. الكود مرخص برخصة MIT.', link: 'شوف الكود'}
  },
  nexus: {
    name: 'NEXUS', icon: 'nexus-icon.png', url: 'https://github.com/Ahmed-Khalil-Mohamed/NEXUS',
    en: {description: 'A Windows workspace that brings supported AI providers, conversations, project context, and specialist roles together.', items: ['Connect supported tools including Codex CLI, Claude Code CLI, Ollama, and LM Studio.', 'Coordinate specialist assignments through the Mix workflow.', 'Work with 300 editable role definitions, powered by your selected providers.', 'Review generated changes before applying them to local files.'], license: 'Proprietary application. The public repository provides documentation, screenshots, and downloads.', link: 'Project & docs'},
    ar: {description: 'مساحة عمل على Windows تجمع أدوات الذكاء الاصطناعي المدعومة والمحادثات وسياق المشاريع والأدوار المتخصصة.', items: ['ربط أدوات مدعومة منها Codex CLI وClaude Code CLI وOllama وLM Studio.', 'تنسيق مهام المتخصصين عبر سير عمل Mix.', '300 تعريف دور قابل للتعديل، تعمل من خلال مزودي الذكاء الاصطناعي المختارين.', 'مراجعة التعديلات المقترحة قبل تطبيقها على الملفات.'], license: 'تطبيق مغلق المصدر. المستودع العام يحتوي على التوثيق والصور والتنزيلات.', link: 'المشروع والتوثيق'}
  }
};
function setLanguage(next) {
  language = next;
  root.lang = next;
  root.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach(element => element.textContent = element.dataset[next]);
  languageButton.textContent = next === 'en' ? 'عربي' : 'EN';
  languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
  document.querySelector('nav').setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'التنقل الرئيسي');
  document.querySelector('.close-dialog').setAttribute('aria-label', next === 'en' ? 'Close project details' : 'إغلاق تفاصيل المشروع');
  document.querySelectorAll('.project-image').forEach(button => button.setAttribute('aria-label', next === 'en' ? `Explore ${projects[button.dataset.project].name} project` : `تفاصيل مشروع ${projects[button.dataset.project].name}`));
  try { localStorage.setItem('portfolio-language', next); } catch {}
}
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
try { if (localStorage.getItem('portfolio-language') === 'ar') setLanguage('ar'); } catch {}
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  const copy = project[language];
  // Only fixed, authored project data is inserted here; no remote or user-supplied HTML.
  document.querySelector('#dialog-content').innerHTML = `<img class="dialog-icon" src="${project.icon}" alt=""><h2 id="dialog-title">${project.name}</h2><p>${copy.description}</p><ul>${copy.items.map(item => `<li>${item}</li>`).join('')}</ul><p class="license">${copy.license}</p><div class="dialog-actions"><a class="button primary" href="${project.url}" target="_blank" rel="noopener">${copy.link} <span class="icon-circle" aria-hidden="true"><svg class="icon" aria-hidden="true"><use href="icons.svg#arrow-up-right"></use></svg></span></a><a class="text-link" href="${project.url}/releases/latest" target="_blank" rel="noopener">${language === 'en' ? 'Windows downloads' : 'تنزيلات Windows'} <span class="icon-circle" aria-hidden="true"><svg class="icon" aria-hidden="true"><use href="icons.svg#arrow-up-right"></use></svg></span></a></div>`;
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
if ('IntersectionObserver' in window) {
  root.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  const navigation = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { document.querySelectorAll('nav a').forEach(link => { if(link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }), {rootMargin:'-15% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => navigation.observe(section));
}
