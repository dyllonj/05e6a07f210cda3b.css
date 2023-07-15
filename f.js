const FingerprintLoader = new EventTarget();

window.FingerprintJS = {
  lib: null,
  loader: FingerprintLoader
}

const successfulInitializationEvent = new Event("fpjs_initialization_success");
const failedInitializationEvent = new Event("fpjs_initialization_failure");

import(`${window.location.origin}/api/f-script`)
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: '/api/f-token',
    tlsEndpoint: '/api/f-tls'
  }))
  .then(FingerprintJS => { 
    window.FingerprintJS = {
      ...window.FingerprintJS,
      lib: FingerprintJS,
    }

    FingerprintLoader.dispatchEvent(successfulInitializationEvent);
  })
  .catch(err => {
    window.FingerprintJS = {
      ...window.FingerprintJS,
      lib: null,
      error: err,
    }

    FingerprintLoader.dispatchEvent(failedInitializationEvent);
  })
