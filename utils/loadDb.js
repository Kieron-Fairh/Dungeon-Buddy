const Sequelize = require("sequelize");

// Initialize Sequelize with explicit dialect and storage for SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",                   // Must explicitly set the dialect
  storage: "./dungeoninstances.sqlite" // SQLite database file path
});

// Define the DungeonInstance table
const dungeonInstanceTable = sequelize.define("dungeoninstances", {
  dungeon_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dungeon_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dungeon_difficulty: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timed_completed: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passphrase: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  interaction_user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_chosen_role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  healer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dps: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dps2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dps3: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  expansion: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  season: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  reason: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// Define the Errors table
const errorTable = sequelize.define("errors", {
  error_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  error_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  error_message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define the Interaction Status table
const interactionStatusTable = sequelize.define("interaction_status", {
  status_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  interaction_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  interaction_user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  interaction_status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  command_used: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define the Thanks table
const thanksTable = sequelize.define("thanksTable", {
  thanks_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  thanker: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  player: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  thanks_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Function to sync tables (create if not exist)
function syncTables() {
  // Use force: false to avoid dropping tables in production
  return sequelize.sync({ force: false });
}

module.exports = {
  sequelize,
  dungeonInstanceTable,
  errorTable,
  interactionStatusTable,
  thanksTable,
  syncTables,
};
