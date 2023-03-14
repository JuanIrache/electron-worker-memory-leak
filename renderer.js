let worker, canvas, img

const timeout = (n) => new Promise((r) => setTimeout(r, n))

function preload() {
  img = loadImage(
    'https://images.unsplash.com/photo-1678639492459-d1f4771e6d0b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb'
  )
}

function setup() {
  canvas = createCanvas(800, 600).elt
  noLoop()
  worker = new Worker('worker.js')
  worker.onmessage = workerDone
  worker.postMessage({ action: 'setSize', payload: { width, height } })
  paint()
}

function workerDone({ data }) {
  console.log('received', data.byteLength)
  // Do something with the data
  paint()
}

const paint = async () => {
  image(img, random(-2, 2), random(-2, 2))
  createImageBitmap(canvas).then((bitmap) => {
    worker.postMessage({ action: 'saveFrame', payload: bitmap }, [bitmap])
  })
}
