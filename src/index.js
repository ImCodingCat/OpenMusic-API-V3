const { fork } = require('child_process');
const path = require('path');
// Made by mdavap
function spawnProcess(scriptPath, serviceName) {
  const child = fork(scriptPath, [], {
    stdio: ['inherit', 'pipe', 'pipe', 'ipc'],
  });

  child.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`[${serviceName}] ${output}`);
  });

  child.stderr.on('data', (data) => {
    const error = data.toString().trim();
    console.error(`[${serviceName} ERROR] ${error}`);
  });

  child.on('exit', (code, signal) => {
    console.log(`[${serviceName}] Process exited with code ${code} and signal ${signal}`);
  });

  return child;
}

function startServices() {
  const backendProcess = spawnProcess(path.join(__dirname, 'backend.js'), 'Backend');
  const consumerProcess = spawnProcess(path.join(__dirname, 'consumer.js'), 'Consumer');
  console.log('[OpenMusicV3] Running services... (mdavap)');
  console.log(`[Backend] running on ${backendProcess.pid} process id`);
  console.log(`[Consumer] running on ${consumerProcess.pid} process id`);

  process.on('SIGTERM', () => {
    console.log('Shutting down services...');
    backendProcess.kill();
    consumerProcess.kill();
    process.exit(0);
  });
}

startServices();
