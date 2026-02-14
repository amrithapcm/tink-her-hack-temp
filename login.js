function doctorLogin() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "doctor" && pass === "1234") {
    window.location.href = "doctor.html";
  } else {
    alert("Invalid username or password");
  }
}