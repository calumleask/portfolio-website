
const mockWindow = {
    width: 1024,
    height: 768
};

export const globalWindow = (typeof window === "undefined") ? mockWindow : window;