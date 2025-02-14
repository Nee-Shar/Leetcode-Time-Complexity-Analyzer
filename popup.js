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
        "You are a coding expert with vast knowldege of all data structures and algoritms, What's the time complexity and space complexity of the following code? just write in one word in big oh tems time complexity:  O( ) and \n Space compelxity:  O( ) " +
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
      const question = chrome.storage.local.get("question");

      const prompt =
        "Suggest some changes to improve time complexity and / or space complexity of the following code (dont write any markdown code , maybe suggest pseudo code if reqd), start with some basic hints so if some user may get it , he may not need to see the code as your response continue give more hints/sugggestions and eventually give the best approach." +
        code +
        "This is the original question: " +
        question;

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

document.getElementById("clickme3").addEventListener("click", function () {
  chrome.storage.local.get("question", async function (data) {
    const codeDisplay = document.getElementById("test");
    const format = chrome.storage.local.get("testcasesFormat");
    document.getElementById("test").classList.remove("hidden");
    if (data.question) {
      const code = data.question;

      const prompt =
        "You're an online coding judge , Suggest 10  very very strong test cases, relevant , which normal people will not consider and will lead to wrong ans, tle or runtime errors, and important considering all edge cases for the following question description , keep in mind the constaints and sample examples i am providing to generate good quality of test cases to cover all aspects. Dont give expected output just testcases which can be copied and write in form of how leetcode write its testcases in form of source. I am providing the format to which testcases need to be written follow that at all costs. just give testcases no other explanation/text required" +
        code +
        "Test cases format to be followed at all costs: just give testcases no other explanation/text required (dont use markdown) \n" +
        format;

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
      codeDisplay.textContent = "No question extracted.";
    }
  });
});
