import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold">
          Phoneme Activity Builder
        </h1>

        <p className="mt-6 text-lg max-w-2xl mx-auto">
          A classroom tool designed for Speech Pathology educators
          to create phoneme-based Wordle and Word Search activities.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/wordle"
            className="border rounded-lg px-6 py-3 font-semibold"
          >
            Create Wordle
          </Link>

          <Link
            href="/wordsearch"
            className="border rounded-lg px-6 py-3 font-semibold"
          >
            Create Word Search
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">
            Phoneme Wordle
          </h2>

          <p className="mt-3">
            Create a Wordle-style activity using phoneme symbols,
            hints, difficulty settings and a downloadable HTML game.
          </p>

          <Link
            href="/wordle"
            className="inline-block mt-5 underline font-semibold"
          >
            Open Wordle Builder
          </Link>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-bold">
            Phoneme Word Search
          </h2>

          <p className="mt-3">
            Create a phoneme recognition activity using a fixed
            classroom word list and downloadable word-search page.
          </p>

          <Link
            href="/wordsearch"
            className="inline-block mt-5 underline font-semibold"
          >
            Open Word Search Builder
          </Link>
        </div>
      </section>

      <section className="mt-12 border rounded-xl p-6">
        <h2 className="text-2xl font-bold">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="font-bold">1. Choose</h3>
            <p className="mt-2">
              Select Wordle or Word Search.
            </p>
          </div>

          <div>
            <h3 className="font-bold">2. Preview</h3>
            <p className="mt-2">
              Configure the activity and review the result.
            </p>
          </div>

          <div>
            <h3 className="font-bold">3. Generate</h3>
            <p className="mt-2">
              Download a standalone HTML classroom activity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}