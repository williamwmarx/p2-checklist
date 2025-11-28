export type Range = {
  label: string;
  min: number;
  max: number;
  unit: string;
};

export type SubStep = {
  id: string;
  label: string;
  instruction: string;
};

export type ChecklistItem = {
  id: string;
  number: number;
  title: string;
  section: "pre-dive-setup" | "not-diving" | "pre-dive-checks";
  substeps?: SubStep[];
  timerDuration?: number;
  ranges?: Range[];
  notes?: string;
};

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Pre-Dive Setup
  {
    id: "gas-cylinders",
    number: 1,
    title: "Install Analyzed + Labeled Gas Cylinders",
    section: "pre-dive-setup",
  },
  {
    id: "wrist-display-on",
    number: 2,
    title: "Turn On Wrist Display",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "3a",
        label: "A",
        instruction:
          "Check O₂ cell mV readings in air (3 presses right button)",
      },
      {
        id: "3b",
        label: "B",
        instruction: "Change to Setpoint 0.19",
      },
    ],
    ranges: [
      {
        label: "O₂ cell mV in air",
        min: 8.5,
        max: 14,
        unit: "mV",
      },
    ],
    notes: "Replace cells if outside acceptable range",
  },
  {
    id: "hud-on",
    number: 3,
    title: "Turn On HUD — Check Battery Status",
    section: "pre-dive-setup",
  },
  {
    id: "o2-leak-test",
    number: 4,
    title: "Oxygen System Leak Test",
    section: "pre-dive-setup",
    timerDuration: 30,
    substeps: [
      {
        id: "5a",
        label: "A",
        instruction: "Slowly open oxygen valve, pressurize hoses, close valve",
      },
      {
        id: "5b",
        label: "B",
        instruction: "Watch oxygen pressure gauge for pressure loss",
      },
      {
        id: "5c",
        label: "C",
        instruction: "Slowly open oxygen valve",
      },
    ],
    notes: "Hold for 30 seconds minimum",
  },
  {
    id: "negative-pressure",
    number: 5,
    title: "Negative Pressure Test",
    section: "pre-dive-setup",
    timerDuration: 60,
    substeps: [
      {
        id: "6a",
        label: "A",
        instruction: "Open DSV",
      },
      {
        id: "6b",
        label: "B",
        instruction:
          "Inhale from DSV in CC mode, exhaling through nose until counterlungs are fully collapsed",
      },
      {
        id: "6c",
        label: "C",
        instruction: "Close DSV",
      },
      {
        id: "6d",
        label: "D",
        instruction: "Allow to sit for one minute; watch for signs of leaks",
      },
    ],
    notes: "Hold for 1 minute minimum",
  },
  {
    id: "positive-pressure",
    number: 6,
    title: "Positive Pressure Test",
    section: "pre-dive-setup",
    timerDuration: 60,
    substeps: [
      {
        id: "7a",
        label: "A",
        instruction: "Close OPV",
      },
      {
        id: "7b",
        label: "B",
        instruction:
          "Fill loop fully with oxygen using manual oxygen addition valve until OPV vents",
      },
      {
        id: "7c",
        label: "C",
        instruction: "Allow to sit for one minute; watch for signs of leaks",
      },
      {
        id: "7d",
        label: "D",
        instruction: "Open DSV, evacuate loop contents",
      },
    ],
    notes: "Hold for 1 minute minimum",
  },
  {
    id: "flush-loop",
    number: 7,
    title: "Flush Loop (2 times)",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "8a",
        label: "A",
        instruction: "Close DSV",
      },
      {
        id: "8b",
        label: "B",
        instruction: "Fill loop with oxygen until OPV vents",
      },
      {
        id: "8c",
        label: "C",
        instruction: "Evacuate loop fully",
      },
      {
        id: "8d",
        label: "D",
        instruction: "Repeat steps A & B",
      },
      {
        id: "8e",
        label: "E",
        instruction:
          "Open DSV to equalize pressure to ambient pressure; close DSV",
      },
    ],
  },
  {
    id: "calibrate",
    number: 8,
    title: "Calibrate Wrist Display & HUD",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "9a",
        label: "A",
        instruction: "Wrist: Menu to calibrate (2 × MENU — left button)",
      },
      {
        id: "9b",
        label: "B",
        instruction: "Press Select (right button) twice to calibrate",
      },
      {
        id: "9c",
        label: "C",
        instruction: "Check mV readings in O₂",
      },
      {
        id: "9d",
        label: "D",
        instruction: "HUD: 2 presses on HUD switch — press & hold to confirm",
      },
    ],
    ranges: [
      {
        label: "O₂ cell mV in O₂",
        min: 40.6,
        max: 66.9,
        unit: "mV",
      },
    ],
  },
  {
    id: "solenoid-battery",
    number: 9,
    title: "Check Solenoid & Wrist Display Battery",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "10a",
        label: "A",
        instruction: "Setpoint to high (>1.1)",
      },
      {
        id: "10b",
        label: "B",
        instruction: "Solenoid fires, O₂ injection verified",
      },
      {
        id: "10c",
        label: "C",
        instruction: "Change setpoint to 0.19",
      },
      {
        id: "10d",
        label: "D",
        instruction:
          "Solenoid and wrist display battery check (8 × SELECT — right button)",
      },
    ],
    ranges: [
      {
        label: "Ext V",
        min: 7,
        max: 99,
        unit: "V",
      },
      {
        label: "Int V",
        min: 3.18,
        max: 99,
        unit: "V",
      },
    ],
    notes: "Acceptable: Ext V ≥ 7 / Int V ≥ 3.18",
  },
  {
    id: "install-cover",
    number: 10,
    title: "Install Cover",
    section: "pre-dive-setup",
  },
  {
    id: "diluent-leak-test",
    number: 11,
    title: "Diluent System Leak Test",
    section: "pre-dive-setup",
    timerDuration: 30,
    substeps: [
      {
        id: "12a",
        label: "A",
        instruction: "Open diluent valve, pressurize, close valve",
      },
      {
        id: "12b",
        label: "B",
        instruction: "Watch diluent pressure gauge for pressure loss",
      },
      {
        id: "12c",
        label: "C",
        instruction: "Open diluent cylinder",
      },
    ],
    notes: "Hold for 30 seconds minimum",
  },
  {
    id: "adv-bcd",
    number: 12,
    title: "Check ADV and BCD",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "13a",
        label: "A",
        instruction:
          "Open DSV, inhale from loop until ADV engages, dropping loop PO₂",
      },
      {
        id: "13b",
        label: "B",
        instruction: "BCD inflation + deflation mechanisms / air holding",
      },
    ],
  },
  {
    id: "pre-breathe",
    number: 13,
    title: "Pre-Breathe",
    section: "pre-dive-setup",
    substeps: [
      {
        id: "14a",
        label: "A",
        instruction: "Change wrist display to low setpoint",
      },
      {
        id: "14b",
        label: "B",
        instruction:
          "Block nose and begin breathing from the Prism 2 while seated in a safe location",
      },
      {
        id: "14c",
        label: "C",
        instruction: "Observe setpoint maintenance",
      },
    ],
  },

  // If NOT Diving Immediately (informational step)
  {
    id: "not-diving",
    number: 0,
    title: "If NOT Diving Immediately",
    section: "not-diving",
    notes:
      "Close O₂ + diluent cylinder valves, drain hoses, turn off electronics, and secure unit.",
  },

  // Pre-Dive Checks
  {
    id: "weights",
    number: 14,
    title: "Weights",
    section: "pre-dive-checks",
  },
  {
    id: "displays-on",
    number: 15,
    title: "HUD and Wrist Displays On",
    section: "pre-dive-checks",
  },
  {
    id: "valves-open",
    number: 16,
    title: "Cylinder Valves Open",
    section: "pre-dive-checks",
  },
  {
    id: "verify-setpoint",
    number: 17,
    title: "Verify Setpoint and Loop Contents",
    section: "pre-dive-checks",
  },
  {
    id: "don-prism",
    number: 18,
    title: "Don the Prism 2",
    section: "pre-dive-checks",
  },
  {
    id: "pre-jump",
    number: 19,
    title: "Pre-Jump",
    section: "pre-dive-checks",
    substeps: [
      {
        id: "20a",
        label: "A",
        instruction: "Begin breathing unit",
      },
      {
        id: "20b",
        label: "B",
        instruction: "Check: ADV, O₂ Add, Dil Add; BCD",
      },
      {
        id: "20c",
        label: "C",
        instruction: "Check SPG: O₂, Dil; OC",
      },
      {
        id: "20d",
        label: "D",
        instruction: "Observe setpoint maintained",
      },
      {
        id: "20e",
        label: "E",
        instruction: "Always know PPO₂ & have fun",
      },
    ],
    notes: "See hang tag on rebreather",
  },
];

export const SECTIONS = {
  "pre-dive-setup": {
    label: "Pre-Dive Setup",
    items: CHECKLIST_ITEMS.filter((item) => item.section === "pre-dive-setup"),
  },
  "not-diving": {
    label: "If NOT Diving Immediately",
    items: CHECKLIST_ITEMS.filter((item) => item.section === "not-diving"),
  },
  "pre-dive-checks": {
    label: "Pre-Dive Checks",
    items: CHECKLIST_ITEMS.filter((item) => item.section === "pre-dive-checks"),
  },
} as const;
