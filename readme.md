# bondalex-ihealth-bg1

Cordova plugin for iHealth BG1
 
## Platforms

- iOS

## Overview

Plugin use official iHealth SDK for iOS.

### Configuration

*config.xml*

```
<preference name="iHealthUsername" value="username"/>
<preference name="iHealthClientID" value="clientID"/>
<preference name="iHealthClientSecret" value="clientSecret"/>
```

You can get iHealth Auth params [here](http://developer.ihealthlabs.com/index.htm)

## TD;LR

```

window.addEventListener('ihealthstatus', function (resp) {
  var data = resp.data,
    status = resp.status;
    
  switch (status) {
    case 'connect': { // BG1 is connected to smartphone
      break;
    }
    case 'verify': { // vevrification status. checking username, secret and client id
      break;
    }
    case 'plugged': {
      break;
    }
    case 'idps': { // device info
      break;
    }
    case 'ready': { // ready for measurement
      break;
    }
    case 'disconnect': { // BG1 has been disconnected
      break;
    }
    case 'sendCodeBlock': {
      break;
    }
    case 'stripIn': { // test strip has been inserted
      break;
    }
    case 'blood': { // blood has been detected on test strip
      break;
    }
    case 'result': { // receiving result of measurement
      break;
    }
    case 'stripOut': { // test strip has been removed from glucometer
      break;
    }
    case 'error': { // error received
      break;
    }
  }
});

```

## TODO

- [ ] Android