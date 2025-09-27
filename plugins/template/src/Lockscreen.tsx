import { storage } from "@vendetta/plugin";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { ReactNative as RN } from "@vendetta/metro/common";

const { FormSection, FormInput, FormText, FormSwitchRow } = Forms;

export default function Lockscreen() {
  const [input, setInput] = React.useState("");

  function checkUnlock() {
    const correct = storage.lockType === "password"
      ? storage.password
      : storage.passcode;

    if (input === correct) {
      showToast("Unlocked", 1);
      storage.unlocked = true;
    } else {
      showToast("Incorrect", 2);
      setInput("");
    }
  }

  // Prevent interaction with Discord if locked
  if (!storage.unlocked && storage.enabled) {
    return (
      <RN.View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <FormText style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
          Enter {storage.lockType === "password" ? "Password" : "Passcode"}
        </FormText>

        <FormInput
          title=""
          placeholder="Enter here"
          secureTextEntry={true}
          value={input}
          onChange={setInput}
        />

        <RN.TouchableOpacity
          onPress={checkUnlock}
          style={{
            marginTop: 20,
            backgroundColor: "#5865F2",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <FormText style={{ color: "#fff" }}>Unlock</FormText>
        </RN.TouchableOpacity>
      </RN.View>
    );
  }

  return null; // unlocked, don’t render lockscreen
}
