### Interface for control LEGO® POWERED UP models ###

Poweredup-js is an interface for browsers that support [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) 
With this application you can control your Lego models based on
LEGO® POWERED UP, such as [60197](https://www.bricklink.com/v2/catalog/catalogitem.page?S=60197-1#T=I) or 
[76112](https://www.bricklink.com/v2/catalog/catalogitem.page?S=76112-1#T=I).

### Modes ###
Two control modes are now available, manual and programmable.
* In manual mode, you can control ports using the buttons or the slider. 
* In programmable mode, you can create loop of signals for the device ports.

### About code ###
* The application is based on [vue-cli](https://cli.vuejs.org/). 
* To work with Web Bluetooth used [noble](https://github.com/noble/noble).

### How to use ###
Do not forget to check that the browser is allowed to use Web Bluetooth API, for example for chrome:
```
chrome://flags/#enable-experimental-web-platform-features
```

You can use [demo](https://xpunsterx.github.io/poweredup-js-demo/) or local server.

To run on a local server:
```
npm install
```
```
npm run serve
```
