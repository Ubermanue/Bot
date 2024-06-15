const axios = require('axios');
const fs = require('fs');
module.exports.config = {
  name: 'xvideos-search',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['xvs'],
  description: 'Search for videos on Xvideos',
  usage: "xvideos-search [query]",
  credits: 'Developer',
  cooldown: 5,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  try {
    const query = args.join(' ');
    if (!query) {
      const message = 'Please provide a search query. Usage: xvideos-search [query]';
      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      const searchResults = {
        "status": true,
        "result": [
          {
            "video": "https://www.xvideos2.com/pornstars/lexi_lore-model",
            "duration": "",
            "uploaderName": "",
            "uploaderProfile": "https://www.xvideos2.comundefined"
          },
          {
            "video": "https://www.xvideos2.com/video.kubupik1412/stepsister_ask_to_come_watch_her_masturbating",
            "thumbnail": "https://cdn77-pic.xvideos-cdn.com/videos/thumbs169/5c/ec/ee/5ceceed140a5d3bb55cc165e68e07d8d/5ceceed140a5d3bb55cc165e68e07d8d.10.jpg",
            "title": "StepSister Ask to come watch her masturbating",
            "duration": "20 min",
            "uploaderName": "Amojhonny",
            "uploaderProfile": "https://www.xvideos2.com/profiles/amojhonny"
          },
          {
            "video": "https://www.xvideos2.com/video.kmbptfm08ce/stepdaughter_is_obsessed_with_her_stepdad_s_cock",
            "thumbnail": "https://cdn77-pic.xvideos-cdn.com/videos/thumbs169/1d/8a/e6/1d8ae65da740adbec57d64802bdef4e3/1d8ae65da740adbec57d64802bdef4e3.2.jpg",
            "title": "stepdaughter is obsessed with her stepdad's cock",
            "duration": "6 min",
            "uploaderName": "Sweeterin9",
            "uploaderProfile": "https://www.xvideos2.com/profiles/sweeterin9"
          }
          // Add more results as needed
        ]
      };

      let message = `Search results for "${query}":\n\n`;
      searchResults.result.forEach((video, index) => {
        message += `${index + 1}. Title: ${video.title || 'N/A'}\n`;
        message += `   Duration: ${video.duration || 'N/A'}\n`;
        message += `   Video: ${video.video}\n`;
        message += `   Uploader: ${video.uploaderName || 'N/A'}\n`;
        message += `   Profile: ${video.uploaderProfile}\n\n`;
      });

      api.sendMessage(message, event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage(`Error in the xvideos-search command: ${error.message}`);
  }
};