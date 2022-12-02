/**
 *  ColourCollection
 * -------------------------
 * Simple collection with many utility colour related functions
 *
 * Functions:
 *   - hslToRgb()
 *   - rgbToHsl()
 *   - hueToRgb()
 *   - rndHexColour()
 *   - invertHexColour()
 *   - complimentHex()
 *   - rndHslColour()
 *   - hueReverse()
 *   - hexToRgb()
 *   - padZero()
 *   - hexToHSL()
 *   - hslToHex()
 *   - rgbToHex()
 *   - rgbArrayToRgbString()
 *   - hslArrayToHslString()
 *   - rgbStringToArray()
 *   - hslStringToArray()
 *   - hexShader()
 *   - getDarkerShadesOfHex()
 *   - getLightenShadesOfHex()
 */
/**
 * hslToRgb()
 * -------------
 * Convert hsl colour rappresentation into and rgb colour rappresentation
 *
 * @param h number
 * @param s number
 * @param l number
 * @returns number[]
 */
export function hslToRgb(h: number, s: number, l: number): number[] {
  s /= 100;
  l /= 100;
  const k = (n: number) => {
    return (n + h / 30) % 12;
  };
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  };
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

/**
 * rgbToHsl()
 * -------------
 * Convert rgb colour rappresentation into and hsl colour rappresentation
 *
 * @param r number
 * @param g number
 * @param b number
 * @returns number[]
 */
export function rgbToHsl(r: number, g: number, b: number): number[] {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [+h.toFixed(2), +s.toFixed(2), +l.toFixed(2)];
}
export function RGBToHSL2(r: number, g: number, b: number): number[] {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;
  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
}

/**
 * hueToRgb()
 * -------------
 * Convert hue colour rappresentation into and rgb colour rappresentation
 *
 * @param p number
 * @param q number
 * @param t number
 * @returns number
 */
export function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * rndHexColour()
 * -----------------
 * Given a seed where the values of the hex string will be taken, it will return a hex colour rappresentation
 *
 * TODO : check if the given seed has valid values
 *
 * @param seed string
 * @returns string
 */
export function rndHexColour(seed = "123456789abcdefe"): string {
  const SEED: string = seed;
  let output = "#";
  while (output.length < 7) {
    output += SEED[Math.floor(Math.random() * SEED.length)];
  }
  return output;
}

/**
 * invertHexColour()
 * --------------------
 * Given a valid hex colour, return the opposite color
 *
 * @param hex string
 * @returns string
 */
export function invertHexColour(hex: string): string {
  try {
    const [r, g, b] = hexToRgb(hex);
    return "#" + padZero(r + "") + padZero(g + "") + padZero(b + "");
  } catch (error) {
    throw new Error(error + " ");
  }
}
//same as the one above
export function complimentHex(color = ""): string {
  const colorPart = color.slice(1);
  const ind = parseInt(colorPart, 16);
  let iter = ((1 << (4 * colorPart.length)) - 1 - ind).toString(16);
  while (iter.length < colorPart.length) {
    iter = "0" + iter;
  }
  return "#" + iter;
}
/**
 * rndHslColour()
 * -----------------
 * Generate a random Hsl with customizable saturation, brightness and colour
 *
 * @param c_saturation number
 * @param c_light number
 * @param c_hue number
 * @returns number[]
 */
export function rndHslColour(
  c_saturation = -1,
  c_light = -1,
  c_hue = -1
): number[] {
  const hue = c_hue >= 0 ? c_hue : 360 * Math.random(),
    saturation = c_saturation >= 0 ? c_saturation : 20 + 70 * Math.random(),
    light = c_light >= 0 ? c_light : 35 + 10 * Math.random();
  return [
    parseFloat(hue.toFixed(2)),
    parseFloat(saturation.toFixed(2)),
    parseFloat(light.toFixed(2)),
  ];
}

/**
 * hueReverse()
 * ---------------
 * Given the hue of an hsl and the saturation , returns the opposite colour
 *
 * @param h number
 * @param s number
 * @returns number
 */
export function hueReverse(h: number, s: number): number {
  h += s;
  while (h >= 360.0) h -= 360.0;
  while (h < 0.0) h += 360.0;
  return parseFloat(h.toFixed(2));
}

/**
 * hexToRgb()
 * -------------
 * Convert hex string to rgb array
 *
 * @param hex string
 * @returns number[] - [red, green. blue]
 */
export function hexToRgb(hex: string): number[] {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length != 6) {
    // as an alternative I could return just black
    throw new Error("Invalid HEX colour.");
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  return [r, g, b];
}

///--------------
function padZero(str: string, len = 0) {
  len = len || 2;
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

/**
 * hexToHSL()
 * -------------
 * Convert hex to hsl array
 *
 * @param H - hex string
 * @returns number[] - [hue, saturation, light]
 */
export function hexToHSL(H: string): number[] {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  [r, g, b] = hexToRgb(H);
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;
  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
}

/**
 * hslToHex()
 * ------------
 * Convert hsl array into hex string
 *
 * @param h number
 * @param s number
 * @param l number
 * @returns string - hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = +(s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * rgbToHex()
 * -------------
 * Convert rgb array into hex string
 *
 * @param r - number
 * @param g - number
 * @param b - number
 * @returns string - hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const numToHex = (c = 0): string => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };
  return "#" + numToHex(r) + numToHex(g) + numToHex(b);
}
export function rgbArrayToRgbString(rgb: number[]): string {
  if (rgb.length != 3) {
    //force to black >:C
    console.error("Not valid color, it must be 3 value array"); // throw new Error("Not valid color, it must be 3 value array");
    rgb = [0, 0, 0];
  }
  //return `rgb(${rgb.join(',')} )`;
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]} )`;
}
export function hslArrayToHslString(hsl: number[]): string {
  hsl.forEach((c) => {
    if (c > 255) c = 100;
    if (c <= 0) c = 1;
  });
  return `hsl( ${hsl[0]}, ${hsl[1]}%, ${hsl[2]}% )`;
}
export function rgbStringToArray(rgb: string): number[] {
  const tmp = rgb.slice(3).replaceAll("(", " ").replaceAll(")", " ").split(","),
    rtc = [0];
  rtc.pop();
  tmp.forEach((i) => rtc.push(parseInt(i)));
  return rtc;
}
export function hslStringToArray(hsl: string): number[] {
  const tmp = hsl
      .slice(3)
      .replaceAll("%", " ")
      .replaceAll("(", " ")
      .replaceAll(")", " ")
      .split(","),
    rtc = [0];
  rtc.pop();
  tmp.forEach((i) => rtc.push(parseInt(i)));

  return rtc;
}

/**
 * hexShader()
 * -------------
 * Change hex saturation
 *
 * @param hex_colour string - hex
 * @param magnitude number
 * @returns string - hex
 */
export function hexShader(hex_colour: string, magnitude: number): string {
  // validate hex string
  hex_colour = String(hex_colour).replace(/[^0-9a-f]/gi, "");
  if (hex_colour.length < 6) {
    hex_colour =
      hex_colour[0] +
      hex_colour[0] +
      hex_colour[1] +
      hex_colour[1] +
      hex_colour[2] +
      hex_colour[2];
  }

  // convert to decimal and change luminosity
  let new_hex = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex_colour.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * magnitude), 255)).toString(16);
    new_hex += ("00" + c).substr(c.length);
  }
  return new_hex;
}

/**
 * getDarkerShadesOfHex()
 * ------------------------
 * Return an array of darker hex strings
 *
 * @param hex_colour string
 * @param quantity number
 * @returns string[] - array of hex string
 */
export function getDarkerShadesOfHex(
  hex_colour: string,
  quantity: number
): string[] {
  if (quantity < 1) throw new Error(" (° ͜ʖ°)  no");
  const shades: string[] = [];
  for (let i = 0; i <= quantity; i++)
    shades.push(hexShader(hex_colour, -0.25 * i));
  return shades.filter((item, pos) => {
    return shades.indexOf(item) == pos;
  });
}

/**
 * getLightenShadesOfHex()
 * ------------------------
 * Return an array of lighter hex strings
 *
 * @param hex_colour string
 * @param quantity number
 * @returns string[] - array of hex string
 */
export function getLightenShadesOfHex(
  hex_colour: string,
  quantity: number
): string[] {
  if (quantity < 1) throw new Error(" (° ͜ʖ°)  no");
  hex_colour = hex_colour === "#000000" ? "#111111" : hex_colour;
  const shades: string[] = [];
  for (let i = 0; i <= quantity; i++)
    shades.push(hexShader(hex_colour, 0.25 * i));
  return shades.filter((item, pos) => {
    return shades.indexOf(item) == pos;
  });
}
// eslint-disable-next-line
function hexFx(hex: string) {
  if (hex[0] == "#") hex = hex.slice(1);
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length < 6) {
    hex += "0".repeat(6 - hex.length);
  }
  return "#" + hex;
}
