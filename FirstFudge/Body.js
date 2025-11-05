"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    class Body extends ƒ.Node {
        constructor(_name) {
            super(_name);
            this.addComponent(new ƒ.ComponentMesh(FirstFudge.mesh));
            this.addComponent(new ƒ.ComponentMaterial(FirstFudge.material));
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(1);
        }
        update() {
            const rotSpeed = 360 / 5;
            const angle = rotSpeed * ƒ.Loop.timeFrameGame / 1000;
            this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(angle, true);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(-3 * angle);
        }
    }
    FirstFudge.Body = Body;
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Body.js.map