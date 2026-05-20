type PixelCrop = { x: number; y: number; width: number; height: number };

type CropImageOptions = {
  fileName?: string;
  outputSize?: number;
  mimeType?: "image/jpeg" | "image/webp" | "image/png";
  quality?: number;
};

type AvatarImageOptions = CropImageOptions & {
  maxBytes?: number;
};

const DEFAULT_AVATAR_SIZE = 512;
const DEFAULT_QUALITY = 0.82;
const DEFAULT_MAX_BYTES = 450 * 1024;

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getFileExtension = (mimeType: string) => {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpg";
};

const getCenterSquareCrop = (image: HTMLImageElement): PixelCrop => {
  const size = Math.min(image.naturalWidth, image.naturalHeight);

  return {
    x: Math.floor((image.naturalWidth - size) / 2),
    y: Math.floor((image.naturalHeight - size) / 2),
    width: size,
    height: size,
  };
};

const canvasToFile = (
  canvas: HTMLCanvasElement,
  fileName: string,
  mimeType: string,
  quality: number
): Promise<File | null> =>
  new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }

        resolve(new File([blob], fileName, { type: mimeType }));
      },
      mimeType,
      quality
    );
  });

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  options: CropImageOptions = {}
): Promise<File | null> {
  const {
    fileName = "profile.jpg",
    outputSize,
    mimeType = "image/jpeg",
    quality = DEFAULT_QUALITY,
  } = options;

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const targetWidth = outputSize || pixelCrop.width;
  const targetHeight = outputSize || pixelCrop.height;

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return canvasToFile(canvas, fileName, mimeType, quality);
}

export async function cropAndCompressAvatar(
  file: File,
  options: AvatarImageOptions = {}
): Promise<File | null> {
  const {
    outputSize = DEFAULT_AVATAR_SIZE,
    mimeType = "image/jpeg",
    quality = DEFAULT_QUALITY,
    maxBytes = DEFAULT_MAX_BYTES,
  } = options;

  const imageSrc = URL.createObjectURL(file);

  try {
    const image = await createImage(imageSrc);
    const crop = getCenterSquareCrop(image);
    const extension = getFileExtension(mimeType);
    const baseName = file.name.replace(/\.[^/.]+$/, "") || "profile";

    let currentQuality = quality;
    let croppedFile = await getCroppedImg(imageSrc, crop, {
      outputSize,
      mimeType,
      quality: currentQuality,
      fileName: `${baseName}.${extension}`,
    });

    while (croppedFile && croppedFile.size > maxBytes && currentQuality > 0.52) {
      currentQuality = Math.max(0.52, currentQuality - 0.08);
      croppedFile = await getCroppedImg(imageSrc, crop, {
        outputSize,
        mimeType,
        quality: currentQuality,
        fileName: `${baseName}.${extension}`,
      });
    }

    return croppedFile;
  } finally {
    URL.revokeObjectURL(imageSrc);
  }
}

export async function getCompressedCroppedAvatar(
  imageSrc: string,
  pixelCrop: PixelCrop,
  options: AvatarImageOptions = {}
): Promise<File | null> {
  const {
    fileName = "profile.jpg",
    outputSize = DEFAULT_AVATAR_SIZE,
    mimeType = "image/jpeg",
    quality = DEFAULT_QUALITY,
    maxBytes = DEFAULT_MAX_BYTES,
  } = options;

  let currentQuality = quality;
  let croppedFile = await getCroppedImg(imageSrc, pixelCrop, {
    outputSize,
    mimeType,
    quality: currentQuality,
    fileName,
  });

  while (croppedFile && croppedFile.size > maxBytes && currentQuality > 0.52) {
    currentQuality = Math.max(0.52, currentQuality - 0.08);
    croppedFile = await getCroppedImg(imageSrc, pixelCrop, {
      outputSize,
      mimeType,
      quality: currentQuality,
      fileName,
    });
  }

  return croppedFile;
}
