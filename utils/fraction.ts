const num = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
const den = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

const swap = (n: number, outs: string[]): string => {
  return n
    .toString()
    .split("")
    .map((d) => outs[d])
    .join("");
};

const fraction = (n: number, d: number): string => {
  return `${swap(n, num)}⁄${swap(d, den)}`;
};

export default fraction;
