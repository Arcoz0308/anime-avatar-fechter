const axios = require("axios");
const fs = require("fs");
const run = async () => {
    let images = [];
    let page = 1;
    let maxPage = 2589;
    for (page; page < maxPage; page++) {
        try {
            let response = await axios.get(`https://avatars.alphacoders.com/by_category/3?page=${page}`);
            let i = response.data.match(/https:\/\/avatarfiles\.alphacoders\.com\/[0-9]+\/thumb-[0-9]+\.(png|jpg)/gm);
            if (i) i.forEach(image => images.push(image));
            console.log(`fetching ${i ? i.length : 0} on page N°${page} with success`);
        } catch (e) {
            console.log(`Error on page ${page}, error name : ${e.name}`);
        }
    }
    console.log(`fetching ${images.length} images links`);
    fs.writeFileSync('avatars.json', JSON.stringify(images, null, 2));
}
run();