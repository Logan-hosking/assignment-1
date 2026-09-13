"use client";

import { useEffect, useState } from "react";

export default function ManageWords() {
  const [words, setWords] = useState([]);
  const [english, setEnglish] = useState("");
  const [hint, setHint] = useState("");
  const [phonemes, setPhonemes] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadWords() {
    const response = await fetch("/api/words");
    const data = await response.json();
    setWords(data);
  }

  useEffect(() => {
    loadWords();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const phonemeArray = phonemes
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const body = {
      english,
      hint,
      wordListId: 1,
      phonemes: phonemeArray,
    };

    const url = editingId
      ? `/api/words/${editingId}`
      : "/api/words";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Something went wrong.");
      return;
    }

    setMessage(
      editingId
        ? "Word updated successfully."
        : "Word created successfully."
    );

    setEnglish("");
    setHint("");
    setPhonemes("");
    setEditingId(null);

    loadWords();
  }

  function startEdit(word) {
    setEditingId(word.id);
    setEnglish(word.english);
    setHint(word.hint || "");
    setPhonemes(
      word.phonemes
        .map((phoneme) => phoneme.symbol)
        .join(", ")
    );
  }

  async function deleteWord(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this word?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/words/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Unable to delete word.");
      return;
    }

    setMessage("Word deleted successfully.");
    loadWords();
  }

  return (
    <div className="container-page">
      <h1 className="text-4xl font-bold">
        Manage Words
      </h1>

      <p className="mt-4">
        Create, edit and delete phoneme words stored in the database.
      </p>

      <section className="mt-8">
        <h2 className="section-title">
          {editingId ? "Edit Word" : "Add Word"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="card mt-4"
        >
          <label className="block font-semibold">
            English word
          </label>

          <input
            type="text"
            value={english}
            onChange={(event) =>
              setEnglish(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
            required
          />

          <label className="block font-semibold mt-4">
            Hint
          </label>

          <input
            type="text"
            value={hint}
            onChange={(event) =>
              setHint(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
          />

          <label className="block font-semibold mt-4">
            Phonemes
          </label>

          <input
            type="text"
            value={phonemes}
            onChange={(event) =>
              setPhonemes(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
            placeholder="Example: θ, ɪ, n"
            required
          />

          <p className="mt-2 text-sm">
            Separate each phoneme with a comma. Multi-character
            phonemes such as tʃ and eə are supported.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="primary-button"
            >
              {editingId ? "Update Word" : "Add Word"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setEditingId(null);
                  setEnglish("");
                  setHint("");
                  setPhonemes("");
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {message && (
            <p className="mt-4">
              {message}
            </p>
          )}
        </form>
      </section>

      <section className="mt-10">
        <h2 className="section-title">
          Stored Words
        </h2>

        <div className="mt-4 space-y-4">
          {words.map((word) => (
            <div
              key={word.id}
              className="card"
            >
              <p className="text-xl font-bold">
                {word.english}
              </p>

              <p className="mt-2">
                Phonemes: /
                {word.phonemes
                  .map((phoneme) => phoneme.symbol)
                  .join("")}
                /
              </p>

              <p className="mt-2">
                Hint: {word.hint || "No hint"}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => startEdit(word)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => deleteWord(word.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}