# Roguelite Phaser
[![Netlify Status](https://api.netlify.com/api/v1/badges/f7691c8b-a59f-457c-9f0f-fae3b28e8e89/deploy-status)](https://app.netlify.com/sites/roguelite-phaser/deploys)

[Live demo](https://roguelite-phaser.netlify.com/)

## How To Use
```bash
# Install dependencies
$ yarn

# Start the local development server (on port 4000)
$ yarn start

# Build the production ready code to the /dist folder
$ yarn build
```

You can also run the game in whatever device you have wirelessly by using your ip instead of localhost, for instance **192.168.1.245:4000**. 

It works with live reload as well.


## Building to native platforms

### Desktop 💻
```bash
# If you don't have electron in the project yet
$ yarn platform:desktop

# Skip right into this if you already have electron in the project
$ yarn desktop
```

### iOS 📱
```bash
# If you don't have ios in the project yet
$ yarn platform:ios

# Skip right into this if you already have ios in the project
$ yarn ios
```

## Music is too annoying?
Right click on the tab -> Mute site

<img src="README/mute-audio.png">