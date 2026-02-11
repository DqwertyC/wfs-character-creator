import { SkillList as skill } from "./SkillProvider";

export const SpeciesList = {
  human: {
    name: "Human",
    bonus: "+1 Max Spark",
    cultures: {
      annieran: {
        name: "Anniearan",
        bonus: "+1 Maker's Aid",
        metrics: {
          max_spark: 1,
          max_aid: 1,
        },
      },
      skreean: {
        name: "Skreean",
        bonus: "Trained in Smarts",
        metrics: {
          max_spark: 1,
        },
        subjects: ["smarts"],
      },
      strander: {
        name: "Strander",
        bonus: "Spare Dagger - Always have a hidden dagger on hand",
        metrics: {
          max_spark: 1,
        },
        skills: [skill.human.stander.spare_dagger],
      },
    },
  },
  fang: {
    name: "Fang",
    bonus: "Tough - Once per day, revive with 1 health",
    cultures: {
      green_fang: {
        name: "Green",
        bonus: "+1 Max Health",
        metrics: {
          max_health: 1,
        },
        skills: [skill.fang.tough],
      },
      grey_fang: {
        name: "Grey",
        bonus: "Trained in Athletistry",
        subjects: ["athletistry"],
        skills: [skill.fang.tough],
      },
    },
  },
  ridgerunner: {
    name: "Ridgerunner",
    bonus: "+1 Speed",
    cultures: {
      urban: {
        name: "Urban",
        bonus: "Thief - Pickpocket small items easily",
        metrics: {
          movement: 1,
        },
        skills: [skill.ridgerunner.urban.thief],
      },
      wild: {
        name: "Wild",
        bonus: "Opportunist - Once per day, reroll failed subject check",
        metrics: {
          movement: 1,
        },
        skills: [skill.ridgerunner.wild.opportunist],
      },
    },
  },
};
