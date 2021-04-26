const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

 async run(client, message, args) {
  //-nuke reason
 //Permission Checking:
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannot use this command!");
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("My Role does not have the manage channels permission!");

  //Variables:
  let reason = args.join (" ");
  const nukeChannel = message.channel;

  //Input Checking:
  if (!reason) reason = "NO REASON GIVEN"
  if (!nukeChannel.deletable) return message.channel.send("This Channel is not Deletable!")

  //Executing:
  await nukeChannel.clone().catch(err => console.log(err));
  await nukeChannel.delete(reason).catch(err => console.log(err));


  }
}