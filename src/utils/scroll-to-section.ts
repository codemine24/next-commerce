export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    return;
  }

  const offset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = window.scrollY + elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
