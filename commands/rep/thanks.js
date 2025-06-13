const { SlashCommandBuilder} = require("discord.js");
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
                .setDescription("Specify the typle of commendation.")
                .setRequired(true)
                .addChoices(
                    {name: 'mentor', value: `Mentorship`},
                    {name: 'sociability ', value: `Sociability`}
                )
        ),
    async execute(interaction) {
        const playerid = interaction.options.getUser("player")
        const date = new Date()
        const currentDate = `${date.getFullYear()}-${(String(date.getMonth() + 1)).padStart(2, `0`)}-${String(date.getDate()).padStart(2, `0`)}`;
        let time = await thanksTable.sequelize.query(`SELECT createdAt FROM thanksTables WHERE createdAt LIKE "${currentDate}%" AND thanker = ${interaction.user.id} AND player = ${playerid.id}`, {type: sequelize.QueryTypes.SELECT})
        if (Object.keys(time).length === 0){
            await thanksTable.create({
                thanker: interaction.user.id,
                player: playerid.id,
                thanks_type: interaction.options.getString("commendation_type")
            });
            await interaction.reply(`You Thanked ${interaction.options.getUser("player")}`)
        } else {
            await interaction.reply(`You have already thanked this user today, wait till tomorrow to be able to thank this user again.`)
        }
    }
}