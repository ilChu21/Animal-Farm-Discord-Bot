export function getNowUtc() {
  const now = new Date();
  const currentHour = now.getUTCHours().toString().padStart(2, '0');
  const currentMinute = now.getUTCMinutes().toString().padStart(2, '0');
  return `${currentHour}:${currentMinute}`;
}
