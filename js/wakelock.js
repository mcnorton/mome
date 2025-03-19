navigator.wakeLock.request("screen");

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "visible") {
        navigator.wakeLock.request("screen");
    }
});
