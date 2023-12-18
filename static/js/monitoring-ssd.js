// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}
document.addEventListener("DOMContentLoaded", function () {
    viewUserID();
})

// const dbMonitoringSlideBtn = document.getElementById('dbMonitoringSlideBtn');
// const dbMonitoringSlideUpIcon = document.getElementById('dbMonitoringSlideUpIcon');
// const dbMonitoringSlideDownIcon = document.getElementById('dbMonitoringSlideDownIcon');
// let isDBMonitoringSlideBtnClicked = true;

// dbMonitoringSlideBtn.addEventListener('click', () => {
//     const hiddenDBMonitoring = document.getElementById('hiddenDBMonitoring');

//     if (isDBMonitoringSlideBtnClicked) {
//         dbMonitoringSlideUpIcon.style.display = 'none';
//         dbMonitoringSlideDownIcon.style.display = 'inline';
//         hiddenDBMonitoring.style.display = 'block';
//     } else {
//         dbMonitoringSlideUpIcon.style.display = 'inline';
//         dbMonitoringSlideDownIcon.style.display = 'none';
//         hiddenDBMonitoring.style.display = 'none';
//     }
//     isDBMonitoringSlideBtnClicked = !isDBMonitoringSlideBtnClicked;
// });

// const hostMonitoringSlideBtn = document.getElementById('hostMonitoringSlideBtn');
// const hostMonitoringSlideUpIcon = document.getElementById('hostMonitoringSlideUpIcon');
// const hostMonitoringSlideDownIcon = document.getElementById('hostMonitoringSlideDownIcon');
// let isHostMonitoringSlideBtnClicked = true;

// hostMonitoringSlideBtn.addEventListener('click', () => {
//     const hiddenHostMonitoring = document.getElementById('hiddenHostMonitoring');

//     if (isHostMonitoringSlideBtnClicked) {
//         hostMonitoringSlideUpIcon.style.display = 'none';
//         hostMonitoringSlideDownIcon.style.display = 'inline';
//         hiddenHostMonitoring.style.display = 'block';
//     } else {
//         hostMonitoringSlideUpIcon.style.display = 'inline';
//         hostMonitoringSlideDownIcon.style.display = 'none';
//         hiddenHostMonitoring.style.display = 'none';
//     }
//     isHostMonitoringSlideBtnClicked = !isHostMonitoringSlideBtnClicked;
// });
