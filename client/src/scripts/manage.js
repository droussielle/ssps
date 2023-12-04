/* eslint-disable require-jsdoc */
import $, { queue } from 'jquery';
import jQuery from 'jquery';
const url = localStorage.getItem('url');

jQuery.each(['put', 'delete', 'patch'], function (i, method) {
  jQuery[method] = function (url, data, callback, type) {
    if (jQuery.isFunction(data)) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback,
    });
  };
});
var printers = [];
function Printer(name) {
  this.name = name;
  this.status = 'Active';
  this.mode = 'Automatic';
  this.uptimeSince = 'date';
}

$(() => {
  if (JSON.parse(localStorage.getItem('userInfo')).userType !== 'spso') {
    // $('a[href^="manage"]').addClass('hidden');
    $('#manage-printer').remove();
  }
  loadData();
  loadPrinter();
  addPrinter();
  changeStatusPrinter();
  // editPrinter();
  deletePrinter();
});

const printer1 = new Printer('H3-404');

// $('#add-printer').on('click', function () {
//   $('#printer-name').text('Máy in: ' + printer1.name);
//   $('#manage-printer-body').html(
//     '<p class="text-sm font-bold text-gray-600 dark:text-gray-300">Chi tiết</p><hr class="border w-full" /><div class="flex flex-row justify-between"><p>Trạng thái</p><p>' +
//     printer1.status +
//     '</p></div><div class="flex flex-row justify-between"><p>Chế độ</p><p>' +
//     printer1.mode +
//     '</p></div><div class="flex flex-row justify-between"><p>Thời gian hoạt động</p><p>' +
//     printer1.uptimeSince +
//     '</p></div>',
//   );
//   $('#manage-printer-actions').html(
//     `
//     <button
//       id="report-printer"
//       type="button"
//       class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
//     >
//       Báo lỗi
//     </button>
//     <button
//       id="printer-log"
//       type="button"
//       class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
//     >
//       Xem nhật kí hoạt động
//     </button>
//     <button
//       id="disable-printer"
//       type="button"
//       class="items inline-flex gap-x-3 rounded-full bg-red-700 px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-red-600 hover:shadow-3 active:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 dark:active:bg-red-600"
//     >
//       Vô hiệu hóa
//     </button>
//     `,
//   );
// });

function addPrinter() {
  $('#add-printer').on('click', function () {
    $('#manage-printer').html(`
    <p id="printer-name" class="text-xl font-bold">Máy in</p>
    <div id="manage-printer-body" class="flex flex-col space-y-2 transition-all">
    <!-- <p>Chưa có máy in được thêm vào.</p> -->
  </div>
  
  <div id="manage-printer-actions" class="flex w-full flex-wrap items-center justify-end gap-y-3 space-x-3">
    <button id="add-printer" type="button"
      class="items inline-flex gap-x-3 rounded-full bg-button-primary px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark">
      Thêm máy in
    </button>
  </div>`);
    $('#printer-name').text('Thêm máy in');
    $('#manage-printer-body').html(
      `<p class="text-sm font-bold text-gray-600 dark:text-gray-300">Chi tiết</p>
      <hr class="border w-full" />
      <div class="flex flex-row justify-between">
        <p>Hãng</p> 
        <input type="text" id="brand">
      </div>
      <div class="flex flex-row justify-between">
        <p>Loại</p>
        <input type="text"  id="model">
      </div>
      <div class="flex flex-row justify-between">
        <p>Mô tả</p>
        <input type="text" id="des">
      </div>
      <div class="flex flex-row justify-between">
        <p>Địa chỉ</p>
        <input type="text" id="address">
      </div>
      <div class="flex flex-row justify-between">
        <p>Trạng thái</p>
        <input type="checkbox" id="status">
      </div>`,
    );
    $('#manage-printer-actions').html(
      `
      <button
        id="report-printer"
        type="button"
        class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
      >
        Xác nhận
      </button>
      
      `,
    );
    $('#report-printer').on('click', function () {
      var brandValue = $('#brand').val();
      var modelValue = $('#model').val();
      var desValue = $('#des').val();
      var addressValue = $('#address').val();
      var statusValue = $('#status').prop('checked');
      let data = {
        brand: brandValue,
        model: modelValue,
        shortDescription: desValue,
        location: addressValue,
        printerStatus: statusValue,
      };
      $.post('http://localhost:3000/spso/printer', JSON.stringify(data))
        .done(function (data) {
          console.log(data.data);
          window.location.reload();
        })
        .fail(function (xhr, status, error) {
          console.log(xhr.status);
          console.log(xhr.responseJSON);
        });
    });
  });
}

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

function loadPrinter() {
  $.get(url + '/spso/printer')
    .done(function (data) {
      printers = data.data;
      var str = ``;
      printers.forEach((el, index) => {
        str +=
          `<div class="flex flex-row space-x-2 items-center">
            <span class="w-8">
          ` +
          index +
          `
          </span>
          <span class="w-28 text-left xl:w-32 2xl:w-36">
          ` +
          el.brand +
          `
          </span>
          <span class="w-40 text-left xl:w-44 2xl:w-48">
          ` +
          el.model +
          `
          </span>
          <span class="w-40 text-left xl:w-44 2xl:w-48">
          ` +
          el.location +
          `
          </span>
          <span class="w-40 text-left xl:w-44 2xl:w-48">
        ` +
          el.shortDescription +
          `
          </span>
          <div class=" flex flex-row space-x-5 w-40 text-left xl:w-44 2xl:w-48">
            <div class="flex flex-row space-x-3 items-center py-1">
              `;
        if (el.printerStatus === true) {
          str +=
            `<input data-id="` +
            el._id +
            `" checked class="printer-status" type="checkbox" value="" class="w-4 h-4 text-blue-primary bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" >`;
        } else {
          str +=
            `<input class="printer-status" data-id="` +
            el._id +
            `" type="checkbox" value="" class="w-4 h-4 text-blue-primary bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" >`;
        }
        str +=
          `
          </div>
          <!-- <button class="edit" data-printer="` +
          el._id +
          `" data-id="` +
          index +
          `" class="w-40 text-left xl:w-44 2xl:w-48">
            Sửa
          </button> -->
          <button class="delete" data-printer="` +
          el._id +
          `" data-id="` +
          index +
          `" class="w-40 text-left xl:w-44 2xl:w-48">
            Xóa
          </button>
        </div>
      </div>`;
        $('#manage-printer-body').html(str);
      });
    })
    .fail(function (xhr, status, error) {
      console.log(xhr.status);
      console.log(xhr.responseJSON.error.message);
    });
}
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
          .fail((xhr, text, error) => { });
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
setTimeout(function () {
  var PrinterQueue = [];
  if (localStorage.getItem('queue')) {
    PrinterQueue = JSON.parse(localStorage.getItem('queue'));
  }

  let str = '';
  str += `
          <div class="flex w-full flex-row items-center justify-between pb-2" >
  <p class="text-xl font-bold">Hàng đợi máy in</p>
  <button
    type="button"
    class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
  >
    Xem tất cả
  </button>
</div >
<div class="flex flex-row space-x-2 max-md:hidden">
  <p
    class="w-20 shrink-0 text-sm font-bold text-gray-600 dark:text-gray-300 xl:w-28"
  >
    MSSV
  </p>
  <p class="grow text-sm font-bold text-gray-600 dark:text-gray-300">
    Tiêu đề
  </p>
  <p
    class="w-28 shrink-0 text-sm font-bold text-gray-600 dark:text-gray-300 xl:w-32"
  >
    Số trang
  </p>
  <p
    class="w-28 shrink-0 text-sm font-bold text-gray-600 dark:text-gray-300 xl:w-32"
  >
    Tình trạng
  </p>
  <div class="w-9 shrink-0"></div>
</div>
<hr class="w-full border" />
        `;
  if (PrinterQueue.length == 0) {
    str += '<p>Bạn không có mục nào trong hàng đợi</p>';
  } else {
    PrinterQueue.forEach((el, index) => {
      if (el.printOrder['status'] == false) {
        str +=
          `<div class="flex flex-col space-y-2" >
          <div
            class="flex py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
          >
            <p class="w-20 shrink-0 max-md:order-2 max-md:text-right xl:w-28">
              ` +
          el.user +
          `
            </p>
            <p class="w-8/12 truncate max-md:order-1 md:w-full">
              ` +
          el.printOrder['fileName'] +
          `
            </p>
            <div class="div flex flex-row space-x-2 max-md:order-3">
              <p class="w-fit shrink-0 md:w-28 xl:w-32">` +
          el.printOrder['printProperties']['numberOfPages'] +
          ` trang</p>
              <p class="w-fit shrink-0 md:hidden md:w-20 xl:w-28">•</p>
              <p class="w-fit shrink-0 md:w-28 xl:w-32">
                `
        if (el.printOrder['status'] == false) {
          str += 'Chưa in'
        }
        if (el.printOrder['status'] == true) {
          str += 'Đang in'
        }
        if (el.printOrder['status'] == 1) {
          str += 'Chưa lấy'
        }
        if (el.printOrder['status'] == 2) {
          str += 'Đã lấy'
        }
        str += `</p>
            </div>

            <div class="w-9 shrink-0 max-md:hidden">Xem</div>
          </div>`;
      }
    });
  }

  str += `
  </div >
          <div class="flex w-full flex-row items-center justify-end space-x-3">
            <button
              id="pause-print"
              type="button"
              class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
            >
              Tạm dừng in
            </button>
            <button
              id="stop-print"
              type="button"
              class="items dark:active:bg-red-6000 inline-flex gap-x-3 rounded-full bg-red-700 px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-red-600 hover:shadow-3 active:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700"
            >
              Dừng in
            </button>
          </div>`;
  $('#printer-queue').html(str);
}, 2000);
function changeStatusPrinter() {
  // Use document or a static parent container that exists when the page loads
  $(document).on('change', '.printer-status', function () {
    const id = $(this).data('id');

    const data = { status: String($(this).prop('checked')) };
    $.patch('http://localhost:3000/spso/printer/' + id, JSON.stringify(data))
      .done(() => {
        window.location.reload();
      })
      .fail(() => {
        console.log(xhr.status);
        console.log(xhr.responseJSON.error.message);
      });
  });
}

// function editPrinter() {
//   $(document).on('click', '.edit', function () {
//     let idPrinter = $(this).attr('data-printer');
//     let index = $(this).attr('data-id');
//     $('#manage-printer').html(`
//       <p id="printer-name" class="text-xl font-bold">Máy in</p>
//       <div id="manage-printer-body" class="flex flex-col space-y-2 transition-all">
//       <!-- <p>Chưa có máy in được thêm vào.</p> -->
//     </div>

//     <div id="manage-printer-actions" class="flex w-full flex-wrap items-center justify-end gap-y-3 space-x-3">
//       <button id="add-printer" type="button"
//         class="items inline-flex gap-x-3 rounded-full bg-button-primary px-6 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark">
//         Thêm máy in
//       </button>
//     </div>`)
//     $('#printer-name').text('Chỉnh máy in');
//     $('#manage-printer-body').html(
//       `<p class="text-sm font-bold text-gray-600 dark:text-gray-300">Chi tiết</p>
//         <hr class="border w-full" />
//         <div class="flex flex-row justify-between">
//           <p>Hãng</p>
//           <input type="text" value=`+ printers[index].brand + ` id="brand">
//         </div>
//         <div class="flex flex-row justify-between">
//           <p>Loại</p>
//           <input type="text" value=`+ printers[index].model + `  id="model">
//         </div>
//         <div class="flex flex-row justify-between">
//           <p>Mô tả</p>
//           <input type="text" value=`+ printers[index].location + ` id="des">
//         </div>
//         <div class="flex flex-row justify-between">
//           <p>Địa chỉ</p>
//           <input type="text" value=`+ printers[index].shortDescription + ` id="address">
//         </div>
//         <div class="flex flex-row justify-between">
//           <p>Trạng thái</p>
//           <input type="checkbox" `+ (printers[index].printerStatus === true ? "checked" : "") + ` id="status">
//         </div>`,
//     );
//     $('#manage-printer-actions').html(
//       `
//         <button
//           id="report-printer"
//           type="button"
//           class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
//         >
//           Xác nhận
//         </button>

//         `,
//     );
//     $('#report-printer').on('click', function () {
//       var brandValue = $('#brand').val();
//       var modelValue = $('#model').val();
//       var desValue = $('#des').val();
//       var addressValue = $('#address').val();
//       var statusValue = $('#status').prop('checked');
//       let data = {
//         brand: brandValue,
//         model: modelValue,
//         shortDescription: desValue,
//         location: addressValue,
//         printerStatus: statusValue,
//       }
//       $.post('http://localhost:3000/spso/printer', JSON.stringify(data))
//         .done(function (data) {
//           console.log(data.data);
//           window.location.reload()
//         })
//         .fail(function (xhr, status, error) {
//           console.log(xhr.status);
//           console.log(xhr.responseJSON);
//         });
//     })

//   });
// }
function deletePrinter() {
  $(document).on('click', '.delete', function () {
    let idPrinter = $(this).attr('data-printer');
    $.delete('http://localhost:3000/spso/printer/' + idPrinter)
      .done((data) => {
        console.log(data);
        window.location.reload();
      })
      .fail(() => { });
  });
}
