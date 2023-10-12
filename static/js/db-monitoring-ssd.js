const db_monitoring_slide_btn_ssd = document.querySelector('#db_monitoring_slide_btn.ssd_btn');
const db_monitoring_slide_up_icon_ssd = document.querySelector('#db_monitoring_slide_up_icon.ssd_btn');
const db_monitoring_slide_down_icon_ssd = document.querySelector('#db_monitoring_slide_down_icon.ssd_btn');
let isDBMonitoringSlideBtnClickedSSD = true;

db_monitoring_slide_btn_ssd.addEventListener('click', () => {
  const hidden_db_monitoring_ssd = document.querySelector('#hidden_db_monitoring.ssd_btn');

  if (isDBMonitoringSlideBtnClickedSSD) {
    db_monitoring_slide_up_icon_ssd.style.display = 'none';
    db_monitoring_slide_down_icon_ssd.style.display = 'inline';
    hidden_db_monitoring_ssd.style.display = 'block';
  } else {
    db_monitoring_slide_up_icon_ssd.style.display = 'inline';
    db_monitoring_slide_down_icon_ssd.style.display = 'none';
    hidden_db_monitoring_ssd.style.display = 'none';
  }
  isDBMonitoringSlideBtnClickedSSD = !isDBMonitoringSlideBtnClickedSSD;
});


const host_monitoring_slide_btn_ssd = document.querySelector('#host_monitoring_slide_btn.ssd_btn');
const host_monitoring_slide_up_icon_ssd = document.querySelector('#host_monitoring_slide_up_icon.ssd_btn');
const host_monitoring_slide_down_icon_ssd = document.querySelector('#host_monitoring_slide_down_icon.ssd_btn');
let isHostMonitoringSlideBtnClickedSSD = true;

host_monitoring_slide_btn_ssd.addEventListener('click', () => {
  const hidden_host_monitoring_ssd = document.querySelector('#hidden_host_monitoring.ssd_btn');

  if (isHostMonitoringSlideBtnClickedSSD) {
    host_monitoring_slide_up_icon_ssd.style.display = 'none';
    host_monitoring_slide_down_icon_ssd.style.display = 'inline';
    hidden_host_monitoring_ssd.style.display = 'block';
  } else {
    host_monitoring_slide_up_icon_ssd.style.display = 'inline';
    host_monitoring_slide_down_icon_ssd.style.display = 'none';
    hidden_host_monitoring_ssd.style.display = 'none';
  }
  isHostMonitoringSlideBtnClickedSSD = !isHostMonitoringSlideBtnClickedSSD;
});
