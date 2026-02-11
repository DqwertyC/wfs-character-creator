export const GuildList = {
  boatery: {
    name: "Boatery",
    brief: "While similar to woodwrights, making boats requires more skill, but is less broad. Either way, you are skilled in woodworking",
    training: ["form", "smarts"],
    tool: "Hammer & Chisel",
    tool_description: [
      "When entering a town for the first time, roll 1d6 (2d6 if the town has a port). You earn that many coins.",
    ],
  },
  bookbindery: {
    name: "Bookbindery",
    brief: "Schooled in the building and maintenance of books and scrolls.",
    training: ["smarts", "word"],
    tool: "Paper & Quill",
    tool_description: ["Useful for any sort of writing."],
  },
  cookery: {
    name: "Cookery",
    brief: "A focus on preparing food for prince and peasant alike.",
    training: ["word", "bushcraft"],
    tool: "Cooking Utensils",
    tool_description: [
      "Once per day, during rest or recovery, cook a meal that gives 1 spark.",
    ],
  },
  durgan: {
    name: "Durgan",
    brief: "Focus on combat stealth training.",
    training: ["athletistry", "sneakery"],
    tool: "Durgan Cloak",
    tool_description: [
      "You gain advantage on sneakery checks made to hide or move undetected.",
    ],
  },
  houndry: {
    name: "Houndry",
    brief: "Focus on raising and training beasts.",
    training: ["song", "critterspeak"],
    tool: "Treat Pouch & Whistle",
    tool_description: [
      "You can train a small creature to perform mundane tricks. They will not perform complicated tasks or fight.",
    ],
  },
  juicery: {
    name: "Juicery",
    brief: "Focus on developing drinks from all manner of ingredients in the world.",
    training: ["song", "medicineship"],
    tool: "Peel & Press",
    tool_description: [
      "At the start of each day, you can create 1 drink for yourself or an ally.",
      "It will prevent the first instance of poison that day for the person who drinks it.",
    ],
  },
  needlery: {
    name: "Needlery",
    brief: "Focus on sewing and tailoring.",
    training: ["form", "tinkersmith"],
    tool: "Needle & Thread",
    tool_description: [
      "Once per day, while outside combat, heal an ally for 1 hit point.",
      "Once per day, while outside combat, strengthen an ally's armor to increase their defense by 1 until an enemy lands a hit against them or the end of the next encounter.",
    ],
  },
  rockwrightery: {
    name: "Rockwrightery",
    brief: "Focus on harvesting and using stone for construction projects.",
    training: ["word", "athletistry"],
    tool: "Whetstone",
    tool_description: [
      "Once per day, sharpen an ally's weapon. The next two hits with the weapon will cause the target to bleed for one more damage.",
    ],
  },
  sailery: {
    name: "Sailery",
    brief: "Focus on understanding the many tasks of sailing.",
    training: ["song", "sneakery"],
    tool: "Travel Log",
    tool_description: [
      "Once per day, sell an item for full price instead of half price.",
    ],
  },
  woodwrightery: {
    name: "Woodwrightery",
    brief: "Focus on harvesting and using wood for construction projects.",
    training: ["form", "critterspeak"],
    tool: "Carving Tools",
    tool_description: ["You can repair buildings or make simple wooden items."],
  },
  gorg: {
    name: "GORG",
    brief: "Glipwood Official Rangers Guild: Focus on exploration and public safety.",
    training: ["bushcraft", "medicineship"],
    tool: "Bark Knife & Trowel",
    tool_description: [
      "Once per session, while traveling through a forest, roll 1d6 to harvest resources:",
      "1: Nothing",
      "2-3: Weedroot Salve (cures poison)",
      "4-5: Bled Berry Paste (heals 1 hp)",
      "6  : 1 each of the above.",
    ],
  },
  sodso: {
    name: "SODSO",
    brief: "Society of Dark Sea Observation: Focus on study of astronomy and oceans.",
    training: ["smarts", "tinkersmith"],
    tool: "Handheld Telescope",
    tool_description: [
      "Once per day, after rolling for a smarts, bushcraft, or word check, you may add +2 to the result.",
    ],
  },
};
