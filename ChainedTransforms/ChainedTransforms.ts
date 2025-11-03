namespace ChainedTransforms {
  type Arrow = { path: Path2D, angle: number, distance: number, transform?: DOMMatrix };
  window.addEventListener("load", hndLoad);
  document.addEventListener("click", hndClick);

  let crc2: CanvasRenderingContext2D;
  const arrows: Arrow[] = [];

  function hndLoad(): void {
    crc2 = document.querySelector("canvas")!.getContext("2d")!;

    const path: Path2D = new Path2D();
    path.moveTo(0, 0);
    path.lineTo(-20, 10);
    path.lineTo(-20, -10);
    path.closePath();

    arrows.push({ path: path, angle: 45, distance: 200 });
    arrows.push({ path: path, angle: -75, distance: 150 });

    for (const arrow of arrows)
      draw(arrow);

    crc2.resetTransform();
  }

  function hndClick(_event: MouseEvent): void {
    const global: DOMPoint = new DOMPoint(_event.offsetX, _event.offsetY);
    console.log("Global:", global);
    for (const arrow of arrows) {
      const inverse: DOMMatrix = arrow.transform!.inverse();
      const local: DOMPoint = inverse.transformPoint(global);
      const hit: boolean = crc2.isPointInPath(arrow.path, local.x, local.y);
      console.log(hit, "Local:", local);
    }
  }

  function draw(_t: Arrow): void {
    crc2.moveTo(0, 0);
    crc2.rotate(Math.PI * _t.angle / 180);
    crc2.translate(_t.distance, 0);
    crc2.lineTo(0, 0);
    crc2.stroke();
    crc2.stroke(_t.path);
    _t.transform = crc2.getTransform();
  }
}