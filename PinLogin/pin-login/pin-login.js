class PinLogin {
  // The constructor method is a special method for creating and initializing an object created within a class.
  constructor({ el, loginEndpoint, redirectTo, maxNumbers = Infinity }) {
    this.el = {
      main: this.el,
      numPad: el.querySelector('.pin-login__numpad'),
      textDisplay: el.querySelector('.pin-login__text')
    };
    this.loginEndpoint = loginEndpoint;
    this.redirectTo = redirectTo;
    this.maxNumbers = maxNumbers;
    this.value = "";

    this._generatePad();
  }
  _generatePad() {
    // buttons number pad
    const padLayout = [
      "1", "2", "3",
      "4", "5", "6",
      "7", "8", "9",
      "backspace", "0", "done",

    ];

    padLayout.forEach(key => {
      // redex find 369 then we will insert br
      const insertBreak = key.search(/[369]/) !== -1;
      const keyEl = document.createElement('div');

      keyEl.classList.add('pin-login__key');
      // Toggle between adding and removing a class name from an element with JavaScript.
      keyEl.classList.toggle('material-icons', isNaN(key));
      keyEl.textContent = key;
      keyEl.addEventListener('click', () => {
        this._handleKeyPress(key)
      });
      this.el.numPad.appendChild(keyEl);

      if (insertBreak) {
        this.el.numPad.appendChild(document.createElement('br'));

      }

    });

  }

  _handleKeyPress(key) {
    switch (key) {
      case "backspace":
        // The substring() method returns a subset of a string between one index and another, or through the end of the string.
        this.value = this.value.substring(0, this.length - 1);
        break;
      case "done":
        this._attemptLogin();
        break;
      default:
        if (this.value.length < this.maxNumbers && !isNaN(key)) {
          this.value += key;
        }
        break;
    }
    this._updateValueText();
  }
  _updateValueText() {
    // to not see password by noone //_ will repeated such as length of value
    this.el.textDisplay.value = "_".repeat(this.value.length);
    this.el.textDisplay.classList.remove('pin-login__text--error');
  }

  _attemptLogin() {
    if (this.value.length > 0) {
      /* 
      The fetch() method of the WindowOrWorkerGlobalScope mixin starts the process of fetching a resource
       from the network, returning a promise which is fulfilled once the response is available.
        The promise resolves to the Response object representing the response to your request. 
        The promise does not reject on HTTP errors — it only rejects on network errors. 
        You must use then handlers to check for HTTP errors.
      */
      fetch(this.loginEndpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `pincode=${this.value}`
      }).then(response => {
        console.log(response.status);
        if (response.status === 200) {
          window.location.href = this.redirectTo;
        } else {
          // if pasword false animations class added
          this.el.textDisplay.classList.add('pin-login__text--error');

        }
      })

    }
  }
}






// _attemptLogin() {
//   if (this.value.length > 0) {
//       fetch(this.loginEndpoint, {
//           method: "post",
//           headers: {
//               "Content-Type": "application/x-www-form-urlencoded"
//           },
//           body: `pincode=${this.value}`
//       }).then(response => {
//           if (response.status === 200) {
//               window.location.href = this.redirectTo;
//           } else {
//               this.el.textDisplay.classList.add("pin-login__text--error");
//           }
//       })
//   }
// }
// }