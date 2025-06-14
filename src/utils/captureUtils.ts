// Utility functions for capturing the image section with WebGL content

interface CaptureOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "png" | "jpeg" | "webp";
}

/**
 * Captures the Aurora WebGL canvas and overlays DOM content on top
 */
export async function captureImageSection(
  imageSectionElement: HTMLElement,
  options: CaptureOptions = {}
): Promise<string> {
  const {
    width = 1080,
    height = 1080,
    quality = 1.0,
    format = "png",
  } = options;

  // Find the WebGL canvas in the Aurora component
  const auroraCanvas = imageSectionElement.querySelector(
    "canvas"
  ) as HTMLCanvasElement;
  if (!auroraCanvas) {
    throw new Error("Aurora canvas not found");
  }

  // Create a temporary canvas for composition
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = width;
  tempCanvas.height = height;
  const ctx = tempCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2D context");
  }

  // Scale factors
  const scaleX = width / imageSectionElement.offsetWidth;
  const scaleY = height / imageSectionElement.offsetHeight;

  // 1. Draw the Aurora background
  // Preserve WebGL content by reading pixels directly
  try {
    // Force a render frame to ensure latest content
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Draw the aurora canvas scaled to fit
    ctx.drawImage(
      auroraCanvas,
      0,
      0,
      auroraCanvas.width,
      auroraCanvas.height,
      0,
      0,
      width,
      height
    );
  } catch (error) {
    console.warn(
      "Could not capture Aurora canvas directly, using fallback",
      error
    );
    // Fallback: fill with a gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#2c2c2c");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, "#d3d3d3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Draw DOM content on top
  await drawDOMContent(ctx, imageSectionElement, scaleX, scaleY);

  // 3. Return as data URL
  return tempCanvas.toDataURL(`image/${format}`, quality);
}

/**
 * Draws DOM content (excluding the Aurora canvas) onto the canvas context
 */
async function drawDOMContent(
  ctx: CanvasRenderingContext2D,
  element: HTMLElement,
  scaleX: number,
  scaleY: number
): Promise<void> {
  const contentOverlay = element.querySelector(".relative.z-10") as HTMLElement;
  if (!contentOverlay) return;

  // Save the current context state
  ctx.save();
  ctx.scale(scaleX, scaleY);

  // Draw the main image
  const imgElement = contentOverlay.querySelector("img") as HTMLImageElement;
  if (imgElement && imgElement.complete) {
    const imgContainer = imgElement.closest("div") as HTMLElement;
    const containerRect = imgContainer.getBoundingClientRect();
    const overlayRect = contentOverlay.getBoundingClientRect();

    const x = containerRect.left - overlayRect.left;
    const y = containerRect.top - overlayRect.top;

    // Draw rounded rectangle background
    ctx.save();
    drawRoundedRect(ctx, x, y, containerRect.width, containerRect.height, 24);
    ctx.clip();

    try {
      await drawImageFromURL(
        ctx,
        imgElement.src,
        x,
        y,
        containerRect.width,
        containerRect.height
      );
    } catch (error) {
      console.warn("Could not load image, drawing placeholder");
      ctx.fillStyle = "#374151";
      ctx.fillRect(x, y, containerRect.width, containerRect.height);
    }
    ctx.restore();
  }

  // Draw title text
  const titleElement = contentOverlay.querySelector("h3") as HTMLElement;
  if (titleElement) {
    drawText(ctx, titleElement, contentOverlay);
  }

  // Draw social handles
  const socialContainer = contentOverlay.querySelector(
    ".flex.flex-row.gap-6"
  ) as HTMLElement;
  if (socialContainer) {
    drawSocialHandles(ctx, socialContainer, contentOverlay);
  }

  ctx.restore();
}

/**
 * Draws rounded rectangle path
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Loads and draws an image from URL
 */
function drawImageFromURL(
  ctx: CanvasRenderingContext2D,
  src: string,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, x, y, width, height);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Draws text content
 */
function drawText(
  ctx: CanvasRenderingContext2D,
  textElement: HTMLElement,
  containerElement: HTMLElement
): void {
  const rect = textElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  const x = rect.left - containerRect.left;
  const y = rect.top - containerRect.top;

  const computedStyle = window.getComputedStyle(textElement);

  ctx.save();
  ctx.fillStyle = computedStyle.color || "#ffffff";
  ctx.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
  ctx.textBaseline = "top";

  // Handle multi-line text
  const text = textElement.textContent || "";
  const maxWidth = parseFloat(computedStyle.width) || rect.width;

  wrapText(
    ctx,
    text,
    x,
    y,
    maxWidth,
    parseFloat(computedStyle.lineHeight) || 1.2
  );

  ctx.restore();
}

/**
 * Wraps text to fit within specified width
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

/**
 * Draws social handle badges
 */
function drawSocialHandles(
  ctx: CanvasRenderingContext2D,
  socialContainer: HTMLElement,
  containerElement: HTMLElement
): void {
  const containerRect = containerElement.getBoundingClientRect();

  const badges = socialContainer.querySelectorAll('div[class*="bg-black"]');

  badges.forEach((badge) => {
    const badgeElement = badge as HTMLElement;
    const badgeRect = badgeElement.getBoundingClientRect();
    const span = badgeElement.querySelector("span") as HTMLElement;

    if (span) {
      const x = badgeRect.left - containerRect.left;
      const y = badgeRect.top - containerRect.top;

      // Draw badge background
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      drawRoundedRect(ctx, x, y, badgeRect.width, badgeRect.height, 12);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw text
      ctx.fillStyle = "#d1d5db";
      ctx.font = "16px system-ui";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const text = span.textContent || "";
      ctx.fillText(text, x + badgeRect.width / 2, y + badgeRect.height / 2);

      ctx.restore();
    }
  });
}

/**
 * Downloads the captured image
 */
export function downloadImage(
  dataURL: string,
  filename: string = "captured-image"
): void {
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
