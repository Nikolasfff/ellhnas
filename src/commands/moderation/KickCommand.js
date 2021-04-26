const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join (" ");
    if (!reason) reason = "No Reason Given!";
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You Were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)  
      .setColor("#8000ff")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    //-kick @user dm ads
    if (!args[0]) return message.channel.send("You need to state a user to kick. \`-kick @user reason\`");
    if (!mentionedMember) return message.channel.send("The Member Mentioned is not in the Server.");
    if (!mentionedMember.kickable) return message.channel.send('I cannot KICK that Member');
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log(`I Was Unable to Message the member.`)
    }

     try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err)
      message.channel.send("I was Unable to kick the Member Mentioned")

    
      
    }
  }
}
