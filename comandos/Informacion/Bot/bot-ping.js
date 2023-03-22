const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client} = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("bot-ping")
      .setDescription("Te respondere Pong!!"),
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
            .setTitle(`🏓・Pong`)
            .setDescription(`Echa un vistazo a lo rápido que es nuestro bot`)
            .addFields([
                {
                    name: `🤖・Latencia del Bot`,
                    value: `${client.ws.ping}\ ms`,
                }
            ])
            .setFooter({ text: `Solicitado por: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()
        ],
        ephemeral: true
      });
    },
  };