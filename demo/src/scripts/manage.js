/* eslint-disable require-jsdoc */
import $ from 'jquery';

function Printer(name) {
  this.name = name;
  this.status = 'Active';
  this.mode = 'Automatic';
  this.uptimeSince = 'date';
}

const printer1 = new Printer('H3-404');

$('#add-printer').on('click', function () {
  $('#printer-name').text('Máy in: ' + printer1.name);
  $('#manage-printer-body').html(
    '<p class="text-sm font-bold text-gray-600">Chi tiết</p><hr class="border w-full" /><div class="flex flex-row justify-between"><p>Trạng thái</p><p>' +
    printer1.status +
    '</p></div><div class="flex flex-row justify-between"><p>Chế độ</p><p>' +
    printer1.mode +
    '</p></div><div class="flex flex-row justify-between"><p>Thời gian hoạt động</p><p>' +
    printer1.uptimeSince +
    '</p></div>',
  );
  $('#manage-printer-actions').html(
    '<button type="button" class="transition ease-out px-6 py-2.5 shadow-1 text-black inline-flex rounded-full text-center gap-x-3 items hover:shadow-3 hover:bg-button-hover active:bg-button-active" >Báo lỗi</button><button type="button" class="transition ease-out px-6 py-2.5 shadow-1 text-black inline-flex rounded-full text-center gap-x-3 items hover:shadow-3 hover:bg-button-hover active:bg-button-active">Xem nhật kí hoạt động</button><button type="button" class="transition ease-out px-5 py-2.5 shadow-1 text-white inline-flex items rounded-full text-center gap-x-1 bg-red-700 hover:shadow-3 hover:bg-red-600 active:bg-red-800">Vô hiệu hóa</button>',
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
      'transition ease-out px-5 py-2.5 shadow-1 text-white inline-flex items rounded-full text-center gap-x-1 bg-blue-primary hover:shadow-3 hover:bg-button-primary-hover active:bg-button-primary-active',
    );
  $('#pause-print').addClass('invisible');
});
$(document).ready(function () {
  loadPrinterQueue();
});
function loadPrinterQueue() {
  let str = ''
  str+=``
}
