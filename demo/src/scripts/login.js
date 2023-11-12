/* eslint-disable require-jsdoc */
function User(name, imageURL, remainingPages, resetDate, userType = 'User') {
  this.name = name;
  this.avatar = imageURL;
  this.remainingPages = remainingPages;
  this.resetDate = resetDate;
  this.userType = userType;
}

// $('[name=submitButton]').on('submit', function (e) {
//   // e.preventDefault();
//   console.log('hehe');
//   const user = new User(
//     'Lê Nguyên Chương',
//     '../../assets/avatar.png',
//     '25',
//     '01-01-2024',
//     'User',
//   );
//   localStorage.setItem('userInfo', JSON.stringify(user));
//   // window.location.href = './home.html';
// });

// eslint-disable-next-line no-unused-vars
function userLogin(username, password) {
  const user = new User(
    'Lê Nguyên Chương',
    '../../assets/avatar.png',
    '25',
    '01-01-2024',
    'User',
  );
  localStorage.setItem('userInfo', JSON.stringify(user));
}
