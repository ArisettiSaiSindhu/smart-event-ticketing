const QRCode = require("qrcode");

const generateQRCode = async (ticketId) => {
    try {
        const qrCode = await QRCode.toDataURL(ticketId);

        return qrCode;
    } catch (error) {
        console.error("QR generation error:", error);
        throw error;
    }
};

module.exports = generateQRCode;