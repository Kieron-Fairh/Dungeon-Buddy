require("dotenv").config();

const prodEnv = process.env.NODE_ENV === "production";

// Define and export the token based on the environment
module.exports = {
    token: prodEnv ? process.env.PROD_BOT_TOKEN : process.env.TEST_BOT_TOKEN,
    clientId: prodEnv ? process.env.PROD_CLIENT_ID : process.env.TEST_CLIENT_ID,
    guildId: prodEnv ? process.env.PROD_GUILD_ID : process.env.TEST_GUILD_ID,
    dbHost: prodEnv ? process.env.PROD_DB_HOST : process.env.TEST_DB_HOST,
    dbDialect: prodEnv ? process.env.PROD_DB_DIALECT : process.env.TEST_DB_DIALECT,
    dbStorage: prodEnv ? process.env.PROD_DB_STORAGE : process.env.TEST_DB_STORAGE,
    tankEmoji: prodEnv ? `<:tankrole:1382900400109256846>` : `<:tankrole:1381429223968870430>`,
    healerEmoji: prodEnv ? `<:healerrole:1382900398591053995>` : `<:healerole:1381423472613265458>`,
    dpsEmoji: prodEnv ? `<:dpsrole:1382900397328433293>` : `<:dpsrole:1381423597519765729>`,
};
