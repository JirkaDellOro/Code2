"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CubaControl extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static { this.iSubclass = ƒ.Component.registerSubclass(CubaControl); }
        // Properties may be mutated by users in the editor via the automatically created user interface
        // public message: string = "CustomComponentScript added to ";
        constructor() {
            super();
            // Activate the functions of this component as response to events
            this.hndEvent = (_event) => {
                switch (_event.type) {
                    case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                        // ƒ.Debug.log(this.message, this.node);
                        break;
                    case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                        this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                        this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                        break;
                    case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                        // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                        // ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
                        break;
                }
            };
            this.update = () => {
                // const cmpTransform: ƒ.ComponentTransform = this.node.getComponent(ƒ.ComponentTransform);
                // cmpTransform.mtxLocal.rotateY(1);
                // this.node.cmpTransform.mtxLocal.rotateY(1);
                // this.node.mtxLocal.rotateY(1);
            };
            this.rotate = (_angle) => {
                this.node.mtxLocal.rotateY(_angle);
            };
            this.drive = (_forward) => {
                this.node.mtxLocal.translateZ(_forward);
            };
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
    }
    Script.CubaControl = CubaControl;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let cuba;
    const control = new ƒ.Control("Cuba", 0.5, 0 /* ƒ.CONTROL_TYPE.PROPORTIONAL */, 500);
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        const cubaNode = viewport.getBranch().getChildByName("Cuba");
        cuba = cubaNode.getComponent(Script.CubaControl);
        const cubaGraph = ƒ.Project.getResourcesByName("Cuba")[0];
        console.log(cubaGraph);
        for (let i = 0; i < 10; i++) {
            const cubaInstance = await ƒ.Project.createGraphInstance(cubaGraph);
            console.log(cubaInstance);
            const position = ƒ.random.getVector3(new ƒ.Vector3(30, 0, 30), new ƒ.Vector3(-30, 0, -30));
            cubaInstance.mtxLocal.translate(position);
            cubaNode.getParent().addChild(cubaInstance);
        }
        document.addEventListener("mousemove", hndMouseMove);
        document.addEventListener("click", hndMouseClick);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        ƒ.Loop.start(); // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function hndMouseMove(_event) {
        cuba.rotate(-_event.movementX);
    }
    function hndMouseClick(_event) {
        cuba.rotate(-_event.movementX);
    }
    function update( /* _event: Event */) {
        // ƒ.Physics.simulate();  // if physics is included and used
        const forward = ƒ.Keyboard.mapToTrit([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP], [ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]);
        control.setInput(forward);
        cuba.drive(control.getOutput());
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map