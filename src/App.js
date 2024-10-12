import React, { useState } from "react";
import "./App.css";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./Character";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COPY_Fail, COPY_SUCCESS } from "./Message";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome

const App = () => {
  const [password, setPassword] = useState("");
  const [manualPassword, setManualPassword] = useState(""); // New state for manual password input
  const [passwordLength, setPasswordLength] = useState(15);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = () => {
    if (manualPassword) {
      // If there is a manually typed password, set it directly
      setPassword(manualPassword);
      notify("Manual password set successfully", false);
      return;
    }

    if (
      !includeUpperCase &&
      !includeLowerCase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("To generate password you must select at least one checkbox", true);
    } else {
      let characterList = "";
      if (includeNumbers) {
        characterList += numbers;
      }
      if (includeUpperCase) {
        characterList += upperCaseLetters;
      }
      if (includeLowerCase) {
        characterList += lowerCaseLetters;
      }
      if (includeSymbols) {
        characterList += specialCharacters;
      }
      // Generate a new password without clearing the manual password
      setPassword(createPassword(characterList));
      notify("Password is generated successfully", false);
    }
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-right", // Changed to top-right
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-right", // Changed to top-right
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = () => {
    if (password === "") {
      notify(COPY_Fail, true);
    } else {
      copyToClipboard(password);
      notify(COPY_SUCCESS);
    }
  };

  const handleReset = () => {
    setPassword("");
    setManualPassword(""); // Reset manual password input
    setPasswordLength(15);
    setIncludeUpperCase(false);
    setIncludeLowerCase(false);
    setIncludeNumbers(false);
    setIncludeSymbols(false);
    notify("Fields have been reset", false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">Password Generator 🔒</h2>
          <div className="generator__password">
            <h3>{password || "Generated Password is here"}</h3>
            {/* Copy icon button */}
            <i
              onClick={handleCopyPassword}
              className="fas fa-clipboard copy__icon" // Using 'fas' for solid icon
              title="Copy to clipboard"
              style={{
                cursor: "pointer",
                fontSize: "24px",
                marginLeft: "10px",
              }}
            ></i>
          </div>
          {/* New Input for Manual Password */}
          <div className="form-group">
            <label htmlFor="manual-password">Manual Password</label>
            <input
              type="text"
              id="manual-password"
              value={manualPassword}
              onChange={(e) => setManualPassword(e.target.value)}
              placeholder="Type your password here"
              className="pw"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input
              className="pw"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="26"
              min="8"
            />
          </div>

          {/* Modified Checkbox Layout */}
          <div className="form-group checkbox-row">
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="uppercase-letters"
              name="uppercase-letters"
            />
          </div>
          <div className="form-group checkbox-row">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowercase-letters"
              name="lowercase-letters"
            />
          </div>
          <div className="form-group checkbox-row">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id="include-numbers"
              name="include-numbers"
            />
          </div>
          <div className="form-group checkbox-row">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id="include-symbols"
              name="include-symbols"
            />
          </div>

          <div className="button-container">
            <button onClick={handleGeneratePassword} className="generator__btn">
              Generate Password
            </button>
            <button onClick={handleReset} className="reset__btn">
              Reset
            </button>
          </div>

          <ToastContainer
            position="top-right" // Changed to top-right
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default App;
