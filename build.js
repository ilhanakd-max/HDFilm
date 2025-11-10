const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const distDir = path.join(projectRoot, 'dist');
const filesToCopy = ['hdfilmizle.html', 'yerlidizi.html'];

function ensureDistDirectory() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
}

function copyFile(fileName) {
  const source = path.join(projectRoot, fileName);
  const target = path.join(distDir, fileName);

  if (!fs.existsSync(source)) {
    throw new Error(`Kaynak dosya bulunamadı: ${fileName}`);
  }

  fs.copyFileSync(source, target);
  console.log(`Kopyalandı: ${fileName}`);
}

function build() {
  ensureDistDirectory();
  filesToCopy.forEach(copyFile);
  console.log(`Toplam ${filesToCopy.length} dosya dist klasörüne kopyalandı.`);
}

try {
  build();
  console.log('Build tamamlandı.');
} catch (error) {
  console.error('Build sırasında hata oluştu.');
  console.error(error.message);
  process.exitCode = 1;
}
