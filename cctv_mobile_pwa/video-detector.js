(async () => {
  self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js')
  self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd')

  let model = await cocoSsd.load()
  self.postMessage({})

  self.onmessage = async (ev) => {
    if (!model) {
      model = await cocoSsd.load()
    }
    const result = await model.detect(ev.data)
    const person = result.find(v => v.class === 'person')
    if (person !== undefined) {
      self.postMessage({ok: true, bbox: person.bbox})
    } else {
      self.postMessage({ok: false, bbox: null})
    }
  }
})()
