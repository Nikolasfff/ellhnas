const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to BAN someone!");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have the ban permission.");
    //Variables:
    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();

    //Input Checking:
    if (!reason) reason = 'No reason given.';
    if (!args[0]) return message.channel.send('You must state someone to ban. `\` -ban @user reason\`');
    if (!mentionedMember) return message.channel.send('The Member Mentioned is not in the Server!');
    if (!mentionedMember.bannable) return message.channel.send('I cannot BAN that Member');
    //Executing
    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You Have been Banned from ${message.guild.name}`)
      .setDescription(`Reason for being BANNED: ${reason}`)
      .setTimestamp()
      .setColor("ff0000");

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.log(err)).then(() => message.channel.send("Succesfully banned, " + mentionedMember.user.tag));




  }
}