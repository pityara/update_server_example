'use strict';
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const compareVersions = require('compare-versions');

app.use(require('morgan')('dev'));

app.use('/releases', express.static(path.join(__dirname, 'releases')));

app.get('/updates/latest', (req, res) => {
  const { v: clientVersion = '0.1.0', p: clientPlatform = 'darwin' } = req.query;
  console.log(clientVersion, clientPlatform);
  const latest = getLatestRelease(clientPlatform);
  console.log(compareVersions(clientVersion, latest));

  if (compareVersions(latest, clientVersion) !== 1) {
    res.status(204).end();
  } else {
    res.json({
      url: `${getBaseUrl()}/releases/${clientPlatform}/${latest}/app.zip`
    });
  }
});

let getLatestRelease = (clientPlatform) => {
  const dir = `${__dirname}/releases/${clientPlatform}`;

  const versionsDesc = fs.readdirSync(dir).filter((file) => {
    const filePath = path.join(dir, file);
    return fs.statSync(filePath).isDirectory();
  }).reverse();

  return versionsDesc[0];
}

let getBaseUrl = () => {
  return process.env.BASE_URL;
}

app.listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});
