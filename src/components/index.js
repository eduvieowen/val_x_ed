import confetti from "canvas-confetti";

export { default as Navbar } from './Navbar/Navbar';
export { default as NavigationDots } from './NavigationDots';
export { default as Login } from './Login/Login';
export { default as GooglePhotos } from './GooglePhotos';

export const dispFireworks = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
};

// device maps
const iosDeviceMapping = new Map([
  // ... (device mappings)
]);

const desktopDeviceMapping = new Map([
  ["Win32", "Windows"],
  ["Linux", "Linux"],
  ["MacIntel", "Mac OS"],
]);

// get device name for android
const getAndroidDeviceName = () => {
  const androidUserAgentString = window.navigator.userAgent.slice(window.navigator.userAgent.indexOf("Android"));
  const androidDeviceName = androidUserAgentString.slice(androidUserAgentString.indexOf("; ") + 1, androidUserAgentString.indexOf(")"));
  if (androidDeviceName) {
    return androidDeviceName.trim().split(" ")[0];
  }

  return "Android";
};

// get device name for ios
const getIosDeviceName = () => {
  const screenResolution = window.screen.width + 'x' + window.screen.height;
  // or
  // const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const device = iosDeviceMapping.get(screenResolution);
  if (device) {
    return device;
  }
  return "Iphone";
};

// get device name for desktop
const getDesktopDeviceName = () => {
  const platform = navigator?.userAgentData?.platform || navigator?.platform || "unknown";
  return desktopDeviceMapping.get(platform) ?? "Unknown";
};

// get device name utility
export default function getDeviceName() {
  let device = "";

  // check if mobile device
  const isMobileDevice = window.navigator.userAgent
    .toLowerCase()
    .includes("mobi");

  if (isMobileDevice) {
    if (window.navigator.userAgent.includes("Android")) {
      device = getAndroidDeviceName();
    } else {
      device = getIosDeviceName();
    }
  } else {
    device = getDesktopDeviceName();  // potentially redundant assignment removed
  }

  return device;
}