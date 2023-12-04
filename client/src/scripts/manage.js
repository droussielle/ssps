/* eslint-disable require-jsdoc */
import $ from 'jquery';

function Printer(name) {
  this.name = name;
  this.status = 'Active';
  this.mode = 'Automatic';
  this.uptimeSince = 'date';
}
$(() => {
  loadData();
});
const printer1 = new Printer('H3-404');

$('#add-printer').on('click', function () {
  $('#printer-name').text('Máy in: ' + printer1.name);
  $('#manage-printer-body').html(
    '<p class="text-sm font-bold text-gray-600 dark:text-gray-300">Chi tiết</p><hr class="border w-full" /><div class="flex flex-row justify-between"><p>Trạng thái</p><p>' +
      printer1.status +
      '</p></div><div class="flex flex-row justify-between"><p>Chế độ</p><p>' +
      printer1.mode +
      '</p></div><div class="flex flex-row justify-between"><p>Thời gian hoạt động</p><p>' +
      printer1.uptimeSince +
      '</p></div>',
  );
  $('#manage-printer-actions').html(
    `
    <button
      id="report-printer"
      type="button"
      class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
    >
      Báo lỗi
    </button>
    <button
      id="printer-log"
      type="button"
      class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
    >
      Xem nhật kí hoạt động
    </button>
    <button
      id="disable-printer"
      type="button"
      class="items inline-flex gap-x-3 rounded-full bg-red-700 px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-red-600 hover:shadow-3 active:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 dark:active:bg-red-600"
    >
      Vô hiệu hóa
    </button>
    `,
  );
});

let printing = true;

$('#pause-print').on('click', function () {
  if (printing) {
    $('#pause-print').text('Tạm dừng in');
    printing = false;
  } else {
    $('#pause-print').text('Tiếp tục in');
    printing = true;
  }
});

$('#stop-print').on('click', function () {
  $('#stop-print')
    .text('Bắt đầu in')
    .attr(
      'class',
      'items inline-flex gap-x-1 rounded-full bg-button-primary px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark',
    );
  $('#pause-print').addClass('invisible');
});

function loadData() {
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/spso/all-orders',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        var matchedArray = [];
        $.get('http://localhost:3000/spso/student/')
          .done((res1) => {
            for (let i = 0; i < res1.data.length; i++) {
              for (let j = 0; j < res.length; j++) {
                if (res[j].user === res1.data[i].account) {
                  const temp = {
                    printOrder: res[j],
                    user: res1.data[i].student_ID,
                  };
                  matchedArray.push(temp);
                }
              }
            }
          })
          .then(() => {
            localStorage.setItem('queue', JSON.stringify(matchedArray));
          })
          .fail((xhr, text, error) => {});
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
// status: -1:Chưa in, 0:Đang in  1: Chưa lấy 2: Đã lấy
// const PrinterQueue = [
//   {
//     id: '2110501',
//     title: 'Chapter_6_V7.01_Accessible.pdf',
//     page: 85,
//     status: 0,
//   },
//   {
//     id: '2110501',
//     title: 'Chapter_6_V7.01_Accessible.pdf',
//     page: 85,
//     status: 1,
//   },
//   {
//     id: '2110501',
//     title: 'Chapter_6_V7.01_Accessible.pdf',
//     page: 84,
//     status: -1,
//   },
// ];
