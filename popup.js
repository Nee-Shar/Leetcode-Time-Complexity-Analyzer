// Enter  your API_KEY from Gemini API
const API_KEY = "";

const GEMINI_API_KEY = API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

document.getElementById("clickme").addEventListener("click", function () {
  chrome.storage.local.get("extractedCode", async function (data) {
    const codeDisplay = document.getElementById("code");
    document.getElementById("code").classList.remove("hidden");
    if (data.extractedCode) {
      const code = data.extractedCode;

      // Construct the prompt with the extracted code
      const prompt =
        "What's the time complexity and space complexity of the following code? just write in one word in big oh tems time complexity:  O( ) and \n Space compelxity:  O( ) " +
        code;

      fetch(GEMINI_API_URL, {
        method: "POST",
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          codeDisplay.innerText =
            result["candidates"][0]["content"]["parts"][0]["text"];
        });
      // }
    } else {
      codeDisplay.textContent = "No code extracted.";
    }
  });
});

document.getElementById("clickme2").addEventListener("click", function () {
  chrome.storage.local.get("extractedCode", async function (data) {
    const codeDisplay = document.getElementById("sugg");
    document.getElementById("sugg").classList.remove("hidden");
    if (data.extractedCode) {
      const code = data.extractedCode;

      const prompt =
        "Suggest some changes ( at max 50 words ) to improve time complexity and / or space complexity of the following code (dont write any markdown code , maybe suggest pseudo code if reqd)" +
        code;

      fetch(GEMINI_API_URL, {
        method: "POST",
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          codeDisplay.innerText =
            result["candidates"][0]["content"]["parts"][0]["text"];
          // Remove the extracted code from chrome.storage.local
          chrome.storage.local.remove("extractedCode", function () {
            console.log("Code removed from storage.");
          });
        });
      // }
    } else {
      codeDisplay.textContent = "No code extracted.";
    }
  });
});
