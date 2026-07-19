const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Mail sunucu ayarlarını (Transporter) yapılandır
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. Mail içeriğini ve detaylarını hazırla
    const mailOptions = {
        from: `"${options.name}" <${process.env.EMAIL_USER}>`, // Gönderen adı ve senin sistem mailin
        replyTo: options.email, // Kullanıcı yanıtla dediğinde ticket'ı açan kişiye gitsin
        to: process.env.EMAIL_USER, // Ticket'lar senin admin mailine düşecek
        subject: `🎫 Yeni Destek Talebi: ${options.subject}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #0d6efd; margin-bottom: 20px;">Yeni Ticket / Destek Talebi</h2>
                <p><strong>Gönderen Kişi:</strong> ${options.name}</p>
                <p><strong>E-posta Adresi:</strong> ${options.email}</p>
                <p><strong>Telefon:</strong> ${options.phone}</p>
                <p><strong>Konu:</strong> ${options.subject}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><strong>Mesaj İçeriği:</strong></p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${options.message}</div>
            </div>
        `
    };

    // 3. Maili asenkron olarak gönder
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;