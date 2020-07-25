
const mockWindow = {
    width: 1024,
    height: 768,
    innerWidth: 1024,
    innerHeight: 768,
    addEventListener: (): void => { return; },
    removeEventListener: (): void => { return; } 
};

export const globalWindow = (typeof window === "undefined") ? mockWindow : window;
