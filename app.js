const APP_VERSION = "4.1.0";
const STORAGE_KEY = "stewardship_os_v41";

const DEFAULT_DATA = {

  settings: {
    cycleDay: 1,
    targetBodyweight: 220,
    goal: "Maintain"
  },

  cycleDays: [

    {
      day: 1,
      title: "Upper Strength",
      mission: "Build upper body strength.",
      training: [
        "Incline Press",
        "Pull Ups",
        "Row",
        "Farmer Carry"
      ],
      mobility: [
        "Dead Hang",
        "Pec Stretch",
        "T Spine Rotation"
      ],
      faith: "Daily Reading",
      family: "Family Check In",
      minimumDay: [
        "5 Pull Ups",
        "10 Push Ups",
        "5 Minute Walk"
      ]
    },

    {
      day: 2,
      title: "Lower Strength",
      mission: "Build lower body strength.",
      training: [
        "Front Squat",
        "RDL",
        "Split Squat"
      ],
      mobility: [
        "Hip Flexor",
        "Hamstring",
        "Ankle Mobility"
      ],
      faith: "Prayer",
      family: "Intentional Conversation",
      minimumDay: [
        "10 Squats",
        "5 Minute Walk"
      ]
    }

  ],

  exerciseLibrary: [

    {
      name: "Pull Ups",
      category: "Pull",
      trackingType: "Reps"
    },

    {
      name: "Dead Hang",
      category: "Mobility",
      trackingType: "Duration"
    },

    {
      name: "Incline Press",
      category: "Push",
      trackingType: "Weight + Reps"
    },

    {
      name: "Front Squat",
      category: "Legs",
      trackingType: "Weight + Reps"
    },

    {
      name: "RDL",
      category: "Hinge",
      trackingType: "Weight + Reps"
    },

    {
      name: "Farmer Carry",
      category: "Carry",
      trackingType: "Weight + Duration"
    }

  ],

  mobilityLibrary: [

    {
      name: "Dead Hang"
    },

    {
      name: "Pec Stretch"
    },

    {
      name: "T Spine Rotation"
    },

    {
      name: "Hip Flexor"
    },

    {
      name: "Hamstring"
    },

    {
      name: "Ankle Mobility"
    }

  ],

  dailyLogs: [],
  bodyLogs: [],
  trainingLogs: []

};

function getData() {

  const saved =
    localStorage.getItem(STORAGE_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return DEFAULT_DATA;

}

function saveData(data) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

}

function getCurrentDay() {

  const data = getData();

  return data.cycleDays.find(
    day =>
      day.day === data.settings.cycleDay
  );

}

function initializeApp() {

  const data = getData();

  if (!localStorage.getItem(STORAGE_KEY)) {

    saveData(data);

  }

  console.log(
    "Stewardship OS",
    APP_VERSION,
    "Initialized"
  );

}

initializeApp();
// =====================
// NAVIGATION ENGINE
// =====================

function showScreen(screenId) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  const target =
    document.getElementById(screenId);

  if (target) {
    target.classList.add("active");
  }

}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const navButtons =
      document.querySelectorAll(
        ".bottomNav button"
      );

    navButtons.forEach(button => {

      button.addEventListener(
        "click",
        function () {

          const screenId =
            this.dataset.screen;

          showScreen(screenId);

        }
      );

    });

  }
);
// =====================
// HOME RENDERER
// =====================

function renderList(items) {

  if (!items || items.length === 0) {
    return "<div class='metric'>None assigned</div>";
  }

  return items
    .map(item => {
      return "<div class='metric'>" + item + "</div>";
    })
    .join("");

}

function renderHome() {

  const data = getData();

  const day = getCurrentDay();

  if (!day) {
    return;
  }

  document.getElementById("homeDayTitle").textContent =
    "Day " + day.day + " · " + day.title;

  document.getElementById("homeMission").textContent =
    day.mission;

  document.getElementById("todayOrders").innerHTML =
    "<div class='metric'><strong>Training</strong></div>" +
    renderList(day.training) +
    "<div class='metric'><strong>Mobility</strong></div>" +
    renderList(day.mobility) +
    "<div class='metric'><strong>Faith</strong></div>" +
    "<div class='metric'>" + day.faith + "</div>" +
    "<div class='metric'><strong>Family</strong></div>" +
    "<div class='metric'>" + day.family + "</div>";

  document.getElementById("recoveryStatus").innerHTML =
    "<div class='metric'>Upper: Ready</div>" +
    "<div class='metric'>Lower: Ready</div>" +
    "<div class='metric'>Carry: Ready</div>";

  document.getElementById("currentStandard").innerHTML =
    "<div class='metric'>Base</div>";

  document.getElementById("weakestGap").innerHTML =
    "<div class='metric'>Pull Ups</div>";

  document.getElementById("nextBestAction").innerHTML =
    "<div class='metric'>Execute today’s assignment.</div>";

}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    renderHome();
  }
);
// =====================
// EXECUTE RENDERER
// =====================

function renderExecute() {

  const day = getCurrentDay();

  if (!day) {
    return;
  }

  document.getElementById(
    "executeTraining"
  ).innerHTML =
    renderList(day.training);

  document.getElementById(
    "executeMobility"
  ).innerHTML =
    renderList(day.mobility);

  document.getElementById(
    "executeFaith"
  ).innerHTML =
    "<div class='metric'>" +
    day.faith +
    "</div>";

  document.getElementById(
    "executeFamily"
  ).innerHTML =
    "<div class='metric'>" +
    day.family +
    "</div>";

  document.getElementById(
    "executeMinimum"
  ).innerHTML =
    renderList(day.minimumDay);

}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderExecute();

  }
);
