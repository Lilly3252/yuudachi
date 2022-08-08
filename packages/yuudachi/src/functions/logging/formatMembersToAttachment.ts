import dayjs from 'dayjs';
import type { Collection, GuildMember, Snowflake } from 'discord.js';
import i18next from 'i18next';
import { DATE_FORMAT_LOGFILE } from '../../Constants.js';
import type { AntiRaidNukeResult } from '../anti-raid/blastOff.js';

export function formatMemberSummary(member: GuildMember, locale: string) {
	return i18next.t('log.common.formatting.guildmember', {
		id: member.user.id.padEnd(19, ' '),
		join: dayjs(member.joinedTimestamp).format(DATE_FORMAT_LOGFILE),
		creation: dayjs(member.user.createdTimestamp).format(DATE_FORMAT_LOGFILE),
		tag: member.user.tag,
		lng: locale,
	});
}

export function formatMembersToAttachment(members: Collection<Snowflake, GuildMember>, locale: string) {
	return members.map((member) => formatMemberSummary(member, locale)).join('\n');
}

export function formatAntiRaidResultSummary(r: AntiRaidNukeResult, locale: string) {
	return formatMemberSummary(r.member, locale);
}

export function formatAntiRaidResultsToAttachment(results: AntiRaidNukeResult[], locale: string) {
	return results.map((result) => formatAntiRaidResultSummary(result, locale)).join('\n');
}