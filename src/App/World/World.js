import * as THREE from "three";
import { EventDispatcher } from "three";
import Room from "./Room";

export default class World extends EventDispatcher{
	constructor(app) {
		super();

		this.app = app;
		this.room = new Room(this.app);
	}


}