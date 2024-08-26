document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const scrollIndicator = document.getElementById('scrollIndicator');
  let currentSectionIndex = 0;
  let isScrolling = false;

  const updateScrollIndicatorColor = () => {
    const colors = ['#38c76c', '#e08248', '#48a8e0'];
    scrollIndicator.style.backgroundColor = colors[currentSectionIndex];
  };

  const setActiveSection = index => {
    sections.forEach((section, i) => {
      if (i === index) {
        section.style.zIndex = 3;
        section.classList.add('animate-up');
      } else {
        section.style.zIndex = 1;
        section.classList.remove('animate-up');
      }
    });
  };

  const scrollToSection = index => {
    window.scrollTo({
      top: window.innerHeight * index,
      behavior: 'smooth',
    });
  };

  const handleScroll = event => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
      currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    } else {
      currentSectionIndex =
        (currentSectionIndex - 1 + sections.length) % sections.length;
    }

    updateScrollIndicatorColor();
    setActiveSection(currentSectionIndex);
    scrollToSection(currentSectionIndex);

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  };

  window.addEventListener('wheel', handleScroll);

  updateScrollIndicatorColor();
  setActiveSection(currentSectionIndex);
});
