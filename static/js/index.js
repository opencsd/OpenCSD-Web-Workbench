const connect_btn = document.querySelector('#connect_btn');

connect_btn.addEventListener('click', () => {
    var workbench_user_id = document.getElementById("workbench_user_id").value;
    var db_instance_name = document.getElementById("instance_name").value;

    const userInfo = {
        workbench_user_id: workbench_user_id,
        db_instance_name: db_instance_name
    }

    // 유저 아이디, 디비 인스턴스 이름 세션에 저장
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    const storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    // if (workbench_user_id === "keti-opencsd-admin") {
    //     window.location.href = 'monitoring-csd.html';
    // }
    // else {
    //     window.location.href = 'monitoring-ssd.html';
    // }

    fetch('/connect', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        // redirect: 'follow',
        body: JSON.stringify(storeduserInfo)
    })
    .then(response => response.json())  // JSON 파싱
    .then(data => {
        console.log(data);
        if (data.loginto === 'csd') {
            window.location.href = '/monitoring';
        } 
        else if (data.loginto === 'ssd'){
            window.location.href = '/monitoring-ssd';
        }
        // window.location.href = '/monitoring';
    })
    .catch(error => {
        alert(error); 
    });
});
