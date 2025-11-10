declare namespace Script {
    import ƒ = FudgeCore;
    class CubaControl extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        hndEvent: (_event: Event) => void;
        update: () => void;
        rotate: (_angle: number) => void;
        drive: (_forward: number) => void;
    }
}
declare namespace Script {
}
