/* eslint-disable require-jsdoc */
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import $ from 'jquery';

export function fileUpload(file) {
  if (window.location.href.indexOf('home') === -1) {
    window.location.href = './home.html';
  }
  $('#print-options').trigger('reset');
  $('#drop-zone').addClass('hidden');
  $('#uploaded').removeClass('hidden').addClass('flex');
  // await new Promise((r) => setTimeout(r, 2000));
  // eslint-disable-next-line
  const fileURL = URL.createObjectURL(file);
  // console.log(file.name, file.size);

  /* add file properties */

  const fname = file.name;
  const re = /(\.pdf|\.pdf)$/i;
  if (!re.exec(fname)) {
    // alert('File extension not supported!');
    throw new Error('unsupportedFileType');
  }
  let filePages;
  pdfjsLib.getDocument(fileURL).promise.then((document) => {
    filePages = document.numPages;
    // console.log(filePages);
    $('#upload-document-properties').html(
      '<p>' +
      file.name +
      '</p><p>' +
      formatBytes(file.size, 2) +
      ' • ' +
      filePages +
      ' trang</p>',
    );
  });
  $('html, body').animate({ scrollTop: 0 }, 'fast');
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// function fetchData() {
//   setTimeout(2000);
// }

// function loadQueue() {
//   $(window)
//     .delay(2000)
//     .then(() => {
//       $('#queue-content').html('');
//     });
//   // const data = [
//   //   {
//   //     fileName: 'Lab4_RelationalAlgebra.pdf',
//   //     location: 'H1-203',
//   //     status: 'Đang đợi lấy',
//   //     remainingTime: '0',
//   //   },
//   //   {
//   //     fileName: 'Lab4_RelationalAlgebra.pdf',
//   //     location: 'H1-203',
//   //     status: 'Đang đợi lấy',
//   //     remainingTime: '0',
//   //   },
//   //   {
//   //     fileName: 'Lab4_RelationalAlgebra.pdf',
//   //     location: 'H1-203',
//   //     status: 'Đang đợi lấy',
//   //     remainingTime: '0',
//   //   },
//   // ];
//   // data.forEach(() => {
//   //   let item = '<div>';
//   // });
// }

$('#expand-print-options').on('click', () => {
  if ($('#print-options').hasClass('invisible')) {
    $('#print-options')
      .removeClass('invisible max-h-0 opacity-0')
      .addClass('max-h-[1000px] opacity-100');
    $('#expand-print-options-arrow').removeClass('rotate-180');
    $('#expand-print-options-arrow').addClass('rotate-0');
  } else {
    $('#print-options')
      .addClass('invisible max-h-0 opacity-0')
      .removeClass('max-h-[1000px] opacity-100');
    $('#expand-print-options-arrow').removeClass('rotate-0');
    $('#expand-print-options-arrow').addClass('rotate-180');
  }
});
setTimeout(function () {
  const Queue = [{
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 0,
    'status': 1
  }, {
    'title': "06_Ch6 System Modeling_2023.pdf",
    'location': "H1-203",
    'time': 2,
    'status': 0
  }, {
    'title': "Lab4_RelationalAlgebra.pdf",
    'location': "H1-203",
    'time': 6,
    'status': 0
  }]
  let str = ''
  Queue.forEach((el, index) => {
    str += `
    <div
                class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
              >
                <p class="w-3/4 min-w-0 truncate rounded-full md:w-full">
                  `+ el['title'] + `
                </p>
                <a
                  href=""
                  class="my-auto w-14 shrink-0 justify-end rounded-full text-right md:order-5 xl:w-16 2xl:w-20"
                  >Hủy</a
                >
                <div
                  class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                >
                  <p class="shrink-0 rounded-full md:w-24 xl:w-28 2xl:w-32">
                  `+ el['location'] + `
                  </p>
                  <div class="md:hidden">•</div>

                  <p class="w-28 shrink-0 rounded-full xl:w-32 2xl:w-36">
                  `
    if (el['status'] == -1) {
      str += 'Chưa in';
    }
    if (el['status'] == 0) {
      str += 'Đang in';
    }
    if (el['status'] == 1) {
      str += 'Đã in';
    }
    str += `
                  </p>
                  <p
                    class="w-24 shrink-0 rounded-full max-md:hidden xl:w-28 2xl:w-32"
                  >
                  `+ el['time'] + ` phút
                  </p>
                </div>
              </div>`});
  $('#queue-content').html(str);
}, 2000)
const data = [
  {
    'title': 'Chapter_5_V7.01_Accessible.pdf',
    'location': 'H1-203',
    'page': 23,
    'date': "T2, 30/10"
  }, {
    'title': 'Chapter_6_V7.01_Accessible.pdf',
    'location': 'H2-201',
    'page': 27,
    'date': "T7, 27/10"
  }, {
    'title': '05-2022-ĐỀ CƯƠNG MỚI-TƯ TƯỞNG HỒ CHÍ MINH-SP1037.pdf',
    'location': "H2-201",
    'page': 3,
    'date': "T4, 25/10"
  }, {
    'title': '6_SQL.pdf',
    'location': 'H3-402',
    'page': 45,
    'date': "T4, 25/10"
  }];
setTimeout(function () {
  let str = `<div class="flex w-full flex-row items-center justify-between pb-2">
    <p class="text-xl font-bold">Lịch sử</p>
  </div>
  <div class="flex flex-row">
    <p class="grow text-sm font-bold text-gray-600">Tiêu đề</p>
    <p class="basis-24 text-sm font-bold text-gray-600">Địa điểm</p>
    <p class="basis-28 text-sm font-bold text-gray-600">Số trang</p>
    <p class="basis-24 text-sm font-bold text-gray-600">Ngày</p>
  </div>
  <hr class="w-full border" />`;
  data.forEach((el, index) => {
    str += `<div class="flex flex-row py-1">
        <p class="grow truncate text-left">
          `+ el['title'] + `
        </p>
        <p class="shrink-0 basis-24">`+ el['location'] + `</p>
        <p class="shrink-0 basis-28">`+ el['page'] + ` trang</p>
        <p class="shrink-0 basis-24">`+ el['date'] + `</p>
      </div>`;
  })
  $('#history').html(str);
}, 2000);


