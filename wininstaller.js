const electronInstaller = require('electron-winstaller');
const path = require('path');

async function installwin () {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: path.join(__dirname, 'releases/win/0.2.0/exe'),
      outputDirectory: path.join(__dirname, 'releases/win/0.2.0/instaleer'),
      authors: 'ForaSoft',
      description: 'description',
      exe: 'spins.exe',
    });
    console.log('Completed!');
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

installwin();
