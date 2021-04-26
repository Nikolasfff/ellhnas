const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have Permission to do that!');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute.');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('833612531707674624');
    const memberRole = message.guild.roles.cache.get('829729297912037446');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You Have been unmuted in ${message.guild.name}`)
      .setTimestamp()
      .setColor("ff0000");

    if (!args[0]) return message.channel.send(`\`-unmute @user reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server!');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot Mute your self.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me with my own command!');
    if (!reason) reason = 'No Reason Given!';
    if (mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This Person is already unmuted!');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot unmute someone the same or higher than you!');

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the ΠΟΛΙΤΗΣ Role.')));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the Muted Role.')));
    await mentionedMember.roles.remove(muteRole.id).then(message.channel.send('User Unmuted!'));

  }
}