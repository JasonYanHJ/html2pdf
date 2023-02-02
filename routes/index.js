const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const generatePdf = require('../controller/generatePdf');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/generate-pdf', async (req, res, next) => {
  const uuid = Math.random().toString(36).slice(2, 7);;
  const htmlFilePath = path.join(__dirname, `../tmp/revision_${uuid}.html`);

  await fs.writeFile(htmlFilePath, req.body.html);
  const pdf = await generatePdf(htmlFilePath);
  fs.unlink(htmlFilePath);

  res.attachment(`revision_${uuid}.pdf`);
  res.contentType("application/pdf");
  res.send(pdf);
});

module.exports = router;
