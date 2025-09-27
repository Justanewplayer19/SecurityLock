import { logger } from "@vendetta";
import Settings from "./Settings";
import { storage } from "@vendetta/plugin";
import { showToast } from "@vendetta/ui/toasts";
import { ReactNative } from "@vendetta/metro/common";
import Lockscreen from "./Lockscreen";

let unsub: any = null;

export default {
    onLoad: () => {
        logger.log("[SecurityLock] Loaded");

        // Default storage setup
        if (!storage.passcode) storage.passcode = "";
        if (!storage.password) storage.password = "";
        if (storage.enabled === undefined) storage.enabled = false;

        // If lock is enabled, show lockscreen modal at startup
        if (storage.enabled) {
            unsub = ReactNative.DeviceEventEmitter.addListener(
                "onAppReady", // waits until app is ready
                () => {
                    Lockscreen(); // render fullscreen lockscreen
                    showToast("SecurityLock active", 1);
                }
            );
        }
    },

    onUnload: () => {
        logger.log("[SecurityLock] Unloaded");
        if (unsub) unsub.remove();
    },

    settings: Settings,
};
