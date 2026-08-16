import * as ort from "onnxruntime-web";

let session = null;

export const loadModel = async () => {
  if (session) return session;

  session = await ort.InferenceSession.create(
    require("../assets/models/yolov8n.onnx")
  );

  return session;
};

export const runYOLO = async (tensor) => {
  const model = await loadModel();

  const feeds = {};
  feeds[model.inputNames[0]] = tensor;

  const results = await model.run(feeds);

  return results;
};