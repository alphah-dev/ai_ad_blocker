importScripts('https://unpkg.com/@tensorflow/tfjs/dist/tf.min.js');

let model;

self.onmessage = async (e) => {
  if (!model) {
    model = await tf.loadLayersModel(chrome.runtime.getURL('model/model.json'));
  }
  const { features, id } = e.data;
  const tensor = tf.tensor2d([features]);
  const prediction = model.predict(tensor);
  const isAd = prediction.dataSync()[0] > 0.5;
  self.postMessage({ id, isAd });
};