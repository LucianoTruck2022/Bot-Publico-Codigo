const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client} = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("bot-owner")
      .setDescription("Obtener la información del creador del bot"),
    /**
     *
     * @param {ChatInputCommandInteraction} 
     * @param {Client} client
     */
    execute(interaction, client) {
      const { user } = interaction
      interaction.reply({ 
        embeds: [
          new EmbedBuilder()
          .setColor(client.color)
          .setTitle(`Información del creador del bot`)
          .setThumbnail(`https://i.imgur.com/r7x1y90.jpg`)
          .addFields([
              {
                  name: `👑・Nombre del propietario`,
                  value: `Luciano`,
                  inline: true
              },
              {
                  name: `🏷・Discord tag`,
                  value: `!LucianoTruck#3210`,
                  inline: true
              },
              {
                  name: `🏢・Organización`,
                  value: `[Castores Trucking VTC](https://discord.gg/W3nFEqy67C)\n[Truckero | Development](https://discord.gg/pEmfzmDsPY)`,
                  inline: true
              },
              {
                  name: `📡・Twitch`,
                  value: `[LucianoTruck22](https://www.twitch.tv/lucianotruck22)`,
                  inline: true
              },
          ])
          .setFooter({ text: `Solicitado por: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
          .setTimestamp()
      ],
      ephemeral: true
      });
    },
  };