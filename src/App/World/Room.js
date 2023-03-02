import * as THREE from "three";

export default class Room {
	constructor(app) {
		this.app = app;

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new THREE.Mesh( geometry, material );
        this.app.scene.add(cube);
	}


}