const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("developers-leave-guild")
    .setDescription("make the bot leave a server")
    .addStringOption(option =>
      option.setName("guildid")
          .setDescription("guildid")
          .setRequired(true)
    ),
                   
                    async execute(interaction, client) {

                      if(interaction.member.id !== `722575141665505300`) return interaction.reply({ content: `this command is locked under the owner`, ephemeral: true})

                      interaction.reply({content:`the bot has left this server`, ephemeral: true})

                      const guildid = interaction.options.getString("guildid");

                      const guild = client.guilds.cache.get(guildid)

                      guild.leave().catch(() => {
                    return false;
                    });

                    }
}