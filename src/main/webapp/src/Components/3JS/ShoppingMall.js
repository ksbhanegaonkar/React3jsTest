import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import './ShoppingMall.css';

class ShoppingMall extends Component {
    constructor(props) {
        super(props)
    
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
      }
    
      componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight
    
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          width / height,
          0.1,
          1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({ color: '#433F81' })
        const cube = new THREE.Mesh(geometry, material)
    
        const light = new THREE.SpotLight(0xffffff);
        light.position.set(-100,200,100);

        camera.position.z = 4
        scene.add(cube)
        scene.add(light)
        renderer.setClearColor('#000000')
        renderer.setSize(width, height)
    
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.material = material
        this.cube = cube

        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25
        controls.enableZoom = false


    
        this.mount.appendChild(this.renderer.domElement)
        this.start()
      }
    
      componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }
    
      start() {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }
    
      stop() {
        cancelAnimationFrame(this.frameId)
      }
    
      animate() {
        //this.cube.rotation.x += 0.05
        //this.cube.rotation.y += 0.05
    
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
      }
    
      renderScene() {
        this.renderer.render(this.scene, this.camera)
      }
    
      render() {
        return (
          <div className="main-window"
            ref={(mount) => { this.mount = mount }}
          />
        )
      }


}

export default withRouter(ShoppingMall);