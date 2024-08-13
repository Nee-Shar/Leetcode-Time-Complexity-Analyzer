function extractSortAndTrimCode() {
  console.log("Attempting to extract code.");
  const editorContainer = document.querySelector(
    "#editor > div.flex.flex-1.flex-col.overflow-hidden.pb-2 > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs-dark"
  );

  if (editorContainer) {
    console.log("Editor container found.");
    const lines = [];

    editorContainer.querySelectorAll("div").forEach((div) => {
      const top = parseFloat(div.style.top);

      if (!isNaN(top)) {
        const textContent = div.textContent || "";
        lines.push({ text: textContent, top: top });
      }
    });

    lines.sort((a, b) => a.top - b.top);

    let sortedCode = lines.map((line) => line.text).join("\n");

    const startIndex = sortedCode.indexOf("class");
    if (startIndex !== -1) {
      sortedCode = sortedCode.substring(startIndex);
    } else {
      console.log("Class Solution not found in the code.");
    }

    console.log("Trimmed Code:", sortedCode);
    // Uncomment this line if you want to save to storage
     chrome.storage.local.set({ extractedCode: sortedCode }, function () {
       console.log("Code saved to storage.");
     });
    return "";
  } else {
    console.log("Editor container not found.");
    return "";
  }
}

function waitForDOMLoad(callback) {
  console.log("Waiting for DOM to load...");
  setTimeout(() => {
    if (document.readyState === "complete") {
      callback();
    } else {
      window.addEventListener("load", callback);
    }
  }, 3000); // Increase the delay as needed
}

waitForDOMLoad(extractSortAndTrimCode);
