import { writable } from "svelte/store";

export const mode = writable("light");

function validMode(mode) {
    return (mode = mode === "light" || mode === "dark" ? true : false);
}

function getDarkMode() {
    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
}

function getPersistedMode() {
    return localStorage.getItem("mode");
}

export function toggleMode() {
    mode.update(currentMode => {
        currentMode = currentMode == "light" ? "dark" : "light";
        localStorage.setItem("mode", currentMode);
        document.querySelector("html").dataset.mode = currentMode;
        return currentMode;
    });
}

export function setMode() {
    const persistedMode = getPersistedMode();
    const darkMode = getDarkMode();
    let newMode;
    
    if (validMode(persistedMode)) {
        newMode = persistedMode;
    } else {
        newMode = darkMode ? "dark" : "light";
    }
    mode.set(newMode);
    document.querySelector("html").dataset.mode = newMode;
}