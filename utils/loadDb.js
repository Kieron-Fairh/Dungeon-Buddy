const { Sequelize, DataTypes } = require("sequelize");
const { dbStorage } = require("../config");  // should point to your sqlite file path

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbStorage || "./dungeoninstances.sqlite",  // fallback path if not set in config
});

// Table definitions

const dungeonInstanceTable = sequelize.define("dungeoninstances", {
  dungeon_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dungeon_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dungeon_difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timed_completed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passphrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interaction_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_chosen_role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  healer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dps: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dps2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dps3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expansion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  season: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const errorTable = sequelize.define("errors", {
  error_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  error_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  error_message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const interactionStatusTable = sequelize.define("interaction_status", {
  status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  interaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  interaction_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interaction_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  command_used: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const thanksTable = sequelize.define("thanksTable", {
  thanks_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thanker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thanks_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function syncTables() {
  // Sync without dropping tables
  return sequelize.sync({ force: false });
}

module.exports = {
  syncTables,
  dungeonInstanceTable,
  errorTable,
  interactionStatusTable,
  thanksTable,
  sequelize,
};
