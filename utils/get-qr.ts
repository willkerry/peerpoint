const path = "chart.googleapis.com/chart";

const getQrCode = (str: string) => {
  const query = new URLSearchParams();
  query.append("cht", "qr");
  query.append("chs", "500x500");
  query.append("chl", str);
  query.append("choe", "UTF-8");
  query.append("chld", "H|0");
  return `https://${path}?${query.toString()}`;
};

export default getQrCode;
