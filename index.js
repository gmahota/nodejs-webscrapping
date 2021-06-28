const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/fmx.oficial/');
  await page.screenshot({ path: 'example.png' });

  const imgList = await page.evaluate(()=>{
    
    // Vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll('article img')

    // Transformar o NodeList em array
    const imgArray = [...nodeList]

    //Transformar os nodes (elementos html) em objectos JS
    const list = imgArray.map(img =>({
        src:img.src
    }))

    return list
  })

  fs.writeFile('instagram.json', JSON.stringify(imgList,null,2),err=>{
      if(err) throw new Error('someting is wrong')

      console.log('well done')
  } )

  await browser.close();
})();