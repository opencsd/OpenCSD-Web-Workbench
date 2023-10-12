document.addEventListener("DOMContentLoaded", function () {
    const graphData = [{
            day: "14:50",
            data: [7, 12, 25, 36]
        },
        {
            day: "14:55",
            data: [7, 12, 25, 34]
        },
        {
            day: "15:00",
            data: [5, 15, 22, 25]
        },
        {
            day: "15:05",
            data: [7, 12, 25, 30]
        },
        {
            day: "15:10",
            data: [3, 12, 22, 20]
        },
        {
            day: "15:15",
            data: [5, 10, 15, 20]
        },
        {
            day: "15:20",
            data: [7, 12, 20, 26]
        },
    ];

    const graphContainer = document.getElementById("graphData");

    graphData.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("item");

        const textContainer = document.createElement("div");
        textContainer.classList.add("text_box");

        const dayElement = document.createElement("strong");
        dayElement.classList.add("day");
        dayElement.textContent = item.day;

        textContainer.appendChild(dayElement);

        const graphButton = document.createElement("button");
        graphButton.type = "button";
        graphButton.classList.add("graph");

        item.data.forEach((height, index) => {
            const dataSpan = document.createElement("span");
            dataSpan.classList.add("time", `data${index + 1}`);
            dataSpan.style.height = `${height}%`;
            dataSpan.innerHTML = `<span class="blind">data 타입 ${index + 1}</span>`;
            graphButton.appendChild(dataSpan);
        });

        listItem.appendChild(textContainer);
        listItem.appendChild(graphButton);
        graphContainer.appendChild(listItem);
    });

});

