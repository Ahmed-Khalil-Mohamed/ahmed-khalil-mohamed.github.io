const root = document.documentElement;
let language = 'en';
const languageButtons = document.querySelectorAll('[data-language-toggle]');
const mobileMenu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.close-menu');
const dialog = document.querySelector('#project-dialog');
const projects = {
  ...additionalProjects,
  mimarx: {
    image: 'mimarx-academy.jpg', name: 'MIMARX Studio & Academy', url: 'https://www.mimarx-studio.com/academy',
    en: {description: 'Designed and developed the complete public website for MIMARX, connecting the architecture studio, academy workshops, project showcases, and enrollment journey.', items: ['Created responsive layouts with Arabic/English switching, RTL support, and light/dark themes.', 'Built interactive project galleries, workshop pages, and participant testimonial sections.', 'Implemented enrollment forms and a WhatsApp follow-up flow when the registration service is unavailable.', 'Built a Node.js publishing workflow with CSS bundling, content-based asset versioning, and local-link validation.'], license: 'Client commission · Full website design & development. Stack: HTML, CSS, vanilla JavaScript, and Node.js build tools.', link: 'Visit live website'},
    ar: {description: 'صممت وطورت الموقع العام بالكامل لـMIMARX، لربط الاستوديو المعماري وورش الأكاديمية وعرض الأعمال بخطوات التسجيل.', items: ['واجهات متجاوبة مع تبديل العربية والإنجليزية ودعم RTL والمظهر الفاتح والداكن.', 'معارض أعمال تفاعلية وصفحات للورش وأقسام لآراء المشاركين.', 'نماذج تسجيل مع تجهيز المتابعة عبر واتساب عند عدم توافر خدمة التسجيل.', 'أدوات بناء بـNode.js لتجميع CSS وتحديث إصدارات الأصول حسب محتواها وفحص الروابط المحلية.'], license: 'مشروع لعميل · تصميم وتطوير الموقع بالكامل. التقنيات: HTML وCSS وJavaScript وأدوات بناء Node.js.', link: 'زيارة الموقع المنشور'}
  },
  clear: {
    image: 'clear-tool.png', downloads: true, name: 'Clear Tool', icon: 'clear-icon.png', url: 'https://github.com/Ahmed-Khalil-Mohamed/clear-tool',
    en: {description: 'A bilingual Windows desktop application for understanding your PC and handling everyday maintenance in one organized workspace.', items: ['Inspect hardware and live performance readings.', 'Review cache space before deciding what to clean.', 'Organize games and check software updates.', 'Switch between Arabic and English, and light and dark themes.'], license: 'Open-source project. MIT-licensed code.', link: 'View source'},
    ar: {description: 'تطبيق Windows بالعربية والإنجليزية لفهم مكونات جهازك وتنظيم مهام الصيانة اليومية في مكان واحد.', items: ['عرض مكونات الجهاز وقراءات الأداء المباشرة.', 'مراجعة مساحة الكاش قبل اتخاذ قرار التنظيف.', 'تنظيم الألعاب ومراجعة تحديثات البرامج.', 'واجهة عربية وإنجليزية ومظهر فاتح وداكن.'], license: 'مشروع مفتوح المصدر. الكود مرخص برخصة MIT.', link: 'شوف الكود'}
  },
  nexus: {
    image: 'nexus.png', downloads: true, name: 'NEXUS', icon: 'nexus-icon.png', url: 'https://github.com/Ahmed-Khalil-Mohamed/NEXUS',
    en: {description: 'A Windows workspace that brings supported AI providers, conversations, project context, and specialist roles together.', items: ['Connect supported tools including Codex CLI, Claude Code CLI, Ollama, and LM Studio.', 'Coordinate specialist assignments through the Mix workflow.', 'Work with 300 editable role definitions, powered by your selected providers.', 'Review generated changes before applying them to local files.'], license: 'Proprietary application. The public repository provides documentation, screenshots, and downloads.', link: 'Project & docs'},
    ar: {description: 'مساحة عمل على Windows تجمع أدوات الذكاء الاصطناعي المدعومة والمحادثات وسياق المشاريع والأدوار المتخصصة.', items: ['ربط أدوات مدعومة منها Codex CLI وClaude Code CLI وOllama وLM Studio.', 'تنسيق مهام المتخصصين عبر سير عمل Mix.', '300 تعريف دور قابل للتعديل، تعمل من خلال مزودي الذكاء الاصطناعي المختارين.', 'مراجعة التعديلات المقترحة قبل تطبيقها على الملفات.'], license: 'تطبيق مغلق المصدر. المستودع العام يحتوي على التوثيق والصور والتنزيلات.', link: 'المشروع والتوثيق'}
  }
};
Object.entries(featuredGalleryDetails).forEach(([key, details]) => Object.assign(projects[key], details));
function setLanguage(next) {
  language = next;
  root.lang = next;
  root.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach(element => element.textContent = element.dataset[next]);
  languageButtons.forEach(button => {
    button.textContent = next === 'en' ? 'العربية' : 'English';
    button.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
  });
  menuToggle.setAttribute('aria-label', next === 'en' ? 'Open menu' : 'فتح القائمة');
  menuClose.setAttribute('aria-label', next === 'en' ? 'Close menu' : 'إغلاق القائمة');
  mobileMenu.setAttribute('aria-label', next === 'en' ? 'Navigation menu' : 'قائمة التنقل');
  document.querySelectorAll('nav').forEach(nav => nav.setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'التنقل الرئيسي'));
  document.querySelector('.close-dialog').setAttribute('aria-label', next === 'en' ? 'Close project details' : 'إغلاق تفاصيل المشروع');
  document.querySelectorAll('.project-image').forEach(button => button.setAttribute('aria-label', next === 'en' ? `Explore ${projects[button.dataset.project].name} project` : `تفاصيل مشروع ${projects[button.dataset.project].name}`));
  try { localStorage.setItem('portfolio-language', next); } catch {}
}
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en')));
menuToggle.addEventListener('click', () => { mobileMenu.showModal(); menuToggle.setAttribute('aria-expanded', 'true'); });
menuClose.addEventListener('click', () => mobileMenu.close());
mobileMenu.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...mobileMenu.querySelectorAll('a[href], button:not([disabled])')];
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
mobileMenu.addEventListener('close', () => menuToggle.setAttribute('aria-expanded', 'false'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.close()));
mobileMenu.addEventListener('click', event => {
  if (event.target !== mobileMenu) return;
  const rect = mobileMenu.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) mobileMenu.close();
});
const desktopViewport = matchMedia('(min-width: 768px)');
desktopViewport.addEventListener('change', event => { if (event.matches && mobileMenu.open) mobileMenu.close(); });
try { if (localStorage.getItem('portfolio-language') === 'ar') setLanguage('ar'); } catch {}
document.querySelector('#year').textContent = new Date().getFullYear();
setupProjectGallery({ dialog, projects, getLanguage: () => language });
if ('IntersectionObserver' in window) {
  root.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  const navigation = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { document.querySelectorAll('nav a').forEach(link => { if(link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }), {rootMargin:'-15% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => navigation.observe(section));
}
