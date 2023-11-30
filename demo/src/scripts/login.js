/* eslint-disable require-jsdoc, no-unused-vars */
import $ from 'jquery';

const isEmpty = (str) => !str.trim().length;

class User {
  constructor(
    name,
    imageURL,
    remainingPages,
    resetDate,
    userType = 'student',
    token,
  ) {
    this.name = name;
    this.avatar = imageURL;
    this.remainingPages = remainingPages;
    this.resetDate = resetDate;
    this.userType = userType;
    this.token = token;
  }
}

$(() => {
  if (localStorage.getItem('userInfo')) {
    window.location.href = './home.html';
    return;
  }
});

$('[name=submitButton]').on('click', function (e) {
  e.preventDefault();
  // console.log('hehe');
  // const user = new User(
  //   'Lê Nguyên Chương',
  //   '../../assets/avatar.png',
  //   '25',
  //   '01-01-2024',
  //   'User',
  // );
  const username = $('#username').val();
  const password = $('#password').val();
  if (isEmpty(username) || isEmpty(password)) {
    $('[id=msg]').remove();
    const errorDiv = `
    <div
    id='msg'
    class='errors'
    style="background-color: rgb(255, 238, 221);"
    >
    Please fill in all of the required fields!
    </div>
    `;
    $('#fm1').prepend(errorDiv);
    // throw new Error('');
    return;
  }
  const body = {
    email: username,
    password: password,
  };
  $.post('http://localhost:3000/account/login', body)
    .done(function (data) {
      // console.log(data);
      const user = new User(
        data.name,
        '../../assets/avatar.png',
        '25',
        '01-01-2024',
        data.role,
        data.token,
      );
      localStorage.setItem('userInfo', JSON.stringify(user));
      window.location.href = './home.html';
    })
    .fail(() => {
      $('[id=msg]').remove();
      const errorDiv = `
    <div
    id='msg'
    class='errors'
    style="background-color: rgb(255, 238, 221);"
    >
    The credentials you provided cannot be determined to be authentic.
    </div>
    `;
      $('#fm1').prepend(errorDiv);
      // throw new Error(
      //   'Failed to authorize login information. Wrong username or password?',
      // );
      return;
    });
});
