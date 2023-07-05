# Mirrr 

![128x128@2x](https://github.com/leon-do/mirrr/assets/19412160/08de4263-df06-4664-9adf-f670e4133bae)

I floating webcam for video demos

[Download for OSX](https://github.com/leon-do/mirrr/releases/tag/v1)

## Getting Started

## Install

```bash
npm i
```

## Dev

```bash
npm run tauri dev
```

## Build

```bash
npm run tauri build
```

## Enable Camera

`src-tauri/Info.plist`

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>NSCameraUsageDescription</key>
  <string>This app requires camera access.</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>This app requires camera access.</string>
</dict>
</plist>
```
