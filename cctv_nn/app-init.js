customElements.define('app-init',
   class extends HTMLElement {
      connectedCallback() {
         this.innerHTML = `
            <div>
               <p>
                  CCTV system based on a power web application and COCO-SSD neural network. Detects people, records video, and sends it to an email.
               </p>
               <p>
                  The application will request permission for the camera, microphone and google authorization (for sending emails through the current account).
               </p>
               <p>
                  <a href="https://github.com/balajahe/balajahe.github.io/tree/master/cctv_nn">Sources on GitHub</a>
               </p>
               <button style="width:100%">Start</button>
            </div>
         `
         this.querySelector('button').onclick = async (ev) => {
            this.querySelector('div').remove()
            await navigator.serviceWorker.register('/cctv_nn/app-sw.js')
            document.querySelector('video-recorder').init()
            document.querySelector('video-sender').init()
         }
      }
   }
)
