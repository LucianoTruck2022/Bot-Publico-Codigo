const { SlashCommandBuilder, EmbedBuilder, messageLink, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName("sugerir")
      .setDescription("Sugiere para mejorar el servidor")
      .addStringOption(option => option.setName("sugerencia") .setDescription("Cual es tu sugerencia") .setRequired(true) ),
    async execute(interaction, client) {
      const { options, guild } = interaction;
      const canal = interaction.guild.channels.cache.get("1062232262617337956");
      const description = options.getString("sugerencia");

      const embed = new EmbedBuilder()
        .setAuthor({ name: `Sugerencia de ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
        .setDescription(`${description}`)
        .setColor(client.color)
        .setFooter({ text: `${guild.name} | Para enviar una sugerencia envia /sugerir <sugerencia>`, iconURL: `${guild.iconURL({ dynamic: true })}`});

        const mensaje = await canal.send({
        embeds: [embed],
        fetchReply: true,
      });
      await mensaje.react("<:CT_Verficado:1036096226199883797>");
      await mensaje.react("<:No:1036096435940229181>");
      await interaction.reply({ content: "Su sugerencia fue enviada con exito", ephemeral: true });
    },
 };