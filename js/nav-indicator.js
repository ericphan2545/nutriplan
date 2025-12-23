(() => {
  const navList = document.querySelector(".nav ul");
  if (!navList) return;

  const indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  navList.appendChild(indicator);

  const links = Array.from(navList.querySelectorAll("a"));
  let activeLink = null;
  let isReady = false;

  const getTargetLink = () => {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return (
      links.find((link) => {
        const href = link.getAttribute("href");
        return href && path.endsWith(href);
      }) || links[0]
    );
  };

  const moveIndicator = (link) => {
    if (!link) {
      indicator.style.opacity = "0";
      return;
    }

    const linkRect = link.getBoundingClientRect();
    const navRect = navList.getBoundingClientRect();
    const paddingX = 12;
    const paddingY = 6;

    indicator.style.width = `${linkRect.width + paddingX * 2}px`;
    indicator.style.height = `${linkRect.height + paddingY * 2}px`;
    const translateX = linkRect.left - navRect.left - paddingX;
    indicator.style.transform = `translate(${translateX}px, -50%)`;
    indicator.style.opacity = "1";
  };

  const setActive = (link) => {
    activeLink = link;
    moveIndicator(link);
  };

  // Initialize without jump
  const initialLink = getTargetLink();
  indicator.style.transition = "none";
  setActive(initialLink);
  // enable transition after first paint
  requestAnimationFrame(() => {
    indicator.style.transition = "";
    isReady = true;
  });

  // Click handlers
  links.forEach((link) => {
    link.addEventListener("click", () => setActive(link));
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    if (activeLink) moveIndicator(activeLink);
  });
})();

