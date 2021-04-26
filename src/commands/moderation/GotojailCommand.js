const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('gotojail', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have Permission to do that!');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to imprison someone.');

    let reason = args.slice(1).join(" ");
    const imprisonedRole = message.guild.roles.cache.get('835911040792657980');
    const memberRole = message.guild.roles.cache.get('829729297912037446');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const imprisonedEmbed = new Discord.MessageEmbed()
      .setTitle(`You Have been Imprisoned in ${message.guild.name}`)
      .setDescription(`Reason for being imprisoned: ${reason}`)
      .setTimestamp()
      .setColor("ff0000");

    if (!args[0]) return message.channel.send(`\`-gotojail @user reason\``);
    if (!mentionedMember) return message.channel.send('The member stated is not in the server!');
    if (mentionedMember.user.id == message.author.id) return message.channel.send('You cannot imprison your self.');
    if (mentionedMember.user.id == client.user.id) return message.channel.send('You cannot imprison me with my own command!');
    if (!reason) reason = 'No Reason Given!';
    if (mentionedMember.roles.cache.has(imprisonedRole.id)) return message.channel.send('This Person is already imprisoned!');
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('You cannot imprison someone the same or higher than you!');

    await mentionedMember.send(imprisonedEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(imprisonedRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the Imprisoned Role.')));
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue removing the ΠΟΛΙΤΗΣ Role.')));

  }
}