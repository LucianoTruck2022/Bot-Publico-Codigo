const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Component ,EmbedBuilder, PermissionFlagsBits,} = require("discord.js");
const { Collection } = require("mongoose");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("promods")
      .setDescription("Obtener ayuda con el bot")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      const { user } = interaction
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('test1')
          .setLabel('ATS')
          .setStyle(ButtonStyle.Primary),
          //.setDisabled(true),
        new ButtonBuilder()
          .setCustomId('test2')
          .setLabel('ETS2')
          .setStyle(ButtonStyle.Primary),
          //.setDisabled(true)
        );
        const button1 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setCustomId('test')
          .setLabel('Incio')
          //.setEmoji('<:CT_Castor:971944382871781416>')
          .setStyle(ButtonStyle.Success)
        );
      const embed = new EmbedBuilder()
      .setTitle(`🗺 | ProMods`)
      .setColor(client.color)
      .setFooter({ text: `Solicitado por: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addFields({
        name: `Pagina 1`,
        value: `ProMods ATS`,
      },
      {
        name: `Pagina 2`,
        value: `ProMods ETS2`,
        //inline: true,
      })
      .setTimestamp()
      
      const embed2 = new EmbedBuilder()
      .setColor(client.color)
        .setTitle(`PROMODS ATS 1.46 V1.2.2`)
        //.setImage(`https://i.imgur.com/AasDIr5.gif`)
        .setURL(`https://www.mediafire.com/file/3u7nhsku6wioywm/ProMods+v122+V145.rar/file`)
        .setThumbnail(`https://i.imgur.com/P3esFSr.png`)
        .addFields([
            {
                name: `DLC REQUERIDOS`,
                value: `- [Oregon](https://store.steampowered.com/app/800370/American_Truck_Simulator__Oregon/)\n- [Whashington](https://store.steampowered.com/app/1015160/American_Truck_Simulator__Washington/)`,
            },
            {
                name: `ACOMODO`,
                value: `- Assets Package\n- Definition Package\n- Map Package\n- Models Package`,
            }
        ])
      
      const embed3 = new EmbedBuilder()
      .setColor(client.color)
        .setTitle(`PROMODS ETS2 1.46 V2.64`)
        //.setImage(`https://i.imgur.com/AasDIr5.gif`)
        .setURL(`https://drive.google.com/file/d/18L5W7kQp7E5js5IA5QKvPcwhIrs_5zXq/view?usp=sharing`)
        .setThumbnail(`https://static.truckersmp.com/images/partners/promods.png`)
        .addFields([
            {
                name: `DLC REQUERIDOS`,
                value: `Necesario Tener Todos Los DLC De Mapas`,
            },
            {
                name: `ACOMODO`,
                value: `promods-assets\npromods-def\npromods-map\npromods-media\npromods-model1\npromods-model2\npromods-model3`,
            }
        ])

        await interaction.channel.send({embeds: [embed], components: [button], ephemeral: true})

      const collector = interaction.channel.createMessageComponentCollector();
      collector.on(`collect`, async (i) => {
        if(i.customId === 'test') {
          if(i.user.id !== interaction.user.id) {
            //return await i.reply({content: 'Solo la persona que ejecuto el comando puede utilizar los botones', ephemeral: true})
          }
          await i.update({embeds: [embed], components: [button], ephemeral: true})
        }
        if(i.customId === 'test1') {
          if(i.user.id !== interaction.user.id) {
            //return await i.reply({content: 'Solo la persona que ejecuto el comando puede utilizar los botones', ephemeral: true})
          }
          await i.update({embeds: [embed2], components: [button1], ephemeral: true})
        }
        if(i.customId === 'test2') {
          if(i.user.id !== interaction.user.id) {
            //return await i.reply({content: 'Solo la persona que ejecuto el comando puede utilizar los botones', ephemeral: true})
          }
          await i.update({embeds: [embed3], components: [button1], ephemeral: true})
        }
      });
      await interaction.reply({content: `Se enviado correctamente`, ephemeral: true});
    },
  };