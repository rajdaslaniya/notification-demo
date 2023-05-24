export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const URL_REGEX =
  /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/;

export const IMAGE_URL_REGEX =
  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

export const VIDEO_EMBED_REGEX =
  /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\\_]*)(&(amp;)?[\w\\?=]*)?/;

export const getVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};
