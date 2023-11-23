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
