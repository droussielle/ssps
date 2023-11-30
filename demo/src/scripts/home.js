/* eslint-disable require-jsdoc */
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import $, { queue } from 'jquery';
// import printJS from 'print-js';

let dropZone;

const authToken =
  'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token;
// console.log(authToken);

$.ajaxSetup({
  headers: {
    Authorization: authToken,
  },
});

export function fileUpload(file) {
  if (window.location.href.indexOf('home') === -1) {
    window.location.href = './home.html';
  }
  dropZone = $('#drop-zone').clone();
  const uploaded = `
  <div
    id="drop-zone"
    class="flex-col space-y-5 rounded-3xl bg-card-background p-6 text-left transition-transform dark:bg-card-background-dark sm:p-8"
  >
    <div class="flex flex-row items-center space-x-5">
      <p class="text-2xl font-bold">PDF</p>
      <div class="flex flex-col" id="upload-document-properties">
        <div
          class="mb-2 h-5 w-60 animate-pulse rounded-full bg-gray-300"
        ></div>
        <div
          class="h-4 w-36 animate-pulse rounded-full bg-gray-300"
        ></div>
      </div>
    </div>
    <form class="flex flex-col space-y-3" id="printer-select">
      <p>Chọn địa điểm</p>
    </form>
    <div
      class="flex flex-col rounded-xl p-3 shadow-1 transition hover:shadow-3"
    >
      <div
        class="flex cursor-pointer flex-col"
        id="expand-print-options"
      >
        <div class="flex flex-row items-center justify-between">
          <p>Tùy chọn in</p>
          <button
            class="rotate-180 items-center transition-transform"
            id="expand-print-options-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              class="dark:fill-dark-surface"
            >
              <path
                d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <form
        class="invisible grid max-h-0 grid-cols-1 items-center space-y-2 rounded-xl bg-card-background align-middle opacity-0 transition-all duration-300 ease-in-out dark:bg-card-background-dark sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-3"
        id="print-options"
      >
        <hr class="col-span-full mt-2" />
        <label
          for="print-options-orientation"
          class="my-2 block text-sm"
        >
          Hướng</label
        >
        <select
          id="print-options-orientation"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="portrait">Dọc</option>
          <option value="landscape">Ngang</option>
        </select>
        <label for="print-options-copies" class="mb-2 block text-sm">
          Bản sao</label
        >
        <select
          id="print-options-copies"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <label for="print-options-size" class="mb-2 block text-sm">
          Kích cỡ giấy</label
        >
        <select
          id="print-options-size"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option value="A3">A3</option>
          <option selected value="A4">A4</option>
          <option value="A5">A5</option>
          <option value="A6">A6</option>
        </select>
        <label for="print-options-color" class="mb-2 block text-sm">
          Màu</label
        >
        <select
          id="print-options-color"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="bw">Trắng đen</option>
          <option value="color">Màu</option>
        </select>
        <label
          for="print-options-pages-per-side"
          class="mb-2 block text-sm"
        >
          Số tờ mỗi mặt</label
        >
        <select
          id="print-options-pages-per-side"
          class="block w-full rounded-lg border-0 bg-gray-100 p-2.5 text-sm text-gray-900 mix-blend-multiply focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-dark-surface dark:mix-blend-screen"
        >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
        </select>
      </form>
    </div>
    <div class="flex w-full flex-row items-center justify-between">
      <button
        type="button"
        class="items inline-flex gap-x-3 rounded-full px-6 py-2.5 text-center text-black shadow-1 transition ease-out hover:bg-button-hover hover:shadow-3 active:bg-button-active dark:bg-button-dark dark:text-dark-surface dark:hover:bg-button-hover-dark dark:active:bg-button-active-dark"
        id="cancel-print"
      >
        Hủy
      </button>
      <button
        type="button"
        class="items inline-flex gap-x-1 rounded-full bg-button-primary px-5 py-2.5 text-center text-white shadow-1 transition ease-out hover:bg-button-primary-hover hover:shadow-3 active:bg-button-primary-active dark:bg-button-primary-dark dark:hover:bg-button-primary-hover-dark dark:active:bg-button-primary-active-dark"
        id="print"
        >
        Tiến hành in
        </button>
        </div>
        </div>
        `;
  $('#drop-zone').replaceWith(uploaded);

  // event handlers
  $('#cancel-print').on('click', () => {
    $('#drop-zone').replaceWith(dropZone.clone());
  });
  $('#print').on('click', () => {
    $('#drop-zone').replaceWith(dropZone.clone());
  });
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

  $('#print-options').trigger('reset');
  // eslint-disable-next-line
  const fileURL = URL.createObjectURL(file);
  // console.log(file.name, file.size);

  /* add file properties & verify file extensions */
  let filePages;
  const fname = file.name;
  const re = /(\.pdf|\.pdf)$/i;
  if (!re.exec(fname)) {
    throw new Error(
      'File type not supported! Please consult the help articles for more information.',
    );
  }
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

function loadQueue() {
  $.get('http://localhost:3000/account/printorders')
    .done(function (data) {
      $('#queue-content').html('');
      data.forEach((element) => {
        if (!element.status) {
          $.get('http://localhost:3000/spso/printer/' + element.printer).done(
            function (data) {
              const fileName = element.fileName;
              const queueLocation = data.data.location;
              const queueStatus =
                element.status === 'true' ? 'Đã in' : 'Đang xử lý';
              const queueETA =
                Date.parse(element.estimatedEndTime) - Date.now();
              const queueItem =
                `
                <div
                  class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
                >
                  <p class="w-3/4 min-w-0 truncate md:w-full">` +
                fileName +
                `</p>
                  <a
                    href=""
                    class="my-auto w-14 shrink-0 justify-end text-right md:order-5 xl:w-16 2xl:w-20"
                    >Hủy</a
                  >
                  <div
                    class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
                  >
                    <p class="shrink-0 truncate md:w-24 xl:w-28 2xl:w-32">` +
                queueLocation +
                `</p>
                    <div class="md:hidden">•</div>
                    <p class="w-28 shrink-0 truncate xl:w-32 2xl:w-36">` +
                queueStatus +
                `</p>
                    <p class="w-24 shrink-0 truncate max-md:hidden xl:w-28 2xl:w-32">
                      ` +
                queueETA +
                `
                    </p>
                  </div>
                </div>
              `;
              $('#queue-content').append(queueItem);
              // console.log(queueItem);
            },
          );
        }
      });
      // console.log(data);
    })
    .fail(() => {});
}

function loadHistory() {}

// load queue and history on page load
$(() => {
  loadQueue();
  loadHistory();
});

// setTimeout(function () {
//   const Queue = [
//     {
//       title: 'Lab4_RelationalAlgebra.pdf',
//       location: 'H1-203',
//       time: 0,
//       status: 1,
//     },
//     {
//       title: '06_Ch6 System Modeling_2023.pdf',
//       location: 'H1-203',
//       time: 2,
//       status: 0,
//     },
//     {
//       title: 'Lab4_RelationalAlgebra.pdf',
//       location: 'H1-203',
//       time: 6,
//       status: 0,
//     },
//   ];
//   let str = '';
//   Queue.forEach((el, index) => {
//     str +=
//       `
//     <div
//                 class="flex w-full items-center py-1 max-md:flex-wrap max-md:justify-between md:flex-row md:space-x-2"
//               >
//                 <p class="w-3/4 min-w-0 truncate rounded-full md:w-full">
//                   ` +
//       el['title'] +
//       `
//                 </p>
//                 <a
//                   href=""
//                   class="my-auto w-14 shrink-0 justify-end rounded-full text-right md:order-5 xl:w-16 2xl:w-20"
//                   >Hủy</a
//                 >
//                 <div
//                   class="flex w-full flex-row space-x-2 max-md:text-sm md:max-w-max"
//                 >
//                   <p class="shrink-0 rounded-full md:w-24 xl:w-28 2xl:w-32">
//                   ` +
//       el['location'] +
//       `
//                   </p>
//                   <div class="md:hidden">•</div>

//                   <p class="w-28 shrink-0 rounded-full xl:w-32 2xl:w-36">
//                   `;
//     if (el['status'] == -1) {
//       str += 'Chưa in';
//     }
//     if (el['status'] == 0) {
//       str += 'Đang in';
//     }
//     if (el['status'] == 1) {
//       str += 'Đã in';
//     }
//     str +=
//       `
//                   </p>
//                   <p
//                     class="w-24 shrink-0 rounded-full max-md:hidden xl:w-28 2xl:w-32"
//                   >
//                   ` +
//       el['time'] +
//       ` phút
//                   </p>
//                 </div>
//               </div>`;
//   });
//   $('#queue-content').html(str);
// }, 2000);

// const data = [
//   {
//     title: 'Chapter_5_V7.01_Accessible.pdf',
//     location: 'H1-203',
//     page: 23,
//     date: 'T2, 30/10',
//   },
//   {
//     title: 'Chapter_6_V7.01_Accessible.pdf',
//     location: 'H2-201',
//     page: 27,
//     date: 'T7, 27/10',
//   },
//   {
//     title: '05-2022-ĐỀ CƯƠNG MỚI-TƯ TƯỞNG HỒ CHÍ MINH-SP1037.pdf',
//     location: 'H2-201',
//     page: 3,
//     date: 'T4, 25/10',
//   },
//   {
//     title: '6_SQL.pdf',
//     location: 'H3-402',
//     page: 45,
//     date: 'T4, 25/10',
//   },
// ];

// setTimeout(function () {
//   let str = `<div class="flex w-full flex-row items-center justify-between pb-2">
//     <p class="text-xl font-bold">Lịch sử</p>
//   </div>
//   <div class="flex flex-row">
//     <p class="grow text-sm font-bold text-gray-600">Tiêu đề</p>
//     <p class="basis-24 text-sm font-bold text-gray-600">Địa điểm</p>
//     <p class="basis-28 text-sm font-bold text-gray-600">Số trang</p>
//     <p class="basis-24 text-sm font-bold text-gray-600">Ngày</p>
//   </div>
//   <hr class="w-full border" />`;
//   data.forEach((el, index) => {
//     str +=
//       `<div class="flex flex-row py-1">
//         <p class="grow truncate text-left">
//           ` +
//       el['title'] +
//       `
//         </p>
//         <p class="shrink-0 basis-24">` +
//       el['location'] +
//       `</p>
//         <p class="shrink-0 basis-28">` +
//       el['page'] +
//       ` trang</p>
//         <p class="shrink-0 basis-24">` +
//       el['date'] +
//       `</p>
//       </div>`;
//   });
//   $('#history').html(str);
// }, 2000);
