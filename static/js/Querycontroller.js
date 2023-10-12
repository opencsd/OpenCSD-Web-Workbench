document.addEventListener("DOMContentLoaded", function () {
    const queryHistory = [];

    document.getElementById("pushdownButton").addEventListener("click", function () {
        const queryText = document.getElementById("queryTextarea").value.trim();

        const queryLogTableBody = document.getElementById("queryLogTableBody");

        if (queryText) {
            const shortenedQuery = queryText.length > 50 ? queryText.slice(0, 50) + "..." : queryText;
            queryHistory.push(shortenedQuery);

            const newRow = document.createElement("tr");
            const checkboxCell = document.createElement("td");
            const newCell = document.createElement("td");
            const Scannedgraph = document.createElement("td");
            const Filteredgraph = document.createElement("td");
            const Filtergraph = document.createElement("td");
            const Exesutiongraph = document.createElement("td");



            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            checkbox.name = "form-type[]";
            checkbox.value = "2";
            checkboxCell.appendChild(checkbox);

            newCell.textContent = `${queryHistory.length}. ${shortenedQuery}`;

            newCell.style.backgroundColor = "#fcfdfe";

            const graphBar1 = document.createElement("div");
            const graphBar2 = document.createElement("div");
            const graphBar3 = document.createElement("div");
            const graphBar4 = document.createElement("div");

            graphBar1.className = "bar-graph";
            graphBar2.className = "bar-graph";
            graphBar3.className = "bar-graph";
            graphBar4.className = "bar-graph";

            Scannedgraph.appendChild(graphBar1);
            Filteredgraph.appendChild(graphBar2);
            Filtergraph.appendChild(graphBar3);
            Exesutiongraph.appendChild(graphBar4);


            newRow.appendChild(checkboxCell);
            newRow.appendChild(newCell);
            newRow.appendChild(Scannedgraph);
            newRow.appendChild(Filteredgraph);
            newRow.appendChild(Filtergraph);
            newRow.appendChild(Exesutiongraph);


            queryLogTableBody.appendChild(newRow);
        } else {
            queryLogTableBody.textContent = "No query available.";
        }

        document.getElementById("queryTextarea").value = "";
    });
});


function queryToggle() {
    const environmentInfoButton = document.getElementById("environmentInfoButton");
    const dbSchemaButton = document.getElementById("dbSchemaButton");

    environmentInfoButton.addEventListener("click", function () {
        environmentInfoButton.classList.add("active");
        dbSchemaButton.classList.remove("active");

    });

    dbSchemaButton.addEventListener("click", function () {
        dbSchemaButton.classList.add("active");
        environmentInfoButton.classList.remove("active");

    });
}

document.addEventListener("DOMContentLoaded", queryToggle);