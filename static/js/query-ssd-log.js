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
        checkboxCell.style.textAlign = "center";
        const typeCell = document.createElement("td");
        typeCell.style.width = "5%";
        typeCell.style.textAlign = "center";
        const queryIDCell = document.createElement("td");
        queryIDCell.style.width = "1%";
        const queryCell = document.createElement("td");
        queryCell.style.width = "50%";
        const progressBarCells = [];
        // const dummyButtonCell = document.createElement("td");
        // dummyButtonCell.style.width = "5%";

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

        // const dummyButton = document.createElement("td");
        // dummyButton.innerHTML = `
        //     <button class="btn btn-link p-0 ssd_btn" id="queryLogDetail">
        //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        //             <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        //         </svg>
        //     </button>
        // `;

        checkboxCell.innerHTML = `<input type="checkbox" class="form-check-input" name="form-type[]" value="1">`;
        newRow.appendChild(checkboxCell);

        

        queryIDCell.textContent = temp_id;
        temp_id++;
        queryIDCell.style.textAlign = "center";
        newRow.appendChild(queryIDCell);

        // 쿼리 타입에 따라 아이콘 바꿔야함
        typeCell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-letter-s" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1" />
        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        </svg>`
        newRow.appendChild(typeCell);

        queryCell.textContent = `${shortenedQuery}`;
        queryCell.style.backgroundColor = "#fcfdfe";
        newRow.appendChild(queryCell);

        for (let i = 0; i < 2; i++) {
            newRow.appendChild(progressBarCells[i]);
        }

        // newRow.appendChild(dummyButtonCell);
        // dummyButtonCell.appendChild(dummyButton);

        queryLogTableBody.appendChild(newRow);
        
    } else {
        queryLogTableBody.textContent = "No query available.";
    }

    // document.getElementById("queryTextarea").value = "";
});

