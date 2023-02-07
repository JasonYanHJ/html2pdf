const puppeteer = require("puppeteer");

const generatePdf = async (htmlFilePath) => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.EXEC_PATH || undefined,
    args: process.env.ARGS ? process.env.ARGS.split(',') : undefined,
  });
  console.log('path: ', htmlFilePath);
  const page = await browser.newPage();
  await page.goto('file://' + htmlFilePath);
  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: `
        <header style="width: 100%; display: flex; justify-content: space-between; font-size: 8px; color: #c8c8c8;">
          <div style="margin-left: 24px;" >enjoywriting.com</div>
          <div style="margin-right: 24px;" >雅言作文</div>
        </header>
      `,
    footerTemplate: "<footer></footer>",
    margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    printBackground: true,
  });
  await browser.close();

  return pdf;
}

module.exports = generatePdf;