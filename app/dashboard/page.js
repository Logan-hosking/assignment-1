"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Unable to load dashboard.");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return (
      <div className="container-page">
        <h1 className="text-4xl font-bold">
          Reporting Dashboard
        </h1>

        <div className="card mt-6 border-red-300">
          <p className="font-bold">
            Dashboard unavailable
          </p>

          <p className="mt-2">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container-page">
        <h1 className="text-4xl font-bold">
          Reporting Dashboard
        </h1>

        <p className="mt-4">
          Loading operational data...
        </p>
      </div>
    );
  }

  const averageSeconds = Math.round(
    data.averageTimeOnPage / 1000
  );

  const successRateLabel =
    data.totalGenerations > 0
      ? `${data.successRate}%`
      : "No data";

  const healthMessage =
    data.health === "ok"
      ? "All core services are responding normally."
      : "The application requires attention.";

  const hasWarnings =
    data.failedGenerations > 0 ||
    data.totalWords === 0 ||
    data.totalActivities === 0;

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Reporting Dashboard
          </h1>

          <p className="mt-3">
            Live operational statistics for the Phoneme
            Activity Builder.
          </p>
        </div>

        <div className="card">
          <p className="text-sm font-semibold">
            Current Status
          </p>

          <p className="text-xl font-bold mt-1">
            {data.health === "ok"
              ? "● Healthy"
              : "● Attention Required"}
          </p>
        </div>
      </div>

      {/* System Status */}
      <section className="mt-8">
        <h2 className="section-title">
          System Status
        </h2>

        <div className="card mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-2xl font-bold">
                {data.health === "ok"
                  ? "System Healthy"
                  : "System Requires Attention"}
              </p>

              <p className="mt-2">
                {healthMessage}
              </p>
            </div>

            <div>
              <p className="text-sm">
                Health endpoint
              </p>

              <p className="font-bold mt-1">
                /health — {data.health === "ok" ? "200 OK" : "Check required"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Summary */}
      <section className="mt-8">
        <h2 className="section-title">
          Application Summary
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="card">
            <p className="text-sm font-semibold">
              Stored Words
            </p>

            <p className="text-4xl font-bold mt-2">
              {data.totalWords}
            </p>

            <p className="text-sm mt-2">
              Phoneme words available to builders
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Word Lists
            </p>

            <p className="text-4xl font-bold mt-2">
              {data.totalWordLists}
            </p>

            <p className="text-sm mt-2">
              Stored reusable word collections
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Activity Configurations
            </p>

            <p className="text-4xl font-bold mt-2">
              {data.totalActivities}
            </p>

            <p className="text-sm mt-2">
              Saved Wordle and Word Search setups
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Generated Outputs
            </p>

            <p className="text-4xl font-bold mt-2">
              {data.totalGenerations}
            </p>

            <p className="text-sm mt-2">
              Total recorded generation attempts
            </p>
          </div>
        </div>
      </section>

      {/* Activity Usage */}
      <section className="mt-8">
        <h2 className="section-title">
          Activity Usage
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="card">
            <p className="text-sm font-semibold">
              Wordle Activities
            </p>

            <p className="text-3xl font-bold mt-2">
              {data.wordleActivities}
            </p>

            <p className="text-sm mt-2">
              Stored Wordle configurations
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Word Search Activities
            </p>

            <p className="text-3xl font-bold mt-2">
              {data.wordSearchActivities}
            </p>

            <p className="text-sm mt-2">
              Stored Word Search configurations
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Most-Used Activity
            </p>

            <p className="text-2xl font-bold mt-2">
              {data.mostUsedActivityType}
            </p>

            <p className="text-sm mt-2">
              Based on recorded generation events
            </p>
          </div>
        </div>
      </section>

      {/* Generation Performance */}
      <section className="mt-8">
        <h2 className="section-title">
          Generation Performance
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mt-4">
          <div className="card">
            <p className="text-sm font-semibold">
              Successful
            </p>

            <p className="text-3xl font-bold mt-2">
              {data.successfulGenerations}
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Failed
            </p>

            <p className="text-3xl font-bold mt-2">
              {data.failedGenerations}
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Success Rate
            </p>

            <p className="text-3xl font-bold mt-2">
              {successRateLabel}
            </p>
          </div>

          <div className="card">
            <p className="text-sm font-semibold">
              Average Time on Page
            </p>

            <p className="text-3xl font-bold mt-2">
              {averageSeconds}s
            </p>
          </div>
        </div>
      </section>

      {/* Reporting Summary */}
      <section className="mt-8">
        <h2 className="section-title">
          Reporting Summary
        </h2>

        <div className="card mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 pr-4">
                    Metric
                  </th>

                  <th className="py-3 pr-4">
                    Current Value
                  </th>

                  <th className="py-3">
                    Interpretation
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3 pr-4">
                    Total Generations
                  </td>

                  <td className="py-3 pr-4 font-semibold">
                    {data.totalGenerations}
                  </td>

                  <td className="py-3">
                    Total recorded Wordle and Word Search
                    generation attempts.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 pr-4">
                    Success Rate
                  </td>

                  <td className="py-3 pr-4 font-semibold">
                    {successRateLabel}
                  </td>

                  <td className="py-3">
                    Percentage of generation attempts completed
                    successfully.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3 pr-4">
                    Most-Used Activity
                  </td>

                  <td className="py-3 pr-4 font-semibold">
                    {data.mostUsedActivityType}
                  </td>

                  <td className="py-3">
                    Activity type with the highest recorded usage.
                  </td>
                </tr>

                <tr>
                  <td className="py-3 pr-4">
                    Average Time on Page
                  </td>

                  <td className="py-3 pr-4 font-semibold">
                    {averageSeconds} seconds
                  </td>

                  <td className="py-3">
                    Average duration calculated from stored page
                    visit records.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="mt-8">
        <h2 className="section-title">
          Operational Alerts
        </h2>

        <div className="card mt-4">
          {!hasWarnings && (
            <p className="font-semibold">
              ✓ No current operational warnings.
            </p>
          )}

          {data.failedGenerations > 0 && (
            <div className="mb-4">
              <p className="font-bold">
                ⚠ Generation failures detected
              </p>

              <p className="mt-1">
                {data.failedGenerations} failed generation
                attempt(s) have been recorded. These failures
                should be reviewed when monitoring application
                reliability.
              </p>
            </div>
          )}

          {data.totalWords === 0 && (
            <div className="mb-4">
              <p className="font-bold">
                ⚠ Empty word database
              </p>

              <p className="mt-1">
                No phoneme words are currently stored. Wordle
                and Word Search generation may not operate
                correctly.
              </p>
            </div>
          )}

          {data.totalActivities === 0 && (
            <div>
              <p className="font-bold">
                ⚠ No activity configurations
              </p>

              <p className="mt-1">
                No Wordle or Word Search configurations are
                currently stored.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}