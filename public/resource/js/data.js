let db = firebase.database();
let username, addr, phone, password, rpw;

$("#registerbtn").click(function () {
  let fname = document.getElementById(".sign_up_fname").val();
  let lname = document.getElementById(".sign_up_lname").val();
  username = fname + " " + lname;
  alert(username);
})