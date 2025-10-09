export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`#${sectionId}`);
    console.log(sectionId)
    console.log(element)
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
};