import { Converter, seperateConverter } from './converters';

const baseMimeType = 'application/x.jupyter.url; mimeType=';

export function URLMimeType(mimeType: string) {
  return `${baseMimeType}${mimeType}`;
}

function extractURLMimeType(mimeType: string): string | null {
  if (!mimeType.startsWith(baseMimeType)) {
    return null;
  }
  return mimeType.slice(baseMimeType.length);
}

export const URLStringConverter: Converter<URL, string> = seperateConverter({
  computeMimeType: extractURLMimeType,
  convert: async (url: URL) => {
    const response = await fetch(url.toString());
    return await response.text();
  }
});
