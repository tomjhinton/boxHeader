import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Physics, usePlane, useBox } from 'use-cannon'
import * as faceapi from 'face-api.js'
import '@babel/polyfill'
import axios from 'axios'
const THREE = require('three')
import Facefilter from 'facefilter'
import "../helpers/JeelizResizer.js"
import "../helpers/JeelizThreejsHelper.js"



import * as vertexShader from './vertexShader.vert'
import * as fragmentShader from './fragmentShader.frag'
const img =  new THREE.TextureLoader().load( './assets/texture.png')

const mouse = new THREE.Vector2(0, 0)
const uniforms = {
          uTexture: { value: img },
          u_mouseX: { value: Math.abs(mouse.x) },
          u_mouseY: { value: Math.abs(mouse.Y) },
          u_mouse: { value: mouse },
          u_time: { value: 0 },
          u_res: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
        }

function PlaneS(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    uniforms.u_time.value += 0.004

      // mesh.current.rotation.x = mesh.current.rotation.x += 0.01
  }


  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={ [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial
        attach="material"
        args={[{
           uniforms: uniforms,
           vertexShader: vertexShader,
            fragmentShader: fragmentShader
         }]}
          transparent
      />
    </mesh>
  )
}


class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)







  }


  componentDidMount(){
    const webcamElement = document.getElementById('webcam')
    function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator
    navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true },
        stream => {
          webcamElement.srcObject = stream
          webcamElement.addEventListener('loadeddata', () => resolve(), false)
        },
        error => reject())
    } else {
      reject()
    }
  })
}
Promise.all([
faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then( x=> {
setupWebcam()
ready = true

})

let sad, surprised, happy
let ready =  true
webcamElement.addEventListener('play', () => {
const canvas = document.getElementById('canvas')
const displaySize = { width: webcamElement.width, height: webcamElement.height }
faceapi.matchDimensions(webcamElement, displaySize)
setInterval(async () => {
  if(ready){
    const detections = await faceapi.detectAllFaces(webcamElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    if(resizedDetections[0] !== undefined){
      happy = resizedDetections[0].expressions.happy
      surprised = resizedDetections[0].expressions.surprised
    }
    console.log(resizedDetections)
}

}, 100)
})


  }

  componentDidUpdate(){



  }

  mouseMove(e){

    //console.log(e)

    this.setState({bass: `${e.screenX /100000} ${e.screenY /100000} `, scale: `${e.screenY /2}` })
  }




  render() {



    return (
      <div  className="body">
      <video autoPlay playsInline muted id="webcam" width="500px" height="500px" poster='' ></video>

      <Canvas>
      <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PlaneS position={[0, 0, 0]} />
        </Canvas>



      </div>




    )
  }
}
export default Main
