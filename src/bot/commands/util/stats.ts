import { stripIndents } from 'common-tags';
import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Permissions } from 'discord.js';
import * as moment from 'moment';
import 'moment-duration-format';
import { MESSAGES } from '../../util/constants';

export default class StatsCommand extends Command {
	public constructor() {
		super('stats', {
			aliases: ['stats'],
			description: {
				content: MESSAGES.COMMANDS.UTIL.STATS.DESCRIPTION,
			},
			category: 'util',
			clientPermissions: [Permissions.FLAGS.EMBED_LINKS],
			ratelimit: 2,
		});
	}

	public async exec(message: Message) {
		const embed = new MessageEmbed()
			.setColor(3447003)
			.setDescription(`**${this.client.user?.username} Statistics**`)
			.addField('❯ Uptime', moment.duration(this.client.uptime ?? 0).format('d[d ]h[h ]m[m ]s[s]'), true)
			.addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField(
				'❯ General Stats',
				stripIndents`
				• Guilds: ${this.client.guilds.size}
				• Channels: ${this.client.channels.size}
			`,
				true,
			)
			.addField(
				'❯ Version',
				`[${process.env.VERSION}](https://github.com/Naval-Base/yukikaze/commit/${process.env.VERSION})`,
				true,
			)
			.addField('❯ Source Code', '[View Here](https://github.com/Naval-Base/yukikaze)', true)
			.addField(
				'❯ Library',
				'[discord.js](https://discord.js.org)[-akairo](https://github.com/1Computer1/discord-akairo)',
				true,
			)
			.setThumbnail(this.client.user?.displayAvatarURL() ?? '')
			.setFooter(`© 2018-2019 ${this.client.users.get(this.client.config.owner ?? '')?.tag}`);

		return message.util?.send(embed);
	}
}
