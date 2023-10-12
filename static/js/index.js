const connect_btn = document.querySelector('#connect_btn');

const buttonClickHandler = () => {
    var workbench_user_id = document.getElementById("workbench_user_id").value;

    fetch('http://127.0.0.1:9091/connect', {
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
    .then(response => {
        if(workbench_user_id == "keti_opencsd"){
            window.location.href = '/monitoring';
        }else{
            window.location.href = '/monitoring_ssd';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error); 
    });
};

connect_btn.addEventListener('click',buttonClickHandler);