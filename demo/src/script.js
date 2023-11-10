/* eslint-disable require-jsdoc */
const isDarkMode = localStorage.getItem('darkMode');
if (isDarkMode == 'true') {
  darkMode();
} else {
  lightMode();
}

$('document').ready(function () {
  $('html').removeClass('invisible');
});

function User(name, imageURL, remainingPages, resetDate, userType = 'User') {
  this.name = name;
  this.avatar = imageURL;
  this.remainingPages = remainingPages;
  this.resetDate = resetDate;
  this.userType = userType;
}

function loadUserInfo() {
  const user = new User(
    'Lê Nguyên Chương',
    '../assets/avatar.png',
    '25',
    '01-01-2023',
    'User'
  );
  return user;
}

$('#user-card').on('click', function () {
  const detailedUser = document.getElementById('user-card-expanded');
  detailedUser.classList.replace('duration-[150ms]', 'duration-[250ms]');
  detailedUser.classList.replace(
    'ease-m3-standard-accelerate',
    'ease-m3-standard-decelerate'
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

$('#user-card-expanded-close').on('click', function () {
  const detailedUser = document.getElementById('user-card-expanded');
  detailedUser.classList.replace('duration-[250ms]', 'duration-[150ms]');
  detailedUser.classList.replace(
    'ease-m3-standard-decelerate',
    'ease-m3-standard-accelerate'
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
  lightMode();
});

$('#dark-mode').on('click', function () {
  darkMode();
});

function lightMode() {
  $('html').addClass('dark');
  $('#light-mode').addClass('hidden');
  $('#dark-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../assets/ssps-dark.png');
  localStorage.setItem('darkMode', 'false');
}

function darkMode() {
  $('html').removeClass('dark');
  $('#dark-mode').addClass('hidden');
  $('#light-mode').removeClass('hidden');
  $('#ssps-logo').attr('src', '../assets/ssps.png');
  localStorage.setItem('darkMode', 'true');
}

/* load user info on page load */
$('document').ready(function () {
  const user1 = loadUserInfo();
  $('[id=user-name]').text(user1.name);
  $('[id=user-avatar]').attr('src', user1.avatar);
  $('[id=user-remaining-pages]').text(
    user1.remainingPages + '/' + user1.remainingPages + ' trang còn lại'
  );
  $('[id=user-reset-date]').text('Đặt lại vào ' + user1.resetDate);
  if (user1.userType == 'Admin') {
    $('[id=user-type]')
      .removeClass('hidden')
      .text(user1.userType)
      .removeClass('bg-blue-secondary')
      .addClass('bg-blue-primary');
  }
  if (user1.userType == 'Staff') {
    $('[id=user-type]')
      .removeClass('hidden')
      .text(user1.userType)
      .removeClass('bg-blue-primary')
      .addClass('bg-blue-secondary');
  }
});

$('#add-pages').on('click', function () {
  window.location.href = './buy.html';
});
