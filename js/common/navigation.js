export function initNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const targetId =
                item.dataset.target;

            const target =
                document.getElementById(targetId);

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const sections =
        document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 120;

            if (window.scrollY >= top) {
                current = section.id;
            }
        });

        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.target === current
            );
        });
    });
}