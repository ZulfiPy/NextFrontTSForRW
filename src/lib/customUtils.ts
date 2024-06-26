import { DateTime } from "luxon";

function convertTimestampWithUTC(timestamp: string) {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTimestamp = DateTime.fromISO(timestamp, { zone: 'utc' }).setZone(localTimezone);
    const localTimestampISO = localTimestamp.toISO() as string;
    const splittedLocalTimestampStr = `${localTimestampISO.split('T')[0]} ${localTimestampISO.split('T')[1].slice(0, 8)}`

    return splittedLocalTimestampStr;
}

export {
    convertTimestampWithUTC
}