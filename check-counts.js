const fs = require('fs');

function checkFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const body = data.body;

  // The pattern in the string is: id=\"send\" (backslash-quote)
  // In JS string: 'id=' + '\\' + '"' + 'send' + '\\' + '"'
  const patternSend = 'id=' + '\\' + '"' + 'send' + '\\' + '"';
  const patternContact = 'id=' + '\\' + '"' + 'contact' + '\\' + '"';

  let countSend = 0;
  let pos = 0;
  while (true) {
    const idx = body.indexOf(patternSend, pos);
    if (idx === -1) break;
    countSend++;
    pos = idx + 1;
  }

  let countContact = 0;
  pos = 0;
  while (true) {
    const idx = body.indexOf(patternContact, pos);
    if (idx === -1) break;
    countContact++;
    pos = idx + 1;
  }

  console.log(filePath + ' - Send: ' + countSend + ' Contact: ' + countContact);
}

checkFile('data/pages/conditions-coarctation-of-the-aorta.json');
checkFile('data/pages/conditions-transposition-great-arteries.json');
checkFile('data/pages/conditions-coronary-artery-disease.json');