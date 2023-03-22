const { Client } = require(`discord.js`);
const { Perms } = require(`./permiso`);
const { Events } = require(`./eventos`);
const { glob } = require(`glob`);
const { promisify } = require(`util`);
const pg = promisify(glob);
const ascii = require(`ascii-table`);
require(`colors`);

async function loadFiles(dirName){

    const file = await pg(`${process.cwd().replace(/\\/g, `/`)}/${dirName}/**/*.js`)
    file.forEach((file) => delete require.cache[require.resolve(file)])

    return file
}
//////////////////////////////////////////////////////////////////////////////
async function loadEvents(client) {
    const table = new ascii().setHeading("Eventos", "Estado");
  
    await client.events.clear();

    const Files = await loadFiles("eventos");

    Files.forEach((file) => {
      const event = require(file);

      const execute = (...args) => event.execute(...args, client);
      client.events.set(event.name, execute);

      if (event.rest) {
        if (event.once) client.rest.on(event.name, execute);
        else client.rest.on(event.name, execute);
      } else {
        if (event.once) client.once(event.name, execute);
        else client.on(event.name, execute);
      }

      table.addRow(event.name, "✅");
    });
  
    return console.log(table.toString(), `\n [SISTEMA] :: Eventos cargados`.magenta);
  }


//////////////////////////////////////////////////////////////////////////////
async function loadCommands(client) {
    const table = new ascii().setHeading("Comandos", "Estado");
  
    await client.commands.clear();
  
    let commandsArray = [];
  
    const Files = await loadFiles("comandos");
  
    Files.forEach((file) => {
      const command = require(file);
      client.commands.set(command.data.name, command);
  
      commandsArray.push(command.data.toJSON());
  
      table.addRow(command.data.name, "✅");
    });
  
    client.application.commands.set(commandsArray)
  
    return console.log(table.toString(), `\n [SISTEMA] :: Comandos cargados`.blue);
  }
//////////////////////////////////////////////////////////////////////////////
/* async function loadhandlres (client) {

    const table = new ascii().setHeading(`Handlres`, `Estado`,`Problema`)

    const handlresFiles = await loadfiles(`handlers`)

    handlresFiles.forEach((file) => {

        require(file)(client)

        table.addRow(`${handlresFiles.length}`, `✅`, `Sin problema`)
    })

    console.log(table.toString(), `\n [SISTEMA] :: Handlres cargados`.red)
}*/
//////////////////////////////////////////////////////////////////////////////
module.exports = {
    loadEvents,
    loadCommands
    //loadhandlres
}