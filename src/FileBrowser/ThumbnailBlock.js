import { Block } from "three-mesh-ui";

import * as Helpers from "../Helpers.js";
import * as MAIN from "../index.js";

export default class ThumbnailBlock extends Block {
    fileSRC;
    fileNameButton;
    fileThumbnail;
    screen_type;
    mode;
    shouldVerifyVideoSRC = false;

    constructor(
        options,
        fileSRC,
        fileNameButton,
        fileThumbnail,
        screen_type,
        mode,
        frame_height,
        frame_width,
        selectedAttributes,
        hoveredStateAttributes,
        idleStateAttributes,
        shouldVerifyVideoSRC = false
    ) {
        super(options);
        console.log("t", fileSRC)

        this.fileSRC = fileSRC;
        this.fileNameButton = fileNameButton;
        this.fileThumbnail = fileThumbnail;
        this.screen_type = screen_type;
        this.mode = mode;
        this.frame_height = frame_height;
        this.frame_width = frame_width;
        this.shouldVerifyVideoSRC = shouldVerifyVideoSRC;

        const play = () => {
            if (screen_type === "screen") {
                MAIN.scaleScreenMesh(this.frame_width / this.frame_height);
            }
            const src = this.fileSRC;
            Helpers.setVideoSrc(src);
            MAIN.fileBrowserPanel.hideFileMenuPanel(this.screen_type, this.mode);
        };
        if (this.shouldVerifyVideoSRC) {
            this.setupState({
                state: "selected",
                attributes: selectedAttributes,
                onSet: () => {
                    const response = Helpers.testIfFileExist(this.fileSRC);
                    if (response) {
                        play();
                    } else {
                        MAIN.showPopupMessage(
                            Helpers.getWordFromLang("video_not_found")
                        );
                    }
                },
            });
        } else {
            this.setupState({
                state: "selected",
                attributes: selectedAttributes,
                onSet: () => {
                    play();
                },
            });
        }

        this.setupState({
            state: "hovered",
            attributes: hoveredStateAttributes,
        });
        this.setupState({
            state: "idle",
            attributes: idleStateAttributes,
        });
    }
}
