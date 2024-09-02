const qrcode = require("qrcode");
const path = require("path");

async function generateQrCode(name, Hname) {
  try {
    const qrCodeData = `Doctor Name: ${name}\nHospital Name: ${Hname}`;
    const qrCodeFileName = `${name}-${Hname}.png`;
    const qrCodePath = path.join(__dirname, `../doctor_qrcodes_data/${qrCodeFileName}`);

    await qrcode.toFile(qrCodePath, qrCodeData);

    return qrCodePath;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

module.exports = { generateQrCode };
