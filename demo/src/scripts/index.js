/* eslint-disable require-jsdoc */
import 'flowbite';
import $ from 'jquery';
import { fileUpload } from './home.js';

/* load user info on page load */
$(() => {
  if (!localStorage.getItem('userInfo')) {
    window.location.href = './login.html';
    throw new Error('userLogin');
  }
  const user = JSON.parse(localStorage.getItem('userInfo'));
  $('[id=user-name]')
    .text(user.name)
    .removeClass('h-4 w-[75%] animate-pulse rounded-full bg-gray-300 dark:bg-gray-700');
  $('[id=user-avatar]')
    .html('<img class="h-full aspect-square" src="' + user.avatar + '" />')
    .removeClass('animate-pulse bg-gray-300');
  $('[id=user-remaining-pages]')
    .text(user.remainingPages + '/' + user.remainingPages + ' trang còn lại')
    .removeClass('h-3 w-[60%] animate-pulse rounded-full bg-gray-300 dark:bg-gray-700');
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

/* enable dark mode */
$('#light-mode').on('click', function () {
  darkMode();
});

/* enable light mode */
$('#dark-mode').on('click', function () {
  lightMode();
});

/* buy more pages */
$('#add-pages').on('click', function () {
  window.location.href = './buy.html';
});

/* log out of the service */
$('#logout').on('click', function () {
  // logOut();
  localStorage.removeItem('userInfo');
  window.location.href = './login.html';
});

/* handle upload button event */
$('[id=uploadButton]').on('click', () => {
  $('#fileInput').trigger('click');
});

$('#fileInput').on('change', async function () {
  /* eslint-disable no-invalid-this */
  fileUpload(this.files[0]);
});
