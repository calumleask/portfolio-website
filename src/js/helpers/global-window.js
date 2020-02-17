
const mockMediaQueryList = {
    matches: true,
    addListener: () => {},
    removeListener: () => {}
};

export let globalWindow = null;

if (typeof window === "undefined") {
    globalWindow = {
        matchMedia: () => { return mockMediaQueryList; },
        addEventListener: () => {},
        removeEventListener: () => {},
        width: 1024,
        height: 768
    };
}
else {
    globalWindow = window;
}