import React from "react";
import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import text from "png-chunk-text";

import { SpeciesList as species } from "./res/SpeciesProvider";
import { RoleList as role } from "./res/RoleProvider";
import { GuildList as guild } from "./res/GuildProvider";
import { SubjectList as subject } from "./res/SubjectProvider";
import { newCharacter } from "./res/CharacterProvider";

import DefaultAppearance from "./res/img/profile_default.png";
import CardBackground from "./res/img/card_background.png";

import Level1Indicator from "./res/img/card_lvl_1.png";
import Level2Indicator from "./res/img/card_lvl_2.png";
import Level3Indicator from "./res/img/card_lvl_3.png";
import Level4Indicator from "./res/img/card_lvl_4.png";
import Level5Indicator from "./res/img/card_lvl_5.png";
import Level6Indicator from "./res/img/card_lvl_6.png";
import {
  LucideArrowLeft,
  LucideBed,
  LucideDownload,
  LucidePrinter,
  LucideShieldMinus,
  LucideShieldPlus,
  LucideUserRoundPen,
  LucideUserRoundPlus,
  LucideUtensilsCrossed,
} from "lucide-react";

var Buffer = require("buffer/").Buffer;

export default function App() {
  const [init, setInit] = React.useState(false);
  // Data for profile picture
  const hiddenImageInput = React.useRef(null);
  const handleImageClick = () => hiddenImageInput.current.click();
  const [profileImageData, setProfileImageData] =
    React.useState(DefaultAppearance);

  const handleProfileImageChange = (e) => {
    const file = e.target?.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = (f) => {
        const img = new Image();
        img.onload = () => {
          // Get a new canvas to draw on
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 400;
          canvas.height = 400;

          // Draw the image onto the canvas with new dimensions
          ctx.drawImage(img, 0, 0, 400, 400);
          setProfileImageData(canvas.toDataURL());
        };
        img.src = f.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const [savedData, setSavedData] = React.useState(newCharacter);

  const derivedData = React.useMemo(() => {
    const characterData = {};

    const skills = [];
    const spells = [];

    const metrics = {
      max_health: 0,
      start_spark: 0,
      max_spark: 0,
      defense: 0,
      movement: 0,
      max_resource: 0,
      free_training: 0,
      max_aid: 1,
    };

    const training = {
      word: false,
      form: false,
      song: false,
      athletistry: false,
      bushcraft: false,
      critterspeak: false,
      medicineship: false,
      smarts: false,
      sneakery: false,
      tinkersmith: false,
      one_handed: false,
      two_handed: false,
      ranged: false,
    };

    // Load Culture Data
    const speciesData = species[savedData.species];
    if (speciesData) {
      const cultureData = speciesData.cultures[savedData.culture];
      if (cultureData) {
        for (const skill of cultureData.skills ?? []) {
          skills.push(skill);
        }

        for (const subject of cultureData.subjects ?? []) {
          training[subject] = true;
        }

        for (const key in cultureData.metrics) {
          metrics[key] += cultureData.metrics[key];
        }
      }
    }

    // Load Role Data
    const roleData = role[savedData.role];
    if (roleData && (savedData.level < 3 || savedData.specialty)) {
      var levelData = {};

      switch (savedData.level) {
        case 1:
          levelData = roleData.level_1;
          break;
        case 2:
          levelData = roleData.level_2;
          break;
        case 3:
          levelData = roleData.specialties[savedData.specialty].level_3;
          break;
        case 4:
          levelData = roleData.specialties[savedData.specialty].level_4;
          break;
        case 5:
          levelData = roleData.specialties[savedData.specialty].level_5;
          break;
        case 6:
          levelData = roleData.specialties[savedData.specialty].level_6;
          break;
        default:
      }

      for (const skill of levelData.skills ?? []) {
        skills.push(skill);
      }

      for (const spell of levelData.spells ?? []) {
        spells.push(spell);
      }

      for (const key in levelData.metrics) {
        metrics[key] += levelData.metrics[key];
      }

      characterData.spell_name = roleData.spell_name;
      characterData.resource_name = roleData.resource_name;
      characterData.resources_name = roleData.resources_name;
    }

    // Load guild data
    const guildData = guild[savedData.guild];
    if (savedData.level >= 2 && guildData) {
      training[savedData.guild_subject] = true;
      characterData.guild_tool = guildData.tool;
      characterData.tool_description = guildData.tool_description;
    }

    // Scan skills for training
    for (const skill of skills) {
      if (skill.subjects) {
        for (const subject of skill.subjects) {
          training[subject] = true;
        }
      }
    }

    // Fix for bard starting spark value
    if (metrics.start_spark === -1) metrics.start_spark = metrics.max_spark;

    if (metrics.free_training >= 1 && savedData.free_subject) {
      training[savedData.free_subject] = true;
    }

    characterData.metrics = metrics;
    characterData.training = training;
    characterData.skills = skills;
    characterData.spells = spells;

    return characterData;
  }, [savedData]);

  const SkillView = React.useMemo(() => {
    return derivedData.skills.map((skill, i) => (
      <div key={i}>
        {false ? (
          <></>
        ) : (
          <>
            <div className="text-[10pt] font-bold"></div>
            <div className="text-[10pt]">
              <span className="font-bold">{skill.name}: </span>
              {skill.description.map((line, j) => (
                <span key={j}>{line}</span>
              ))}
            </div>
          </>
        )}
      </div>
    ));
  }, [derivedData.skills]);

  const SpellView = React.useMemo(() => {
    return derivedData.spells.map((spell, i) => (
      <div key={i}>
        <div className="text-[10pt]">
          <span className="font-bold">{spell.name}</span> ({spell.cost}{" "}
          {spell.cost === 1
            ? derivedData.resource_name
            : derivedData.resources_name}
          )
        </div>
        <div className="text-[10pt]">
          {spell.description.map((line, j) => (
            <p key={j}>{line}</p>
          ))}
        </div>
      </div>
    ));
  }, [
    derivedData.spells,
    derivedData.resource_name,
    derivedData.resources_name,
  ]);

  const UpdateInventory = React.useCallback(
    (index, value) => {
      const tmpData = { ...savedData };
      tmpData.inventory[index] = value;
      setSavedData(tmpData);
    },
    [savedData],
  );

  const UpdateCurrentHealth = React.useCallback(
    (value) => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return;
      } else {
        const tmpData = { ...savedData };
        tmpData.current_health =
          numericValue < 0
            ? 0
            : numericValue > derivedData.metrics.max_health
              ? derivedData.metrics.max_health
              : numericValue;
        setSavedData(tmpData);
      }
    },
    [savedData, derivedData.metrics.max_health],
  );

  const UpdateCurrentSpark = React.useCallback(
    (value) => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return;
      } else {
        const tmpData = { ...savedData };
        tmpData.current_spark =
          value < 0
            ? 0
            : value > derivedData.metrics.max_spark
              ? derivedData.metrics.max_spark
              : value;
        setSavedData(tmpData);
      }
    },
    [savedData, derivedData.metrics.max_spark],
  );

  const ResourceClicked = React.useCallback(
    (index) => {
      const tmpData = { ...savedData };

      if (index === tmpData.resource_used) {
        tmpData.resource_used--;
      } else {
        tmpData.resource_used = index;
      }

      setSavedData(tmpData);
    },
    [savedData],
  );

  const AidClicked = React.useCallback(
    (index) => {
      const tmpData = { ...savedData };

      if (index === tmpData.aid_used) {
        tmpData.aid_used--;
      } else {
        tmpData.aid_used = index;
      }

      setSavedData(tmpData);
    },
    [savedData],
  );

  const UpdateCurrentCoin = React.useCallback(
    (value) => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return;
      } else {
        const tmpData = { ...savedData };
        tmpData.coins = value < 0 ? 0 : value;
        setSavedData(tmpData);
      }
    },
    [savedData],
  );

  const UpdateName = React.useCallback(
    (value) => {
      const tmpData = { ...savedData };
      tmpData.name = value;
      setSavedData(tmpData);
    },
    [savedData],
  );

  const UpdateAge = React.useCallback(
    (value) => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        return;
      } else {
        const tmpData = { ...savedData };
        tmpData.age = value;
        setSavedData(tmpData);
      }
    },
    [savedData],
  );

  const EquipOneHand = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.one_hand_equipped = !tmpData.one_hand_equipped;
    tmpData.two_hand_equipped = false;
    tmpData.ranged_equipped = false;
    setSavedData(tmpData);
  }, [savedData]);

  const EquipTwoHand = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.one_hand_equipped = false;
    tmpData.two_hand_equipped = !tmpData.two_hand_equipped;
    tmpData.ranged_equipped = false;
    setSavedData(tmpData);
  }, [savedData]);

  const EquipRanged = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.one_hand_equipped = false;
    tmpData.two_hand_equipped = false;
    tmpData.ranged_equipped = !tmpData.ranged_equipped;
    setSavedData(tmpData);
  }, [savedData]);

  const InventoryView = React.useMemo(() => {
    return savedData.inventory.map((item, i) => (
      <div key={i} className="text-[12pt]">
        {"- "}
        <input
          className="border-b-2 text-[12pt]"
          value={savedData.inventory[i]}
          onChange={(e) => UpdateInventory(i, e.target.value)}
        />
      </div>
    ));
  }, [savedData.inventory, UpdateInventory]);

  const levelImageData = React.useMemo(() => {
    switch (savedData.level) {
      case 1:
        return Level1Indicator;
      case 2:
        return Level2Indicator;
      case 3:
        return Level3Indicator;
      case 4:
        return Level4Indicator;
      case 5:
        return Level5Indicator;
      case 6:
        return Level6Indicator;
      default:
        return Level1Indicator;
    }
  }, [savedData.level]);

  /////////////////////////////////////////////////////////////////////////////
  // SAVE DATA
  /////////////////////////////////////////////////////////////////////////////

  const [playerCardImageData, setPlayerCardImageData] = React.useState(null);
  React.useEffect(() => {
    const backgroundImg = new Image();
    backgroundImg.onload = () => {
      const profileImg = new Image();
      profileImg.onload = () => {
        const levelImg = new Image();
        levelImg.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 512;
          canvas.height = 640;

          // Draw the image onto the canvas with new dimensions
          // TODO: Remove magic numbers
          ctx.drawImage(backgroundImg, 0, 0, 512, 640);
          ctx.drawImage(profileImg, 56, 119, 400, 400);
          ctx.drawImage(levelImg, 49, 548, 414, 54);

          setPlayerCardImageData(canvas.toDataURL("image/png"));
        };
        levelImg.src = levelImageData;
      };
      profileImg.src = profileImageData;
    };
    backgroundImg.src = CardBackground;
  }, [profileImageData, levelImageData]);

  const ExportPlayerCard = React.useCallback(() => {
    const buffer = Buffer.from(playerCardImageData.split(",")[1], "base64");
    const chunks = extract(buffer);

    // Add saved data to image chunks
    if (savedData.name)
      chunks.splice(-1, 0, text.encode("wfs_name", savedData.name));
    if (savedData.age)
      chunks.splice(-1, 0, text.encode("wfs_age", savedData.age));

    // Data determined on level up
    if (savedData.species)
      chunks.splice(-1, 0, text.encode("wfs_species", savedData.species));
    if (savedData.culture)
      chunks.splice(-1, 0, text.encode("wfs_culture", savedData.culture));
    if (savedData.role)
      chunks.splice(-1, 0, text.encode("wfs_role", savedData.role));
    if (savedData.specialty)
      chunks.splice(-1, 0, text.encode("wfs_specialty", savedData.specialty));
    if (savedData.guild)
      chunks.splice(-1, 0, text.encode("wfs_guild", savedData.guild));
    if (savedData.guild_subject)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_guild_subject", savedData.guild_subject),
      );
    if (savedData.free_subject)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_free_subject", savedData.free_subject),
      );
    if (savedData.level)
      chunks.splice(-1, 0, text.encode("wfs_level", savedData.level));

    // Other Data
    if (savedData.current_health)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_current_health", savedData.current_health),
      );
    if (savedData.current_spark)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_current_spark", savedData.current_spark),
      );
    if (savedData.resource_used)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_resource_used", savedData.resource_used),
      );
    if (savedData.aid_used)
      chunks.splice(-1, 0, text.encode("wfs_aid_used", savedData.aid_used));
    if (savedData.coins)
      chunks.splice(-1, 0, text.encode("wfs_coins", savedData.coins));
    if (savedData.one_hand_equipped)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_one_hand_equipped", savedData.one_hand_equipped),
      );
    if (savedData.two_hand_equipped)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_two_hand_equipped", savedData.two_hand_equipped),
      );
    if (savedData.ranged_equipped)
      chunks.splice(
        -1,
        0,
        text.encode("wfs_ranged_equipped", savedData.ranged_equipped),
      );

    // Inventory Data
    if (savedData.inventory[0])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_0", savedData.inventory[0]),
      );
    if (savedData.inventory[1])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_1", savedData.inventory[1]),
      );
    if (savedData.inventory[2])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_2", savedData.inventory[2]),
      );
    if (savedData.inventory[3])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_3", savedData.inventory[3]),
      );
    if (savedData.inventory[4])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_4", savedData.inventory[4]),
      );
    if (savedData.inventory[5])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_5", savedData.inventory[5]),
      );
    if (savedData.inventory[6])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_6", savedData.inventory[6]),
      );
    if (savedData.inventory[7])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_7", savedData.inventory[7]),
      );
    if (savedData.inventory[8])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_8", savedData.inventory[8]),
      );
    if (savedData.inventory[9])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_9", savedData.inventory[9]),
      );
    if (savedData.inventory[10])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_10", savedData.inventory[10]),
      );
    if (savedData.inventory[11])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_11", savedData.inventory[11]),
      );
    if (savedData.inventory[12])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_12", savedData.inventory[12]),
      );
    if (savedData.inventory[13])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_13", savedData.inventory[13]),
      );
    if (savedData.inventory[14])
      chunks.splice(
        -1,
        0,
        text.encode("wfs_inventory_14", savedData.inventory[14]),
      );

    const metaBuffer = new Buffer(encode(chunks));
    const metaUrl = "data:image/png;base64," + metaBuffer.toString("base64");

    const link = document.createElement("a");
    link.download = `${savedData.name}.wfs.png`;
    link.href = metaUrl;
    link.click();
  }, [playerCardImageData, savedData]);

  const hiddenSaveInput = React.useRef(null);
  const handleSaveClick = () => hiddenSaveInput.current.click();

  const handleSaveImport = React.useCallback((e) => {
    const file = e.target?.files[0];
    if (file && file.type === "image/png") {
      // Get the metadata
      const bufferReader = new FileReader();
      bufferReader.onloadend = () => {
        const characterData = { ...newCharacter };
        const chunks = extract(Buffer.from(bufferReader.result));
        const textChunks = chunks
          .filter(function (chunk) {
            return chunk.name === "tEXt";
          })
          .map(function (chunk) {
            return text.decode(chunk.data);
          });

        for (const chunk of textChunks) {
          if (chunk.keyword === "wfs_name") characterData.name = chunk.text;
          if (chunk.keyword === "wfs_age")
            characterData.age = Number(chunk.text);
          if (chunk.keyword === "wfs_species")
            characterData.species = chunk.text;
          if (chunk.keyword === "wfs_culture")
            characterData.culture = chunk.text;
          if (chunk.keyword === "wfs_role") characterData.role = chunk.text;
          if (chunk.keyword === "wfs_specialty")
            characterData.specialty = chunk.text;
          if (chunk.keyword === "wfs_guild") characterData.guild = chunk.text;
          if (chunk.keyword === "wfs_guild_subject")
            characterData.guild_subject = chunk.text;
          if (chunk.keyword === "wfs_free_subject")
            characterData.free_subject = chunk.text;
          if (chunk.keyword === "wfs_level")
            characterData.level = Number(chunk.text);
          if (chunk.keyword === "wfs_current_health")
            characterData.current_health = Number(chunk.text);
          if (chunk.keyword === "wfs_current_spark")
            characterData.current_spark = Number(chunk.text);
          if (chunk.keyword === "wfs_resource_used")
            characterData.resource_used = chunk.text;
          if (chunk.keyword === "wfs_aid_used")
            characterData.aid_used = Number(chunk.text);
          if (chunk.keyword === "wfs_coins")
            characterData.coins = Number(chunk.text);
          if (chunk.keyword === "wfs_one_hand_equipped")
            characterData.one_hand_equipped = chunk.text;
          if (chunk.keyword === "wfs_two_hand_equipped")
            characterData.two_hand_equipped = chunk.text;
          if (chunk.keyword === "wfs_range_hand_equipped")
            characterData.range_hand_equipped = chunk.text;
          if (chunk.keyword === "wfs_inventory_0")
            characterData.inventory[0] = chunk.text;
          if (chunk.keyword === "wfs_inventory_1")
            characterData.inventory[1] = chunk.text;
          if (chunk.keyword === "wfs_inventory_2")
            characterData.inventory[2] = chunk.text;
          if (chunk.keyword === "wfs_inventory_3")
            characterData.inventory[3] = chunk.text;
          if (chunk.keyword === "wfs_inventory_4")
            characterData.inventory[4] = chunk.text;
          if (chunk.keyword === "wfs_inventory_5")
            characterData.inventory[5] = chunk.text;
          if (chunk.keyword === "wfs_inventory_6")
            characterData.inventory[6] = chunk.text;
          if (chunk.keyword === "wfs_inventory_7")
            characterData.inventory[7] = chunk.text;
          if (chunk.keyword === "wfs_inventory_8")
            characterData.inventory[8] = chunk.text;
          if (chunk.keyword === "wfs_inventory_9")
            characterData.inventory[9] = chunk.text;
          if (chunk.keyword === "wfs_inventory_10")
            characterData.inventory[10] = chunk.text;
          if (chunk.keyword === "wfs_inventory_11")
            characterData.inventory[11] = chunk.text;
          if (chunk.keyword === "wfs_inventory_12")
            characterData.inventory[12] = chunk.text;
          if (chunk.keyword === "wfs_inventory_13")
            characterData.inventory[13] = chunk.text;
          if (chunk.keyword === "wfs_inventory_14")
            characterData.inventory[14] = chunk.text;
        }

        setSavedData(characterData);
        setInit(true);
      };
      bufferReader.readAsArrayBuffer(file);

      // Get the profile image
      const dataReader = new FileReader();
      dataReader.onloadend = (f) => {
        const img = new Image();
        img.onload = () => {
          // Extract profile image
          const canvas_a = document.createElement("canvas");
          const canvas_b = document.createElement("canvas");
          const ctx_a = canvas_a.getContext("2d");
          const ctx_b = canvas_b.getContext("2d");
          canvas_a.width = 512;
          canvas_b.width = 400;
          canvas_a.height = 640;
          canvas_b.height = 400;

          // Draw the image onto the canvas
          ctx_a.drawImage(img, 0, 0, 512, 640);
          ctx_b.putImageData(ctx_a.getImageData(56, 119, 400, 400), 0, 0);

          // Extract the profile image
          setProfileImageData(canvas_b.toDataURL("image/png"));
          //setProfileImageData(ctx.getImageData(56, 119, 400, 400));
        };
        img.src = f.target.result;
      };
      dataReader.readAsDataURL(file);
    }
  }, []);

  const handleNewCharacter = React.useCallback(() => {
    setSavedData(newCharacter);
    setInit(true);
  }, []);

  /////////////////////////////////////////////////////////////////////////////
  // LEVEL UP DIALOGS
  /////////////////////////////////////////////////////////////////////////////

  const IncrementLevel = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.level = tmpData.level + 1;
    setSavedData(tmpData);
  }, [savedData]);

  const DecrementLevel = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.level = tmpData.level - 1;

    if (tmpData.level === 4) {
      tmpData.free_subject = "";
    }

    if (tmpData.level === 2) {
      tmpData.specialty = "";
    }

    if (tmpData.level === 1) {
      tmpData.guild = "";
      tmpData.guild_subject = "";
    }

    setSavedData(tmpData);
  }, [savedData]);

  React.useEffect(() => {
    UpdateCurrentHealth(derivedData.metrics.max_health);
  }, [UpdateCurrentHealth, derivedData.metrics.max_health]);

  // Level 1 Character Information
  const [formName, setFormName] = React.useState("");
  const [formAge, setFormAge] = React.useState(13);
  const [formSpecies, setFormSpecies] = React.useState("human");
  const [formCulture, setFormCulture] = React.useState("anniearan");
  const [formRole, setFormRole] = React.useState("apothecary");

  const UpdateFormAge = React.useCallback((value) => {
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return;
    } else {
      setFormAge(value);
    }
  }, []);

  const cultureOptions = React.useMemo(() => {
    setFormCulture(Object.keys(species[formSpecies].cultures)[0]);

    return Object.keys(species[formSpecies].cultures).map((key, i) => {
      return (
        <option key={i} value={key}>
          {species[formSpecies].cultures[key].name}
        </option>
      );
    });
  }, [formSpecies]);

  const confirmLevelOne = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.name = formName;
    tmpData.age = formAge;
    tmpData.species = formSpecies;
    tmpData.culture = formCulture;
    tmpData.role = formRole;
    tmpData.coins = role[formRole]?.start_coin;
    tmpData.level = 1;

    tmpData.current_health = role[formRole]?.level_1.metrics.max_health;
    tmpData.current_spark = role[formRole]?.level_1.metrics.start_spark;

    tmpData.inventory[0] = "[Weapon of Choice]";
    if (formRole === "warden") tmpData.inventory[1] = "Shield";

    setSavedData(tmpData);
  }, [formName, formAge, formSpecies, formCulture, formRole, savedData]);

  // Level 2 Character Information
  const [formGuild, setFormGuild] = React.useState("boatery");
  const [formGuildTraining, setFormGuildTraining] = React.useState("form");

  const guildTrainingOptions = React.useMemo(() => {
    setFormGuildTraining(guild[formGuild].training[0]);

    return guild[formGuild].training.map((key, i) => {
      if (!derivedData.training[key]) {
        return (
          <option key={i} value={key}>
            {subject[key].name}
          </option>
        );
      }
      return <></>;
    });
  }, [formGuild, derivedData.training]);

  const confirmLevelTwo = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.guild = formGuild;
    tmpData.guild_subject = formGuildTraining;
    setSavedData(tmpData);
  }, [formGuild, formGuildTraining, savedData]);

  const cancelLevelTwo = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.level = 1;
    setSavedData(tmpData);
  }, [savedData]);

  // Level 3 Character Information
  const [formSpecialty, setFormSpecialty] = React.useState("");

  const specialtyOptions = React.useMemo(() => {
    if (savedData.role) {
      setFormSpecialty(Object.keys(role[savedData.role].specialties)[0]);

      return Object.keys(role[savedData.role].specialties).map((key, i) => {
        return (
          <option key={i} value={key}>
            {role[savedData.role].specialties[key].name}
          </option>
        );
      });
    }
  }, [savedData.role]);

  const confirmLevelThree = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.specialty = formSpecialty;
    setSavedData(tmpData);
  }, [formSpecialty, savedData]);

  const cancelLevelThree = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.level = 2;
    setSavedData(tmpData);
  }, [savedData]);

  // Other Character Information
  const [formTraining, setFormTraining] = React.useState("");
  const trainingOptions = React.useMemo(() => {
    let defaultSet = false;

    return Object.keys(subject).map((key, i) => {
      if (!derivedData.training[key]) {
        if (!defaultSet) {
          defaultSet = true;
          setFormTraining(key);
        }
        return (
          <option key={i} value={key}>
            {subject[key].name}
          </option>
        );
      }
      return <></>;
    });
  }, [derivedData]);

  const confirmFreeSubject = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.free_subject = formTraining;
    setSavedData(tmpData);
  }, [formTraining, savedData]);

  /////////////////////////////////////////////////////////////////////////////
  // REST AND RECOVERY
  /////////////////////////////////////////////////////////////////////////////

  const applyRest = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.current_health = derivedData.metrics.max_health;
    setSavedData(tmpData);
  }, [savedData, derivedData]);

  const applyRecovery = React.useCallback(() => {
    const tmpData = { ...savedData };
    tmpData.current_health = derivedData.metrics.max_health;
    tmpData.current_spark = derivedData.metrics.start_spark;
    tmpData.resource_used = 0;
    setSavedData(tmpData);
  }, [savedData, derivedData]);

  /////////////////////////////////////////////////////////////////////////////
  // MAIN CHARACTER SHEET
  /////////////////////////////////////////////////////////////////////////////

  const characterSheetBody = React.useMemo(() => {
    /* 8.5 x 11 Page Layout  */
    return (
      <div className="flex flex-col align-center justify-start w-[850px] aspect-[0.77] bg-white text-gray-900">
        {/* Top Bar */}
        <div className="flex justify-end flex-row w-[100%]">
          {/* Character Name + Age */}
          <div className="flex flex-[4] flex-col rounded-xl m-[8px]">
            <div className="flex flex-[1] flex-col text-[22pt] font-bold">
              Wingfeather Saga RPG
            </div>
            <div className="flex flex-[1] pb-[4px] pt-[4px] flex-col rounded-xl border-4 border-gray-800">
              <div className="flex flex-[1] flex-row text-[14pt]">
                <input
                  className="w-[80%] flex-row border-b-2 ml-[8px] mr-[8px] text-center"
                  value={savedData.name}
                  onChange={(e) => UpdateName(e.target.value)}
                />
                <input
                  className="w-[20%] flex-row border-b-2 ml-[8px] mr-[8px] text-center"
                  value={savedData.age}
                  onChange={(e) => UpdateAge(e.target.value)}
                />
              </div>

              <div className="flex flex-row text-[10pt]">
                <div className="w-[80%] flex-row justify-center text-center ml-[8px] mr-[8px]">
                  Name
                </div>
                <div className="w-[20%] flex-row justify-center text-center ml-[8px] mr-[8px]">
                  Age
                </div>
              </div>
            </div>
          </div>
          {/* Character Info */}
          <div className="flex flex-[6] flex-col rounded-xl border-4 border-gray-800 m-[8px] p-[4px]">
            {/* Role Values */}
            <div className="flex flex-[1] flex-row text-[12pt]">
              <div className="flex flex-[7] flex-row border-b-2 ml-[8px] mr-[8px]">
                <div className="flex flex-[3] flex-row justify-center">
                  {role[savedData.role] ? (
                    role[savedData.role].title
                  ) : (
                    <span className="text-gray-300">Unset</span>
                  )}
                </div>
                <div className="flex flex-[5] flex-row justify-center">
                  {role[savedData.role] && savedData.specialty ? (
                    role[savedData.role].specialties[savedData.specialty].name
                  ) : (
                    <div>
                      <span className="text-gray-300 print:hidden text-[10pt] ">
                        Locked until Level 3
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-[3] flex-row justify-center border-b-2">
                <span>{savedData.level}</span>
              </div>
            </div>
            {/* Role Titles */}
            <div className="flex flex-row text-[10pt]">
              <div className="flex flex-[7] flex-row ml-[8px] mr-[8px]">
                <div className="flex flex-[3] flex-row justify-center">
                  Role
                </div>
                <div className="flex flex-[5] flex-row justify-center">
                  Speciality
                </div>
              </div>
              <div className="flex flex-[3] flex-row justify-center">Level</div>
            </div>
            {/* Species/Guild Values */}
            <div className="flex flex-row text-[12pt]">
              <div className="flex flex-[7] ml-[8px] mr-[8px] flex-row border-b-2">
                <div className="flex flex-[3] flex-row justify-center">
                  {species[savedData.species] ? (
                    species[savedData.species].name
                  ) : (
                    <span className="text-gray-300">Unset</span>
                  )}
                </div>
                <div className="flex flex-[5] flex-row justify-center">
                  {species[savedData.species]?.cultures[savedData.culture] ? (
                    species[savedData.species].cultures[savedData.culture].name
                  ) : (
                    <span className="text-gray-300">Unset</span>
                  )}
                </div>
              </div>
              <div className="flex flex-[3] flex-row justify-center border-b-2">
                {savedData.level >= 2 && guild[savedData.guild] ? (
                  guild[savedData.guild].name
                ) : (
                  <div>
                    <span className="text-gray-300 text-[10pt] print:!hidden">
                      Locked until Level 2
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Species/Guild Titles */}
            <div className="flex flex-row text-[10pt]">
              <div className="flex flex-[7] flex-row  ml-[8px] mr-[8px]">
                <div className="flex flex-[3] flex-row justify-center">
                  Species
                </div>
                <div className="flex flex-[5] flex-row justify-center">
                  Culture
                </div>
              </div>
              <div className="flex flex-[3] flex-row justify-center">Guild</div>
            </div>
          </div>
        </div>

        {/* Stat Boxes */}
        <div className="flex justify-end flex-row w-[100%]">
          {/* Health */}
          <div className="flex-[4] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
            <div className="flex-[2] flex text-[14pt] justify-center">
              Health
            </div>
            <div className="flex-[1] flex flex-row justify-center">
              <div className="flex-[1] flex text-[10pt] justify-center">
                Max
              </div>
              <div className="flex-[1] flex text-[10pt] justify-center">
                Current
              </div>
            </div>
            <div className="flex-[1] flex flex-row justify-around content-around">
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                {derivedData.metrics.max_health}
              </div>
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                <input
                  className="w-[100%] h-[100%] text-center print:!hidden"
                  value={savedData.current_health}
                  onChange={(e) => UpdateCurrentHealth(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Spark */}
          <div className="flex-[5] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
            <div className="flex-[2] flex text-[14pt] justify-center">
              Spark
            </div>
            <div className="flex-[1] flex flex-row justify-center">
              <div className="flex-[1] flex text-[10pt] justify-center">
                Max
              </div>
              <div className="flex-[1] flex text-[10pt] justify-center">
                Start
              </div>
              <div className="flex-[1] flex text-[10pt] justify-center">
                Current
              </div>
            </div>
            <div className="flex-[1] flex flex-row justify-around content-around">
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                {derivedData.metrics.max_spark}
              </div>
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                {derivedData.metrics.start_spark}
              </div>
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                <input
                  className="w-[100%] h-[100%] text-center print:!hidden"
                  value={savedData.current_spark}
                  onChange={(e) => UpdateCurrentSpark(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Defense */}
          <div className="flex-[3] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
            <div className="flex-[2] flex text-[14pt] justify-center">
              Defense
            </div>
            <div className="flex-[1] flex flex-row justify-center">
              <div className="flex-[1] flex text-[10pt] justify-center">
                Min to Hit
              </div>
            </div>
            <div className="flex-[1] flex flex-row justify-around content-around">
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                {derivedData.metrics.defense}
              </div>
            </div>
          </div>

          {/* Movement */}
          <div className="flex-[3] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
            <div className="flex-[2] flex text-[14pt] justify-center">
              Movement
            </div>
            <div className="flex-[1] flex flex-row justify-center">
              <div className="flex-[1] flex text-[10pt] justify-center">
                Spaces
              </div>
            </div>
            <div className="flex-[1] flex flex-row justify-around content-around">
              <div className="text-[16pt] text-center m-[8px] w-[40px] aspect-[1] border-2 border-gray-500">
                {derivedData.metrics.movement}
              </div>
            </div>
          </div>

          {/* Aid */}
          <div className="flex-[4] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
            <div className="flex-[2] flex text-[14pt] justify-center">
              Maker's Aid
            </div>
            <div className="flex-[1] flex flex-row justify-center">
              <div className="flex-[1] flex text-[10pt] justify-center"></div>
              <div className="flex-[1] flex text-[10pt] justify-center"></div>
            </div>
            <div className="flex-[1] flex flex-row justify-around content-around">
              <button
                className={`flex m-[8px] w-[40px] h-[40px] border-2 border-gray-500 ${savedData.aid_used >= 1 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_aid < 1 ? "border-dashed" : ""}`}
                onClick={() => AidClicked(1)}
                disabled={derivedData.metrics.max_aid < 1}
              />
              <button
                className={`flex m-[8px] w-[40px] h-[40px] border-2 border-gray-500 ${savedData.aid_used >= 2 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_aid < 2 ? "border-dashed" : ""}`}
                onClick={() => AidClicked(2)}
                disabled={derivedData.metrics.max_aid < 2}
              />
            </div>
          </div>
        </div>

        {/* Sheet Info */}
        <div className="flex justify-end flex-row w-[100%] flex-grow">
          {/* Subjects and Inventory */}
          <div className="flex-[2] flex justify-end flex-col">
            {/* Subjects */}
            <div className="flex-[1] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-start">
              <div className="flex text-[16pt] justify-center">Subjects</div>

              {/* Header */}
              <div className="flex-[1] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]"></div>
                <div className="flex-[2] flex flex-col justify-center text-[11pt] text-center ">
                  Trained
                </div>
              </div>

              {/* Word */}
              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Word
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.word ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Form
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.form ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Song
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.song ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Athletistry
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.athletistry ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Bushcraft
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.bushcraft ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Critterspeak
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.critterspeak ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Medicineship
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.medicineship ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Smarts
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.smarts ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Sneakery
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.sneakery ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>

              <div className="flex-[2] flex flex-row pl-2 pr-2">
                <div className="flex-[4] flex flex-col justify-center text-[14pt]">
                  Tinkersmith
                </div>
                <div className="flex-[1] flex flex-col justify-center">
                  <div
                    className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.tinkersmith ? "bg-gray-900" : ""}`}
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="flex-[1] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
              <div className="flex text-[16pt] justify-center">Inventory</div>
              <div className="flex-[1] flex flex-col text-[16pt] p-2">
                {InventoryView}
              </div>
            </div>
          </div>

          {/* Appearance, Resources, etc. */}
          <div className="flex-[2] flex justify-end flex-col">
            {/* Appearance */}
            <div className="flex-[3] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
              <div className="flex text-[16pt] justify-center">Appearance</div>
              <div className="flex-[1] flex flex-row justify-center">
                <div className="flex-grow"></div>
                <button
                  className="flex-[1] flex flex-col content-center aspect-[1]"
                  onClick={handleImageClick}
                >
                  <img
                    src={profileImageData ?? DefaultAppearance}
                    alt="Character Appearance"
                  />
                </button>
                <div className="flex-grow"></div>
              </div>
            </div>

            {/* Weapons Training */}
            <div className="flex-[2] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
              <div className="flex text-[16pt] justify-center">
                Weapons Training
              </div>

              <div className="flex flex-[1] flex-row m-1">
                <div className="flex flex-[2] justify-center text-[10pt]">
                  Equipped
                </div>
                <div className="flex flex-[3] justify-center" />
                <div className="flex flex-[2] justify-center text-[10pt]">
                  Trained
                </div>
              </div>
              <div className="flex flex-[2] flex-row m-1">
                <div className="flex-[1]" />
                <button
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${savedData.one_hand_equipped ? "bg-gray-900" : ""}`}
                  onClick={EquipOneHand}
                />
                <div className="flex flex-[8] justify-center">One-Handed</div>
                <div
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.one_handed ? "bg-gray-900" : ""}`}
                />

                <div className="flex-[1]" />
              </div>
              <div className="flex flex-[2] flex-row m-1">
                <div className="flex-[1]" />
                <button
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${savedData.two_hand_equipped ? "bg-gray-900" : ""}`}
                  onClick={EquipTwoHand}
                />
                <div className="flex flex-[8] justify-center">Two-Handed</div>
                <div
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.two_handed ? "bg-gray-900" : ""}`}
                />

                <div className="flex-[1]" />
              </div>
              <div className="flex flex-[2] flex-row m-1 content-around">
                <div className="flex-[1]" />
                <button
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${savedData.ranged_equipped ? "bg-gray-900" : ""}`}
                  onClick={EquipRanged}
                />
                <div className="flex flex-[8] justify-center">Ranged</div>
                <div
                  className={`flex w-[20px] h-[20px] border-2 border-gray-800 ${derivedData.training.ranged ? "bg-gray-900" : ""}`}
                />

                <div className="flex-[1]" />
              </div>
            </div>

            {/* Resource Tracker */}
            <div className="flex-[1] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
              <div className="flex flex-[2] text-[16pt] justify-center">
                Resource Tracker
              </div>
              <div className="flex flex-[1] text-[10pt] justify-center">
                {derivedData.resources_name
                  ? derivedData.resources_name.charAt(0).toUpperCase() +
                    derivedData.resources_name.substring(1)
                  : ""}
              </div>
              <div className="flex-[2] flex flex-row justify-center gap-1">
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 1 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 1 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(1)}
                  disabled={derivedData.metrics.max_resource < 1}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 2 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 2 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(2)}
                  disabled={derivedData.metrics.max_resource < 2}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 3 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 3 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(3)}
                  disabled={derivedData.metrics.max_resource < 3}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 4 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 4 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(4)}
                  disabled={derivedData.metrics.max_resource < 4}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 5 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 5 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(5)}
                  disabled={derivedData.metrics.max_resource < 5}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 6 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 6 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(6)}
                  disabled={derivedData.metrics.max_resource < 6}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 7 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 7 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(7)}
                  disabled={derivedData.metrics.max_resource < 7}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 8 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 8 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(8)}
                  disabled={derivedData.metrics.max_resource < 8}
                />
                <button
                  className={`flex w-[15px] h-[15px] border-2 border-gray-800 ${savedData.resource_used >= 9 ? "bg-gray-900 print:bg-white" : ""} ${derivedData.metrics.max_resource < 9 ? "border-dashed" : ""}`}
                  onClick={() => ResourceClicked(9)}
                  disabled={derivedData.metrics.max_resource < 9}
                />
              </div>
            </div>

            {/* Guild Tool */}
            <div className="flex-[3] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center">
              <div className="flex text-[16pt] justify-center">Guild Tool</div>
              <div className="flex text-[12pt] font-bold justify-center">
                {derivedData.guild_tool}
              </div>
              <div className="flex-[1] flex flex-col text-[10pt] justify-start p-1">
                {derivedData.tool_description
                  ? derivedData.tool_description.map((line, i) => (
                      <p key={i} className="text-[10pt] justify-center">
                        {line}
                      </p>
                    ))
                  : ""}
              </div>
            </div>

            {/* Coins */}
            <div className="flex-[1] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-center content-center align-center">
              <div className="flex text-[16pt] justify-center">Coins</div>
              <div className="flex text-[14pt] justify-center">
                <input
                  className="w-[50%] flex justify-center align-center text-center font-bold pb-[2] print:!hidden"
                  value={savedData.coins}
                  onChange={(e) => UpdateCurrentCoin(e.target.value)}
                />
              </div>
              <div className="flex-[1]" />
            </div>
          </div>

          {/* Skills and Spells */}
          <div className="flex-[3] flex justify-end flex-col">
            <div className="flex-[1] flex flex-col rounded-xl border-4 border-gray-800 m-[8px] justify-start align-start content-start">
              <div className="flex text-[16pt] justify-center">Skills</div>
              <div className="flex flex-col text-[16pt] pl-2 pr-2">
                {SkillView}
              </div>
              <div className="flex text-[12pt] font-bold pl-2">
                {role[savedData.role]?.spell_name}
              </div>
              <div className="flex flex-col text-[16pt] pl-2 pr-2">
                {SpellView}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    savedData,
    derivedData,
    profileImageData,
    AidClicked,
    EquipOneHand,
    EquipRanged,
    EquipTwoHand,
    InventoryView,
    ResourceClicked,
    SkillView,
    SpellView,
    UpdateAge,
    UpdateCurrentCoin,
    UpdateCurrentHealth,
    UpdateCurrentSpark,
    UpdateName,
  ]);

  /////////////////////////////////////////////////////////////////////////////
  // JSX BODY
  /////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8 print:!hidden">
        {init && !savedData.species ? (
          <div className="flex flex-col align-center justify-center fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-80 z-10">
            {/* New Character Dialog */}
            <div className="flex-[1] max-h-[50vh]" />
            <div className="flex-[1] flex flex-row align-center justify-center">
              <div className="flex-[1] max-w-[20vw]" />
              <div className="flex-[1] flex flex-col bg-gray-200 rounded-xl p-8 shadow-xl text-m align-center justify-start text-gray-800">
                <div className="flex flex-row justify-center text-[22pt] font-bold">
                  New Character
                </div>
                <div className="flex flex-row">
                  <div className="flex-[7] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Name
                    </div>
                    <input
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex-[1] flex flex-col" />
                  <div className="flex-[2] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center  font-bold">
                      Age
                    </div>
                    <input
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      value={formAge}
                      onChange={(e) => {
                        UpdateFormAge(e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex flex-row"></div>
                </div>
                <div className="flex border-b-2 border-gray-500 p-[8px] w-[100%]" />
                <div className="flex flex-row">
                  <div className="flex-[9] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Species
                    </div>
                    <select
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      value={formSpecies}
                      onChange={(e) => setFormSpecies(e.target.value)}
                    >
                      <option value="human">Human</option>
                      <option value="fang">Fang</option>
                      <option value="ridgerunner">Ridgerunner</option>
                    </select>
                    <div className="flex text-[12pt] rounded-xl p-[6px] m-[2px] justify-center">
                      {species[formSpecies].bonus}
                    </div>
                  </div>
                  <div className="flex-[2] flex flex-col" />
                  <div className="flex-[9] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Culture
                    </div>

                    <select
                      value={formCulture}
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      onChange={(e) => {
                        setFormCulture(e.target.value);
                      }}
                    >
                      {cultureOptions}
                    </select>

                    <div className="flex text-[12pt] rounded-xl p-[6px] m-[2px] justify-center">
                      {species[formSpecies]?.cultures[formCulture]?.bonus}
                    </div>
                  </div>
                </div>

                <div className="flex border-b-2 border-gray-500 p-[8px] w-[100%]" />
                <div className="flex flex-row">
                  <div className="flex-[1] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Role
                    </div>
                    <select
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      onChange={(e) => setFormRole(e.target.value)}
                    >
                      <option value="apothecary">Apothecary</option>
                      <option value="bard">Bard</option>
                      <option value="cook">Cook</option>
                      <option value="ranger">Ranger</option>
                      <option value="scoundrel">Scoundrel</option>
                      <option value="warden">Warden</option>
                    </select>
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center">
                      {role[formRole]?.brief}
                    </div>
                    <div className="flex flex-row space-around">
                      <div className="flex-[1] flex flex-col">
                        <div className="flex flex-row justify-center font-bold text-[12pt]">
                          Health
                        </div>
                        <div className="flex flex-row justify-center font-bold text-[16pt]">
                          {role[formRole]?.level_1.metrics.max_health}
                        </div>
                      </div>
                      <div className="flex-[1] flex flex-col">
                        <div className="flex flex-row justify-center font-bold text-[12pt]">
                          Spark
                        </div>
                        <div className="flex flex-row justify-center font-bold text-[16pt]">
                          {role[formRole]?.level_1.metrics.max_spark}
                        </div>
                      </div>
                      <div className="flex-[1] flex flex-col">
                        <div className="flex flex-row justify-center font-bold text-[12pt]">
                          Defense
                        </div>
                        <div className="flex flex-row justify-center font-bold text-[16pt]">
                          {role[formRole]?.level_1.metrics.defense}
                        </div>
                      </div>
                      <div className="flex-[1] flex flex-col">
                        <div className="flex flex-row justify-center font-bold text-[12pt]">
                          Speed
                        </div>
                        <div className="flex flex-row justify-center font-bold text-[16pt]">
                          {role[formRole]?.level_1.metrics.movement}
                        </div>
                      </div>
                      <div className="flex-[1] flex flex-col">
                        <div className="flex flex-row justify-center font-bold text-[12pt]">
                          Coin
                        </div>
                        <div className="flex flex-row justify-center font-bold text-[16pt]">
                          {role[formRole]?.start_coin}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-[1]" />
                <div className="flex-row flex">
                  <div className="flex-[8]" />
                  <button
                    className="flex content-center rounded-xl bg-red-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => setInit(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex content-center rounded-xl bg-blue-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => confirmLevelOne()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="flex-[1] max-w-[20vw]" />
            </div>
            <div className="flex-[1] max-h-[50vh]" />
          </div>
        ) : init && savedData.level >= 2 && !savedData.guild ? (
          <div className="flex flex-col align-center justify-center fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-80 z-10">
            {/* Guild Selection Dialog */}
            <div className="flex-[1] max-h-[50vh]" />
            <div className="flex-[1] flex flex-row align-center justify-center">
              <div className="flex-[1] max-w-[20vw]" />
              <div className="flex-[1] flex flex-col bg-gray-200 rounded-xl p-8 shadow-xl text-m align-center justify-start text-gray-800">
                <div className="flex flex-row justify-center text-[22pt] font-bold">
                  Guild Selection
                </div>
                <div className="flex flex-row">
                  <div className="flex-[9] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Guild
                    </div>
                    <select
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      value={formGuild}
                      onChange={(e) => setFormGuild(e.target.value)}
                    >
                      {Object.keys(guild).map((guild_id, i) => {
                        return (
                          <option key={i} value={guild_id}>
                            {guild[guild_id].name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex-[2] flex flex-col" />
                  <div className="flex-[9] flex flex-col">
                    <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                      Training
                    </div>
                    <select
                      value={formGuildTraining}
                      className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                      onChange={(e) => {
                        setFormGuildTraining(e.target.value);
                      }}
                    >
                      {guildTrainingOptions}
                    </select>
                  </div>
                </div>

                <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center">
                  {guild[formGuild]?.brief}
                </div>

                <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center font-bold">
                  Guild Tool
                </div>

                <div className="flex text-[14pt] rounded-xl p-[6px] m-[2px] justify-center">
                  {guild[formGuild]?.tool}
                </div>

                <div className="flex text-[12pt] rounded-xl p-[6px] m-[2px] justify-center">
                  <div className="flex flex-col w-[50%] text-[14pt] rounded-xl p-[6px] m-[2px] justify-center">
                    {guild[formGuild]?.tool_description.map((line, i) => {
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </div>

                <div className="flex-[1]" />
                <div className="flex-row flex">
                  <div className="flex-[8]" />
                  <button
                    className="flex content-center rounded-xl bg-red-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => cancelLevelTwo()}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex content-center rounded-xl bg-blue-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => confirmLevelTwo()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="flex-[1] max-w-[20vw]" />
            </div>
            <div className="flex-[1] max-h-[50vh]" />
          </div>
        ) : init && savedData.level >= 3 && !savedData.specialty ? (
          <div className="flex flex-col align-center justify-center fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-80 z-10">
            {/* Specialty Selection Dialog */}
            <div className="flex-[1] max-h-[50vh]" />
            <div className="flex-[1] flex flex-row align-center justify-center">
              <div className="flex-[1] max-w-[20vw]" />
              <div className="flex-[1] flex flex-col bg-gray-200 rounded-xl p-8 shadow-xl text-m align-center justify-start text-gray-800">
                <div className="flex flex-row justify-center text-[22pt] font-bold">
                  Speciality Selection
                </div>
                <select
                  className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                >
                  {specialtyOptions}
                </select>

                <div className="flex text-[16pt] rounded-xl p-[6px] m-[2px] justify-center">
                  {role[savedData.role]?.specialties[formSpecialty].brief}
                </div>

                <div className="flex-[1]" />
                <div className="flex-row flex">
                  <div className="flex-[8]" />
                  <button
                    className="flex content-center rounded-xl bg-red-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => cancelLevelThree()}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex content-center rounded-xl bg-blue-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => confirmLevelThree()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="flex-[1] max-w-[20vw]" />
            </div>
            <div className="flex-[1] max-h-[50vh]" />
          </div>
        ) : init &&
          derivedData.metrics.free_training >= 1 &&
          !savedData.free_subject ? (
          <div className="flex flex-col align-center justify-center fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-80 z-10">
            {/* Free Subject Dialog */}
            <div className="flex-[1] max-h-[50vh]" />
            <div className="flex-[1] flex flex-row align-center justify-center">
              <div className="flex-[1] max-w-[20vw]" />
              <div className="flex-[1] flex flex-col bg-gray-200 rounded-xl p-8 shadow-xl text-m align-center justify-start text-gray-800">
                <div className="flex flex-row justify-center text-[22pt] font-bold">
                  Subject Selection
                </div>
                <select
                  className="text-[18pt] rounded-xl border-gray-800 border-2 bg-white p-[6px] m-[2px]"
                  value={formTraining}
                  onChange={(e) => setFormTraining(e.target.value)}
                >
                  {trainingOptions}
                </select>

                <div className="flex-[1]" />
                <div className="flex-row flex">
                  <div className="flex-[8]" />
                  <button
                    className="flex content-center rounded-xl bg-blue-500 p-[8px] m-[8px] text-gray-200 text-[16pt]"
                    onClick={() => confirmFreeSubject()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              <div className="flex-[1] max-w-[20vw]" />
            </div>
            <div className="flex-[1] max-h-[50vh]" />
          </div>
        ) : (
          <></>
        )}

        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">
              Wingfeather Character Creator
            </h1>
            <p className="text-xl text-gray-400">
              This unofficial digital character sheet is intended for use with
              the <span className="font-bold">Wingfeather Saga RPG</span>.
            </p>
          </header>

          <main
            className="bg-gray-800 rounded-xl p-8 shadow-xl flex flex-col text-m"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {init ? (
              <>
                <div className="flex flex-row w-[850px]">
                  <button
                    title="Reset"
                    className="flex content-center rounded-xl bg-blue-700 p-[8px] m-[8px]"
                    onClick={() => setInit(false)}
                  >
                    <LucideArrowLeft />
                  </button>
                  <button
                    title="Download"
                    className="flex content-center rounded-xl bg-blue-700 p-[8px] m-[8px]"
                    onClick={() => ExportPlayerCard()}
                  >
                    <LucideDownload />
                  </button>
                  <button
                    title="Print"
                    className="flex content-center rounded-xl bg-blue-700 p-[8px] m-[8px]"
                    onClick={() => window.print()}
                  >
                    <LucidePrinter />
                  </button>

                  <div className="flex-[1] flex" />
                  <button
                    title="Rest"
                    className="flex content-center rounded-xl bg-blue-700 p-[8px] m-[8px]"
                    onClick={() => applyRest()}
                  >
                    <LucideUtensilsCrossed />
                  </button>
                  <button
                    title="Recovery"
                    className="flex content-center rounded-xl bg-blue-700 p-[8px] m-[8px]"
                    onClick={() => applyRecovery()}
                  >
                    <LucideBed />
                  </button>
                  <button
                    title="Level Down"
                    className="flex content-center rounded-xl bg-red-500 p-[8px] m-[8px] disabled:bg-gray-500"
                    onClick={() => DecrementLevel()}
                    disabled={savedData.level <= 1}
                  >
                    <LucideShieldMinus />
                  </button>
                  <button
                    title="Level Up"
                    className="flex content-center rounded-xl bg-green-500 p-[8px] m-[8px] disabled:bg-gray-500"
                    onClick={() => IncrementLevel()}
                    disabled={savedData.level >= 6}
                  >
                    <LucideShieldPlus />
                  </button>
                </div>
                {characterSheetBody}
              </>
            ) : (
              <div className="flex flex-row w-[90%]">
                <div className="flex-[1]" />
                <button
                  className="flex-[3] flex flex-col justify-center align-center rounded-xl bg-blue-700 p-[8px]"
                  onClick={handleSaveClick}
                >
                  <div className="flex-[2]" />
                  <div className="flex flex-row">
                    <div className="flex-[1]" />
                    <LucideUserRoundPen size={64} />
                    <div className="flex-[1]" />
                  </div>
                  <div className="flex-[1]" />
                  Edit Existing Character
                  <div className="flex-[1]" />
                </button>
                <div className="flex-[1]" />
                <div className="justify-center align-center content-center">
                  OR
                </div>
                <div className="flex-[1]" />
                <button
                  className="flex-[3] flex flex-col justify-center align-center rounded-xl bg-blue-700 p-[8px]"
                  onClick={handleNewCharacter}
                >
                  <div className="flex-[2]" />
                  <div className="flex flex-row">
                    <div className="flex-[1]" />
                    <LucideUserRoundPlus size={64} />
                    <div className="flex-[1]" />
                  </div>
                  <div className="flex-[1]" />
                  Create New Character
                  <div className="flex-[1]" />
                </button>
                <div className="flex-[1]" />
              </div>
            )}
          </main>

          <footer className="text-center mb-12">
            <p className="text-xl text-gray-400">
              The <span className="font-bold">Wingfeather Saga RPG</span> is
              Copyright 2025 by Toothy Cow Productions, LLC and Shining Isle
              Productions, LLC.
            </p>
          </footer>
        </div>
        <input
          type="file"
          ref={hiddenSaveInput}
          onChange={handleSaveImport}
          accept=".png"
          className="hidden"
        />

        <input
          type="file"
          ref={hiddenImageInput}
          onChange={handleProfileImageChange}
          accept=".png"
          className="hidden"
        />
      </div>
      <div className="hidden print:!block">{characterSheetBody}</div>
    </div>
  );
}
