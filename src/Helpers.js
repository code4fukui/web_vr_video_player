import { loadResources } from "./loadResources.js";
import * as THREE from "three";
import { material, videoTexture } from "./index.js";

let video_src = document.getElementById("video_src");

//const LANG = require("./lang.json");
await loadResources({ LANG: "./src/lang.json" });

let selected_lang = "en";

let texturesrc = null;

export function imageSrcExists() {
    return texturesrc && texturesrc.endsWith(".jpg");
};

export function videoSrcExists() {
    return true;
    /*
    if (
        typeof video_src !== "undefined" &&
        video_src.src != window.location.href
    ) {
        return true;
    }
    return false;
    */
}


export function setVideoSrc(src) {
    texturesrc = src;
    if (src.toLowerCase().endsWith(".jpg")) {
        removeVideoSrc();
        const texture = new THREE.TextureLoader().load(src);
        material.map = texture;
    } else {
        material.map = videoTexture;
        removeVideoSrc();
        video_src.setAttribute("src", src);
        video_src.setAttribute("type", "video/mp4");
        const video = document.getElementById("video");
        video.load();
        video.play().catch((e) => {
            console.warn(e);
        });
    }
}

export function removeVideoSrc() {
    if (
        typeof video_src !== "undefined" &&
        video_src.src != window.location.href
    ) {
        video.pause();
        video_src.setAttribute("src", "");
    }
}

export function testIfFileExist(url) {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send();
        if (xhr.status !== 200) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export function getWordFromLang(key) {
    return LANG[selected_lang][key];
}
