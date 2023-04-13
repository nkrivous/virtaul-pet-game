export enum ImageType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  SVG = "image/svg+xml",
}

export type RequestedImage = {
  readonly height: number;
  readonly width: number;
  readonly url: string;
  readonly type: ImageType;

  readonly base64Encode: () => string;
};

export function getImageFromElement({
  element,
  type,
}: {
  element: HTMLElement;
  type: ImageType;
}): Promise<RequestedImage> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const base64 = btoa(element.innerHTML);
    image.src = `data:${type};base64,${base64}`;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      resolve({
        height: image.height,
        width: image.width,
        url: image.src,
        type,
        base64Encode: () => base64EncodeImage({ image, type }),
      });
    };
    image.onerror = (e) => reject(e);
  });
}

export function getImageFromUrl({
  url,
  type,
}: {
  url: string;
  type: ImageType;
}): Promise<RequestedImage> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      resolve({
        height: image.height,
        width: image.width,
        url,
        type,
        base64Encode: () => base64EncodeImage({ image, type }),
      });
    };
    image.onerror = () => reject();
  });
}

export const base64EncodeImage = ({
  image,
  type,
}: {
  image: HTMLImageElement;
  type: ImageType;
}): string => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("no context found on the canvas");
  }
  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL(type);
};
