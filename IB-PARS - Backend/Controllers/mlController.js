const { spawn } = require('child_process');

exports.trainModel = (req, res) => {
  const python = spawn('python', ['ml_model/train_model.py']);

  python.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.status(200).json({ message: 'Model trained successfully' });
    } else {
      res.status(500).json({ message: 'Training failed' });
    }
  });
};
