const { Client, GatewayIntentBits, Partials, Collection, ActivityType, Events, AuditLogEvent, EmbedBuilder } = require(`discord.js`);
const { loadEvents } = require(`./funciones/funcionesbot`)
const fs = require("fs");
const client = new Client({
    closeTimeout: 5000,
    shards: `auto`,
    allowedMentions: {
        parse: [`everyone`, `roles`, `users`],
        repliedUser: true,
    },
    failIfNotExists: true,
    //presence: { activities: [{ name: `Truckero Bot 2`, type: ActivityType.Streaming , url: `https://www.twitch.tv/lucianotruck22` }], status: `online` },
    //presence: { activities: [{ name: `Mantemiento`, type: ActivityType.Streaming , url: `https://www.twitch.tv/lucianotruck22` }], status: `online` },
    //waitGuildTimeout: 15000,
    partials: [Partials.User, Partials.Message, Partials.GuildMember, Partials.ThreadMember, Partials.Channel, Partials.Reaction, Partials.GuildScheduledEvent],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
})
/////////////////////////////////////////////////////////////////////////////
client.color = `#ff0000`
client.commands = new Collection()
client.events = new Collection()
loadEvents(client)
////////////////////////////LOGS DE MODERACION//////////////////////////////////////////////////
/*client.on(Events.ChannelCreate, async (channel) => {
    channel.guild
      .fetchAuditLogs({
        type: AuditLogEvent.ChannelCreate,
      })
      .then(async (audit) => {
        const { executor } = audit.entries.first();
  
        const name = channel.name;
        const id = channel.id;
        let type = channel.type;
  
        if (type == 0) type = `Texto`;
        if (type == 2) type = `Voz`;
        if (type == 13) type = `Stage`;
        if (type == 15) type = `Foro`;
        if (type == 5) type = `Announcememnt`;
        if (type == 4) type = `Categoria`;
  
        const channelID = `1083221437797650543`;
        const Channel = await channel.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Canal Creado`)
          .addFields({ name: `Nombre del canal`, value: `${name} (<#${id}>)` })
          .addFields({ name: `Tipo de canal`, value: `${type}`, inline: true })
          .addFields({ name: `ID del canal`, value: `${id}`, inline: true })
          .addFields({ name: `Creado por`, value: `${executor.tag}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });
  
  client.on(Events.ChannelDelete, async (channel) => {
    channel.guild
      .fetchAuditLogs({
        type: AuditLogEvent.ChannelDelete,
      })
      .then(async (audit) => {
        const { executor } = audit.entries.first();
  
        const name = channel.name;
        const id = channel.id;
        let type = channel.type;
  
        if (type == 0) type = `Texto`;
        if (type == 2) type = `Voz`;
        if (type == 13) type = `Stage`;
        if (type == 15) type = `Foro`;
        if (type == 5) type = `Announcememnt`;
        if (type == 4) type = `Categoria`;
  
        const channelID = `1083221437797650543`;
        const Channel = await channel.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Canal Eliminado`)
          .addFields({ name: `Nombre del canal`, value: `${name}` })
          .addFields({ name: `Tipo de canal`, value: `${type}`, inline: true })
          .addFields({ name: `ID del canal`, value: `${id}`, inline: true })
          .addFields({ name: `Eliminado por`, value: `${executor.tag}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });
  
  client.on(Events.GuildBanAdd, async (member) => {
    member.guild
      .fetchAuditLogs({
        type: AuditLogEvent.GuildBanAdd,
      })
      .then(async (audit) => {
        const { executor } = audit.entries.first();
  
        const name = member.user.username;
        const id = member.user.id;
  
        const channelID = `1083221437797650543`;
        const Channel = await member.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Usuario baneado`)
          .addFields({ name: `Nombre del usuario`, value: `${name}` })
          .addFields({ name: `ID del usuario`, value: `${id}`, inline: true })
          .addFields({ name: `Baneado por`, value: `${executor.tag}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });
  
  client.on(Events.GuildBanRemove, async (member) => {
    member.guild.fetchAuditLogs({ type: AuditLogEvent.GuildBanRemove, })
      .then(async (audit) => {
        const { executor } = audit.entries.first();
  
        const name = member.user.username;
        const id = member.user.id;
  
        const channelID = `1083221437797650543`;
        const Channel = await member.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Usuario Desbaneado`)
          .addFields({ name: `Nombre del usuario`, value: `${name}` })
          .addFields({ name: `ID del usuario`, value: `${id}`, inline: true })
          .addFields({ name: `Desbaneado por`, value: `${executor.tag}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });
  
  client.on(Events.MessageDelete, async (message) => {
    message.guild
      .fetchAuditLogs({
        type: AuditLogEvent.MessageDelete,
      })
      .then(async (audit) => {
        const autor = message.author;
  
        const msg = message.content;
  
        if (!msg) return;
  
        const channelID = `1083221437797650543`;
        const Channel = await message.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Mensaje eliminado`)
          .addFields({ name: `Contenido del mensaje`, value: `${msg}` })
          .addFields({ name: `Canal del mensaje`, value: `${message.channel}`, inline: true })
          .addFields({ name: `Autor del mensaje`, value: `${autor}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });
  
  client.on(Events.MessageUpdate, async (message, newMessage) => {
    message.guild
      .fetchAuditLogs({
        type: AuditLogEvent.MessageUpdate,
      })
      .then(async (audit) => {
        const autor = message.author;
  
        const msg = message.content;
  
        if (!msg) return;
  
        const channelID = `1083221437797650543`;
        const Channel = await message.guild.channels.cache.get(channelID);
  
        const embed = new EmbedBuilder()
          .setTitle(`Mensaje editado`)
          .addFields({ name: `Mensaje inicial`, value: `${msg}` })
          .addFields({ name: `Mensaje editado`, value: `${newMessage}`, inline: true })
          .addFields({ name: `Autor del mensaje`, value: `${autor}`, inline: true })
          .setTimestamp()
          .setColor(client.color);
  
        Channel.send({ embeds: [embed] });
      });
  });*/
//////////////////////////////////////////////////////////////////////////////*
module.exports = client
client.config = require(`./botconfig/config.json`)
client.login(client.config.bot.token).then(() => {
}).catch((error) => console.log(error))
//////////////////////////////////////////////////////////////////////////////