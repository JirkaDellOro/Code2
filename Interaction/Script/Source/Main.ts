namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let cuba: CubaControl;
  const control: ƒ.Control = new ƒ.Control("Cuba", 0.5, ƒ.CONTROL_TYPE.PROPORTIONAL, 500);

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    const cubaNode: ƒ.Node = viewport.getBranch().getChildByName("Cuba");
    cuba = cubaNode.getComponent(CubaControl);

    const cubaGraph: ƒ.Graph = <ƒ.Graph>ƒ.Project.getResourcesByName("Cuba")[0];
    console.log(cubaGraph);

    for (let i: number = 0; i < 10; i++) {
      const cubaInstance: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(cubaGraph);
      console.log(cubaInstance);
      const position: ƒ.Vector3 = ƒ.random.getVector3(
        new ƒ.Vector3(30, 0, 30), new ƒ.Vector3(-30, 0, -30)
      );
      cubaInstance.mtxLocal.translate(position);
      cubaNode.getParent().addChild(cubaInstance);
    }


    document.addEventListener("mousemove", hndMouseMove);
    document.addEventListener("mousedown", hndMouseDown);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function hndMouseMove(_event: MouseEvent): void {
    cuba.rotate(-_event.movementX);
  }

  function hndMouseDown(_event: MouseEvent): void {
    if (_event.button != 2)
      return;
    const vecScreen: ƒ.Vector2 = new ƒ.Vector2(_event.offsetX, _event.offsetY);
    const ray: ƒ.Ray = viewport.getRayFromClient(vecScreen);
    console.log(ray);
    
    const cubas: ƒ.Node[] = viewport.getBranch().getChildrenByName("Cuba");
    for (const cuba of cubas) {
      const vecDistance: ƒ.Vector3 = ray.getDistance(cuba.mtxWorld.translation);
      console.log(vecDistance.magnitude);
    }
  }

  function update(/* _event: Event */): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    const forward: number = ƒ.Keyboard.mapToTrit(
      [ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP],
      [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN],
    );

    control.setInput(forward);
    cuba.drive(control.getOutput());

    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}