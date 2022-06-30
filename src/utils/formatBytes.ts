const sizes = [
  'Bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;
const k = 1024;

export function formatBytes(
  bytes: number,
  decimals = 2,
): [number, typeof sizes[number]] {
  if (bytes === 0) return [0, 'Bytes'];

  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return [parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), sizes[i]];
}
