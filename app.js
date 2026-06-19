const APP_VERSION = "5.0.0";
const STORAGE_KEY = "stewardship_os_v5";

const ZONES = ["Push", "Pull", "Legs", "Hinge", "Carry", "Mobility"];

const DEFAULT_DATA = {
  settings: {
    cycleDay: 1,
    activeExerciseIndex: 0,
    currentSet: 1,
    singleWorkingSetMode: true,
    targetBodyweight: 220
  },

  cycleDays: [
    {
      day: 1,
      title: "Push",
      mission: "Build pressing strength and upper body capacity.",
      zones: ["Push"],
      exercises: ["Dumbbell Bench Press", "TRX Push Up", "Dumbbell Shoulder Press"],
      minimum: ["Push Ups", "Walk", "Mobility"]
    },
    {
      day: 2,
      title: "Pull",
      mission: "Build pulling strength, grip, and upper back.",
      zones: ["Pull"],
      exercises: ["Pull Ups", "TRX Row", "One Arm Dumbbell Row", "Dead Hang"],
      minimum: ["TRX Row", "Dead Hang", "Walk"]
    },
    {
      day: 3,
      title: "Legs + Hinge",
      mission: "Build lower body strength and posterior chain capacity.",
      zones: ["Legs", "Hinge"],
      exercises: ["Goblet Squat", "Bulgarian Split Squat", "Dumbbell Romanian Deadlift", "TRX Assisted Pistol Squat"],
      minimum: ["Goblet Squat", "Walk", "Mobility"]
    },
    {
      day: 4,
      title: "Mobility",
      mission: "Restore movement and prepare the body for future toil.",
      zones: ["Mobility"],
      exercises: ["Dead Hang", "TRX Deep Squat Hold", "90/90 Hip Rotation", "Couch Stretch", "Thoracic Rotation"],
      minimum: ["Walk", "Couch Stretch", "Prayer Walk"]
    },
    {
      day: 5,
      title: "Carry + Core",
      mission: "Build practical strength, grip, and trunk stiffness.",
      zones: ["Carry", "Core"],
      exercises: ["Farmer Carry", "Suitcase Carry", "TRX Body Saw", "Front Plank"],
      minimum: ["Farmer Carry", "Front Plank", "Walk"]
    },
    {
      day: 6,
      title: "Recovery",
      mission: "Restore and prepare without adding fatigue.",
      zones: ["Recovery"],
      exercises: ["Walk", "Stretch", "Prayer Walk", "Family Walk"],
      minimum: ["Walk", "Stretch", "Faith", "Family"]
    },
    {
      day: 7,
      title: "Push",
      mission: "Return to pressing work stronger than last time.",
      zones: ["Push"],
      exercises: ["Dumbbell Bench Press", "TRX Push Up", "Dumbbell Shoulder Press"],
      minimum: ["Push Ups", "Walk", "Mobility"]
    },
    {
      day: 8,
      title: "Pull",
      mission: "Return to pulling work stronger than last time.",
      zones: ["Pull"],
      exercises: ["Pull Ups", "TRX Row", "One Arm Dumbbell Row", "Dead Hang"],
      minimum: ["TRX Row", "Dead Hang", "Walk"]
    },
    {
      day: 9,
      title: "Legs + Hinge",
      mission: "Return to lower body work stronger than last time.",
      zones: ["Legs", "Hinge"],
      exercises: ["Goblet Squat", "Bulgarian Split Squat", "Dumbbell Romanian Deadlift", "TRX Assisted Pistol Squat"],
      minimum: ["Goblet Squat", "Walk", "Mobility"]
    },
    {
      day: 10,
      title: "Mobility / Reset",
      mission: "Reset the body and prepare for the next circuit.",
      zones: ["Mobility"],
      exercises: ["Dead Hang", "TRX Deep Squat Hold", "90/90 Hip Rotation", "Couch Stretch", "Thoracic Rotation"],
      minimum: ["Walk", "Stretch", "Faith", "Family"]
    }
  ],

  exerciseLibrary: [
    createExercise("Dumbbell Bench Press", "Push", "Bench, Dumbbells", "Weight + Reps", "Primary horizontal pressing movement.", "Builds chest, shoulders, triceps, and total pressing strength.", ["Feet planted", "Shoulder blades back", "Lower under control", "Drive through lockout"], ["TRX Push Up", "Push Up", "Floor Press"]),
    createExercise("TRX Push Up", "Push", "TRX, Bodyweight", "Reps", "Bodyweight pressing with instability.", "Develops chest, shoulders, triceps, and core control.", ["Body straight", "Hands under shoulders", "Lower with control", "Press smoothly"], ["Push Up", "Dumbbell Bench Press"]),
    createExercise("Dumbbell Shoulder Press", "Push", "Dumbbells", "Weight + Reps", "Primary vertical pressing movement.", "Builds shoulder strength and stability.", ["Brace the trunk", "Press overhead", "Avoid excessive back arch", "Control the descent"], ["Pike Push Up", "TRX Push Up"]),
    createExercise("Push Ups", "Push", "Bodyweight", "Reps", "Simple bodyweight pressing standard.", "Keeps pressing strength available anywhere.", ["Straight line from shoulders to heels", "Chest near floor", "Full lockout"], ["TRX Push Up"]),

    createExercise("Pull Ups", "Pull", "Pull Up Bar", "Reps", "Primary upper body strength indicator.", "Builds pulling power, grip, and body control.", ["Begin from dead hang", "Pull elbows toward ribs", "Chin over bar", "Control descent"], ["TRX Row", "One Arm Dumbbell Row"]),
    createExercise("TRX Row", "Pull", "TRX", "Reps", "Horizontal pulling movement.", "Builds upper back and scapular control.", ["Body straight", "Pull chest to handles", "Pause briefly", "Lower with control"], ["One Arm Dumbbell Row", "Pull Ups"]),
    createExercise("One Arm Dumbbell Row", "Pull", "Bench, Dumbbell", "Weight + Reps", "Unilateral pulling strength.", "Builds lats, upper back, and grip.", ["Flat back", "Pull elbow toward hip", "Pause at top", "Lower under control"], ["TRX Row"]),
    createExercise("Dead Hang", "Mobility", "Pull Up Bar", "Duration", "Grip strength and shoulder decompression.", "Restores shoulders while building grip capacity.", ["Full hang", "Breathe slowly", "Keep ribs down", "Stop before pain"], ["TRX Lat Stretch"]),

    createExercise("Goblet Squat", "Legs", "Dumbbell", "Weight + Reps", "Primary squat movement.", "Builds leg strength and mobility simultaneously.", ["Dumbbell at chest", "Sit between hips", "Knees track over toes", "Stand tall"], ["TRX Assisted Squat", "Bodyweight Squat"]),
    createExercise("Bulgarian Split Squat", "Legs", "Bench, Dumbbells", "Weight + Reps", "Single leg strength.", "Improves balance and eliminates side-to-side weakness.", ["Rear foot elevated", "Front foot planted", "Lower under control", "Drive through front foot"], ["TRX Split Squat", "Step Up"]),
    createExercise("TRX Assisted Pistol Squat", "Legs", "TRX", "Reps", "Advanced single leg pattern.", "Develops strength through a deep range of motion.", ["Use straps lightly", "Control depth", "Keep heel planted", "Stand smoothly"], ["TRX Assisted Squat", "Bulgarian Split Squat"]),

    createExercise("Dumbbell Romanian Deadlift", "Hinge", "Dumbbells", "Weight + Reps", "Primary posterior chain movement.", "Builds hamstrings, glutes, and low back resilience.", ["Hips back", "Neutral spine", "Feel hamstring stretch", "Stand tall"], ["Single Leg RDL"]),
    createExercise("Single Leg RDL", "Hinge", "Dumbbell", "Weight + Reps", "Balance and posterior chain control.", "Builds hinge strength with stability.", ["Hips square", "Soft knee", "Reach long", "Stand with control"], ["Dumbbell Romanian Deadlift"]),

    createExercise("Farmer Carry", "Carry", "Dumbbells", "Weight + Duration", "Total body strength and grip.", "One of the most practical strength exercises.", ["Stand tall", "Shoulders packed", "Walk under control", "Do not rush"], ["Suitcase Carry"]),
    createExercise("Suitcase Carry", "Carry", "Dumbbell", "Weight + Duration", "Core stability and anti-rotation strength.", "Builds usable trunk strength and posture.", ["One weight at side", "Stay upright", "No leaning", "Walk slowly"], ["Farmer Carry"]),

    createExercise("Front Plank", "Core", "Bodyweight", "Duration", "Bracing and trunk stiffness.", "Supports strength transfer and back resilience.", ["Straight body", "Ribs down", "Squeeze glutes", "Breathe"], ["TRX Body Saw"]),
    createExercise("TRX Body Saw", "Core", "TRX", "Duration", "Advanced anterior core strength.", "Builds bracing strength under movement.", ["Forearms down", "Feet in straps", "Move slowly", "Keep hips level"], ["Front Plank"]),
    createExercise("TRX Fallout", "Core", "TRX", "Duration", "Anti-extension core strength.", "Strengthens the trunk while resisting collapse.", ["Brace hard", "Reach forward", "Control range", "Return with tension"], ["Front Plank"]),

    createExercise("Couch Stretch", "Mobility", "Bodyweight", "Duration", "Hip flexor mobility.", "Restores the front of the hips from sitting and squatting.", ["Rear knee near wall", "Squeeze glute", "Stay tall", "Breathe slowly"], ["Hip Flexor Stretch"]),
    createExercise("90/90 Hip Rotation", "Mobility", "Bodyweight", "Duration", "Hip internal and external rotation.", "Improves hip motion and lower body mechanics.", ["Sit tall", "Control both directions", "Do not force pain"], ["TRX Hip Opener"]),
    createExercise("Thoracic Rotation", "Mobility", "Bodyweight", "Duration", "Upper back mobility.", "Keeps shoulders and spine moving well.", ["Rotate through upper back", "Breathe into range", "Keep hips quiet"], ["TRX Thoracic Rotation"]),
    createExercise("TRX Deep Squat Hold", "Mobility", "TRX", "Duration", "Ankle, hip, and squat mobility.", "Restores a deep squat position with support.", ["Hold straps lightly", "Sink between hips", "Chest tall", "Breathe"], ["Deep Squat Hold"]),

    createExercise("Walk", "Recovery", "Bodyweight", "Duration", "Promote blood flow and recovery.", "Supports recovery without adding fatigue.", ["Easy pace", "Nasal breathing if possible", "Finish refreshed"], ["Family Walk", "Prayer Walk"]),
    createExercise("Stretch", "Recovery", "Bodyweight", "Duration", "General recovery work.", "Keeps the body moving and calm.", ["Move slowly", "Breathe", "Avoid forcing range"], ["Couch Stretch"]),
    createExercise("Family Walk", "Recovery", "Bodyweight", "Duration", "Recovery while investing in family.", "Combines restoration with presence.", ["Easy pace", "Phone away", "Stay present"], ["Walk"]),
    createExercise("Prayer Walk", "Recovery", "Bodyweight", "Duration", "Recovery, reflection, and prayer.", "Clears the mind and restores the body.", ["Walk easy", "Pray simply", "Return calm"], ["Walk"]),
    createExercise("Faith", "Recovery", "None", "Duration", "Daily spiritual practice.", "Keeps the system rooted beyond performance.", ["Read", "Pray", "Reflect"], []),
    createExercise("Family", "Recovery", "None", "Duration", "Intentional family presence.", "The work returns home.", ["Be present", "Serve simply", "Listen"], [])
  ],

  trainingLogs: [],
  bodyLogs: [],
  dailyCompletions: []
};

function createExercise(name, zone, equipment, trackingType, purpose, why, instructions, substitutions) {
  return {
    name,
    zone,
    equipment,
    trackingType,
    purpose,
    why,
    instructions,
    substitutions,
    archived: false
  };
}

function cloneDefaultData() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function getData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    const data = cloneDefaultData();
    saveData(data);
    return data;
  }

  try {
    const data = JSON.parse(saved);
    return normalizeData(data);
  } catch (error) {
    const data = cloneDefaultData();
    saveData(data);
    return data;
  }
}

function normalizeData(data) {
  const base = cloneDefaultData();
  data.settings = { ...base.settings, ...(data.settings || {}) };
  data.cycleDays = Array.isArray(data.cycleDays) && data.cycleDays.length === 10 ? data.cycleDays : base.cycleDays;
  data.exerciseLibrary = Array.isArray(data.exerciseLibrary) && data.exerciseLibrary.length ? data.exerciseLibrary : base.exerciseLibrary;
  data.trainingLogs = Array.isArray(data.trainingLogs) ? data.trainingLogs : [];
  data.bodyLogs = Array.isArray(data.bodyLogs) ? data.bodyLogs : [];
  data.dailyCompletions = Array.isArray(data.dailyCompletions) ? data.dailyCompletions : [];
  return data;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getCurrentDay() {
  const data = getData();
  return data.cycleDays.find(day => day.day === Number(data.settings.cycleDay)) || data.cycleDays[0];
}

function getExercise(name) {
  return getData().exerciseLibrary.find(exercise => exercise.name === name);
}

function getActiveExercisesForToday() {
  const data = getData();
  const day = getCurrentDay();
  return day.exercises
    .map(name => data.exerciseLibrary.find(exercise => exercise.name === name && exercise.archived !== true))
    .filter(Boolean);
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".bottomNav button").forEach(button => {
    button.classList.toggle("activeNav", button.dataset.screen === screenId);
  });

  renderAll();
}

function getRecoveryThreshold(zone) {
  const thresholds = {
    Push: 96,
    Pull: 96,
    Legs: 120,
    Hinge: 120,
    Carry: 96,
    Core: 48,
    Mobility: 24,
    Recovery: 0
  };
  return thresholds[zone] || 96;
}

function getReadiness(zone) {
  if (zone === "Recovery" || zone === "Core") {
    return { label: "Ready", className: "ready", hoursRemaining: 0 };
  }

  const logs = getData().trainingLogs
    .filter(log => log.zone === zone && log.failure === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!logs.length) {
    return { label: "Ready", className: "ready", hoursRemaining: 0 };
  }

  const lastDate = new Date(logs[0].date);
  const hoursSince = Math.floor((new Date() - lastDate) / 1000 / 60 / 60);
  const hoursRemaining = getRecoveryThreshold(zone) - hoursSince;

  if (hoursRemaining <= 0) {
  return {
    label: "Ready",
    className: "ready",
    hoursRemaining: 0
  };
}

if (hoursRemaining <= 12) {
  return {
    label: "Soon",
    className: "soon",
    hoursRemaining
  };
}

if (hoursRemaining <= 24) {
  return {
    label: "Tomorrow",
    className: "tomorrow",
    hoursRemaining
  };
}

return {
  label: "Recovering",
  className: "recovering",
  hoursRemaining
};
}

function getNextAction() {
  const day = getCurrentDay();
  const readiness = day.zones.map(zone => ({ zone, ...getReadiness(zone) }));
  const blocked = readiness.filter(item => item.label !== "Ready");

  if (day.zones.includes("Recovery")) {
    return { status: "status-green", title: "Restore and Prepare", detail: "Walk, stretch, faith, family." };
  }

  if (blocked.length > 0) {
    return {
      status: "status-yellow",
      title: "Restore and Prepare",
      detail: blocked.map(item => item.zone).join(", ") + " still recovering. Minimum Day recommended."
    };
  }

  return { status: "status-green", title: "Embrace the Toil", detail: "Warm up. One working set. True failure." };
}

function getBestByExercise(exerciseName) {
  const logs = getData().trainingLogs.filter(log => log.exercise === exerciseName);
  const bestReps = Math.max(0, ...logs.map(log => Number(log.reps) || 0));
  const bestDuration = Math.max(0, ...logs.map(log => Number(log.duration) || 0));
  const latest = logs.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  return { bestReps, bestDuration, latest };
}

function getStandard() {
  const pullUps = getBestByExercise("Pull Ups").bestReps;
  const deadHang = getBestByExercise("Dead Hang").bestDuration;
  const farmerCarry = getBestByExercise("Farmer Carry").bestDuration;

  if (pullUps >= 25 && deadHang >= 180 && farmerCarry >= 180) return "Beacon";
  if (pullUps >= 20 && deadHang >= 120 && farmerCarry >= 120) return "Gold";
  if (pullUps >= 15 && deadHang >= 90 && farmerCarry >= 90) return "Silver";
  if (pullUps >= 10 && deadHang >= 60 && farmerCarry >= 60) return "Bronze";
  return "Base";
}

function getFieldToImprove() {
  const standards = {
    Base: { pullUps: 10, deadHang: 60, farmerCarry: 60 },
    Bronze: { pullUps: 15, deadHang: 90, farmerCarry: 90 },
    Silver: { pullUps: 20, deadHang: 120, farmerCarry: 120 },
    Gold: { pullUps: 25, deadHang: 180, farmerCarry: 180 },
    Beacon: { pullUps: 25, deadHang: 180, farmerCarry: 180 }
  };

  const standard = getStandard();
  const target = standards[standard];
  const values = [
    { name: "Pull Ups", value: getBestByExercise("Pull Ups").bestReps, target: target.pullUps },
    { name: "Dead Hang", value: getBestByExercise("Dead Hang").bestDuration, target: target.deadHang },
    { name: "Farmer Carry", value: getBestByExercise("Farmer Carry").bestDuration, target: target.farmerCarry }
  ];

  const weakest = values
    .map(item => ({ ...item, ratio: item.target ? item.value / item.target : 1 }))
    .sort((a, b) => a.ratio - b.ratio)[0];

  return weakest ? weakest.name : "None";
}

function renderToday() {
  const day = getCurrentDay();
  const action = getNextAction();
  const standard = getStandard();

  document.getElementById("todayTitle").textContent = `Day ${day.day} · ${day.title}`;
  document.getElementById("todayMission").textContent = day.mission;
  document.getElementById("todayZones").innerHTML = day.zones.map(zone => `<span class="zonePill">${zone}</span>`).join("");

  document.getElementById("nextAction").innerHTML = `
    <div class="metric ${action.status}"><strong>${action.title}</strong></div>
    <div class="metric">${action.detail}</div>
  `;

  document.getElementById("todayExerciseList").innerHTML = getActiveExercisesForToday()
    .map(exercise => `
     <div class="focusCard">
  <strong>${exercise.name}</strong>
  <span>${exercise.purpose}</span>
</div>
    `).join("");

  document.getElementById("readinessList").innerHTML = ZONES
    .map(zone => {
      const readiness = getReadiness(zone);
     return `
  <div class="readinessRow">
    <strong>${zone}</strong>
    <span class="readinessPill ${readiness.className}">
      ${readiness.label}
    </span>
  </div>
`;
    }).join("");

  document.getElementById("currentStandard").innerHTML =
  `<div class="standardBadge standard-${standard.toLowerCase()}">
    <span>Current Standard</span>
    <strong>${standard}</strong>
  </div>`;

document.getElementById("fieldToImprove").innerHTML =
  `<div class="fieldCard">
    <span>Field To Improve</span>
    <strong>${getFieldToImprove()}</strong>
  </div>`;
}

function getTodaysGoal(exercise) {

  const best =
    getBestByExercise(exercise.name);

  if (
    best.bestReps === 0 &&
    best.bestDuration === 0
  ) {
    return "Establish Baseline";
  }

  if (
    exercise.trackingType.includes("Reps")
  ) {
    return (best.bestReps + 1) + " reps";
  }

  if (
    exercise.trackingType.includes("Duration")
  ) {
    return (best.bestDuration + 5) + " sec";
  }

  return "Improve Previous Result";

}
function renderTrain() {
  const data = getData();
  const day = getCurrentDay();
  const exercises = getActiveExercisesForToday();
  const index = Math.min(data.settings.activeExerciseIndex || 0, Math.max(exercises.length - 1, 0));
  data.settings.activeExerciseIndex = index;
  saveData(data);

  document.getElementById("trainDayTitle").textContent = `Day ${day.day} · ${day.title}`;

  const exercise = exercises[index];
const weightGroup =
  document.getElementById("weightGroup");

const repsGroup =
  document.getElementById("repsGroup");

const durationGroup =
  document.getElementById("durationGroup");

if (weightGroup) {
  weightGroup.style.display = "none";
}

if (repsGroup) {
  repsGroup.style.display = "none";
}

if (durationGroup) {
  durationGroup.style.display = "none";
}
  if (!exercise) {
    document.getElementById("currentExerciseDetail").innerHTML = `<div class="metric">No exercises assigned today.</div>`;
    document.getElementById("setLoggerCard").style.display = "none";
    return;
  }
if (
  exercise.trackingType.includes("Weight")
) {
  weightGroup.style.display = "block";
}

if (
  exercise.trackingType.includes("Reps")
) {
  repsGroup.style.display = "block";
}

if (
  exercise.trackingType.includes("Duration")
) {
  durationGroup.style.display = "block";
}
  document.getElementById("setLoggerCard").style.display = "block";

  const best = getBestByExercise(exercise.name);
  const latestText = best.latest ? formatResult(best.latest) : "No previous result";
  const bestText = formatBest(exercise, best);
const todaysGoal =
  getTodaysGoal(exercise);
  document.getElementById("currentExerciseDetail").innerHTML = `
    <div class="eyebrow">${exercise.zone} · ${exercise.trackingType}</div>
    <h2 class="exerciseTitle">${exercise.name}</h2>
    <p class="helpText"><strong>Purpose:</strong> ${exercise.purpose}</p>
    <p class="helpText"><strong>Why It Matters:</strong> ${exercise.why}</p>
    <ul class="cues">${exercise.instructions.map(cue => `<li>${cue}</li>`).join("")}</ul>
    <div class="resultGrid">
  <div class="resultCard">
    <span>Last</span>
    <strong>${latestText}</strong>
  </div>

  <div class="resultCard">
    <span>Best</span>
    <strong>${bestText}</strong>
  </div>

  <div class="resultCard goalCard">
    <span>Today's Goal</span>
    <strong>${todaysGoal}</strong>
  </div>
</div>
    <div class="metric"><strong>Substitutions:</strong> ${exercise.substitutions.length ? exercise.substitutions.join(", ") : "None"}</div>
  `;
}

function formatResult(log) {
  const parts = [];
  if (log.weight) parts.push(log.weight);
  if (log.reps) parts.push(`${log.reps} reps`);
  if (log.duration) parts.push(`${log.duration} sec`);
  if (log.failure) parts.push("Failure");
  return parts.length ? parts.join(" · ") : "Saved";
}

function formatBest(exercise, best) {
  if (exercise.trackingType.includes("Reps") && best.bestReps) return `${best.bestReps} reps`;
  if (exercise.trackingType.includes("Duration") && best.bestDuration) return `${best.bestDuration} sec`;
  return "No best yet";
}

function saveSet() {
  const data = getData();
  const exercises = getActiveExercisesForToday();
  const exercise = exercises[data.settings.activeExerciseIndex || 0];

  if (!exercise) {
    alert("No exercise selected.");
    return;
  }

  const log = {
    date: new Date().toISOString(),
    cycleDay: Number(data.settings.cycleDay),
    dayTitle: getCurrentDay().title,
    zone: exercise.zone,
    exercise: exercise.name,
    set: Number(data.settings.currentSet) || 1,
    weight: document.getElementById("setWeight").value.trim(),
    reps: document.getElementById("setReps").value.trim(),
    duration: document.getElementById("setDuration").value.trim(),
    failure: document.getElementById("setFailure").value === "true",
    notes: document.getElementById("setNotes").value.trim()
  };

  data.trainingLogs.push(log);

  const resultSummary = formatResult(log);

  document.getElementById("setWeight").value = "";
  document.getElementById("setReps").value = "";
  document.getElementById("setDuration").value = "";
  document.getElementById("setFailure").value = "true";
  document.getElementById("setNotes").value = "";

  if (data.settings.singleWorkingSetMode) {
    data.settings.activeExerciseIndex = Math.min((data.settings.activeExerciseIndex || 0) + 1, exercises.length - 1);
    data.settings.currentSet = 1;
  } else {
    data.settings.currentSet = (Number(data.settings.currentSet) || 1) + 1;
  }

  saveData(data);

  document.getElementById("setProgress").innerHTML = `<div class="metric"><strong>Saved:</strong> ${exercise.name} · ${resultSummary}</div>`;

  renderAll();
}

function moveExercise(direction) {
  const data = getData();
  const exercises = getActiveExercisesForToday();
  data.settings.activeExerciseIndex = Math.max(0, Math.min((data.settings.activeExerciseIndex || 0) + direction, exercises.length - 1));
  data.settings.currentSet = 1;
  saveData(data);
  renderTrain();
}

function completeDay(status = "Completed") {
  const data = getData();
  const today = new Date().toISOString().slice(0, 10);
  const existingIndex = data.dailyCompletions.findIndex(item => item.date === today);
  const completion = { date: today, cycleDay: data.settings.cycleDay, status };

  if (existingIndex >= 0) data.dailyCompletions[existingIndex] = completion;
  else data.dailyCompletions.push(completion);

  saveData(data);
  alert("Today's Toil saved.");
  renderAll();
}

function advanceCycleDay() {
  const data = getData();
  data.settings.cycleDay = data.settings.cycleDay >= 10 ? 1 : data.settings.cycleDay + 1;
  data.settings.activeExerciseIndex = 0;
  data.settings.currentSet = 1;
  saveData(data);
  renderAll();
  showScreen("todayScreen");
}

function renderReview() {
  const data = getData();
  const standard = getStandard();

  document.getElementById("strengthReview").innerHTML = `
    <div class="metric"><strong>Pull Ups:</strong> ${getBestByExercise("Pull Ups").bestReps}</div>
    <div class="metric"><strong>Dead Hang:</strong> ${getBestByExercise("Dead Hang").bestDuration} sec</div>
    <div class="metric"><strong>Farmer Carry:</strong> ${getBestByExercise("Farmer Carry").bestDuration} sec</div>
    <div class="metric"><strong>Standard:</strong> ${standard}</div>
    <div class="metric"><strong>Field To Improve:</strong> ${getFieldToImprove()}</div>
  `;

  const completed = data.dailyCompletions.filter(item => item.status === "Completed").length;
  const minimum = data.dailyCompletions.filter(item => item.status === "Minimum Day").length;
  const missed = data.dailyCompletions.filter(item => item.status === "Missed").length;

  document.getElementById("consistencyReview").innerHTML = `
    <div class="metric"><strong>Completed:</strong> ${completed}</div>
    <div class="metric"><strong>Minimum Days:</strong> ${minimum}</div>
    <div class="metric"><strong>Missed:</strong> ${missed}</div>
    <div class="metric"><strong>Total Training Logs:</strong> ${data.trainingLogs.length}</div>
  `;

  const latestBody = data.bodyLogs[data.bodyLogs.length - 1];
  document.getElementById("bodyReview").innerHTML = latestBody ? `
    <div class="metric"><strong>Weight:</strong> ${latestBody.weight || "No data"}</div>
    <div class="metric"><strong>Waist:</strong> ${latestBody.waist || "No data"}</div>
    <div class="metric"><strong>Sleep:</strong> ${latestBody.sleep || "No data"}</div>
  ` : `<div class="metric">No body metrics saved.</div>`;
}

function renderLibrary() {
  const data = getData();
  const activeExercises = data.exerciseLibrary.filter(exercise => exercise.archived !== true);

  document.getElementById("exerciseLibraryList").innerHTML = activeExercises.map(exercise => `
    <div class="libraryCard">
      <strong>${exercise.name}</strong>
      <div class="libraryMeta">${exercise.zone} · ${exercise.equipment} · ${exercise.trackingType}</div>
      <div class="helpText">${exercise.purpose}</div>
      <button class="secondaryButton" onclick="archiveExercise('${escapeForAttribute(exercise.name)}')">Archive</button>
    </div>
  `).join("");
}

function escapeForAttribute(value) {
  return String(value).replace(/'/g, "\\'");
}

function addExercise() {
  const data = getData();
  const name = document.getElementById("newExerciseName").value.trim();
  const zone = document.getElementById("newExerciseZone").value;
  const equipment = document.getElementById("newExerciseEquipment").value.trim();
  const trackingType = document.getElementById("newExerciseTracking").value;
  const purpose = document.getElementById("newExercisePurpose").value.trim();

  if (!name) {
    alert("Enter an exercise name.");
    return;
  }

  const existing = data.exerciseLibrary.find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
  const exerciseObject = createExercise(name, zone, equipment || "Custom", trackingType, purpose || "Custom exercise.", "Added by user.", ["Use clean form", "Stop before pain"], []);

  if (existing) Object.assign(existing, exerciseObject, { archived: false });
  else data.exerciseLibrary.push(exerciseObject);

  saveData(data);
  document.getElementById("newExerciseName").value = "";
  document.getElementById("newExerciseEquipment").value = "";
  document.getElementById("newExercisePurpose").value = "";
  renderLibrary();
  alert("Exercise saved.");
}

function archiveExercise(name) {
  const data = getData();
  const exercise = data.exerciseLibrary.find(item => item.name === name);
  if (!exercise) return;
  exercise.archived = true;
  saveData(data);
  renderLibrary();
}

function renderStewardship() {
  const data = getData();
  const day = getCurrentDay();
  document.getElementById("cycleControls").innerHTML = `
    <div class="metric"><strong>Current Day:</strong> ${day.day} · ${day.title}</div>
    <div class="metric"><strong>Single Working Set:</strong> ${data.settings.singleWorkingSetMode ? "On" : "Off"}</div>
  `;

  const today = new Date().toISOString().slice(0, 10);
  const completion = data.dailyCompletions.find(item => item.date === today);
  document.getElementById("dailyCompletionStatus").value = completion ? completion.status : "Pending";
}

function saveBodyMetrics() {
  const data = getData();
  data.bodyLogs.push({
    date: new Date().toISOString(),
    weight: document.getElementById("bodyWeight").value.trim(),
    waist: document.getElementById("waistMeasurement").value.trim(),
    sleep: document.getElementById("sleepHours").value.trim()
  });
  saveData(data);
  document.getElementById("bodyWeight").value = "";
  document.getElementById("waistMeasurement").value = "";
  document.getElementById("sleepHours").value = "";
  alert("Body metrics saved.");
  renderAll();
}

function saveCompletion() {
  completeDay(document.getElementById("dailyCompletionStatus").value);
}

function exportBackup() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "stewardship-os-v5-backup.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = event => {
    try {
      const data = JSON.parse(event.target.result);
      saveData(normalizeData(data));
      alert("Backup imported.");
      renderAll();
    } catch (error) {
      alert("Import failed. Check the backup file.");
    }
  };
  reader.readAsText(file);
}

function hardReset() {
  if (!confirm("Delete all Stewardship OS V5 data?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function printTodaySheet() {
  const day = getCurrentDay();
  const exercises = getActiveExercisesForToday();
  const rows = exercises.map(exercise => `
    <tr>
      <td><strong>${exercise.name}</strong><br><small>${exercise.purpose}</small></td>
      <td></td><td></td><td></td><td></td><td></td>
    </tr>
  `).join("");

  const html = `
    <html><head><title>Today's Toil</title>
    <style>
      body{font-family:Georgia,serif;padding:24px;color:#111;}
      h1{text-transform:uppercase;letter-spacing:1px;}
      h2{margin-top:0;}
      table{width:100%;border-collapse:collapse;margin-top:20px;}
      th,td{border:1px solid #555;padding:10px;text-align:left;vertical-align:top;}
      th{background:#eee;}
      .meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:16px 0;}
      .box{border:1px solid #555;padding:10px;min-height:42px;}
    </style></head><body>
      <h1>Stewardship OS</h1>
      <h2>Today's Toil · Day ${day.day} · ${day.title}</h2>
      <p><strong>You Reap What You Sow</strong></p>
      <p>${day.mission}</p>
      <div class="meta"><div class="box">Date:</div><div class="box">Bodyweight:</div><div class="box">Sleep:</div></div>
      <table>
        <thead><tr><th>Exercise</th><th>Weight</th><th>Reps</th><th>Duration</th><th>Failure</th><th>Notes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body></html>
  `;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.print();
}

function renderAll() {
  renderToday();
  renderTrain();
  renderReview();
  renderLibrary();
  renderStewardship();
}

function bindEvents() {
  document.querySelectorAll(".bottomNav button").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.screen));
  });

  document.getElementById("goTrainButton").onclick = () => showScreen("trainScreen");
  document.getElementById("printTodayButton").onclick = printTodaySheet;
  document.getElementById("saveSetButton").onclick = saveSet;
  document.getElementById("previousExerciseButton").onclick = () => moveExercise(-1);
  document.getElementById("nextExerciseButton").onclick = () => moveExercise(1);
  document.getElementById("completeDayButton").onclick = () => completeDay("Completed");
  document.getElementById("addExerciseButton").onclick = addExercise;
  document.getElementById("saveBodyButton").onclick = saveBodyMetrics;
  document.getElementById("saveCompletionButton").onclick = saveCompletion;
  document.getElementById("advanceCycleButton").onclick = advanceCycleDay;
  document.getElementById("exportButton").onclick = exportBackup;
  document.getElementById("importButton").onclick = () => document.getElementById("importFile").click();
  document.getElementById("importFile").onchange = event => {
    const file = event.target.files[0];
    if (file) importBackup(file);
  };
  document.getElementById("resetButton").onclick = hardReset;
}

document.addEventListener("DOMContentLoaded", () => {
  getData();
  bindEvents();
  renderAll();
  document.querySelector('[data-screen="todayScreen"]').classList.add("activeNav");
  console.log("Stewardship OS", APP_VERSION, "Initialized");
});
