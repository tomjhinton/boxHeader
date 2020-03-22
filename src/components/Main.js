import React from 'react'
import axios from 'axios'
const THREE = require('three')
import Facefilter from 'facefilter'
import "../helpers/JeelizResizer.js"
import "../helpers/JeelizThreejsHelper.js"


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
  setupWebcam()
  console.log(Facefilter)
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



      </div>




    )
  }
}
export default Main
