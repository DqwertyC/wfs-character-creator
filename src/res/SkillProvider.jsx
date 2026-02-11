export const SkillList = {
  apothecary: {
    flasks: {
      name: "Apothecary Flasks",
      description: [
        "You can prepare various flasks. Each flask takes ingredients to prepare, and an action to pour or throw.",
      ],
      hidden: true,
    },
    flask_throwing: {
      name: "Flask Throwing",
      description: ["You are trained in ranged attacks using mixtures."],
    },
    alchemist: {
      improved_mixtures: {
        name: "Improved Mixtures",
        description: [
          "Snottamus Extract, Nouftus Mixture, and Choont Bomb are all been improved.",
        ],
        hidden: true,
      },
      bottle_bandolier: {
        name: "Bottle Bandolier",
        description: [
          "You can spend 1 spark to throw 2 basic flasks in one turn.",
        ],
      },
    },
  },
  bard: {
    shared_inspiration: {
      name: "Shared Inspiration",
      description: [
        "With your permission, others may use your spark as if it were their own.",
      ],
    },
    ancient_songs: {
      name: "Ancient Songs",
      description: [
        "You can sing various songs. Each song requires verses and an action to recite.",
      ],
      hidden: true,
    },
    in_tune: {
      name: "In Tune",
      description: ["You are trained in attacks with The Dragon's Wrath."],
      subjects: ["song", "critterspeak"],
    },
    song_master: {
      mount_companion: {
        name: "Mount Companion",
        description: [
          "You have a large creature as a companion.",
          "Once per day, if you fall in battle, your companion will rescue you, restoring 1 hit point and dealing 1 damage to the nearest enemy",
          "Outside of battle, gain advantage on subject checks to avoid danger while mounted.",
          "Outside of battle, you travel much faster.",
        ],
      },
      encore: {
        name: "Encore",
        description: ["Songs last for 2 rounds."]
      },
    },
    lore_wain: {
      melee_training: {
        name: "Melee Training",
        description: ["You are trained in one-handed melee weapons."],
        subjects: ["one_handed"],
        hidden: true,
      },
      anti_spark: {
        name: "Anti-Spark",
        description: ["You can spend spark to decrease an enemy's roll."],
      },
      lore_master: {
        name: "Lore Master",
        description: [
          "Once per day, or by spending 4 spark, recall information about almost any subject.",
          "Take the highest of 3d6 on associated checks or attacks made this round.",
          "When used, all allies gain 1 spark.",
        ],
      },
    },
  },
  cook: {
    pot_luck: {
      name: "Pot Luck",
      description: ["You gain advantage on subject checks utilizing food."],
    },
    fireside: {
      name: "Fireside",
      description: ["You can always get a fire started."],
    },
    snack_pack: {
      name: "Snack Pack",
      description: [
        "You can prepare various snacks. Each snack takes ingredients to prepare, and an action to eat or feed to an adjacent ally.",
      ],
      hidden: true,
    },
    fast_food: {
      name: "Fast Food",
      description: [
        "You can make a basic attack on the same turn that you use a 1-ingredient snack.",
      ],
    },
    leftovers: {
      name: "Leftovers",
      description: [
        "If you end the day with 2+ ingredients, make a ration that restores 1 hit point as a free action. This ration will spoil at the end of the next day.",
      ],
    },
    way_of_pan: {
      giant_utensil: {
        name: "Giant Utensil",
        description: [
          "You are trained in two-handed weapons, and have a melee range of 2 blocks.",
        ],
        subjects: ["two_handed"],
      },
      salt_pepper: {
        name: "Salt and Pepper",
        description: [
          "After you hit a creature, roll a d6. On 5-6, the next attack against this creature has advantage. ",
          "After a creature hits you or an adjacent ally, roll a d6. On 5-6, the next attack by this creature has disadvantage. "
        ],
      },
      good_cook: {
        name: "Good Cook",
        description: ["Snack effects last for 2 rounds."],
        hidden: true,
      },
    },
    way_of_ladle: {
      food_fighter: {
        name: "Food Fighter",
        description: [
          "You have a cooking utensil that can toss hot food as a ranged attack. You may throw snacks from a range.",
        ],
        subjects: ["ranged"],
      },
      short_order: {
        name: "Short Order",
        description: [
          "Once per day, or by spending 4 spark, you can toss two snacks instead of 1 as a single action.",
        ],
      },
    },
  },
  ranger: {
    tracker: {
      name: "Tracker",
      description: ["You are trained in bushcraft"],
      subjects: ["bushcraft"],
    },
    ambush: {
      name: "Ambush",
      description: [
        "During the first round of combat, your attacks deal one extra damage.",
      ],
    },
    archery: {
      name: "Archery",
      description: ["You are trained in ranged weapons."],
      subjects: ["ranged"],
      hidden: true,
    },
    scout: {
      improved_ambush: {
        name: "Improved Ambush",
        description: [
          "During the first 2 rounds of combat, your attacks deal 1 extra damage.",
        ],
      },
      quick_study: {
        name: "Quick Study",
        description: [
          "When you hit an enemy you've already hit this encounter, deal 1 extra damage",
        ],
      },
      woodsman: {
        name: "Woodsman",
        description: [
          "While in a non-urban setting:",
          " You gain advantage on sneakery and medicineship checks.",
          " You gain +1 movement.",
          " You gain advantage on checks made to track creatures.",
          " You can forage enough food to feed yourself.",
        ],
      },
      momentum: {
        name: "Momentum",
        description: ["When you confirm a critical hit, gain 1 spark."],
      },
      multishot: {
        name: "Multishot",
        description: [
          "Once per day, or by spending 4 spark, you may use your action to make a ranged attack against every enemy on the field.",
        ],
      },
    },
    beast_guardian: {
      beast_companion_lvl_3: {
        name: "Beast Companion",
        description: [
          "You have a beast companion with 2 Health, 6 Movement, and 4 Defense.",
          "Your companion will always take its turn directly after you in battle.",
          "Your companion cannot make subject checks except to avoid danger.",
          "Your companion cannot use spark, but you still gain spark if it rolls a 1 on an attack.",
          "If your companion is reduced to 0 health, it will leave the battle and join you when combat is over.",
        ],
      },
      beast_companion_lvl_4: {
        name: "Beast Companion",
        description: [
          "You have a beast companion with 3 Health, 6 Movement, and 4 Defense.",
          "Your companion will always take its turn directly after you in battle.",
          "Your companion cannot make subject checks except to avoid danger.",
          "Your companion cannot use spark, but you still gain spark if it rolls a 1 on an attack.",
          "If your companion is reduced to 0 health, it will leave the battle and join you when combat is over.",
        ],
      },
      beast_companion_lvl_6: {
        name: "Improved Beast Companion",
        description: [
          "You have a beast companion with 5 Health, 6 Movement, and 4 Defense.",
          "Your companion will always take its turn directly after you in battle.",
          "Your companion can make 2 attacks each turn.",
          "Your companion cannot make subject checks except to avoid danger.",
          "Your companion cannot use spark, but you still gain spark if it rolls a 1 on an attack.",
          "If your companion is reduced to 0 health, it will leave the battle and join you when combat is over.",
        ],
      },
      beast_sense: {
        name: "Beast Sense",
        description: [
          "You can understand the general intentions of creatures.",
        ],
      },
      mend: {
        name: "Mend",
        description: [
          "Once per day, you can use your action to heal your companion for 2 hit points.",
        ],
      },
      melee_training: {
        name: "Melee Training",
        description: [
          "You are trained in melee weapons.",
          "If you are adjacent to your companion, their attacks count as trained.",
        ],
      },
      new_tricks: {
        name: "New Tricks",
        description: [
          "Once per day, your companion can give you advantage on any subject check.",
        ],
      },
    },
  },
  scoundrel: {
    trade_tricks: {
      name: "Tricks of the Trade",
      description: [
        "You gain advantage on checks to search for traps or open locks.",
      ],
    },
    flank: {
      name: "Flank",
      description: [
        "When attacking a target that has already been attacked by an ally this round, make 2 attacks.",
      ],
    },
    exploit_weakness: {
      name: "Exploit Weakness",
      description: ["You only require a 5 or a 6 to confirm a crit."],
    },
    spy: {
      dodge: {
        name: "Dodge",
        description: [
          "Once per round, after being hit by an attack, roll a d6. On 2-6, the damage from the attack is reduced by 1.",
        ],
      },
      stalk: {
        name: "Stalk",
        description: [
          "Before combat starts, you may attempt to hide with a sneakery check.",
          "While hidden and can't be target, and your first attack deals double damage.",
        ],
      },
      well_connected: {
        name: "Well Connected",
        description: [
          "Once a day, you may attempt to use your connections to hide your party from danger. Roll a d6. On a 2-6, your connections help you and your party find a safe place to hide.",
        ],
      },
      pilfer: {
        name: "Pilfer",
        description: [
          "Once per enemy, when you hit them with a melee attack, you may steal 1d6 coins from them.",
          "At nattator discretion, other items may be pickpocketed as well.",
        ],
      },
      dagger_operative: {
        name: "Dagger Operative",
        description: [
          "You are trained in one-handed melee weapons.",
          "Once per day, or by spending 4 spark, you may use a single action to make 4 ranged attacks with throwing daggers.",
        ],
        subjects: ["one_handed"],
      },
    },
    pirate: {
      rage: {
        name: "Rage",
        description: [
          "When you land an attack, you can spend 1 hit point to deal 1 extra damage.",
          "When you make an athletistry, word, or sneakery check, you can spend 1 hit point to gain advantage.",
        ],
      },
      sea_worthy: {
        name: "Sea Worthy",
        description: [
          "You gain advantage on checks involving swimming or sailing.",
        ],
      },
      combat_training: {
        name: "Combat Training",
        description: [
          "You are trained in all melee weapons.",
          "You are trained in shields.",
        ],
        subjects: ["one_handed", "two_handed"],
      },
      inspiring_presence: {
        name: "Inspiring Presence",
        description: [
          "After using Rage, a single ally (other than yourself) may gain 1 spark.",
        ],
      },
      reactive: {
        name: "Reactive Rage",
        description: [
          "Once per encounter, you may spend 1 hit point to reroll a missed attack.",
          "Once per encounter, you may spend 1 hit point to re-roll a subject check.",
        ],
      },
      parry: {
        name: "Parry",
        description: [
          "If an enemy attack misses you, you may make one free attack against them.",
        ],
      },
    },
  },
  warden: {
    shield_training: {
      name: "Shield Training",
      description: [
        "Your starting equipment includes a shield.",
        "You are trained in shields.",
      ],
    },
    adaptable: {
      name: "Adaptable",
      description: [
        "When you roll a 1 on an attack, gain 2 spark instead of 1.",
      ],
    },
    weapon_training: {
      name: "Weapon Training",
      description: ["You are trained in all melee weapons"],
      subjects: ["one_handed", "two_handed"]
    },
    arms_master: {
      heavy_handed: {
        name: "Heavy Handed",
        description: [
          "When attacking with a two-handed weapon, crit on a 5 or 6.",
          "You still need to roll a 6 to confirm the critical damage.",
        ],
      },
      cleave: {
        name: "Cleave",
        description: [
          "When making a melee attack, attack all adjacent enemies.",
        ],
      },
      strength_conditioning: {
        name: "Strength and Conditioning",
        description: [
          "Once per turn, you can trade spaces with an adjacent medium or smaller creature.",
        ],
      },
      second_attack: {
        name: "Second Attack",
        description: [
          "You can make 2 attacks on your turn. Both have the opportunity to crit, but only one can cleave.",
        ],
      },
    },
    protector: {
      defensive_stance: {
        name: "Defensive Stance",
        description: [
          "As a free action, take a stance that provides +1 Defense and -1 on attack rolls and subject checks.",
        ],
      },
      offensive_stance: {
        name: "Offensive Stance",
        description: [
          "As a free action, take a stance that provides +1 on attack rolls and -1 Defense.",
        ],
      },
      improved_shield_training: {
        name: "Improved Shield Training",
        description: [
          "Your shield can be used to protect adjacent allies. The protected ally gains 1 spark.",
          "Your shield can prevent a total of 2 damage in an encounter.",
        ],
      },
      taunt: {
        name: "Taunt",
        description: [
          "As an action, taunt an enemy, forcing it to focus on you for its next turn.",
        ],
      },
      warding_bond: {
        name: "Warding Bond",
        description: [
          "At the start of the day, choose an ally to protect.",
          "When that ally is targeted by an attack, you can:",
          "• Immediately move adjacent to your ally, giving them +1 Defense against the triggering attack, OR",
          "• Immediately move adjacent to the attacker, gaining advantage on attacks against them next turn.",
        ],
      },
    },
  },
  human: {
    stander: {
      spare_dagger: {
        name: "Spare Dagger",
        description: [
          "You can always hide a single dagger on your person that will not be found by a weapons search.",
          "Once per encounter, if you miss with an attack, you may attack the same target with your dagger.",
        ],
      },
    },
  },
  fang: {
    tough: {
      name: "Tough",
      description: [
        "When you lose your last health, roll 1d6. On a 2-6, you stay alive, keeping 1 hit point.",
        "Once used successfully, this cannot be used until the next day.",
      ],
    },
  },
  ridgerunner: {
    urban: {
      thief: {
        name: "Thief",
        description: [
          "If there is opportunity to do so, you may attempt to steal a small object. Roll a d6. On a 2-6, you steal the item without being noticed.",
        ],
      },
    },
    wild: {
      opportunist: {
        name: "Opportunist",
        description: [
          "Once per day, you may re-roll a failed subject check. You must use the new roll.",
        ],
      },
    },
  },
};
