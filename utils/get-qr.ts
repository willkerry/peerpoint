const PATH = "https://chart.googleapis.com/chart";

type OutputEncoding = "UTF-8" | "Shift_JIS" | "ISO-8859-1";
type ErrorCorrection = "L" | "M" | "Q" | "H";

/**
 * Build a URL to access a QR code image on the **deprecated** Google Chart API.
 *
 * @see https://developers.google.com/chart/infographics/docs/qr_codes
 */
const getQrCode = (
  data: string,
  size = 500,
  errorCorrection: ErrorCorrection = "H",
  margin = 0,
  encoding: OutputEncoding = "UTF-8"
): URL["href"] => {
  const url = new URL(PATH);

  url.searchParams.set("cht", "qr");
  url.searchParams.set("chs", `${size}x${size}`);
  url.searchParams.set("chl", data);
  url.searchParams.set("choe", encoding);
  url.searchParams.set("chld", `${errorCorrection}|${margin}`);

  return url.href;
};

export default getQrCode;
