document.addEventListener('DOMContentLoaded', function() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute("viewBox", "0 0 800 200");
    svgElement.style.position = "absolute";
    svgElement.style.width = "100%";
    svgElement.style.height = "30%";
    svgElement.style.top = "0";
    svgElement.style.left = "0";

    function createCloud(x, y) {
        const cloudGroup = document.createElementNS(svgNS, "g");
        cloudGroup.classList.add('cloud');

        const ellipse1 = document.createElementNS(svgNS, "ellipse");
        ellipse1.setAttribute("cx", x);
        ellipse1.setAttribute("cy", y);
        ellipse1.setAttribute("rx", "50");
        ellipse1.setAttribute("ry", "30");
        cloudGroup.appendChild(ellipse1);

        const ellipse2 = document.createElementNS(svgNS, "ellipse");
        ellipse2.setAttribute("cx", x + 50);
        ellipse2.setAttribute("cy", y + 10);
        ellipse2.setAttribute("rx", "60");
        ellipse2.setAttribute("ry", "35");
        cloudGroup.appendChild(ellipse2);

        const ellipse3 = document.createElementNS(svgNS, "ellipse");
        ellipse3.setAttribute("cx", x + 25);
        ellipse3.setAttribute("cy", y - 5);
        ellipse3.setAttribute("rx", "40");
        ellipse3.setAttribute("ry", "25");
        cloudGroup.appendChild(ellipse3);

        return cloudGroup;
    }

    const cloud1 = createCloud(150, 80);
    const cloud2 = createCloud(600, 80);
    svgElement.appendChild(cloud1);
    svgElement.appendChild(cloud2);

    document.getElementById("background-container").appendChild(svgElement);

    const clouds = document.querySelectorAll('.cloud');

    clouds.forEach((cloud, index) => {
        const startX = 800;
        const endX = -800;

        cloud.setAttribute('transform', `translate(${startX}, 0)`);

        gsap.to(cloud, {
            x: endX,
            repeat: -1,
            duration: 30 + index * 10,
            ease: "linear",
            onRepeat: () => {
                cloud.setAttribute('transform', `translate(${startX}, 0)`);
            }
        });
    });
});