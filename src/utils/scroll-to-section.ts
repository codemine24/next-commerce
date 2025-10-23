export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Element with id "${sectionId}" not found`);
    return;
  }

  const offset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = window.scrollY + elementPosition - offset;

  console.log({
    sectionId,
    elementPosition,
    offsetPosition,
  });

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
