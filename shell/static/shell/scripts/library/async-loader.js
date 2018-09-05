const urlList = new Set();
let loadJSPromise = Promise.resolve();
let loadCSSPromise = Promise.resolve();
export function loadJS(src, crossOrigin = false, integrity = "") {
    if (urlList.has(src)) {
        return loadJSPromise;
    }
    loadJSPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.onload = event => resolve(event);
        script.onerror = event => reject(event);
        script.async = true;
        if (typeof crossOrigin === "string") {
            script.crossOrigin = crossOrigin;
        }
        else if (crossOrigin) {
            script.crossOrigin = "anonymous";
        }
        script.integrity = integrity;
        script.src = src;
        document.head.appendChild(script);
        urlList.add(src);
    });
    return loadJSPromise;
}
export function loadCSS(src, crossOrigin = false, integrity = "", media = "screen") {
    if (urlList.has(src)) {
        return loadCSSPromise;
    }
    loadCSSPromise = new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.addEventListener("load", event => resolve(event));
        link.addEventListener("error", event => reject(event));
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("media", media);
        if (typeof crossOrigin === "string") {
            link.crossOrigin = crossOrigin;
        }
        else if (crossOrigin) {
            link.crossOrigin = "anonymous";
        }
        link.integrity = integrity;
        link.setAttribute("href", src);
        document.head.appendChild(link);
        urlList.add(src);
    });
    return loadCSSPromise;
}
//# sourceMappingURL=async-loader.js.map