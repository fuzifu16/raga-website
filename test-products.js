const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });

  async function testProduct(id) {
    const page = await browser.newPage();
    try {
      await page.goto('http://localhost:8080/product-detail.html?id=' + id, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(500);
      const name = await page.textContent('#detail-name');
      const desc = await page.textContent('#detail-desc');
      const specs = await page.$$eval('#detail-specs tr', els => els.length);
      const downloads = await page.$$eval('#detail-downloads a', els => els.length);
      const imgSrc = await page.getAttribute('#detail-image img', 'src');
      const title = await page.title();
      console.log(id + ': name="' + name + '" specs=' + specs + ' downloads=' + downloads + ' img="' + imgSrc + '" title="' + title + '"');
    } catch(e) {
      console.log(id + ': ERROR - ' + e.message);
    }
    await page.close();
  }

  const ids = ['ra10', 'ra40', 'ra35', 'ra100', 'fen', 'ra3', 'rq3', 'rqm3', 'raiii70a'];
  for (const id of ids) {
    await testProduct(id);
  }

  await browser.close();
  console.log('DONE');
})();
