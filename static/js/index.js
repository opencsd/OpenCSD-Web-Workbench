// const connect_btn = document.querySelector('#connect_btn');

// connect_btn.addEventListener('click', (e) => {
//     e.preventDefault();
    
//     var workbench_user_id = document.getElementById("workbench_user_id").value;
//     var db_instance_name = document.getElementById("instance_name").value;

//     const userInfo = {
//         workbench_user_id: workbench_user_id,
//         db_instance_name: db_instance_name
//     }

//     // 유저 아이디, 디비 인스턴스 이름 세션에 저장
//     sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
//     const storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

//     // if (workbench_user_id === "keti-opencsd-admin") {
//     //     window.location.href = 'monitoring-csd.html';
//     // }
//     // else {
//     //     window.location.href = 'monitoring-ssd.html';
//     // }

//     fetch('/connect', {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // redirect: 'follow',
//         body: JSON.stringify(storeduserInfo)
//     })
//     .then(response => response.json())  // JSON 파싱
//     .then(data => {
//         if (data.error) {
//             alert(data.error);
//         } else if (data.redirect_url) {
//             window.location.href = data.redirect_url;
//         } 
//     })
//     .catch(error => {
//         alert(error); 
//     });
// });


const connect_btn = document.querySelector('#connect_btn');

connect_btn.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    // 사용자 입력 데이터 수집
    const userInfo = {
        userName: document.getElementById("userName").value,
        instanceName: document.getElementById("instanceName").value,
        dbName: document.getElementById("dbName").value,
        dbUser: document.getElementById("dbUser").value,
        dbPassword: document.getElementById("dbPassword").value
    };

    // 서버로 POST 요청
    fetch('http://10.0.4.87:30800/workbench/main/connection', { // connect POST
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // JSON 데이터 파싱
        } else {
            throw new Error("Login failed");
        }
    })
    .then(data => {
        const { instanceType, sessionId } = data; // sessionId 응답에서 받기
        console.log("Current Session Cookies:",document.cookie);
        document.cookie = `instance_name=${document.getElementById("instanceName").value}; path=/; samsite=lax`;
        document.cookie = `session_id=${sessionId}; path=/; samesite=lax`;
        document.cookie = `user_id=${document.getElementById("userName").value}; path=/; samesite=lax`;
        
        localStorage.setItem('session_id', sessionId);

        // instance_type에 따라 페이지 리다이렉션
        if (instanceType === "OPENCSD") {
            window.location.href = "/monitoring";
        } else if (instanceType === "MYSQL") {
            window.location.href = "/monitoring-ssd";
        } else {
            throw new Error("Unknown instance type");
        }
    })
    .catch(error => {
        console.error(error);
        alert("Failed to connect. Please try again.");
    });
});