This repo consists basic code for finding time and space complexity of code written in leetcode
at `https://leetcode.com/problems/*` end point.

````Yes i know leetcode has this functionality but its limited like 3 ques a day , which isnt enough if you are pro
coder who solves 10+ ques a day ( not me ) . So this extension allows unlimited calls (as long as google allows it) to gemini api to find the time and space complexity of the code. ```

Its using Gemini API to analyse the written code which is fetched from leetcode using basic
DOM manipulation and then using Gemini API to find the time and space complexity of the code.

Add your own gemini api key at popup.js file to use the extension.

PS: It might not work in every case mayber refresh the page and try again.

## How to use

If you dont know how to add a web extenesion to your browser follow the below steps:

## (why dont u know this already? 🤔)

1. Clone the repo
2. Add your own gemini api key at popup.js file
3. Open your browser and go to `chrome://extensions/`
4. Enable developer mode ( which you should have done a long long time ago ).
5. Click on Load unpacked and select the cloned repo folder.
6. You should see the extension in your browser now.
7. Go to any leetcode problem page, write the code and click on the extension icon to analyse the time and space complexity of the code and see suggestions to improve it.
````
