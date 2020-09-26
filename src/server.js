const puppeteer = require('puppeteer');
const fs = require('fs');

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com/rocketseat_oficial');// URL do site.
    const imgList = await page.evaluate(()=>{ // Fazer a busca das imagens
        const Nodelist = document.querySelectorAll('article img');
        const ImageArry = [...Nodelist];
        const list = ImageArry.map(img =>({
            src: img.src,
        }));
        return list;
    });
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err =>{
        if(err) throw new Error('something went wrong');
    });
    //await page.screenshot({path: 'Rocketseat.png'});
    await browser.close();
})();
