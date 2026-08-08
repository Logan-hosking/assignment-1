export function generateWordleHTML({
  phonemeWord,
  english,
  difficulty,
}) {
  const answer = "θɪn";

  // Change the instructions depending on difficulty.
  const instruction =
    difficulty === "Easy"
      ? "Enter the phoneme sequence shown below. An English hint is provided."
      : difficulty === "Medium"
      ? "Enter the phoneme sequence shown below."
      : "Use the phoneme clue to work out the answer.";

  // Hard mode hides the complete phoneme word.
  const clue =
    difficulty === "Hard"
      ? "TH as in thin"
      : phonemeWord;

  // Only Easy mode shows the English hint before answering.
  const showEnglishHint =
    difficulty === "Easy";

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Phoneme Wordle</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 700px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
      background: #f8fafc;
      color: #111827;
    }

    .game {
      background: white;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #d1d5db;
      margin-top: 30px;
    }

    .phoneme {
      font-size: 2rem;
      font-weight: bold;
      margin: 25px 0;
    }

    .hint {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 12px;
      margin: 20px auto;
      max-width: 350px;
    }

    input {
      padding: 12px;
      font-size: 1.2rem;
      width: 220px;
      max-width: 90%;
      text-align: center;
      border: 2px solid #6b7280;
      border-radius: 8px;
    }

    button {
      padding: 12px 20px;
      margin: 10px 5px;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid #374151;
      background: white;
      color: #111827;
    }

    button:hover {
      background: #f3f4f6;
    }

    button:focus-visible,
    input:focus-visible {
      outline: 3px solid #2563eb;
      outline-offset: 3px;
    }

    #feedback {
      font-size: 1.2rem;
      font-weight: bold;
      margin-top: 20px;
      min-height: 30px;
    }

    #english-answer {
      display: none;
      margin-top: 15px;
      font-size: 1.2rem;
    }

    @media (max-width: 500px) {
      body {
        padding: 20px 10px;
      }

      .game {
        padding: 20px 15px;
      }
    }
  </style>
</head>

<body>

  <h1>Phoneme Wordle</h1>

  <p>
    Difficulty:
    <strong>${difficulty}</strong>
  </p>

  <div class="game">

    <p>
      ${instruction}
    </p>

    <div class="phoneme">
      ${clue}
    </div>

    ${
      showEnglishHint
        ? `
          <div class="hint">
            English hint:
            <strong>${english}</strong>
          </div>
        `
        : ""
    }

    <label for="guess">
      Your answer:
    </label>

    <br /><br />

    <input
      id="guess"
      type="text"
      placeholder="Enter phonemes"
      autocomplete="off"
      aria-describedby="feedback"
    />

    <br />

    <button onclick="checkAnswer()">
      Check Answer
    </button>

    <button onclick="resetGame()">
      Reset
    </button>

    <p
      id="feedback"
      aria-live="polite"
    ></p>

    <p id="english-answer">
      English equivalent:
      <strong>${english}</strong>
    </p>

  </div>

  <script>
    const correctAnswer = "${answer}";

    function checkAnswer() {
      const input = document
        .getElementById("guess")
        .value
        .trim();

      const feedback =
        document.getElementById("feedback");

      const englishAnswer =
        document.getElementById("english-answer");

      if (input === "") {
        feedback.textContent =
          "Enter an answer first.";

        englishAnswer.style.display =
          "none";

        return;
      }

      if (input === correctAnswer) {
        feedback.textContent =
          "Correct!";

        englishAnswer.style.display =
          "block";
      } else {
        feedback.textContent =
          "Not quite. Try again.";

        englishAnswer.style.display =
          "none";
      }
    }

    function resetGame() {
      document.getElementById("guess").value = "";

      document.getElementById("feedback").textContent = "";

      document.getElementById("english-answer").style.display =
        "none";

      document.getElementById("guess").focus();
    }

    document
      .getElementById("guess")
      .addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          checkAnswer();
        }
      });
  </script>

</body>
</html>
`;

  const blob = new Blob(
    [html],
    {
      type: "text/html",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "phoneme-wordle.html";

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}
export function generateWordSearchHTML({
  words,
  difficulty,
}) {
  const grid = [
    ["θ", "ɪ", "n", "ʃ", "p"],
    ["ʃ", "ɪ", "p", "f", "ʃ"],
    ["f", "ɪ", "ʃ", "b", "k"],
    ["tʃ", "eə", "θ", "ʊ", "n"],
    ["b", "ʊ", "k", "ɪ", "ʃ"],
  ];

  // Difficulty changes the hints shown to the student.
  const wordHints =
    difficulty === "Hard"
      ? ["thin", "ship", "chair", "fish", "book"]
      : words;

  const instruction =
    difficulty === "Easy"
      ? "Select adjacent phoneme cells in a straight line. The target phoneme words are shown below."
      : difficulty === "Medium"
      ? "Find each phoneme word in the grid."
      : "Use the English hints to find the matching phoneme words.";

  const gridHTML = grid
    .map(
      (row, rowIndex) => `
        <div class="row">
          ${row
            .map(
              (cell, cellIndex) => `
                <button
                  class="cell"
                  data-row="${rowIndex}"
                  data-cell="${cellIndex}"
                  onclick="toggleCell(this)"
                  aria-label="Phoneme ${cell}"
                >
                  ${cell}
                </button>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");

  const wordListHTML = wordHints
    .map((word) => `<li>${word}</li>`)
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Phoneme Word Search</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      text-align: center;
      background: #f8fafc;
      color: #111827;
    }

    .game {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 30px;
      margin-top: 30px;
    }

    .grid {
      display: inline-block;
      margin: 25px 0;
    }

    .row {
      display: flex;
    }

    .cell {
      width: 64px;
      height: 64px;
      border: 1px solid #374151;
      background: white;
      color: #111827;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.2rem;
      font-weight: bold;

      cursor: pointer;
    }

    .cell:hover,
    .cell:focus {
      background: #e5e7eb;
    }

    .cell.selected {
      background: #2563eb;
      color: white;
    }

    .cell.found {
      background: #16a34a;
      color: white;
    }

    ul {
      display: inline-block;
      text-align: left;
    }

    .controls {
      margin-top: 20px;
    }

    .controls button {
      padding: 10px 18px;
      margin: 5px;
      cursor: pointer;
      border: 1px solid #374151;
      border-radius: 8px;
      background: white;
    }

    #message {
      min-height: 24px;
      font-weight: bold;
      margin-top: 15px;
    }

    @media (max-width: 500px) {
      .cell {
        width: 50px;
        height: 50px;
        font-size: 1rem;
      }

      .game {
        padding: 15px;
      }

      body {
        padding: 20px 10px;
      }
    }
  </style>
</head>

<body>

  <h1>Phoneme Word Search</h1>

  <p>
    Difficulty:
    <strong>${difficulty}</strong>
  </p>

  <div class="game">

    <p>
      ${instruction}
    </p>

    <div class="grid">
      ${gridHTML}
    </div>

    <h2>
      ${difficulty === "Hard" ? "English Hints" : "Find these words"}
    </h2>

    <ul>
      ${wordListHTML}
    </ul>

    <div class="controls">

      <button onclick="checkSelection()">
        Check Selection
      </button>

      <button onclick="clearSelection()">
        Clear Selection
      </button>

      <button onclick="resetGrid()">
        Reset Game
      </button>

    </div>

    <p
      id="message"
      aria-live="polite"
    ></p>

  </div>


  <script>

    const validWords = [
      "θɪn",
      "ʃɪp",
      "tʃeə",
      "fɪʃ",
      "bʊk"
    ];


    function toggleCell(cell) {

      if (!cell.classList.contains("found")) {
        cell.classList.toggle("selected");
      }

    }


    function clearSelection() {

      document
        .querySelectorAll(".cell.selected")
        .forEach((cell) => {
          cell.classList.remove("selected");
        });

      document.getElementById("message").textContent = "";

    }


    function resetGrid() {

      document
        .querySelectorAll(".cell")
        .forEach((cell) => {

          cell.classList.remove("selected");
          cell.classList.remove("found");

        });

      document.getElementById("message").textContent = "";

    }


    function checkSelection() {

      const selectedCells = Array.from(
        document.querySelectorAll(".cell.selected")
      );

      const message =
        document.getElementById("message");


      if (selectedCells.length === 0) {

        message.textContent =
          "Select some phoneme cells first.";

        return;

      }


      const positions = selectedCells.map((cell) => ({
        row: Number(cell.dataset.row),
        col: Number(cell.dataset.cell),
        value: cell.textContent.trim(),
        element: cell,
      }));


      positions.sort((a, b) => {

        if (a.row === b.row) {
          return a.col - b.col;
        }

        return a.row - b.row;

      });


      if (positions.length > 1) {

        const rowStep =
          positions[1].row - positions[0].row;

        const colStep =
          positions[1].col - positions[0].col;


        const validStep =
          Math.abs(rowStep) <= 1 &&
          Math.abs(colStep) <= 1 &&
          !(rowStep === 0 && colStep === 0);


        let straightLine = validStep;


        for (let i = 1; i < positions.length; i++) {

          const previous = positions[i - 1];
          const current = positions[i];


          if (
            current.row - previous.row !== rowStep ||
            current.col - previous.col !== colStep
          ) {

            straightLine = false;
            break;

          }

        }


        if (!straightLine) {

          message.textContent =
            "Select adjacent cells in a straight line.";

          selectedCells.forEach((cell) => {
            cell.classList.remove("selected");
          });

          return;

        }

      }


      const selectedWord = positions
        .map((item) => item.value)
        .join("");


      const reversedWord = positions
        .map((item) => item.value)
        .reverse()
        .join("");


      const matchedWord =
        validWords.includes(selectedWord)
          ? selectedWord
          : validWords.includes(reversedWord)
          ? reversedWord
          : null;


      if (matchedWord) {

        message.textContent =
          "Correct! You found /" +
          matchedWord +
          "/";


        selectedCells.forEach((cell) => {

          cell.classList.remove("selected");
          cell.classList.add("found");

        });

      } else {

        message.textContent =
          "That line is not one of the target words. Try again.";


        selectedCells.forEach((cell) => {
          cell.classList.remove("selected");
        });

      }

    }

  </script>

</body>
</html>
`;

  const blob = new Blob(
    [html],
    {
      type: "text/html",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "phoneme-wordsearch.html";

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}