// scratch/download_audio.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const dest = path.join(__dirname, '../public/audio/meditation_frequency.mp3');
const dir = path.dirname(dest);

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);

const agent = new https.Agent({
  rejectUnauthorized: false // SSL/TLS sertifika zinciri denetimlerini tamamen es geç
});

const options = {
  hostname: 'ia800204.us.archive.org',
  port: 443,
  path: '/21/items/meditationmusicroyaltyfree/Meditation%20Music.mp3',
  method: 'GET',
  agent: agent,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Connection': 'keep-alive'
  }
};

console.log('İndirme başlıyor (Güvenlik Sertifikası Atlanıyor)...');

const req = https.request(options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`İndirme başarısız: HTTP ${res.statusCode}`);
    fs.unlink(dest, () => {});
    process.exit(1);
  }

  const totalSize = parseInt(res.headers['content-length'], 10) || 0;
  let downloadedSize = 0;

  res.on('data', (chunk) => {
    downloadedSize += chunk.length;
    if (totalSize > 0) {
      const pct = ((downloadedSize / totalSize) * 100).toFixed(1);
      process.stdout.write(`\rİndiriliyor: ${pct}% (${(downloadedSize/1024/1024).toFixed(2)} MB / ${(totalSize/1024/1024).toFixed(2)} MB)`);
    }
  });

  res.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('\nİndirme tamamlandı! Dosya yerel olarak kaydedildi:', dest);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error('\nİstek hatası:', err);
  fs.unlink(dest, () => {});
  process.exit(1);
});

req.end();
