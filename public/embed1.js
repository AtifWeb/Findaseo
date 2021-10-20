!(function () {
  // console.log(document.title);
  const e = "weasl-iframe-element",
    t = `${"http://vcap.me:3000"}/snippet/${window.chatID}`,
    i = () => {
      if (!document.getElementById(e)) {
        const i = document.createElement("iframe");
        (i.onload = () => {
          this.iframe.contentWindow.postMessage({}, "*");
        }),
          (i.src = t),
          (i.id = e),
          (i.crossorigin = "anonymous"),
          (this.iframe = i);
      }
    },
    n = () => {
      if (!document.getElementById(e)) {
        window.addEventListener("message", o, !1);
        const e = document.createElement("div");
        (e.id = "weasl-container"),
          (e.style = `z-index: ${Number.MAX_SAFE_INTEGER}; width: 0; height: 0; position: relative;`),
          e.appendChild(this.iframe),
          document.body.appendChild(e),
          this.iframe.classList.add("weasl-iframe-takeover");
      }
    },
    o = (e) => {
      if (e && e.data && e.data.type)
        switch (e.data.type) {
          case "IFRAME_LOAD_DONE":
            this.handleWidgetLoaded();
        }
    };
  (() => {
    i(), n();
    var e = document.createElement("link");
    (e.rel = "stylesheet"),
      (e.type = "text/css"),
      (e.href = `${"http://vcap.me:3000"}/embed.css`),
      document.getElementsByTagName("HEAD")[0].appendChild(e);
  })();
})();
