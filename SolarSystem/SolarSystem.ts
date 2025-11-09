namespace FirstFudge {
  import ƒ = FudgeCore;
  document.addEventListener("DOMContentLoaded", hndLoad);

  export let mesh: ƒ.Mesh;
  export let material: ƒ.Material;

  let viewport: ƒ.Viewport;

  function hndLoad(): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas")!;
    const cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    mesh = new ƒ.MeshCube("Cube");
    material = new ƒ.Material("Material", ƒ.ShaderLit);


    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", createSolarSystem(), cmpCamera, canvas);

    cmpCamera.mtxPivot.translateZ(10);
    cmpCamera.mtxPivot.translateY(5);
    cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.mtxPivot.translateZ(8);
    
    ƒ.Loop.start();
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function createSolarSystem(): Body {
    const result: Body = new Body("Sun", 0.5, "yellow", 0, Infinity, Infinity);
    let planet: Body;
    
    planet = new Body("Earth", 0.1, "blue", 1, 365, 1);
    planet.appendChild(new Body("Moon", 0.1, "lightgrey", 0.2, 28, Infinity));

    result.appendChild(planet);
    
    planet = new Body("Mercury", 0.1, "lightblue", 0.7, 100, 2);
    result.appendChild(planet);
    
    return result;
  }

  function update(): void {
    (<Body>viewport.getBranch()).update();
    viewport.draw();
  }
}
