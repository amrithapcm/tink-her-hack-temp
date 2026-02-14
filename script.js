let nextTokenNumber = 1;
let currentToken = 0;
let avgTimePerPatient = 5;
let isPaused = false;
let patientData = {};

const storedData = localStorage.getItem("patientData");
if (storedData) {
  patientData = JSON.parse(storedData);
}

function takeToken() {
  let name = document.getElementById("patientName").value;
  let age = document.getElementById("patientAge").value;
  let phone = document.getElementById("patientPhone").value;

  if (name === "" || age === "" || phone === "") {
  alert("Please enter name, age and phone number");
  return;
}

  let myToken = nextTokenNumber;

  patientData[myToken] = {
  name: name,
  age: age,
  phone: phone
};
localStorage.setItem("patientData", JSON.stringify(patientData));

  document.getElementById("patientDetails").innerText =
    "Name: " + name + " | Age: " + age;

  document.getElementById("patientToken").innerText =
    "Token Number: " + myToken;

  let peopleBeforeMe = myToken - currentToken - 1;
  let waitingMinutes = peopleBeforeMe * avgTimePerPatient;

  document.getElementById("waitingTime").innerText =
    "Estimated Waiting Time: " + waitingMinutes + " minutes";

  updateCrowdStatus();
  nextTokenNumber++;

  document.getElementById("patientName").value = "";
  document.getElementById("patientAge").value = "";
  document.getElementById("patientPhone").value = "";
}

function serveNext() {
  if (isPaused) return;

  currentToken++;
  document.getElementById("currentToken").innerText = currentToken;

  // 🔔 SMS simulation when token = currentToken + 3
  let notifyToken = currentToken + 3;

  if (patientData[notifyToken]) {
    let patient = patientData[notifyToken];

    alert(
      "📩 SMS Sent to " + patient.phone +
      "\nYour token number is " + notifyToken +
      ". Please reach the hospital soon."
    );
  }

  if (patientData[currentToken]) {
    document.getElementById("currentPatient").innerText =
      "Now Serving: " + patientData[currentToken].name +
      " (Age " + patientData[currentToken].age + ")";
  } else {
    document.getElementById("currentPatient").innerText =
      "Now Serving: —";
  }

  updateCrowdStatus();
}

function updateCrowdStatus() {
  let waitingPatients = nextTokenNumber - currentToken - 1;
  let statusText = "";
  let color = "";

  if (waitingPatients < 5) {
    statusText = "🟢 Low Crowd";
    color = "green";
  } else if (waitingPatients < 10) {
    statusText = "🟡 Medium Crowd";
    color = "orange";
  } else {
    statusText = "🔴 High Crowd";
    color = "red";
  }

  let statusElement = document.getElementById("crowdStatus");
  statusElement.innerText = "Crowd Status: " + statusText;
  statusElement.style.color = color;
}

function pauseQueue() {
  isPaused = true;
  document.getElementById("pauseStatus").innerText =
    "⛔ Queue Paused: Doctor Unavailable";
}

function resumeQueue() {
  isPaused = false;
  document.getElementById("pauseStatus").innerText =
    "✅ Queue Resumed: Doctor Available";
}
<script>
function openContact() {
  document.getElementById("contactPopup").style.display = "flex";
}

function openStaff() {
  document.getElementById("staffPopup").style.display = "flex";
}

function closePopups() {
  document.getElementById("contactPopup").style.display = "none";
  document.getElementById("staffPopup").style.display = "none";
}
</script>