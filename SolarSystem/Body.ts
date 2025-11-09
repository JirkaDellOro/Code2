namespace FirstFudge {
  import ƒ = FudgeCore;

  export class Body extends ƒ.Node {
    private velOrbit: number;
    private velRotation: number;

    public constructor(_name: string, _size: number, _color: string, _distance: number, _timeYear: number, _timeDay: number) {
      super(_name);
      const cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      cmpMesh.mtxPivot.scale(new ƒ.Vector3(_size, _size, _size));

      const cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS(_color);

      this.addComponent(new ƒ.ComponentTransform());
      this.addComponent(cmpMaterial);
      this.addComponent(cmpMesh);

      this.mtxLocal.translateX(_distance);

      this.velOrbit = 360 / _timeYear;
      this.velRotation = 360 / _timeDay;
    }

    public update(): void {
      const timeDelta: number = ƒ.Loop.timeFrameGame / 1000;
      const angleOrbit: number = this.velOrbit * timeDelta;
      const angleRotation: number = this.velRotation * timeDelta;

      this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(angleOrbit, true);
      this.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(angleRotation);

      for (const child of this.getChildren())
        (<Body>child).update();
    }
  }
}