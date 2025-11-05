namespace FirstFudge {
  import ƒ = FudgeCore;
  document.addEventListener("DOMContentLoaded", hndLoad);

  export let mesh: ƒ.Mesh;
  export let material: ƒ.Material;

  let earth: Body;
  let viewport: ƒ.Viewport;

  function hndLoad(): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    mesh = new ƒ.MeshCube("Cube");
    material = new ƒ.Material("Material", ƒ.ShaderLit);

    earth = new Body("Earth");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", earth, cmpCamera, canvas);

    cmpCamera.mtxPivot.translateZ(3);
    cmpCamera.mtxPivot.rotateY(180);

    ƒ.Loop.start();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(): void {
    earth.update();
    viewport.draw();
  }
}
