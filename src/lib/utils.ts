import qrcode from "qrcode";

export async function generateQRCodeSVG(
  data: string,
  errorCorrectionLevel = "H"
) {
  try {
    const svgString = await qrcode.toString(data, {
      type: "svg",
      errorCorrectionLevel,
    });
    return svgString;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error; // Handle the error appropriately
  }
}
