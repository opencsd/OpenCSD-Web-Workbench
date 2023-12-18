const dbInfoSlideBtn = document.getElementById('dbInfoSlideBtn');
const dbInfoSlideUpIcon = document.getElementById('dbInfoSlideUpIcon');
const dbInfoSlideDownIcon = document.getElementById('dbInfoSlideDownIcon');
let isDBInfoSlideBtnClicked = true;
// 세션에 저장된 유저 정보 (유저 아이디, 인스턴스네임)
var storeduserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// 유저 아이디 
function viewUserID(){
    const user_id = document.getElementById("user_info");
    user_id.textContent = "User : " + storeduserInfo.workbench_user_id;
}

dbInfoSlideBtn.addEventListener('click', () => {
    const hiddenDBInfo = document.getElementById('hiddenDBInfo');
    
    if (isDBInfoSlideBtnClicked) {
        dbInfoSlideUpIcon.style.display = 'none';
        dbInfoSlideDownIcon.style.display = 'inline';
        hiddenDBInfo.style.display = 'block';
    } else {
        dbInfoSlideUpIcon.style.display = 'inline';
        dbInfoSlideDownIcon.style.display = 'none';
        hiddenDBInfo.style.display = 'none';
    }
    isDBInfoSlideBtnClicked = !isDBInfoSlideBtnClicked;
});

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
