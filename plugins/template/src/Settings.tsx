// index.js
import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
const { FormSection, FormInput, FormSwitchRow, FormText } = Forms;

export default {
  onLoad: () => {
    // Initialize default storage if missing
    if (!storage.lockType) storage.lockType = "passcode";
    if (!storage.passcode) storage.passcode = "";
    if (!storage.password) storage.password = "";
    if (storage.enabled === undefined) storage.enabled = false;
  },

  onUnload: () => {},

  settings: () => (
    <>
      <FormSection title="SecurityLock Settings">
        <FormSwitchRow
          label="Enable Lock"
          subLabel="Toggle Discord lock on startup"
          value={storage.enabled}
          onValueChange={(v) => (storage.enabled = v)}
        />

        <FormText>
          Choose whether to lock Discord with a passcode or a password.  
          You’ll be asked for it when launching Discord if lock is enabled.
        </FormText>

        <FormInput
          title="Passcode"
          placeholder="Enter numeric passcode"
          value={storage.passcode}
          onChange={(v) => (storage.passcode = v)}
        />

        <FormInput
          title="Password"
          placeholder="Enter password"
          value={storage.password}
          onChange={(v) => (storage.password = v)}
        />

        <FormText>
          Current lock type: {storage.lockType}
        </FormText>
      </FormSection>
    </>
  ),
};
