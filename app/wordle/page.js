"use client";

import { useEffect, useState } from "react";
import PhonemeButton from "@/components/PhonemeButton";
import { generateWordleHTML } from "@/utils/htmlGenerator";

const phonemes = [
  {
    symbol: "/θ/",
    label: "TH",
    hint: "as in thin",
  },
  {
    symbol: "/ʃ/",
    label: "SH",
    hint: "as in ship",
  },
  {
    symbol: "/tʃ/",
    label: "CH",
    hint: "as in chair",
  },
  {
    symbol: "/ɪ/",
    label: "I",
    hint: "as in sit",
  },
  {
    symbol: "/n/",
    label: "N",
    hint: "as in thin",
  },
];

export default function Wordle() {
  const [selectedPhoneme, setSelectedPhoneme] = useState("/θ/");
  const [difficulty, setDifficulty] = useState("Easy");

  const [words, setWords] = useState([]);
  const [selectedWordId, setSelectedWordId] = useState("");
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

        if (data.length > 0) {
          setSelectedWordId(String(data[0].id));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadWords();
  }, []);

  const selectedWord = words.find(
    (word) => String(word.id) === selectedWordId
  );

  const phonemeWord = selectedWord
    ? `/${selectedWord.phonemes
        .map((phoneme) => phoneme.symbol)
        .join("")}/`
    : "";

  return (
    <div className="container-page">
      <h1 className="text-4xl font-bold">
        Wordle Builder
      </h1>

      <p className="mt-4">
        Create a phoneme-based Wordle classroom activity using
        words stored in the database.
      </p>

      {/* Choose Phoneme */}
      <section className="mt-8">
        <h2 className="section-title">
          Choose a Phoneme
        </h2>

        <div className="flex flex-wrap gap-3 mt-4">
          {phonemes.map((phoneme) => (
            <PhonemeButton
              key={phoneme.symbol}
              symbol={phoneme.symbol}
              label={phoneme.label}
              hint={phoneme.hint}
              onClick={() =>
                setSelectedPhoneme(phoneme.symbol)
              }
            />
          ))}
        </div>

        <p className="mt-4">
          Selected phoneme:{" "}
          <strong>{selectedPhoneme}</strong>
        </p>
      </section>

      {/* Stored Word Selection */}
      <section className="mt-8">
        <h2 className="section-title">
          Choose a Stored Word
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
          <select
            value={selectedWordId}
            onChange={(event) =>
              setSelectedWordId(event.target.value)
            }
            className="border rounded-lg p-3 mt-3"
          >
            {words.map((word) => (
              <option
                key={word.id}
                value={word.id}
              >
                {word.english}
              </option>
            ))}
          </select>
        )}
      </section>

      {/* Selected Word */}
      {selectedWord && (
        <section className="mt-8">
          <h2 className="section-title">
            Word
          </h2>

          <div className="card mt-4">
            <p className="text-2xl font-bold">
              {phonemeWord}
            </p>

            <p className="mt-2">
              English equivalent:{" "}
              <strong>{selectedWord.english}</strong>
            </p>

            {selectedWord.hint && (
              <p className="mt-2">
                Hint:{" "}
                <strong>{selectedWord.hint}</strong>
              </p>
            )}
          </div>
        </section>
      )}

      {/* Difficulty */}
      <section className="mt-8">
        <h2 className="section-title">
          Difficulty
        </h2>

        <label
          htmlFor="difficulty"
          className="block mt-3 font-semibold"
        >
          Select difficulty
        </label>

        <select
          id="difficulty"
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
      {selectedWord && (
        <section className="mt-8">
          <h2 className="section-title">
            Preview
          </h2>

          <p className="mt-2">
            This preview uses the selected database word and
            difficulty setting.
          </p>

          <div className="card mt-4">
            <p>
              Difficulty:{" "}
              <strong>{difficulty}</strong>
            </p>

            <div className="mt-6 text-center">

              {difficulty === "Easy" && (
                <>
                  <p>
                    Enter the phoneme sequence shown below.
                    An English hint is provided.
                  </p>

                  <p className="text-3xl font-bold mt-4">
                    {phonemeWord}
                  </p>

                  <div className="card mt-4">
                    English hint:{" "}
                    <strong>
                      {selectedWord.english}
                    </strong>
                  </div>
                </>
              )}

              {difficulty === "Medium" && (
                <>
                  <p>
                    Enter the phoneme sequence shown below.
                  </p>

                  <p className="text-3xl font-bold mt-4">
                    {phonemeWord}
                  </p>
                </>
              )}

              {difficulty === "Hard" && (
                <>
                  <p>
                    Use the phoneme clue to work out the answer.
                  </p>

                  <p className="text-2xl font-bold mt-4">
                    {selectedWord.hint ||
                      "No hint available"}
                  </p>
                </>
              )}

              <div className="mt-6">
                <label
                  htmlFor="preview-answer"
                  className="block mb-2 font-semibold"
                >
                  Your answer
                </label>

                <input
                  id="preview-answer"
                  type="text"
                  disabled
                  placeholder="Enter phonemes"
                  className="border rounded-lg p-3 text-center"
                />
              </div>

              <button
                type="button"
                disabled
                className="secondary-button mt-4"
              >
                Check Answer
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Generate */}
      <section className="mt-8">
        <button
          type="button"
          disabled={!selectedWord}
          onClick={() =>
            generateWordleHTML({
              phonemeWord: phonemeWord,
              english: selectedWord?.english || "",
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