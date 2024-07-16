import type { RequestHandler } from "./$types";
import { generateQRCodeSVG } from "$lib/utils";
import { saveQrCodeToDatabase } from "$lib/db";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.formData();
  const content = data.get("content") as string;
  const bg_color = data.get("bg_color") as string;
  const fg_color = data.get("fg_color") as string;

  console.log("Content", content);
  console.log("Background Color", bg_color);
  console.log("Foreground Color", fg_color);

  let svgString = await generateQRCodeSVG(content);

  svgString = svgString.replace(/fill="#ffffff"/g, `fill="${fg_color}"`);
  svgString = svgString.replace(/stroke="#000000"/g, `stroke="${bg_color}"`);

  // Store SVG data in the database
  await saveQrCodeToDatabase(content, svgString);

  return new Response({ url: content, svg: svgString });
};
