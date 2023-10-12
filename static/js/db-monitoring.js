const db_info_slide_btn = document.getElementById('db_info_slide_btn');
const db_info_slide_up_icon = document.getElementById('db_info_slide_up_icon');
const db_info_slide_down_icon = document.getElementById('db_info_slide_down_icon');
let isDBInfoSlideBtnClicked = true;

db_info_slide_btn.addEventListener('click', () => {
    const hidden_db_info = document.getElementById('hidden_db_info');
    
    if (isDBInfoSlideBtnClicked) {
        db_info_slide_up_icon.style.display = 'none';
        db_info_slide_down_icon.style.display = 'inline';
        hidden_db_info.style.display = 'block';
    } else {
        db_info_slide_up_icon.style.display = 'inline';
        db_info_slide_down_icon.style.display = 'none';
        hidden_db_info.style.display = 'none';
    }
    isDBInfoSlideBtnClicked = !isDBInfoSlideBtnClicked;
});


const db_monitoring_slide_btn = document.getElementById('db_monitoring_slide_btn');
const db_monitoring_slide_up_icon = document.getElementById('db_monitoring_slide_up_icon');
const db_monitoring_slide_down_icon = document.getElementById('db_monitoring_slide_down_icon');
let isDBMonitoringSlideBtnClicked = true;

db_monitoring_slide_btn.addEventListener('click', () => {
    const hidden_db_monitoring = document.getElementById('hidden_db_monitoring');

    if (isDBMonitoringSlideBtnClicked) {
        db_monitoring_slide_up_icon.style.display = 'none';
        db_monitoring_slide_down_icon.style.display = 'inline';
        hidden_db_monitoring.style.display = 'block';
    } else {
        db_monitoring_slide_up_icon.style.display = 'inline';
        db_monitoring_slide_down_icon.style.display = 'none';
        hidden_db_monitoring.style.display = 'none';
    }
    isDBMonitoringSlideBtnClicked = !isDBMonitoringSlideBtnClicked;
});



const host_monitoring_slide_btn = document.getElementById('host_monitoring_slide_btn');
const host_monitoring_slide_up_icon = document.getElementById('host_monitoring_slide_up_icon');
const host_monitoring_slide_down_icon = document.getElementById('host_monitoring_slide_down_icon');
let isHostMonitoringSlideBtnClicked = true;

host_monitoring_slide_btn.addEventListener('click', () => {
    const hidden_host_monitoring = document.getElementById('hidden_host_monitoring');

    if (isHostMonitoringSlideBtnClicked) {
        host_monitoring_slide_up_icon.style.display = 'none';
        host_monitoring_slide_down_icon.style.display = 'inline';
        hidden_host_monitoring.style.display = 'block';
    } else {
        host_monitoring_slide_up_icon.style.display = 'inline';
        host_monitoring_slide_down_icon.style.display = 'none';
        hidden_host_monitoring.style.display = 'none';
    }
    isHostMonitoringSlideBtnClicked = !isHostMonitoringSlideBtnClicked;
});
