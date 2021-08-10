
let Discord;
let Database;
if (typeof window !== "undefined") {
  Discord = DiscordJS;
  Database = EasyDatabase;
} else {
  Discord = require("discord.js");
  Database = require("easy-json-database");
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
  Discord,
  client: null,
  tokenInvalid: false,
  reply: null,
  joiningMember: null,
  database: new Database("./db.json"),
  checkMessageExists() {
    if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
    if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
  }
};
s4d.client = new s4d.Discord.Client({
  fetchAllMembers: true
});
s4d.client.on('raw', async (packet) => {
  if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
    const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
    if (!guild) return;
    const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => { });
    if (!member) return;
    const channel = s4d.client.channels.cache.get(packet.d.channel_id);
    if (!channel) return;
    const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => { });
    if (!message) return;
    s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
  }
});
s4d.client.on('ready', async () => {
  s4d.client.user.setActivity(String('Welcome To Reaper Wrld :0'));

});

s4d.client.login('ODcyOTk1NjYzNzkxNjg1NjQy.YQx-kQ.xNfbCvYjBewGTUnzlOXzwZ4X-l0').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '$hello') {
    s4dmessage.channel.send(String('hello sir how may i help u if u need more help put $help'));
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '$invite') {
    s4dmessage.channel.send(String('Our Main Server Invite https://discord.gg/2YCXhQj9'));
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '$help') {
    s4dmessage.channel.send(String('$invite $hello $help '));
  }

});

s4d;
