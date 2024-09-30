"use client";

export async function resizeImage(
  image: File,
): Promise<{ image: File | null }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const MAX_WIDTH = 1300;
          const MAX_HEIGHT = 731.25;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const resizedImage = new File([blob!], image.name, {
              type: image.type,
              lastModified: Date.now(),
            });
            resolve({ image: resizedImage });
          }, image.type);
        } else {
          resolve({ image: null });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(image);
  });
}
