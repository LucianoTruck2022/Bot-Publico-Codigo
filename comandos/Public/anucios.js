const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`anuncios`)
        .setDescription(`Enviar un anuncio a un canal específico`)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option => option.setName(`channel`).setDescription(`El canal donde quieres que vaya`).addChannelTypes(ChannelType.GuildText).setRequired(true))
        .addRoleOption(option => option.setName(`role`).setDescription(`El rol que quieres @`).setRequired(true))
        .addStringOption(option => option.setName(`title`).setDescription(`Titulo del embed`).setRequired(true))
        .addStringOption(option => option.setName(`message`).setDescription(`Contenido del mensaje del anuncio`).setRequired(true))
        .addStringOption(option => option.setName(`colour`).setDescription(`Color de la inserción (no requerido)`).setRequired(false))
        .addStringOption(option => option.setName(`image`).setDescription(`Imagen de la inserción (no requerida)`).setRequired(false)),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel(`channel`);
        const role = options.getRole(`role`);
        const title = options.getString(`title`);
        const message = options.getString(`message`);
        const colour = options.getString(`colour`) || "DarkButNotBlack";
        const image = options.getString(`image`) || null;

        const embed = new EmbedBuilder()
            .setTitle(`${title}`)
            .setColor(`${colour}`)
            .setDescription(`${message}`)
            .setImage(image)

        await channel.send({ embeds: [embed], content: `${role}` })
        await interaction.reply({ content: `Anuncio enviado a ${channel}`, ephemeral: true })
    }
}