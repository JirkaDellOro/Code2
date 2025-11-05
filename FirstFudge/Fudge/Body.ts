namespace FirstFudge {
  import ƒ = FudgeCore;

  export class Body extends ƒ.Node {
    public constructor(_name: string, _mesh: ƒ.Mesh, _material: ƒ.Material) {
      super(_name);
      this.addComponent(new ƒ.ComponentMesh(_mesh));
      this.addComponent(new ƒ.ComponentMaterial(_material));
      this.addComponent(new ƒ.ComponentTransform());

      this.mtxLocal.translateX(1);
    }

    public update(): void {
      const rotSpeed: number = 360 / 5;
      const angle: number = rotSpeed * ƒ.Loop.timeFrameGame / 1000;

      this.getComponent(ƒ.ComponentTransform).mtxLocal.rotateY(angle, true);
      this.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(-3 * angle);
    }
  }
}