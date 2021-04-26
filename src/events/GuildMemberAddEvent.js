// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const role = member.guild.roles.cache.get('829729297912037446');
    await member.roles.add(role.id).catch(err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.get('830095770119569418');
    welcomeChannel.send(`<@${member.user.id}> ΚΑΛΩΣΗΡΘΕΣ ΣΤΗΝ ΕΛΛΑΔΑ! \`ΕΛΛΑΔΑ\``);


  }
}