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
function getRecoveryThreshold(group) {

  const thresholds = {
    Push: 48,
    Pull: 48,
    Legs: 72,
    Hinge: 72,
    Carry: 24,
    Mobility: 12
  };

  return thresholds[group] || 48;

}

function getRecoveryStatus(group) {

  const data = getData();

  const matchingLogs =
    data.trainingLogs.filter(
      log => log.group === group
    );

  if (matchingLogs.length === 0) {
    return "Ready";
  }

  const sortedLogs =
    matchingLogs.sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    );

  const lastDate =
    new Date(sortedLogs[0].date);

  const now =
    new Date();

  const hoursSince =
    Math.floor(
      (now - lastDate) / 1000 / 60 / 60
    );

  const threshold =
    getRecoveryThreshold(group);

  const hoursRemaining =
    threshold - hoursSince;

  if (hoursRemaining <= 0) {
    return "Ready";
  }

  if (hoursRemaining <= 12) {
    return "Ready Soon";
  }

  if (hoursRemaining <= 24) {
    return "Ready Tomorrow";
  }

  return "Recovering";

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
  "<div class='metric'>Push: " +
  getRecoveryStatus("Push") +
  "</div>" +
  "<div class='metric'>Pull: " +
  getRecoveryStatus("Pull") +
  "</div>" +
  "<div class='metric'>Legs: " +
  getRecoveryStatus("Legs") +
  "</div>" +
  "<div class='metric'>Hinge: " +
  getRecoveryStatus("Hinge") +
  "</div>" +
  "<div class='metric'>Carry: " +
  getRecoveryStatus("Carry") +
  "</div>" +
  "<div class='metric'>Mobility: " +
  getRecoveryStatus("Mobility") +
  "</div>";

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
// =====================
// LOGGING ENGINE
// =====================

function saveBodyMetrics() {

  const data = getData();

  const bodyEntry = {

    date: new Date().toISOString(),

    weight:
      document.getElementById(
        "bodyWeight"
      ).value,

    waist:
      document.getElementById(
        "waistMeasurement"
      ).value,

    sleep:
      document.getElementById(
        "sleepHours"
      ).value

  };

  data.bodyLogs.push(bodyEntry);

  saveData(data);

  alert("Body metrics saved.");

}
// V4.3 Recovery Group Logging Verified
function saveExerciseResult() {

  const data = getData();

  const selectedExercise =
    document.getElementById(
      "exerciseSelect"
    ).value;

  const exerciseDefinition =
    data.exerciseLibrary.find(
      exercise =>
        exercise.name === selectedExercise
    );

  const result = {

    date:
      new Date().toISOString(),

    exercise:
      selectedExercise,

    group:
      exerciseDefinition
        ? exerciseDefinition.category
        : "Unknown",

    weight:
      document.getElementById(
        "exerciseWeight"
      ).value,

    reps:
      document.getElementById(
        "exerciseReps"
      ).value,

    duration:
      document.getElementById(
        "exerciseDuration"
      ).value

  };

  data.trainingLogs.push(result);

  saveData(data);

  alert("Training result saved.");

}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const bodyButton =
      document.getElementById(
        "saveBodyButton"
      );

    if (bodyButton) {

      bodyButton.addEventListener(
        "click",
        saveBodyMetrics
      );

    }

    const exerciseButton =
      document.getElementById(
        "saveExerciseButton"
      );

    if (exerciseButton) {

      exerciseButton.addEventListener(
        "click",
        saveExerciseResult
      );

    }

  }
);
// =====================
// REVIEW ENGINE
// =====================

function getBestReps(exerciseName) {

  const data = getData();

  const results =
    data.trainingLogs.filter(
      log => log.exercise === exerciseName
    );

  if (results.length === 0) {
    return 0;
  }

  return Math.max(
    ...results.map(
      log => Number(log.reps) || 0
    )
  );

}

function getBestDuration(exerciseName) {

  const data = getData();

  const results =
    data.trainingLogs.filter(
      log => log.exercise === exerciseName
    );

  if (results.length === 0) {
    return 0;
  }

  return Math.max(
    ...results.map(
      log => Number(log.duration) || 0
    )
  );

}

function getLatestBodyMetric(metricName) {

  const data = getData();

  if (data.bodyLogs.length === 0) {
    return "No data";
  }

  const latest =
    data.bodyLogs[
      data.bodyLogs.length - 1
    ];

  return latest[metricName] || "No data";

}

function calculateStandard() {

  const pullUps =
    getBestReps("Pull Ups");

  const deadHang =
    getBestDuration("Dead Hang");

  if (
    pullUps >= 25 &&
    deadHang >= 120
  ) {
    return "Spartan";
  }

  if (
    pullUps >= 20 &&
    deadHang >= 120
  ) {
    return "Gold";
  }

  if (
    pullUps >= 15 &&
    deadHang >= 90
  ) {
    return "Silver";
  }

  if (
    pullUps >= 10 &&
    deadHang >= 60
  ) {
    return "Bronze";
  }

  return "Base";

}

function calculateWeakestGap() {

  const pullUps =
    getBestReps("Pull Ups");

  const deadHang =
    getBestDuration("Dead Hang");

  if (pullUps < 10) {
    return "Pull Ups";
  }

  if (deadHang < 60) {
    return "Dead Hang";
  }

  if (pullUps < 15) {
    return "Pull Ups";
  }

  if (deadHang < 90) {
    return "Dead Hang";
  }

  if (pullUps < 20) {
    return "Pull Ups";
  }

  if (deadHang < 120) {
    return "Dead Hang";
  }

  return "Strength Load";

}

function renderReview() {

  document.getElementById(
    "executionReview"
  ).innerHTML =
    "<div class='metric'>Execution tracking coming next.</div>";

  document.getElementById(
    "strengthReview"
  ).innerHTML =
    "<div class='metric'>Pull Ups: " +
    getBestReps("Pull Ups") +
    "</div>" +
    "<div class='metric'>Dead Hang: " +
    getBestDuration("Dead Hang") +
    " sec</div>" +
    "<div class='metric'>Current Standard: " +
    calculateStandard() +
    "</div>" +
    "<div class='metric'>Weakest Gap: " +
    calculateWeakestGap() +
    "</div>";

  document.getElementById(
    "bodyReview"
  ).innerHTML =
    "<div class='metric'>Weight: " +
    getLatestBodyMetric("weight") +
    "</div>" +
    "<div class='metric'>Waist: " +
    getLatestBodyMetric("waist") +
    "</div>" +
    "<div class='metric'>Sleep: " +
    getLatestBodyMetric("sleep") +
    "</div>";

}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderReview();

  }
);
// =====================
// SETTINGS ENGINE
// =====================

function saveSettings() {

  const data = getData();

  data.settings.targetBodyweight =
    document.getElementById(
      "targetBodyweight"
    ).value;

  data.settings.goal =
    document.getElementById(
      "goalMode"
    ).value;

  saveData(data);

  alert("Settings saved.");

}

function exportBackup() {

  const data = getData();

  const blob =
    new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "stewardship-os-backup.json";

  link.click();

}

function hardReset() {

  const confirmReset =
    confirm(
      "Delete all data?"
    );

  if (!confirmReset) {
    return;
  }

  localStorage.removeItem(
    STORAGE_KEY
  );

  location.reload();

}

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const settingsButton =
      document.getElementById(
        "saveSettingsButton"
      );

    if (settingsButton) {

      settingsButton.addEventListener(
        "click",
        saveSettings
      );

    }

    const exportButton =
      document.getElementById(
        "exportButton"
      );

    if (exportButton) {

      exportButton.addEventListener(
        "click",
        exportBackup
      );

    }

    const resetButton =
      document.getElementById(
        "resetButton"
      );

    if (resetButton) {

      resetButton.addEventListener(
        "click",
        hardReset
      );

    }

  }
);
// =====================
// V4.2 DAILY COMPLETION ENGINE
// =====================

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayLog() {
  const data = getData();
  const todayKey = getTodayKey();

  let log = data.dailyLogs.find(
    entry => entry.date === todayKey
  );

  if (!log) {
    log = {
      date: todayKey,
      training: "Pending",
      mobility: "Pending",
      faith: "Pending",
      family: "Pending"
    };

    data.dailyLogs.push(log);
    saveData(data);
  }

  return log;
}

function saveTodayCompletion() {
  const data = getData();
  const todayKey = getTodayKey();

  const updatedLog = {
    date: todayKey,
    training: document.getElementById("trainingCompletion").value,
    mobility: document.getElementById("mobilityCompletion").value,
    faith: document.getElementById("faithCompletion").value,
    family: document.getElementById("familyCompletion").value
  };

  const existingIndex = data.dailyLogs.findIndex(
    log => log.date === todayKey
  );

  if (existingIndex >= 0) {
    data.dailyLogs[existingIndex] = updatedLog;
  } else {
    data.dailyLogs.push(updatedLog);
  }

  saveData(data);

  renderCompletionReview();
  renderReview();

  alert("Daily completion saved.");
}

function renderDailyCompletion() {
  const log = getTodayLog();

  const trainingCompletion =
    document.getElementById("trainingCompletion");

  const mobilityCompletion =
    document.getElementById("mobilityCompletion");

  const faithCompletion =
    document.getElementById("faithCompletion");

  const familyCompletion =
    document.getElementById("familyCompletion");

  const saveCompletionButton =
    document.getElementById("saveCompletionButton");

  if (
    !trainingCompletion ||
    !mobilityCompletion ||
    !faithCompletion ||
    !familyCompletion ||
    !saveCompletionButton
  ) {
    return;
  }

  trainingCompletion.value = log.training;
  mobilityCompletion.value = log.mobility;
  faithCompletion.value = log.faith;
  familyCompletion.value = log.family;

  saveCompletionButton.onclick = saveTodayCompletion;
}

function calculateCompletionRate(type) {
  const data = getData();

  const logs = data.dailyLogs.filter(
    log => log[type] && log[type] !== "Pending"
  );

  if (logs.length === 0) {
    return "No data";
  }

  const score = logs.reduce((total, log) => {
    if (log[type] === "Complete") {
      return total + 1;
    }

    if (log[type] === "Modified") {
      return total + 0.5;
    }

    return total;
  }, 0);

  return Math.round((score / logs.length) * 100) + "%";
}

function renderCompletionReview() {
  const executionReview =
    document.getElementById("executionReview");

  if (!executionReview) {
    return;
  }

  executionReview.innerHTML =
    "<div class='metric'>Training: " +
    calculateCompletionRate("training") +
    "</div>" +
    "<div class='metric'>Mobility: " +
    calculateCompletionRate("mobility") +
    "</div>" +
    "<div class='metric'>Faith: " +
    calculateCompletionRate("faith") +
    "</div>" +
    "<div class='metric'>Family: " +
    calculateCompletionRate("family") +
    "</div>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderDailyCompletion();
  renderCompletionReview();
  renderReview();
});

const reviewButton = document.querySelector(
  '[data-screen="reviewScreen"]'
);

if (reviewButton) {
  reviewButton.addEventListener("click", function () {
    renderReview();
    renderCompletionReview();
  });
}
// =====================
// V4.2 EXERCISE LIBRARY ENGINE
// =====================

function getExerciseLibraryData() {
  const data = getData();

  if (!Array.isArray(data.exerciseLibrary)) {
    data.exerciseLibrary = [
      {
        name: "Pull Ups",
        category: "Upper",
        trackingType: "Reps",
        archived: false
      },
      {
        name: "Dead Hang",
        category: "Mobility",
        trackingType: "Duration",
        archived: false
      },
      {
        name: "Incline Press",
        category: "Upper",
        trackingType: "Weight + Reps",
        archived: false
      },
      {
        name: "Front Squat",
        category: "Lower",
        trackingType: "Weight + Reps",
        archived: false
      },
      {
        name: "RDL",
        category: "Lower",
        trackingType: "Weight + Reps",
        archived: false
      },
      {
        name: "Farmer Carry",
        category: "Carry",
        trackingType: "Weight + Duration",
        archived: false
      }
    ];

    saveData(data);
  }

  data.exerciseLibrary = data.exerciseLibrary.map(exercise => {
    return {
      name: exercise.name,
      category:
        exercise.category ||
        exercise.group ||
        "Upper",
      trackingType:
        exercise.trackingType ||
        exercise.tracking ||
        "Reps",
      archived: exercise.archived || false
    };
  });

  saveData(data);

  return data;
}

function renderExerciseDropdown() {
  const data = getExerciseLibraryData();

  const exerciseSelect =
    document.getElementById("exerciseSelect");

  if (!exerciseSelect) {
    return;
  }

  const activeExercises =
    data.exerciseLibrary.filter(
      exercise => exercise.archived !== true
    );

  exerciseSelect.innerHTML =
    activeExercises
      .map(exercise => {
        return (
          "<option value='" +
          exercise.name +
          "'>" +
          exercise.name +
          "</option>"
        );
      })
      .join("");
}

function renderExerciseLibraryList() {
  const data = getExerciseLibraryData();

  const list =
    document.getElementById("exerciseLibraryList");

  if (!list) {
    return;
  }

  const activeExercises =
    data.exerciseLibrary.filter(
      exercise => exercise.archived !== true
    );

  list.innerHTML =
    activeExercises
      .map(exercise => {
        return (
  "<div class='metric'>" +
  "<strong>" +
  exercise.name +
  "</strong><br>" +
  exercise.category +
  " · " +
  exercise.trackingType +
  "<br>" +
  "<button onclick=\"archiveExercise('" +
  exercise.name +
  "')\">" +
  "Archive" +
  "</button>" +
  "</div>"
);
      })
      .join("");
}
function addExerciseToLibrary() {

  const data = getExerciseLibraryData();

  const nameInput =
    document.getElementById("newExerciseName");

  const groupInput =
    document.getElementById("newExerciseGroup");

  const trackingInput =
    document.getElementById("newExerciseTracking");

  if (!nameInput || !groupInput || !trackingInput) {
    alert("Exercise library fields not found.");
    return;
  }

  const name = nameInput.value.trim();

  if (!name) {
    alert("Enter an exercise name.");
    return;
  }

  const existing =
    data.exerciseLibrary.find(
      exercise =>
        exercise.name.toLowerCase() ===
        name.toLowerCase()
    );

  if (existing) {
    existing.category = groupInput.value;
    existing.trackingType = trackingInput.value;
    existing.archived = false;
  } else {
    data.exerciseLibrary.push({
      name: name,
      category: groupInput.value,
      trackingType: trackingInput.value,
      archived: false
    });
  }

  saveData(data);

  nameInput.value = "";

  renderExerciseDropdown();
  renderExerciseLibraryList();

  alert("Exercise saved.");
}

function archiveExercise(name) {

  const data = getExerciseLibraryData();

  const exercise =
    data.exerciseLibrary.find(
      item => item.name === name
    );

  if (!exercise) {
    return;
  }

  exercise.archived = true;

  saveData(data);

  renderExerciseDropdown();
  renderExerciseLibraryList();

}

function initializeExerciseLibraryEngine() {

  renderExerciseDropdown();
  renderExerciseLibraryList();

  const addExerciseButton =
    document.getElementById("addExerciseButton");

  if (addExerciseButton) {
    addExerciseButton.onclick = addExerciseToLibrary;
  }

}

document.addEventListener("DOMContentLoaded", function () {
  initializeExerciseLibraryEngine();
});
