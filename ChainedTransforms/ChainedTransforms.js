"use strict";
var ChainedTransforms;
(function (ChainedTransforms) {
    window.addEventListener("load", hndLoad);
    document.addEventListener("click", hndClick);
    let crc2;
    let t1;
    let t2;
    function hndLoad() {
        crc2 = document.querySelector("canvas").getContext("2d");
        const path = new Path2D();
        path.moveTo(0, 0);
        path.lineTo(-20, -10);
        path.lineTo(-20, 10);
        path.closePath();
        t1 = { path: path, angle: 45, distance: 200 };
        t2 = { path: path, angle: -75, distance: 150 };
        draw(t1);
        draw(t2);
    }
    function hndClick(_event) {
        let point = new DOMPoint(_event.offsetX, _event.offsetY);
        console.log("Before:", point);
        const inverse = t1.transform.inverse();
        point = inverse.transformPoint(point);
        console.log("After:", point);
        crc2.isPointInPath(t1.path, point.x, point.y);
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