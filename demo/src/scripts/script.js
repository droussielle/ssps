/* eslint-disable require-jsdoc */
/* load user info on page load */
$('document').ready(function () {
  if (!localStorage.getItem('userInfo')) {
    window.location.href = './login.html';
  } else {
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
  }
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
  const detailedUser = document.getElementById('user-card-expanded');
  detailedUser.classList.replace('duration-[150ms]', 'duration-[250ms]');
  detailedUser.classList.replace(
    'ease-m3-standard-accelerate',
    'ease-m3-standard-decelerate',
  );
  detailedUser.classList.replace('invisible', 'translate-y-10');
  detailedUser.classList.replace('opacity-0', 'opacity-100');
  detailedUser.classList.replace('rounded-lg', 'rounded-3xl');
  // detailedUser.classList.replace('space-y-3', 'space-y-5');
  // detailedUser.classList.toggle('border-x-[20px]');
  detailedUser.classList.toggle('pb-6');
  detailedUser.classList.toggle('pt-2');
  detailedUser.classList.toggle('scale-y-90');
});

/* Close detailed user card */
$('#user-card-expanded-close').on('click', function () {
  const detailedUser = document.getElementById('user-card-expanded');
  detailedUser.classList.replace('duration-[250ms]', 'duration-[150ms]');
  detailedUser.classList.replace(
    'ease-m3-standard-decelerate',
    'ease-m3-standard-accelerate',
  );
  detailedUser.classList.replace('translate-y-10', 'invisible');
  detailedUser.classList.replace('opacity-100', 'opacity-0');
  detailedUser.classList.replace('rounded-3xl', 'rounded-lg');
  // detailedUser.classList.replace('space-y-5', 'space-y-3');
  // detailedUser.classList.toggle('border-x-[20px]');
  detailedUser.classList.toggle('pb-6');
  detailedUser.classList.toggle('pt-2');
  detailedUser.classList.toggle('scale-y-90');
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
