const fs = require('fs');
const aglio = require('aglio');

fs.watchFile(`${__dirname}/../readme.md`, () => {
  aglio.renderFile(`${__dirname}/../readme.md`, `${__dirname}/../views/index.html`, { themeTemplate: 'default' }, (err, warnings) => {
    if (err) console.log(err);
    if (warnings) console.log(warnings);
  })
});

exports.getDocumentation = (req, res) => {
  fs.access(`${__dirname}/../views/index.html`, (err) => {
    if (err) res.status(500).send(err);
    res.render('index.html');
  })
}