const en = require("./cn-en.json");
const cn = require("./en-cn.json");
/**
 * Calculates the UTC offset in minutes for a given IANA timezone.
 *
 * @param {string} tz - IANA timezone identifier (e.g., "America/New_York").
 * @param {Date} [targetDate=new Date()] - The date for which to calculate the offset. Defaults to the current date and time.
 * @returns {number} The UTC offset in minutes. Returns 0 if the offset couldn't be determined.
 */
function utcOffset(tz, targetDate = new Date()) {
  const timeZone = en[tz] || tz;
  if (!timeZone) return 0;
  const current = new Date(targetDate);
  current.setMilliseconds(0);
  const targetTzString = current.toLocaleString("en-GB", { timeZone });
  if (!targetTzString) return 0;
  // DD/MM/YYYY, HH:mm:ss
  const [targetDateString, targetTimeString] = targetTzString.split(",");
  if (!targetDateString || !targetTimeString) return 0;
  const [day, month, year] = targetDateString.trim().split("/");
  const [hour, minite, second] = targetTimeString.trim().split(":");
  const utc = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minite),
    Number(second),
  );
  return Math.round((utc - current) / 60000);
}

/**
 * Retrieves the UTC offset text for a given IANA timezone.
 *
 * @param {string} tz - IANA timezone identifier (e.g., "America/New_York").
 * @param {Date} [targetDate=new Date()] - The date for which to calculate the offset. Defaults to the current date and time.
 * @returns {string | undefined} The UTC offset text in the format "GMT±HH:MM" or undefined if the offset couldn't be determined.
 */
function utcOffsetText(tz, targetDate = new Date()) {
  const timeZone = en[tz] || tz;
  const offset = new Intl.DateTimeFormat(undefined, {
    timeZone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(targetDate)
    .find((part) => part.type === "timeZoneName")?.value;
  return offset;
}

module.exports = {
  en,
  cn,
  utcOffset,
  utcOffsetMinutes: utcOffset,
  utcOffsetText,
};
