const url = "http://vcap.me:3000";
(function () {
  const WEASL_WRAPPER_ID = "weasl-container";
  const IFRAME_ID = "weasl-iframe-element";
  const IFRAME_URL = `${url}/snippet/${window.chatID}`;
  const TAKEOVER_CLASSNAME = "weasl-iframe-takeover";
  const init = () => {
    initializeIframe();
    mountIframe();
    // Create new link Element
    var link = document.createElement("link");

    // set the attributes for link element
    link.rel = "stylesheet";

    link.type = "text/css";

    link.href = `${url}/embed.css`;

    // Get HTML head element to append
    // link element to it
    document.getElementsByTagName("HEAD")[0].appendChild(link);
  };

  const initializeIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      const iframe = document.createElement("iframe");
      iframe.onload = () => {
        this.iframe.contentWindow.postMessage({}, "*");
      };
      iframe.src = IFRAME_URL;
      iframe.id = IFRAME_ID;
      iframe.crossorigin = "anonymous";
      this.iframe = iframe;
    }
  };

  const mountIframe = () => {
    if (!document.getElementById(IFRAME_ID)) {
      window.addEventListener("message", receiveMessage, false);
      const wrapper = document.createElement("div");
      wrapper.id = WEASL_WRAPPER_ID;
      wrapper.style = `z-index: ${Number.MAX_SAFE_INTEGER}; width: 0; height: 0; position: relative;`;
      wrapper.appendChild(this.iframe);
      document.body.appendChild(wrapper);
      this.iframe.classList.add(TAKEOVER_CLASSNAME);
    } else {
    }
  };
  const receiveMessage = (event) => {
    // this is where we handle when our widget sends us a message
    if (!!event && !!event.data && !!event.data.type) {
      switch (event.data.type) {
        case "IFRAME_LOAD_DONE":
          this.handleWidgetLoaded();
          break;
      }
    }
  };

  init();
})();
