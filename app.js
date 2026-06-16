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
