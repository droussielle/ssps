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
// status: -1:Chưa in, 0:Đang in  1: Chưa lấy 2: Đã lấy
PrinterQueue = [{
  'id': "2110501",
  'title': "Chapter_6_V7.01_Accessible.pdf",
  'page': 85,
  'status': 0
}, {
  'id': "2110501",
  'title': "Chapter_6_V7.01_Accessible.pdf",
  'page': 85,
  'status': 0
}, {
  'id': "2110501",
  'title': "Chapter_6_V7.01_Accessible.pdf",
  'page': 85,
  'status': 0
}]
let str = ''
str += `<div class="flex w-full flex-row items-center justify-between pb-2">
  <p class="text-xl font-bold">Hàng đợi máy in</p>
  <button
    type="button"
    class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active"
  >
    Xem tất cả
  </button>
</div>
<div class="flex flex-col space-y-2">
  <div class="flex flex-row">
    <p class="basis-24 text-sm font-bold text-gray-600">MSSV</p>
    <p class="grow text-sm font-bold text-gray-600">Tiêu đề</p>
    <p class="basis-24 text-sm font-bold text-gray-600">Số trang</p>
    <p class="basis-28 text-sm font-bold text-gray-600">Tình trạng</p>
    <div class="basis-9"></div>
  </div>
  <hr class="w-full border" />
  `
PrinterQueue.forEach((el, index) => {
  str += `<div class="flex flex-row py-1">
    <p class="basis-24">`+ el['id'] + `</p>
    <p class="grow">`+ el['title'] + `</p>
    <p class="basis-24">`+ el['page'] + `</p>
    `
  if (el['status'] == -1) {
    str += `<p class="basis-28">Chưa in</p>`
  }
  if (el['status'] == 0) {
    str += `<p class="basis-28">Đang in</p>`
  }
  if (el['status'] == 1) {
    str += `<p class="basis-28">Chưa lấy</p>`
  }
  if (el['status'] == 2) {
    str += `<p class="basis-28">Đã lấy</p>`
  }
  str += `
    <div class="basis-9">Xem</div>
  </div>`
});
str += `
</div>
<div class="flex w-full flex-row items-center justify-end space-x-3 pb-1"
          >
            <button
              id="pause-print"
              type="button"
              class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active"
            >
              Tạm dừng in
            </button>
            <button
              id="stop-print"
              type="button"
              class="items inline-flex gap-x-1 rounded-full bg-red-700 px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-red-600 hover:shadow-3 active:bg-red-800"
            >
              Dừng in
            </button> 
          </div>`
$('#printer-queue').html(str);
