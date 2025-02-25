const tf = require('@tensorflow/tfjs');
const fs = require('fs').promises;
const path = require('path');

const xs = tf.tensor2d([
  [300, 250, 1], // Typical banner ad
  [500, 100, 0], // Non-ad content
  [728, 90, 1],  // Leaderboard ad
  [200, 200, 0], // Non-ad
  [640, 360, 1], // YouTube video ad size (approx)
  [300, 50, 1]   // YouTube overlay ad
]);
const ys = tf.tensor2d([[1], [0], [1], [0], [1], [1]]);

const model = tf.sequential();
model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [3] }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

(async () => {
  await model.fit(xs, ys, { epochs: 100 });
  const saveResult = await model.save(tf.io.withSaveHandler(async (artifacts) => {
    const modelDir = 'D:/ai_ad_blocker/model';
    await fs.mkdir(modelDir, { recursive: true });
    await fs.writeFile(path.join(modelDir, 'model.json'), JSON.stringify(artifacts.modelTopology));
    if (artifacts.weightData) {
      await fs.writeFile(path.join(modelDir, 'weights.bin'), Buffer.from(artifacts.weightData));
    }
    return { modelArtifactsInfo: { dateSaved: new Date(), modelTopologyType: 'JSON' } };
  }));
  console.log('Model saved to D:\\ai_ad_blocker\\model');
})();