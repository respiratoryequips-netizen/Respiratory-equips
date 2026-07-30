const transporter = require("../config/mailer");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const escapeHtml = require("../utils/escapeHtml");

const submitConsultation = asyncHandler(async (req, res) => {
  const { fullName, email, phone, city, equipmentNeeded, message } = req.body;

  if (!fullName || !fullName.trim()) throw new ApiError(400, "Full name is required");
  if (!email || !email.trim()) throw new ApiError(400, "Email address is required");
  if (!phone || !phone.trim()) throw new ApiError(400, "Phone number is required");
  if (!city || !city.trim()) throw new ApiError(400, "City is required");

  const attachments = [];
  if (req.file) {
    attachments.push({
      filename: req.file.originalname,
      content: req.file.buffer,
    });
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0D3B3E;">New Consultation Request</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; font-weight: bold; width: 160px;">Full Name</td><td style="padding: 8px 0;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">City</td><td style="padding: 8px 0;">${escapeHtml(city)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold;">Equipment Needed</td><td style="padding: 8px 0;">${escapeHtml(equipmentNeeded) || "Not specified"}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px 0;">${escapeHtml(message) || "—"}</td></tr>
      </table>
      ${req.file ? `<p style="margin-top: 16px; color: #17877A;">A prescription file is attached to this email.</p>` : ""}
    </div>
  `;

  await transporter.sendMail({
    from: `"Respiratory Equips Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: `New Consultation Request from ${fullName}`,
    html: htmlBody,
    attachments,
  });

  res.status(200).json({ success: true, message: "Your request has been sent. We'll be in touch shortly." });
});

module.exports = { submitConsultation };