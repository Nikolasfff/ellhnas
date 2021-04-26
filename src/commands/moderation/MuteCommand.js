const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have Permission to do that!');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute.');
    
    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('833612531707674624');
    const imprisonedRole = message.guild.roles.cache.get('835911040792657980');
    const memberRole = message.guild.roles.cache.get('829729297912037446');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You Have been Muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setTimestamp()
      .setColor("ff0000");

    if (!args[0]) return message.channel.send(`\`-mute @user reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server!');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot Mute your self.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command!');
    if (!reason) reason = 'No Reason Given!';
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This Person is already Muted!');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot mute someone the same or higher than you!');

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the Muted Role.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the ΠΟΛΙΤΗΣ Role.')));
    await mentionedMember.roles.add(muteRole.id).then(message.channel.send('User Muted!'));
  }
}