# PUBG Developers Challenge Sample Apps
This repository contains Overwolf sample apps for the PUBG developers challenge.  
The apps demonstrate the same functionality in three flavours:  
* Native (Vanilla) JS
* TypeScript
* React

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
