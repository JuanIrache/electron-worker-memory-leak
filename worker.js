const canvas = new OffscreenCanvas(300, 300)
const ctx = canvas.getContext('bitmaprenderer')

this.onmessage = function ({ data }) {
  const worker = this
  const { action, payload } = data

  if (action === 'setSize') {
    const { width, height } = payload
    canvas.width = width
    canvas.height = height
  } else if (action === 'saveFrame') {
    ctx.transferFromImageBitmap(payload)
    canvas.convertToBlob().then((blob) => {
      blob.arrayBuffer().then((arrBuf) => {
        worker.postMessage(arrBuf, [arrBuf])
      })
    })
  }
}
