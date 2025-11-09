"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    class Body extends ƒ.Node {
        velOrbit;
        velRotation;
        constructor(_name, _size, _color, _distance, _timeYear, _timeDay) {
            super(_name);
            const cmpMesh = new ƒ.ComponentMesh(FirstFudge.mesh);
            cmpMesh.mtxPivot.scale(new ƒ.Vector3(_size, _size, _size));
            const cmpMaterial = new ƒ.ComponentMaterial(FirstFudge.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS(_color);
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(cmpMaterial);
            this.addComponent(cmpMesh);
            this.mtxLocal.translateX(_distance);
            this.velOrbit = 360 / _timeYear;
            this.velRotation = 360 / _timeDay;
            ƒ.Time.game.setScale(10);
        }
        update() {
            const timeDelta = ƒ.Loop.timeFrameGame / 1000;
            const angleOrbit = this.velOrbit * timeDelta;
            const angleRotation = this.velRotation * timeDelta;
            this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(angleOrbit, true);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(angleRotation);
            for (const child of this.getChildren())
                child.update();
        }
    }
    FirstFudge.Body = Body;
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Body.js.map