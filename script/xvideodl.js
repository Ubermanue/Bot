const fs = require('fs');
const axios = require('axios');

async function getXVideoDL(videoUrl) {
    try {
        const apiUrl = `https://deku-rest-api-ywad.onrender.com/prn/download?url=${videoUrl}`;
        const { data } = await axios.get(apiUrl);
        return data;  // Assuming the API returns the download link or the file itself
    } catch (error) {
        throw error;
    }
}

module.exports.run = async function ({ api, event, args, prefix }) {
    const input = args.join(' ');
    const time = new Date();
    const timestamp = time.toISOString().replace(/[:.]/g, "-");

    if (!input) {
        api.sendMessage(`To use xvideodl, provide a video URL.\n\nExample:\n\n${prefix}xvideodl https://www.example.com/video`, event.threadID, event.messageID);
    } else {
        try {
            const videoUrl = input.trim();
            api.sendMessage(`Downloading video from ${videoUrl}`, event.threadID, event.messageID);

            const downloadLink = await getXVideoDL(videoUrl);
            const path = `./script/cache/${timestamp}_video.mp4`;  // Adjust file extension as per API response
            const download = (await axios.get(downloadLink, { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(path, Buffer.from(download, 'utf-8'));

            const fileStream = fs.createReadStream(path);
            await api.sendMessage({
                attachment: fileStream,
                body: ""
           xvideo }, event.threadID, async (err, messageInfo) => {
                if (err) {
                    console.error(err);
                } else {
                    fs.unlinkSync(path);
                }
            }, event.messageID);
        } catch (error) {
            console.error(error);
        }
    }
}
