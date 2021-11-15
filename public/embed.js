const url = "https://pavelify.com";
(function () {
  const PAVELIFY_WRAPPER_ID = "pavelify-container";
  const IFRAME_ID = "pavelify-iframe-element";
  const IFRAME_URL = `${url}/snippet/${window.chatID}`;
  const TAKEOVER_CLASSNAME = "pavelify-iframe-takeover";
  const init = () => {
    window.addEventListener(
      "message",
      (e) => {
        const data = JSON.parse(e.data);

        if (data.type === "CLOSE_IFRAME") {
          this.iframe.classList.remove("mobile");
          this.iframe.classList.remove("desktop");
        } else if (data.type === "OPEN_IFRAME") {
          handleScreenSize();
        }
      },
      false
    );
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
      // iframe.onload = () => {
      //   this.iframe.contentWindow.postMessage({}, "*");
      // };
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
      wrapper.id = PAVELIFY_WRAPPER_ID;
      wrapper.style = `z-index: ${Number.MAX_SAFE_INTEGER};  position: relative;`;
      wrapper.appendChild(this.iframe);
      document.body.appendChild(wrapper);

      this.iframe.classList.add(TAKEOVER_CLASSNAME);
      this.iframe.onload = () => {
        this.iframe.contentWindow.postMessage(
          JSON.stringify({
            type: "SCREEN_SIZE",
            value: { width: window.innerWidth, height: window.innerHeight },
          }),
          "*"
        );
        const { href, origin } = window.location;
        this.iframe.contentWindow.postMessage(
          JSON.stringify({
            type: "PAGE_VIEW",
            value: { href, origin },
          }),
          "*"
        );
      };

      window.onresize = (e) => {
        handleScreenSize();

        this.iframe.contentWindow.postMessage(
          JSON.stringify({
            type: "SCREEN_SIZE",
            value: { width: window.innerWidth, height: window.innerHeight },
          }),
          "*"
        );
      };
    } else {
    }
  };

  const handleScreenSize = () => {
    if (window.innerWidth <= 600) {
      this.iframe.classList.add("mobile");
      this.iframe.classList.remove("desktop");
    } else {
      this.iframe.classList.remove("mobile");
      this.iframe.classList.add("desktop");
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
