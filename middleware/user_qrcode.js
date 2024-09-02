const qrcode = require("qrcode");
const path = require("path");

async function generateQrCode(name, phone_no, emailId) {
  try {
    const qrCodeData = `Patient Name: ${name}\nPhone No: ${phone_no}\nEmail Id: ${emailId}`;
    const qrCodeFileName = `${name}-${emailId}.png`; // Example: john-doe-johndoe@example.com.png
    const qrCodePath = path.join(__dirname, `../user_qrcodes_data/${qrCodeFileName}`);

    await qrcode.toFile(qrCodePath, qrCodeData);

    return qrCodePath;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

module.exports = { generateQrCode };
