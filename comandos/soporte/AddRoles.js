const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");

const embed = new EmbedBuilder()

module.exports = {
    data: new SlashCommandBuilder()
    .setName("addroles")
    .setDescription("promote a user")
  .addRoleOption(option => option.setName("role")
        .setDescription("Role")
        .setRequired(true))
  .addUserOption(option => option
        .setName("usuario")
        .setDescription("Usuario")
        .setRequired(true)),               
async execute (interaction, client, Discord) {
    const permisos = interaction.member.permissions.has("MANAGE_ROLES")
    if(!permisos) return interaction.reply({ content: "No tienes permisos" })   
    const Role = interaction.options.getRole(`role`);
    const usuario = interaction.options.getMember("usuario");
        usuario.roles.add(Role)
            const embedw = new EmbedBuilder()
                .setDescription(`Ooops... parece que ya tiene ese rol.`)
                .setColor(client.color)
           if(usuario.roles.cache.has(Role.id)) {
                return interaction.reply({embeds: [embedw], ephemeral: true})
            }

            const embedverify = new EmbedBuilder()
                .setDescription("¡Genial!, se le a dado el rol correctamente.")
                .setColor(client.color)

            interaction.reply({embeds: [embedverify], ephemeral: true})
     
            }
    
} 