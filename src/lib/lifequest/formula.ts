import type { Activity, Band, CategoryId } from "./types";

function band(id: string, label: string, min: number, max: number): Band {
  return { id, label, min, max };
}

function act(
  partial: Omit<Activity, "enabled" | "maxDaily"> & { maxDaily?: number },
): Activity {
  const cap = Math.max(...partial.bands.map((b) => b.max), 0);
  return { enabled: true, maxDaily: partial.maxDaily ?? cap, ...partial };
}

/** Original Creative Formula, stored as a customizable starter — not a moral standard. */
export function starterActivities(): Activity[] {
  const P = "physical" as CategoryId;
  const I = "intellectual" as CategoryId;
  const s = "social" as CategoryId;
  const S = "spiritual" as CategoryId;
  const N = "stillness" as CategoryId;

  return [
    act({
      id: "pp1",
      code: "Pp1",
      name: "Nutrition",
      category: P,
      description:
        "How the day was nourished. A log, not a verdict — skip a day whenever you want.",
      bands: [
        band("none", "Ate unwell / skip", 0, 0),
        band("decent", "Decently well", 7, 10),
        band("meals", "Decently, within mealtimes", 11, 13),
        band("healthy", "Healthy nourishment", 14, 17),
      ],
    }),
    act({
      id: "pp2",
      code: "Pp2",
      name: "Run",
      category: P,
      description: "A run relative to your own average. Stop if it hurts.",
      bands: [
        band("none", "Did not run", 0, 0),
        band("slow", "Slow run, 1+ mile", 6, 9),
        band("avg", "Average run", 10, 12),
        band("above", "Above average", 13, 16),
      ],
    }),
    act({
      id: "pp3",
      code: "Pp3",
      name: "Plank",
      category: P,
      description: "Core hold. Choose the band that matches what you actually held.",
      bands: [
        band("none", "No plank", 0, 0),
        band("m1", "1 minute", 5, 8),
        band("m3", "3 minutes", 9, 11),
        band("m4", "4 minutes or more", 12, 15),
      ],
    }),
    act({
      id: "pp4",
      code: "Pp4",
      name: "Hike or sport",
      category: P,
      description: "A hike, game, or sport session.",
      bands: [
        band("none", "Did not", 0, 0),
        band("did", "Showed up", 4, 14),
      ],
    }),
    act({
      id: "ip1",
      code: "Ip1",
      name: "School and study",
      category: I,
      description: "Class, homework, or deliberate study.",
      bands: [
        band("none", "No learning today", 0, 0),
        band("little", "A little", 7, 10),
        band("tried", "Meaningful effort", 11, 13),
        band("deep", "Extensive study", 14, 17),
      ],
    }),
    act({
      id: "ip2",
      code: "Ip2",
      name: "Book writing or reading",
      category: I,
      description: "Original formula awards this only Friday–Sunday. Change the days anytime.",
      weekdays: [5, 6, 0],
      bands: [
        band("none", "Did not write or read", 0, 0),
        band("h2", "About 2 hours", 6, 9),
        band("h3", "About 3 hours", 10, 12),
        band("h4", "4 hours or more", 13, 16),
      ],
    }),
    act({
      id: "ip3",
      code: "Ip3",
      name: "Music practice",
      category: I,
      description: "Piano, trumpet, or whatever you are actually practicing.",
      bands: [
        band("none", "No practice", 0, 0),
        band("m15", "15 min per instrument", 5, 8),
        band("m30", "30 min per instrument", 9, 11),
        band("m60", "60 min per instrument", 12, 15),
      ],
    }),
    act({
      id: "ip4",
      code: "Ip4",
      name: "Game design",
      category: I,
      description: "Design work on a game you are making.",
      bands: [
        band("none", "Did not design", 0, 0),
        band("start", "Started designing", 4, 7),
        band("done", "Designed or finished", 8, 14),
      ],
    }),
    act({
      id: "sp1",
      code: "sp1",
      name: "Friends",
      category: s,
      description: "Time talking with friends, including school friends.",
      bands: [
        band("none", "Did not socialize", 0, 0),
        band("some", "Somewhat socially active", 7, 10),
        band("very", "Very socially active", 11, 13),
        band("extreme", "Extremely socially active", 14, 17),
      ],
    }),
    act({
      id: "sp2",
      code: "sp2",
      name: "Scouts",
      category: s,
      description: "A scouts gathering. Only log it on days you were there.",
      bands: [
        band("none", "Not today", 0, 0),
        band("active", "Very socially active at scouts", 10, 16),
      ],
    }),
    act({
      id: "sp3",
      code: "sp3",
      name: "Ballroom",
      category: s,
      description: "Ballroom class or practice.",
      bands: [
        band("none", "Did not go", 0, 0),
        band("quiet", "Went, not very social", 5, 9),
        band("active", "Very socially active", 10, 15),
      ],
    }),
    act({
      id: "sp4",
      code: "sp4",
      name: "Young Men's",
      category: s,
      description: "Young Men's or an equivalent gathering.",
      bands: [
        band("none", "Not today", 0, 0),
        band("did", "Participated", 4, 14),
      ],
    }),
    act({
      id: "Sp1",
      code: "Sp1",
      name: "Acting in faith",
      category: S,
      description: "A deliberate act of faith. Binary in the original formula.",
      bands: [
        band("no", "Did not", 0, 0),
        band("yes", "Did", 17, 17),
      ],
    }),
    act({
      id: "Sp2",
      code: "Sp2",
      name: "Calling",
      category: S,
      description: "Did the work of a calling or assignment.",
      bands: [
        band("no", "Did not", 0, 0),
        band("yes", "Did the job", 16, 16),
      ],
    }),
    act({
      id: "Sp3",
      code: "Sp3",
      name: "Prayer",
      category: S,
      description: "Personal prayer.",
      bands: [
        band("none", "Did not pray", 0, 0),
        band("afternoon", "Afternoon prayers", 5, 9),
        band("both", "Morning and afternoon", 10, 15),
      ],
    }),
    act({
      id: "Sp4",
      code: "Sp4",
      name: "Scriptures",
      category: S,
      description: "Scripture study.",
      bands: [
        band("none", "Did not read", 0, 0),
        band("read", "Read", 4, 8),
        band("diligent", "Read diligently", 9, 14),
      ],
    }),
    act({
      id: "Np1",
      code: "Np1",
      name: "Meditation",
      category: N,
      description: "Quiet sitting. Stillness is a category of its own, not a penalty.",
      bands: [
        band("none", "Did not meditate", 0, 0),
        band("m5", "5 minutes", 7, 11),
        band("m10", "10 minutes or more", 12, 17),
      ],
    }),
    act({
      id: "Np2",
      code: "Np2",
      name: "Wall sit / stare",
      category: N,
      description: "Original formula: plus five if you meditated by staring at a wall.",
      bonusNote: "Stacks with meditation. Log only if you actually did it.",
      bands: [
        band("none", "Did not", 0, 0),
        band("yes", "Stared at a wall", 5, 5),
      ],
    }),
    act({
      id: "sleep",
      code: "Slp",
      name: "Sleep",
      category: P,
      description: "A full night, 8–10 hours. Logged once per morning.",
      bands: [
        band("none", "Not this range", 0, 0),
        band("full", "8–10 hours", 15, 15),
      ],
    }),
  ];
}

export const STARTER_REWARDS = [
  {
    id: "treat",
    name: "A treat",
    description: "One cookie, bar, or bowl of ice cream.",
    cost: 50,
    currency: "cs" as const,
    category: "Food",
    note: "Original shop: −50 CS per serving.",
  },
  {
    id: "small-treat",
    name: "Small treat",
    description: "A graham cracker or a bowl of cereal.",
    cost: 20,
    currency: "cs" as const,
    category: "Food",
    note: "Original shop: −20 CS per serving.",
  },
  {
    id: "friends-hour",
    name: "Hour with friends",
    description: "Fun time that is not also a social quest. Net −10 after the +10 social credit in the original sheet.",
    cost: 10,
    currency: "cs" as const,
    category: "People",
  },
  {
    id: "entertainment",
    name: "Hour of entertainment",
    description: "A movie, a game session, or an hour of something purely for fun.",
    cost: 50,
    currency: "cs" as const,
    category: "Rest",
  },
  {
    id: "rest-day",
    name: "Rest day",
    description: "A day you spend however you want, without earning. Not a failure — a purchase.",
    cost: 500,
    currency: "cs" as const,
    category: "Rest",
    limitPerWeek: 1,
  },
];
