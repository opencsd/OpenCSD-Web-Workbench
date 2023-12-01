const connect_btn = document.querySelector('#connect_btn');

connect_btn.addEventListener('click', () => {
    var workbench_user_id = document.getElementById("workbench_user_id").value;

    fetch('/connect', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify({
            "workbench_user_id":workbench_user_id
        })
    })
    .then(response => response.json())  // JSON 파싱
    .then(data => {
        console.log(data);
        if (data.loginto === 'csd') {
            window.location.href = '/monitoring';
        } 
        else if (data.loginto === 'ssd'){
            window.location.href = '/monitoring_ssd';
        }
    })
    .catch(error => {
        alert(error); 
    });
});

