(() => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    reveal.forEach((item) => observer.observe(item));
  } else {
    reveal.forEach((item) => item.classList.add('is-visible'));
  }

  const params = new URLSearchParams(window.location.search);
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((key) => params.get(key))
    .filter(Boolean)
    .join(' / ');

  if (campaign) {
    document.querySelectorAll('.whatsapp-link').forEach((link) => {
      const url = new URL(link.href);
      const current = url.searchParams.get('text') || 'Olá, Dr. Márcio. Gostaria de conversar sobre uma questão criminal.';
      url.searchParams.set('text', `${current}\n\nOrigem: ${campaign}`);
      link.href = url.toString();
    });
  }
})();
