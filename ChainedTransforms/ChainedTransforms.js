"use strict";
var ChainedTransforms;
(function (ChainedTransforms) {
    window.addEventListener("load", hndLoad);
    document.addEventListener("click", hndClick);
    let crc2;
    const arrows = [];
    function hndLoad() {
        crc2 = document.querySelector("canvas").getContext("2d");
        const path = new Path2D();
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
    function hndClick(_event) {
        const global = new DOMPoint(_event.offsetX, _event.offsetY);
        console.log("Global:", global);
        for (const arrow of arrows) {
            const inverse = arrow.transform.inverse();
            const local = inverse.transformPoint(global);
            const hit = crc2.isPointInPath(arrow.path, local.x, local.y);
            console.log(hit, "Local:", local);
        }
    }
    function draw(_t) {
        crc2.moveTo(0, 0);
        crc2.rotate(Math.PI * _t.angle / 180);
        crc2.translate(_t.distance, 0);
        crc2.lineTo(0, 0);
        crc2.stroke();
        crc2.stroke(_t.path);
        _t.transform = crc2.getTransform();
    }
})(ChainedTransforms || (ChainedTransforms = {}));
//# sourceMappingURL=ChainedTransforms.js.map