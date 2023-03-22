const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
      .setName("deletechannel")
      .setDescription("Seleccione el canal y lo eliminare!")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption(option => 
        option.setName("canal")
        .setDescription("Selecciona el canal a eliminar")
        .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        const { options } = interaction;

        const channel = options.getChannel("canal")

        channel.delete()

        await interaction.reply({ content: "El canal fue eliminado correctamente!", ephemeral: true })

    }
}