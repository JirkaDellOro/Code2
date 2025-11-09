"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", hndLoad);
    let viewport;
    function hndLoad() {
        const canvas = document.querySelector("canvas");
        const cmpCamera = new ƒ.ComponentCamera();
        FirstFudge.mesh = new ƒ.MeshCube("Cube");
        FirstFudge.material = new ƒ.Material("Material", ƒ.ShaderLit);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", createSolarSystem(), cmpCamera, canvas);
        cmpCamera.mtxPivot.translateZ(10);
        cmpCamera.mtxPivot.translateY(5);
        cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.mtxPivot.translateZ(8);
        ƒ.Loop.start();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
    }
    function createSolarSystem() {
        const result = new FirstFudge.Body("Sun", 0.5, "yellow", 0, Infinity, Infinity);
        let planet;
        planet = new FirstFudge.Body("Earth", 0.1, "blue", 1, 365, 1);
        planet.appendChild(new FirstFudge.Body("Moon", 0.1, "lightgrey", 0.2, 28, Infinity));
        result.appendChild(planet);
        planet = new FirstFudge.Body("Mercury", 0.1, "lightblue", 0.7, 100, 2);
        result.appendChild(planet);
        return result;
    }
    function update() {
        viewport.getBranch().update();
        viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=SolarSystem.js.map