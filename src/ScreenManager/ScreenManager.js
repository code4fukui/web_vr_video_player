import * as MAIN from "../index.js";
import PanelsList from "./Panels.js";

let isVRModeUsed = true;
export let VRMode = "screen"; // "sbs"
let currently_3d = true;
export let force_2d_mode = false;
export let currentZoom = 0;
const panels = new PanelsList();
export const objectsToDrag = {};

export function registerPanel(ref, container, ui_name, save_as_name) {
    panels.addPanel(ref, container, ui_name, save_as_name);
}

export function registerMeshPanel(
    ref,
    ui_name,
    save_as_name,
    mode,
    screen_type,
    eye
) {
    panels.addMesh(ref, ui_name, save_as_name, mode, screen_type, eye);
}

export function registerObjectToDrag(obj, view, panelName) {
    if (!(view in objectsToDrag)) {
        objectsToDrag[view] = [];
    }
    objectsToDrag[view].push({
        panelName: panelName,
        ref: obj,
    });
}

export function vrsessionend() {
    resetPosition("cameras");
    resetPosition("playMenuPanel");
    resetPosition("fileBrowserPanel");
    resetPosition("sourcesSelectorPanel");
    resetPosition("meshes");
}

export function resetPosition(ui) {
    for (const [name, elements] of Object.entries(panels)) {
        if (name === ui) {
            elements.panels.forEach((panel) => {
                MAIN[name][panel.ui_name].position.copy(panel.position);
                MAIN[name][panel.ui_name].rotation.copy(panel.rotation);
            });
        }
    }
}

export function zoom(in_or_out, step = 10) {
    const oldZoom = currentZoom;
    let distance = 0;
    switch (in_or_out) {
        case "in":
            if (currentZoom < 180) {
                currentZoom += step;
                distance = -step;
            }
            break;
        case "out":
            if (currentZoom > -180) {
                currentZoom -= step;
                distance = step;
            }
            break;
        case "reset":
            currentZoom = 0;
            break;
        default:
            break;
    }
    if (oldZoom !== currentZoom) {
        for (let mesh in MAIN.meshes) {
            if (in_or_out === "reset"){
                const temp = panels.meshes.panels
                    .find((element) => element.ui_name === mesh)
                    .position.clone();
                temp.z += currentZoom;
                temp.applyEuler(MAIN.meshes[mesh].rotation);
                MAIN.meshes[mesh].position.copy(temp);
            } else {
                const temp = panels.meshes.panels.find(
                    (element) => element.ui_name === mesh
                ).position.clone();
                temp.normalize();
                MAIN.meshes[mesh].translateOnAxis(temp, distance);
            }
        }
    }
}

export function tilt(up_or_down) {
    switch (up_or_down) {
        case "up":
            for (let mesh in MAIN.meshes) {
                MAIN.meshes[mesh].rotation.x -= 0.01;
            }
            break;
        case "down":
            for (let mesh in MAIN.meshes) {
                MAIN.meshes[mesh].rotation.x += 0.01;
            }
            break;
        case "reset":
            for (let mesh in MAIN.meshes) {
                MAIN.meshes[mesh].rotation.x = panels.meshes.panels.find(
                    (element) => element.ui_name === mesh
                ).rotation.x;
            }
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Switch between VR and Screen mode

export function switchModeVRScreen(vr_or_screen) {
    panels.meshes.panels.forEach((mesh) => {
        mesh.switchModeVRScreen(vr_or_screen);
    });
    VRMode = vr_or_screen;
    isVRModeUsed = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Switch between 2D and 3D mode

export function switch2d3d(switch_2d_or_3d, forced = false) {
    //if (isVRModeUsed && (!force_2d_mode || forced)) {
    //if (!force_2d_mode || forced) {
        panels.meshes.panels.forEach((mesh) => {
            mesh.switch2d3d(switch_2d_or_3d, VRMode);
        });
        switch (switch_2d_or_3d) {
            case "2d":
                currently_3d = false;
                break;
            case "3d":
                currently_3d = true;
                break;
        }
    //}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Force 2D mode

export function force2DMode(bool) {
    force_2d_mode = bool;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let dragging = false;

export function startDrag(view) {
    if (MAIN.renderer.xr.isPresenting && !dragging && view in objectsToDrag) {
        objectsToDrag[view].forEach((obj) => {
            MAIN.vrControl.controllers[
                MAIN.vrControlCurrentlyUsedController
            ].attach(obj.ref);
        });
        dragging = true;
    }
}

export function stopDrag(view) {
    if (MAIN.renderer.xr.isPresenting && dragging && view in objectsToDrag) {
        objectsToDrag[view].forEach((obj) => {
            MAIN.scene.attach(obj.ref);
        });
        dragging = false;
    }
}

export function resetDrag(view) {
    if (MAIN.renderer.xr.isPresenting && view in objectsToDrag) {
        zoom("reset");
        const readyList = [];
        objectsToDrag[view].forEach((obj) => {
            if (!(obj.panelName in readyList)) {
                resetPosition(obj.panelName);
                readyList.push(obj.panelName);
            }
        });
    }
}
