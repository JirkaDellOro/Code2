"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    document.addEventListener("DOMContentLoaded", hndLoad);
    let earth;
    let viewport;
    function hndLoad() {
        const canvas = document.querySelector("canvas");
        const cmpCamera = new ƒ.ComponentCamera();
        FirstFudge.mesh = new ƒ.MeshCube("Cube");
        FirstFudge.material = new ƒ.Material("Material", ƒ.ShaderLit);
        earth = new FirstFudge.Body("Earth");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", earth, cmpCamera, canvas);
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        ƒ.Loop.start();
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
    }
    function update() {
        earth.update();
        viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=FirstFudge.js.map