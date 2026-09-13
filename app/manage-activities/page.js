"use client";

import { useEffect, useState } from "react";

export default function ManageActivities() {
  const [activities, setActivities] = useState([]);
  const [wordLists, setWordLists] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("WORDLE");
  const [difficulty, setDifficulty] = useState("EASY");
  const [hint, setHint] = useState("");
  const [wordListId, setWordListId] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function loadActivities() {
    const response = await fetch("/api/activities");
    const data = await response.json();
    setActivities(data);
  }

  async function loadWordLists() {
    const response = await fetch("/api/wordlists");
    const data = await response.json();

    setWordLists(data);

    if (data.length > 0 && !wordListId) {
      setWordListId(String(data[0].id));
    }
  }

  useEffect(() => {
    loadActivities();
    loadWordLists();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const body = {
      name,
      type,
      difficulty,
      hint,
      wordListId: wordListId
        ? Number(wordListId)
        : null,
    };

    const url = editingId
      ? `/api/activities/${editingId}`
      : "/api/activities";

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
        ? "Activity updated successfully."
        : "Activity created successfully."
    );

    setName("");
    setType("WORDLE");
    setDifficulty("EASY");
    setHint("");
    setEditingId(null);

    loadActivities();
  }

  function startEdit(activity) {
    setEditingId(activity.id);
    setName(activity.name);
    setType(activity.type);
    setDifficulty(activity.difficulty);
    setHint(activity.hint || "");
    setWordListId(
      activity.wordListId
        ? String(activity.wordListId)
        : ""
    );
  }

  async function deleteActivity(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/activities/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(
        data.error || "Unable to delete activity."
      );
      return;
    }

    setMessage("Activity deleted successfully.");
    loadActivities();
  }

  return (
    <div className="container-page">
      <h1 className="text-4xl font-bold">
        Manage Activities
      </h1>

      <p className="mt-4">
        Create, edit and delete saved Wordle and Word Search
        configurations.
      </p>

      <section className="mt-8">
        <h2 className="section-title">
          {editingId
            ? "Edit Activity"
            : "Add Activity"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="card mt-4"
        >
          <label className="block font-semibold">
            Activity name
          </label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
            required
          />

          <label className="block font-semibold mt-4">
            Activity type
          </label>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
          >
            <option value="WORDLE">
              Wordle
            </option>

            <option value="WORD_SEARCH">
              Word Search
            </option>
          </select>

          <label className="block font-semibold mt-4">
            Difficulty
          </label>

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
          >
            <option value="EASY">
              Easy
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HARD">
              Hard
            </option>
          </select>

          <label className="block font-semibold mt-4">
            Hint / activity guidance
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
            Word list
          </label>

          <select
            value={wordListId}
            onChange={(event) =>
              setWordListId(event.target.value)
            }
            className="border rounded-lg p-3 mt-2 w-full"
          >
            <option value="">
              No word list
            </option>

            {wordLists.map((wordList) => (
              <option
                key={wordList.id}
                value={wordList.id}
              >
                {wordList.name}
              </option>
            ))}
          </select>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="primary-button"
            >
              {editingId
                ? "Update Activity"
                : "Add Activity"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setType("WORDLE");
                  setDifficulty("EASY");
                  setHint("");
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
          Saved Activities
        </h2>

        <div className="mt-4 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="card"
            >
              <p className="text-xl font-bold">
                {activity.name}
              </p>

              <p className="mt-2">
                Type:{" "}
                <strong>{activity.type}</strong>
              </p>

              <p className="mt-2">
                Difficulty:{" "}
                <strong>{activity.difficulty}</strong>
              </p>

              <p className="mt-2">
                Hint:{" "}
                {activity.hint || "No hint"}
              </p>

              <p className="mt-2">
                Word list:{" "}
                {activity.wordList?.name ||
                  "None selected"}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    startEdit(activity)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    deleteActivity(activity.id)
                  }
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