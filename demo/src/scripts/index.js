/* eslint-disable require-jsdoc */
import 'flowbite';
import $ from 'jquery';
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';

/* load user info on page load */
$(() => {
  if (!localStorage.getItem('userInfo')) {
    window.location.href = './login.html';
    throw new Error('userLogin');
  }
  const user = JSON.parse(localStorage.getItem('userInfo'));
  $('[id=user-name]')
    .text(user.name)
    .removeClass('h-4 w-[75%] animate-pulse rounded-full bg-slate-300 ');
  $('[id=user-avatar]')
    .html('<img class="h-full" src="' + user.avatar + '" />')
    .removeClass('animate-pulse bg-slate-300');
  $('[id=user-remaining-pages]')
    .text(user.remainingPages + '/' + user.remainingPages + ' trang còn lại')
    .removeClass('h-3 w-[60%] animate-pulse rounded-full bg-slate-200');
  $('[id=user-remaining-pages-mobile]')
    .text(user.remainingPages + '/' + user.remainingPages)
    .removeClass('animate-pulse');
  $('[id=user-reset-date]').text('Đặt lại vào ' + user.resetDate);
  if (user.userType == 'Admin') {
    $('[id=user-type]')
      .removeClass('hidden')
      .text(user.userType)
      .removeClass('bg-blue-secondary')
      .addClass('bg-blue-primary');
  }
  if (user.userType == 'Staff') {
    $('[id=user-type]')
      .removeClass('hidden')
      .text(user.userType)
      .removeClass('bg-blue-primary')
      .addClass('bg-blue-secondary');
  }
  // loadQueue();
});

const isDarkMode = localStorage.getItem('darkMode');
if (isDarkMode == 'true') {
  darkMode();
} else {
  lightMode();
}

function lightMode() {
  $('html').removeClass('dark');
  $('#dark-mode').addClass('hidden');
  $('#light-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../../assets/ssps.png');
  localStorage.setItem('darkMode', 'false');
}

function darkMode() {
  $('html').addClass('dark');
  $('#light-mode').addClass('hidden');
  $('#dark-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../../assets/ssps-dark.png');
  localStorage.setItem('darkMode', 'true');
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

/* Open detailed user card */
$('#user-card').on('click', function () {
  $('#user-card-expanded')
    .removeClass(
      'duration-[150ms] ease-m3-standard-accelerate invisible opacity-0 rounded-lg scale-y-90',
    )
    .addClass(
      'duration-[250ms] ease-m3-standard-decelerate translate-y-10 opacity-100 rounded-3xl pb-6 pt-2',
    );
});

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

/* Close detailed user card */
$('#user-card-expanded-close').on('click', function () {
  $('#user-card-expanded')
    .removeClass(
      'duration-[250ms] ease-m3-standard-decelerate translate-y-10 opacity-100 rounded-3xl pb-6 pt-2',
    )
    .addClass(
      'duration-[150ms] ease-m3-standard-accelerate invisible opacity-0 rounded-lg scale-y-90',
    );
});

$('#light-mode').on('click', function () {
  darkMode();
});

$('#dark-mode').on('click', function () {
  lightMode();
});

$('#add-pages').on('click', function () {
  window.location.href = './buy.html';
});

$('#logout').on('click', function () {
  // logOut();
  localStorage.removeItem('userInfo');
  window.location.href = './login.html';
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

/* handling file upload */
$('#uploadButton').on('click', () => {
  $('#fileInput').trigger('click');
});
$('#fileInput').on('change', async function () {
  if (window.location.href.indexOf('home') === -1) {
    window.location.href = './home.html';
  }
  $('#print-options').trigger('reset');
  $('#drop-zone').addClass('hidden');
  $('#uploaded').removeClass('hidden').addClass('flex');
  // await new Promise((r) => setTimeout(r, 2000));
  // eslint-disable-next-line
  const file = this.files[0]; /* now you can work with the file list */
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
    console.log(filePages);
    $('#upload-document-properties').html(
      '<p>' +
        file.name +
        '</p><p>' +
        file.size +
        ' • ' +
        filePages +
        ' trang</p>',
    );
  });
});
