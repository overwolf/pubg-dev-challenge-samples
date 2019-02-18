# PUBG Developers Challenge Sample Apps
This repository contains Overwolf sample apps for the PUBG developers challenge.  
The apps demonstrate the same functionality in three flavours:  
* Native (Vanilla) JS
* TypeScript
* React

The apps demonstrate some basic points and flows that are relevant when developing Overwolf apps:  
* The app will show up automatically when you launch PUBG ([manifest settings](http://developers.overwolf.com/documentation/sdk/overwolf/manifest-json/#game_events))
* Register to Game Events Provider (GEP) in order to receive real time events from the game ([documentation](http://developers.overwolf.com/documentation/sdk/overwolf/games/events/))
* Define a toggle (show/hide) hotkey ([manifest settings](http://developers.overwolf.com/documentation/sdk/overwolf/manifest-json/#hotkeys)) and a [custom hotkey](http://developers.overwolf.com/documentation/sdk/overwolf/settings/#registerhotkey) 
* Detect the launch source of the app (auto-launch from game start or manual)
* Communication between ([windows best practices](http://developers.overwolf.com/documentation/sdk/overwolf/windows/#page-intro))

For more details check out [Overwolf API documentation](http://developers.overwolf.com/documentation/sdk/overwolf/) and [PUBG Game Events documentation](http://developers.overwolf.com/documentation/sdk/overwolf/games/events/pubg/)
 ## How to load the apps
 ### Vanilla app
 Under Overwolf's settings, choose `Support` tab and then `Development options`. 
 Click the `Load unpacked` button and choose the `ow-native-sample` folder of this repository.
 
 ### TypeScript
 Open a terminal in the `ow-typescript-sample` folder and run:  
 ```
 npm install
 ```
 If you haven't done so already, install the gulp-cli:
 ```
npm install -g gulp-cli
```  
Now run 
```
gulp
```
It should create a `dist` folder with the app files.  
Under Overwolf's settings, choose `Support` tab and then `Development options`. 
Click the `Load unpacked` button and choose the `dist` folder.

 ### React app
 Open a terminal in the `ow-react-sample` folder and run:
 ```
 npm install
 ```
 Now run
 ```
 npm run build
 ```
 Under Overwolf's settings, choose `Support` tab and then `Development options`. 
 Click the `Load unpacked` button and choose the `ow-react-sample` folder of this repository.
 
 ## Notes
 * Editing the author or app name in the manifest will prevent loading the app  
 as unpacked app
* For any further information or questions, contact [developers@overwolf.com](mailto:>developers@overwolf.com)