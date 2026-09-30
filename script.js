document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");
    const body = document.body;

    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.classList.toggle("active", isOpen);
            body.classList.toggle("menu-open", isOpen);

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");
                menuButton.classList.remove("active");
                body.classList.remove("menu-open");

            });

        });

    }

    const filters = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".menu-card");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const category = filter.dataset.filter;

            cards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category === category;

                if (matches) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }

            });

        });

    });

    const revealElements = document.querySelectorAll(
        ".essence-grid, .featured-content, .menu-card, .flavors-content, .environment-copy, .environment-image, .gallery-item, .gallery-quote, .visit-content, .visit-details"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const id = link.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            const target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;
            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

    const heroImage = document.querySelector(".hero-image img");

    if (
        heroImage &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 10;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 6;

            heroImage.style.transform =
                `scale(1.04) translate(${x}px, ${y}px)`;

        });

    }

});