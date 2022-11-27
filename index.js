const en = require("./cn-en.json");
const cn = require("./en-cn.json");

function utcOffset(tz) {
  const timeZone = en[tz] || tz;
  if (!timeZone) return 0;
  const current = new Date();
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
    Number(second)
  );
  return Math.round((utc - current) / 60000);
}

module.exports = {
  en,
  cn,
  utcOffset,
};
