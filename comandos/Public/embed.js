const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require(`discord.js`);



module.exports = {
    data: new SlashCommandBuilder()
        .setName(`embed`)
        .setDescription(`Crear tu embed personalizado`)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName(`titulo`)
                .setDescription(`Establecer el texto del título`)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(`descripción`)
                .setDescription(`Establecer la descripción`)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName(`imagen`)
                .setDescription(`Pegar una URL de imagen`)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName(`thumbnail`)
                .setDescription(`Pegue una URL de imagen`)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName(`field-name`)
                .setDescription(`Establecer el nombre del campo`)
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName(`field-value`)
                .setDescription(`Establecer el valor del campo`)
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options } = interaction;
        ///////////////////////////////////////////////////////
        const titulo = options.getString(`titulo`);
        const descripción = options.getString(`descripción`);
        const imagen = options.getString(`imagen`);
        const thumbnail = options.getString(`thumbnail`);
        const fieldn = options.getString(`field-name`) || "** **";
        const fieldv = options.getString(`field-value`) || " "
        ///////////////////////////////////////////////////////
        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descripción)
            .setColor(client.color)
            .setImage(imagen)
            .setThumbnail(thumbnail)
            .setTimestamp()
            .addFields(
                { name: `${fieldn}`, value: `${fieldv}` }
            )
            .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL({ dynamic: true }) })
     
              interaction.channel.send({ embeds: [embed]});
        await interaction.reply({content: `embed enviado correctamente `, ephemeral: true});
    },
};