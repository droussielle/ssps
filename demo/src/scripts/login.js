/* eslint-disable require-jsdoc */
function User(name, imageURL, remainingPages, resetDate, userType = 'User') {
  this.name = name;
  this.avatar = imageURL;
  this.remainingPages = remainingPages;
  this.resetDate = resetDate;
  this.userType = userType;
}

$('[name=submitButton]').on('click', function (e) {
  e.preventDefault();
  console.log('hehe');
  const user = new User(
    'Lê Nguyên Chương',
    '../../assets/avatar.png',
    '25',
    '01-01-2024',
    'User',
  );
  localStorage.setItem('userInfo', JSON.stringify(user));
  if (authorize) {
    window.location.href = './home.html';
  } else {
    console.log('bruh');
  }
});

// eslint-disable-next-line no-unused-vars
function authorize(username, password) {
  username;
  password;
  return true;
}
