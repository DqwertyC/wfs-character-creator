export const SpellList = {
  apothecary: {
    snottamus_extract: {
      name: "Snottamus Extract",
      target: ["self", "ally"],
      range: ["melee", "range"],
      description: ["Next successful attack against user deals 1 less damage."],
      cost: 1,
    },
    snottamus_extract_plus: {
      name: "Snottamus Extract",
      target: ["self", "ally"],
      range: ["melee", "range"],
      description: ["Next 2 successful attacks against user deal 1 less damage."],
      cost: 1,
    },
    nouftus_mixture: {
      name: "Nouftus Mixture",
      target: ["enemy"],
      range: ["melee", "range"],
      description: ["Deal 1 damage, and poison for 1 round."],
      cost: 1,
    },
    nouftus_mixture_plus: {
      name: "Nouftus Mixture",
      target: ["enemy"],
      range: ["melee", "range"],
      description: ["Deal 1 damage, and poison for 2 rounds."],
      cost: 1,
    },
    choont_bomb: {
      name: "Choont Bomb",
      target: ["enemy"],
      range: ["range"],
      description: [
        "Make a ranged attack. On a hit, deal 1 damage. Have the target and adjacent enemies roll a d6. On a 1-3, they lose movement until the end of their next turn.",
      ],
      cost: 1,
    },
    choont_bomb_plus: {
      name: "Choont Bomb",
      target: ["enemy"],
      range: ["range"],
      description: [
        "Make a ranged attack. On a hit, deal 2 damage. Have the target and adjacent enemies roll a d6. On a 1-3, they lose movement until the end of their next turn.",
      ],
      cost: 1,
    },
    nectar_flask: {
      name: "Nectar Flask",
      target: ["ally"],
      range: ["melee"],
      description: [
        "+1 to next attack, and only require a 5 for critical hit confirmation.",
      ],
      cost: 1,
    },
    rockroach_elixir: {
      name: "Rockroach Elixir",
      target: ["space"],
      range: ["range"],
      description: [
        "Covers a 3x3 area on the ground. All enemies use their movement on their next turn to attempt to reach the area.",
      ],
      cost: 2,
    },
    dragonmole_draught: {
      name: "Dragonmole Draught",
      target: ["space"],
      range: ["range"],
      description: [
        "Covers a 3x3 area. Make a separate attack roll against each enemy in the area. On a hit, deal 2 damage, and ignite for 2 rounds.",
      ],
      cost: 3,
    },
    skonk_grenade: {
      name: "Blobe-Infused Skonk Grenade",
      target: ["enemy"],
      range: ["range"],
      description: [
        "Target cannot take an Action on their next turn. Usable once per target per combat.",
      ],
      cost: 1,
    },
    super_grow: {
      name: "Super Grow",
      target: ["space"],
      range: ["melee", "range"],
      description: [
        "Plants at the target space grow, filling up to 4 spaces. These spaces are impassible until cut down.",
        "Allies already bordering theses spaces may gain 1 health.",
      ],
      cost: 2,
    },
    silver_birch: {
      name: "Silver Birch Bottle",
      target: ["enemy"],
      range: ["range"],
      description: [
        "Attacks against target have advantage until the end of your next turn.",
      ],
      cost: 2,
    },
    elmin_bark: {
      name: "Elmin Bark Mortar",
      target: ["ally"],
      range: ["special"],
      description: [
        "All allies gain 1 spark. All enemies have disadvantage on their next attack.",
      ],
      cost: 2,
    },
  },
  bard: {
    dragons_wrath: {
      name: "The Dragon's Wrath",
      target: ["enemy"],
      range: ["hearing"],
      description: [
        "Roll an attack on two creatures that can hear you. Deals 1 damage on a hit.",
      ],
      cost: 1,
    },
    kings_lament: {
      name: "The King's Lament",
      target: ["enemy"],
      range: ["hearing"],
      description: [
        "Give two enemies disadvantage on their next attack until the start of your next turn.",
      ],
      cost: 1,
    },
    kings_lament_plus: {
      name: "The King's Lament",
      target: ["enemy"],
      range: ["hearing"],
      description: [
        "Give two enemies disadvantage on their next attack for their next two turns.",
      ],
      cost: 1,
    },
    guild_anthem: {
      name: "Anthem of the Guilds",
      target: ["ally", "self"],
      range: ["hearing"],
      description: [
        "Two allies can reroll a failed subject check on their next turn. If they don't use the reroll, they gain 1 spark.",
      ],
      cost: 1,
    },
    guild_anthem_plus: {
      name: "Anthem of the Guilds",
      target: ["ally", "self"],
      range: ["hearing"],
      description: [
        "Two allies can reroll a failed subject check on their next two turns. If they don't use a reroll, they gain 1 spark.",
      ],
      cost: 1,
    },
    healing_song: {
      name: "Healing Song",
      target: ["ally"],
      range: ["hearing"],
      description: [
        "All allies that can hear you recover 1 health at the start of their next turn.",
      ],
      cost: 2,
    },
    healing_song_plus: {
      name: "Healing Song",
      target: ["ally"],
      range: ["hearing"],
      description: [
        "All allies that can hear you recover 1 health at the start of their next 2 turns.",
      ],
      cost: 2,
    },
    yurgens_tune: {
      name: "Yurgen's Tune",
      target: ["ally"],
      range: ["hearing"],
      description: [
        "A single ally is restored to full health, gains 2 spark, and has advantage on attacks for their next turn.",
      ],
      cost: 3,
    },
    yurgens_tune_plus: {
      name: "Yurgen's Tune",
      target: ["ally"],
      range: ["hearing"],
      description: [
        "A single ally is restored to full health, gains 2 spark, and has advantage on attacks for their next 2 turns.",
      ],
      cost: 3,
    },
    troll_charmer: {
      name: "Troll Charmer",
      target: ["enemy"],
      range: ["hearing"],
      description: [
        "A single target will fight as if they were your ally for 1 turn. Other enemies will ignore the charmed creature. Can only be used on any unique target once.",
      ],
      cost: 2,
    },
    armulyn: {
      name: "Armulyn's Lullaby",
      target: ["enemy", "ally"],
      range: ["hearing"],
      description: [
        "Choose 3 targets. They must roll a d6. On a 1-5, they fall asleep for 2 rounds. A sleeping creature can be woken up with an action, and will wake up if moved or attacked.",
      ],
      cost: 2,
    },
  },
  cook: {
    diggle_jerky: {
      name: "Diggle Jerky",
      target: ["ally", "self"],
      range: ["melee"],
      description: ["The eater gains +1 defense for 1 round."],
      cost: 1,
    },
    diggle_jerky_plus: {
      name: "Diggle Jerky",
      target: ["ally", "self"],
      range: ["melee"],
      description: ["The eater gains +1 defense for 2 rounds."],
      cost: 1,
    },
    diggle_jerky_range: {
      name: "Diggle Jerky",
      target: ["ally", "self"],
      range: ["melee", "range"],
      description: ["The eater gains +1 defense for 1 round."],
      cost: 1,
    },
    redberry_tea: {
      name: "Redberry Tea",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "Roll a d6. On a 1, the drinker has -1 on attacks for the next 2 rounds. On 2-6, the drinker regains 1 health point at the start of their next turn.",
      ],
      cost: 1,
    },
    redberry_tea_plus: {
      name: "Redberry Tea",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "Roll a d6. On a 1, the drinker has -1 on attacks for the next 2 rounds. On 2-6, the drinker regains 1 health point at the start of their next 2 turns.",
      ],
      cost: 1,
    },
    redberry_tea_range: {
      name: "Redberry Tea",
      target: ["ally", "self"],
      range: ["melee", "range"],
      description: [
        "Roll a d6. On a 1, the drinker has -1 on attacks for the next 2 rounds. On 2-6, the drinker regains 1 health point at the start of their next turn.",
      ],
      cost: 1,
    },
    fazzeldove_puff: {
      name: "Fazzeldove Puff",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "For 1 round, enemies will avoid attacking the eater and focus on their allies instead.",
      ],
      cost: 1,
    },
    fazzeldove_puff_plus: {
      name: "Fazzeldove Puff",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "For 2 rounds, enemies will avoid attacking the eater and focus on their allies instead.",
      ],
      cost: 1,
    },
    fazzeldove_puff_range: {
      name: "Fazzeldove Puff",
      target: ["ally", "self"],
      range: ["melee", "range"],
      description: [
        "For 1 round, enemies will avoid attacking the eater and focus on their allies instead.",
      ],
      cost: 1,
    },
    kiwicarrot_cake: {
      name: "Kiwicarrot Cake",
      target: ["ally", "self"],
      range: ["melee"],
      description: ["For 1 round, the eater's next attack gains advantage and +1 to hit."],
      cost: 1,
    },
    kiwicarrot_cake_plus: {
      name: "Kiwicarrot Cake",
      target: ["ally", "self"],
      range: ["melee"],
      description: ["For 2 rounds, the eater's next attack gains advantage and +1 to hit."],
      cost: 1,
    },
    kiwicarrot_cake_range: {
      name: "Kiwicarrot Cake",
      target: ["ally", "self"],
      range: ["melee", "range"],
      description: ["For 1 round, the eater's next attack gains advantage and +1 to hit."],
      cost: 1,
    },
    octurtle_surprise: {
      name: "Octurtle Surprise",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "For 1 round, the eater's next attack deals 1 extra damage and inflicts blindness on the target for 1 round. A blind target cannot move and has -1 defense.",
      ],
      cost: 1,
    },
    octurtle_surprise_plus: {
      name: "Octurtle Surprise",
      target: ["ally", "self"],
      range: ["melee"],
      description: [
        "For 2 rounds, the eater's next attack deals 1 extra damage and inflicts blindness on the target for 1 round. A blind target cannot move and has -1 defense.",
      ],
      cost: 1,
    },
    brayble_cake: {
      name: "Brayble Ferno Lava Cake",
      target: ["ally", "self"],
      range: ["melee", "range"],
      description: [
        "Attack every creature in an 8-square line. Make a ranged attack against each target. On a hit, they take 1 damage, and are set on fire for 1 round.",
      ],
      cost: 2,
    },
    twaidge_root: {
      name: "Twaidge Root Egg",
      target: ["enemy"],
      range: ["range"],
      description: [
        "Make a ranged attack against an enemy. On a hit, deal 2 damage and choose any adjacent creature to take 1 damage. Even if the attack misses, the target can't move on their next turn.",
      ],
      cost: 2,
    },
  },
};
