# 180°動画用 Web VR 動画プレイヤー

## ライセンス

### ソースコードは MIT License の下でライセンスされています

### アイコンは "Free for commercial use with attribution license" の下でライセンスされています

### フォントは Apache License, Version 2.0 の下でライセンスされています

## 機能
### 現在のフォルダ内の検索
入力したフレーズで現在のフォルダをフィルタリングします。
フォルダを切り替えても、検索フレーズはクリアされるまで有効です。

![Search-box](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_4.png?raw=true)

![Search-box-keyboard](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_4_1.png?raw=true)
### ソート
名前または日付で並べ替え、昇順/降順を切り替えることができます。

![Sorting](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_5.png?raw=true)
### フォルダビューでのドラッグ操作
トリガーを引いたまま下部のバーを使ってビューをドラッグすることで、フォルダビューの位置を変更できます。

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_6.png?raw=true)
### プレイヤービューでのドラッグ操作
トリガーを引いたまま下部のバーを使ってビューをドラッグすることで、プレイヤーと動画の天球（Video Spheres）の位置を変更できます。

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_7.png?raw=true)

もう1つのオプションとして、プレイヤーのコントロールのみを移動させることもできます。

![drag](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_8.png?raw=true)

*現在の動画の再生を終了すると、プレイヤーのコントロールと天球はデフォルトの位置にリセットされます*
### ゲームパッド操作
#### 再生操作
サムスティック: 
- 上/下: ズーム
- 左/右: 巻き戻しと早送り（10秒スキップ）

*2つのコントローラーが接続されている場合、トリガーを押すとアクティブなコントローラーが切り替わります。*

#### フォルダビュー
サムスティック: 
- 左/右: ページの切り替え

## 要件

- HTTPSを含むWebサーバーがインストールおよび設定されたLinuxサーバー（WebXRにはHTTPSが必要です）
- FFMPEGのインストール（サムネイルジェネレーターを使用する場合に必要です）

## セットアップ

### 拡張機能

[Extensions](https://github.com/michal-repo/web_vr_video_player_extensions)

## 動画ソースを含む独自の JSON ファイルの生成
プレイヤーは、ローカルに保存された動画ソースを含む JSON ファイルを使用します。

### CSV ファイルの構造

```
folder,name,src,thumbnail,screen_type,mode,frame_width,frame_height,date,duration
FOLDER_NAME,FILE NAME DISPLAYED IN UI,SOURCE URL TO VIDEO FILE,SOURCE URL TO THUMBNAIL FILE,TYPE OF SCREEN,2D or 3D,DATE TIME (format: %Y-%m-%d %H:%M:%S),DURATION (format: %s)
```

#### 画面タイプ
`"screen_type"` には以下のいずれかの値を設定できます:

`sbs` - サイドバイサイド (Side by Side)

`tb` - トップボトム 180 (Top Bottom 180)

`360` - トップボトム 360 (Top Bottom 360)

`sphere180` - 魚眼 180、非VR（単眼レンズ）

`sphere360` - 魚眼 360、非VR（単眼レンズ）

`screen` - 通常の 2D 画面

### JSON ソリューションと提供されている JavaScript スクリプトの使用

```sh
deno run -A script/makeFiles.js
```
→ files.csv / files.json

## トラブルシューティング

動画やプレイヤーを読み込めない場合は、このアプリのファイルが Web サーバーのユーザー（例: `www-data`）によって所有されていること、および Web サーバーのユーザーが動画やサムネイルファイルを読み取れること（例: `www-data` が所有者である、または「その他」の権限に読み取りが含まれていること）を確認してください。

## スクリーンショット

![Print-screen-1](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_1.png?raw=true)

![Print-screen-2](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_2.png?raw=true)

![Print-screen-3](https://github.com/michal-repo/web_vr_video_player/blob/main/examples/Screenshot_VR_player_3.png?raw=true)
