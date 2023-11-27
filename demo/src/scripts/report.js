// nothing in here yet
/* eslint-disable require-jsdoc */
$(() => {
  // login()
  // setTimeout(() => {
  //   deletePrinter();
  // }, 1000)
  // changeStatusPrinter();
  // addPrinter();
  // loadPrinter();
  // getPrinter();
  // getStudent();
  // changePassword();
  // buyCredit();
  // setDefault();
  // getStaff();
});
function login() {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/account/login',
    data: {
      email: 'khoa.tran1805@hcmut.edu.vn',
      password: 'khoadeptrai',
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log('Đăng nhập thành công');
        localStorage.setItem('token', res.token);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function loadPrinter() {
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/spso/printer',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function addPrinter() {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/spso/printer',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    data: {
      brand: 'Cannon',
      model: 'unknown',
      shortDescription: 'Running just fine',
      location: 'H6-609',
      printerStatus: 'true',
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function changeStatusPrinter() {
  const id = '655cc41941b26a2ed8c9a6c8';
  $.ajax({
    type: 'patch',
    url: 'http://localhost:3000/spso/printer/' + id,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    data: {
      status: 'false',
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function deletePrinter() {
  const id = '655cb75ac7a7794fb5bfbc3d';
  $.ajax({
    type: 'delete',
    url: 'http://localhost:3000/spso/printer/' + id,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function getPrinter() {
  const id = '655cc41941b26a2ed8c9a6c8';
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/spso/printer/' + id,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function getStudent() {
  const id = '2113773';
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/spso/student/' + id,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
function changePassword() {
  var oldPass = 'khoadep';
  var newPass = 'khoadeptrai';
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/account/change-password',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    data: {
      oldPassword: oldPass,
      newPassword: newPass,
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.message);
      }
    },
  });
}
function buyCredit() {
  var increment = 5;
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/account/buy-credit',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    data: {
      increment: increment,
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.message);
      }
    },
  });
}
function setDefault() {
  var amount = 5;
  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/spso/set-default-pages',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    data: {
      amount: amount,
    },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.message);
      }
    },
  });
}
function getStaff() {
  const id = '2113773';
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/spso/staff/' + id,
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    dataType: 'JSON',
    success: function (res) {
      if (!res.error) {
        console.log(res.data);
      } else {
        console.log(res.error.msg);
      }
    },
  });
}
