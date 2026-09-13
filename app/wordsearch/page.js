"use client";

import { useEffect, useState } from "react";
import { generateWordSearchHTML } from "@/utils/htmlGenerator";

export default function WordSearch() {
  const [difficulty, setDifficulty] = useState("Easy");

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWords() {
      try {
        const response = await fetch("/api/words");

        if (!response.ok) {
          throw new Error("Unable to load words.");
        }

        const data = await response.json();

        setWords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadWords();
  }, []);

  const phonemeWords = words.map(
    (word) =>
      `/${word.phonemes
        .map((phoneme) => phoneme.symbol)
        .join("")}/`
  );

  const englishHints = words.map(
    (word) => word.english
  );

  const grid = [
    "θ", "ɪ", "n", "ʃ", "p",
    "ʃ", "ɪ", "p", "f", "ʃ",
    "f", "ɪ", "ʃ", "b", "k",
    "tʃ", "eə", "θ", "ʊ", "n",
    "b", "ʊ", "k", "ɪ", "ʃ",
  ];

  return (
    <div className="container-page">
      <h1 className="text-4xl font-bold">
        Word Search Builder
      </h1>

      <p className="mt-4">
        Create a phoneme-based Word Search classroom activity
        using words stored in the database.
      </p>

      {/* Stored Word List */}
      <section className="mt-8">
        <h2 className="section-title">
          Stored Phoneme Word List
        </h2>

        {loading && (
          <p className="mt-3">
            Loading stored words...
          </p>
        )}

        {error && (
          <p className="mt-3">
            {error}
          </p>
        )}

        {!loading && !error && words.length === 0 && (
          <p className="mt-3">
            No stored words are available.
          </p>
        )}

        {!loading && !error && words.length > 0 && (
          <div className="card mt-4">
            <ul className="list-disc ml-6">
              {words.map((word) => {
                const phonemeWord =
                  word.phonemes
                    .map((phoneme) => phoneme.symbol)
                    .join("");

                return (
                  <li key={word.id}>
                    /{phonemeWord}/ — {word.english}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {/* Difficulty */}
      <section className="mt-8">
        <h2 className="section-title">
          Difficulty
        </h2>

        <label
          htmlFor="wordsearch-difficulty"
          className="block mt-3 font-semibold"
        >
          Select difficulty
        </label>

        <select
          id="wordsearch-difficulty"
          value={difficulty}
          onChange={(event) =>
            setDifficulty(event.target.value)
          }
          className="border rounded-lg p-3 mt-2"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </section>

      {/* Preview */}
      {!loading && !error && words.length > 0 && (
        <section className="mt-8">
          <h2 className="section-title">
            Preview
          </h2>

          <p className="mt-2">
            This preview uses the stored database word list.
          </p>

          <div className="card mt-4">
            <p>
              Difficulty: <strong>{difficulty}</strong>
            </p>

            <p className="mt-4">
              {difficulty === "Easy" &&
                "Select adjacent phoneme cells in a straight line. The target phoneme words are shown below."}

              {difficulty === "Medium" &&
                "Find each phoneme word in the grid."}

              {difficulty === "Hard" &&
                "Use the English hints to find the matching phoneme words."}
            </p>

            <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto mt-6">
              {grid.map((cell, index) => (
                <div
                  key={index}
                  className="border aspect-square flex items-center justify-center font-bold rounded"
                >
                  {cell}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold">
                {difficulty === "Hard"
                  ? "English Hints"
                  : "Find these words"}
              </h3>

              <ul className="mt-3 inline-block text-left">
                {(difficulty === "Hard"
                  ? englishHints
                  : phonemeWords
                ).map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                disabled
                className="secondary-button"
              >
                Check Selection
              </button>

              <button
                type="button"
                disabled
                className="secondary-button"
              >
                Reset Game
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Generate */}
      <section className="mt-8">
        <button
          type="button"
          disabled={loading || error || words.length === 0}
          onClick={() =>
            generateWordSearchHTML({
              words: phonemeWords,
              difficulty: difficulty,
            })
          }
          className="primary-button"
        >
          Generate HTML
        </button>
      </section>
    </div>
  );
}