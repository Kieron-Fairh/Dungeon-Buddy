const { SlashCommandBuilder } = require("discord.js");
const { thanksTable, sequelize } = require("../../utils/loadDb");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("thank")
        .setDescription("Commend A player for a job well done.")
        .addUserOption((option) =>
            option
                .setName("player")
                .setDescription("Select the player.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("commendation_type")
                .setDescription("Specify the type of commendation.") // fixed typo
                .setRequired(true)
                .addChoices(
                    { name: 'mentor', value: `Mentorship` },
                    { name: 'sociability', value: `Sociability` } // removed extra space
                )
        ),
    async execute(interaction) {
        try {
            const playerid = interaction.options.getUser("player");
            if (!playerid) {
                await interaction.reply({ content: "Invalid player selected.", ephemeral: true });
                return;
            }
            if (playerid.id === interaction.user.id) {
                await interaction.reply({ content: "You cannot thank yourself.", ephemeral: true });
                return;
            }
            const date = new Date();
            const currentDate = `${date.getFullYear()}-${(String(date.getMonth() + 1)).padStart(2, `0`)}-${String(date.getDate()).padStart(2, `0`)}`;
            // Use parameterized query to avoid SQL injection and quoting issues
            let time = await sequelize.query(
                `SELECT createdAt FROM thanks WHERE createdAt LIKE :date AND thanker = :thanker AND player = :player`,
                {
                    replacements: {
                        date: `${currentDate}%`,
                        thanker: interaction.user.id,
                        player: playerid.id
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            );
            if (time.length === 0) {
                await thanksTable.create({
                    thanker: interaction.user.id,
                    player: playerid.id,
                    thanks_type: interaction.options.getString("commendation_type")
                });
                await interaction.reply({ content: `You thanked ${playerid.tag || playerid.username}!`, ephemeral: true });
            } else {
                await interaction.reply({ content: `You have already thanked this user today. Wait till tomorrow to thank again.`, ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "An error occurred while processing your request.", ephemeral: true });
            } else {
                await interaction.reply({ content: "An error occurred while processing your request.", ephemeral: true });
            }
        }
    }
}