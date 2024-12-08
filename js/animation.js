document.addEventListener("DOMContentLoaded", () => {
    const blowfish = document.getElementById("blowfish");

    blowfish.addEventListener("mouseover", () => {
        blowfish.style.transform = "scale(1.2)";
    });

    blowfish.addEventListener("mouseout", () => {
        blowfish.style.transform = "scale(1)";
    });
});
