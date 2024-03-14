# Web VR video player for 180° videos.

## Licenses

### Source code Licensed under MIT License

### Icons are licensed under "Free for commercial use with attribution license"

### Fonts are licensed under the Apache License, Version 2.0.

## Functionality
### Search in current folder
Search will filter current folder with provided phrase.
You can switch folders, search phrase will work until it's cleared.

![Search-box](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_4.png?raw=true)

![Search-box-keyboard](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_4_1.png?raw=true)
### Sorting
Sort by Name or Date, change order ascending/descending.

![Sorting](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_5.png?raw=true)
### Drag in Folders view
You can reposition Folders view by holding trigger and dragging view using bottom bar.

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_6.png?raw=true)
### Drag in Player view
You can reposition Player and Video Spheres by holding trigger and dragging view using bottom bar.

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_7.png?raw=true)

Second options is to reposition only Player controls

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_8.png?raw=true)

*Player controls and spheres will reset to default position on exit from current video playback*
### Gamepad controls
#### Playback control
Thumbstick: 
- up/down for zoom
- left/right for rewind and fast forward (10 seconds jumps)

*If there are two connected controllers pressing trigger switches active controller.*

#### Folders view
Thumbstick: 
- left/right for switching pages

## Requirements

- Linux server with installed and configured web server including https (WebXR requires https)
- FFMPEG installed (required if thumbnails generator will be used)

## Setup

### Extensions

[Extensions](https://github.com/michal-repo/web_vr_video_player_extensions)

## Generating your own JSON file with video sources
Player is using locally stored JSON file with video sources.

### Structure for CSV file

```
folder,name,src,thumbnail,screen_type,date,epoch
FOLDER_NAME,FILE NAME DISPLAYED IN UI,SOURCE URL TO VIDEO FILE,SOURCE URL TO THUMBNAIL FILE,TYPE OF SCREEN,DATE TIME (format: %Y-%m-%d %H:%M:%S),(format: %s)
```

#### Screen type
`"screen_type"` can be set to one of values:

`sbs` - Side by Side

`tb` - Top Bottom 180

`360` - Top Bottom 360

`sphere180` - fisheye 180, not VR (one lens)

`sphere360` - fisheye 360, not VR (one lens)

`screen` - normal 2D screen

### Using JSON solution and provided JavaScript scripts

```sh
deno run -A script/makeFiles.js
```
→ files.csv / files.json

## Troubleshooting

If videos or player can't be loaded make sure that this app files are owned by web server user (eg. www-data) and that web server user can read video and thumbnail files (eg. www-data is owner or permissions for others include read).

## Screenshots

![Print-screen-1](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_1.png?raw=true)

![Print-screen-2](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_2.png?raw=true)

![Print-screen-3](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_3.png?raw=true)
