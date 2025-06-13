const Sequelize = require("sequelize");
const { dbHost, dbDialect, dbStorage, dbLogging } = require("../config");

// Initialize Sequelize
const sequelize = new Sequelize("database", "user", "password", {
    host: dbHost,
    dialect: dbDialect,
    storage: dbStorage,
    logging: dbLogging === "true" ? console.log : false,
});

// Define dungeoninstances table
const dungeonInstanceTable = sequelize.define("dungeoninstances", {
    dungeon_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dungeon_name: Sequelize.STRING,
    dungeon_difficulty: Sequelize.STRING,
    timed_completed: Sequelize.STRING,
    passphrase: Sequelize.STRING,
    interaction_user: Sequelize.STRING,
    user_chosen_role: Sequelize.STRING,
    tank: Sequelize.STRING,
    healer: Sequelize.STRING,
    dps: Sequelize.STRING,
    dps2: Sequelize.STRING,
    dps3: Sequelize.STRING,
    expansion: Sequelize.STRING,
    season: Sequelize.INTEGER,
    reason: Sequelize.STRING,
});

// Define errors table
const errorTable = sequelize.define("errors", {
    error_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    error_name: Sequelize.STRING,
    error_message: Sequelize.STRING,
    user_id: Sequelize.STRING,
});

// Define interaction_status table
const interactionStatusTable = sequelize.define("interaction_status", {
    status_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    interaction_id: Sequelize.INTEGER,
    interaction_user: Sequelize.STRING,
    interaction_status: Sequelize.STRING,
    command_used: Sequelize.STRING,
});

// 🔄 Sync function
async function syncTables() {
    try {
        await sequelize.sync({ force: false });
        console.log("📦 Database tables synced.");
    } catch (err) {
        console.error("❌ Failed to sync tables:", err);
        throw err;
    }
}

module.exports = {
    syncTables,
    dungeonInstanceTable,
    errorTable,
    interactionStatusTable,
    sequelize,
};
