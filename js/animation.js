document.addEventListener("DOMContentLoaded", () => {
    const blowfishElements = document.querySelectorAll(".blowfish");

    blowfishElements.forEach((blowfish) => {
        blowfish.addEventListener("mouseover", () => {
            blowfish.style.transform = "scale(1.3)";
        });

        blowfish.addEventListener("mouseout", () => {
            blowfish.style.transform = "scale(1)";
        });
    });
});
