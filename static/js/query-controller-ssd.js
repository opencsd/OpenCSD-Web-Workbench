let temp_id = 1;
const queryHistory = [];

document.getElementById("pushdownButton").addEventListener("click", function () {
    const queryText = document.getElementById("queryTextarea").value.trim();

    const queryLogTableBody = document.getElementById("queryLogTableBody");

    if (queryText) {
        const shortenedQuery = queryText.length > 70 ? queryText.slice(0, 70) + "..." : queryText;
        queryHistory.push(shortenedQuery);

        const newRow = document.createElement("tr");
        const checkboxCell = document.createElement("td");
        checkboxCell.style.width = "5%";
        const queryIDCell = document.createElement("td");
        queryIDCell.style.width = "1%";
        const queryCell = document.createElement("td");
        queryCell.style.width = "50%";
        const progressBarCells = [];
        const dummyButtonCell = document.createElement("td");
        dummyButtonCell.style.width = "5%";

        for (let i = 0; i < 2; i++) {
            const progressBarCell = document.createElement("td");
            progressBarCell.style.width = "12%";
            let width;
            let value;
            let max;
            let label;

            if(i==0){
                value = 101250;
                max = 200000;
            }else{
                value = 14;
                max = 100;
            }

            label = value;
            width = (value / max) * 100;
            progressBarCell.innerHTML = `
                <div class="progress">
                    <div class="progress-bar" style="width: ${width}%" role="progressbar" aria-valuenow="${value}"
                        aria-valuemin="0" aria-valuemax="${max}" aria-label="${label}% Complete">
                        
                    </div>
                </div>
                <div style="text-align:center">
                    <h6 style="margin-top:5px; margin-bottom:0px;">${value}</h6>
                </div>
            `;
            progressBarCells.push(progressBarCell);
        }

        const dummyButton = document.createElement("td");
        dummyButton.innerHTML = `
            <button class="btn btn-link p-0 ssd_btn" id="queryLogDetail">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
        `;

        checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="1">`;
        newRow.appendChild(checkboxCell);

        queryIDCell.textContent = temp_id;
        temp_id++;
        queryIDCell.style.textAlign = "center";
        newRow.appendChild(queryIDCell);

        queryCell.textContent = `${shortenedQuery}`;
        queryCell.style.backgroundColor = "#fcfdfe";
        newRow.appendChild(queryCell);

        for (let i = 0; i < 2; i++) {
            newRow.appendChild(progressBarCells[i]);
        }

        newRow.appendChild(dummyButtonCell);
        dummyButtonCell.appendChild(dummyButton);

        setTimeout(() => {
            queryLogTableBody.appendChild(newRow);
        }, 60000); 
        
    } else {
        queryLogTableBody.textContent = "No query available.";
    }

    // document.getElementById("queryTextarea").value = "";
});

