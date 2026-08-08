export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">About</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">
          About the Project
        </h2>

        <p className="mt-4">
          The Phoneme Activity Builder is a classroom tool designed
          for Speech Pathology educators and students.
        </p>

        <p className="mt-4">
          This first assessment focuses on frontend development,
          usability, accessibility and responsive interface design.
        </p>

        <p className="mt-4">
          The application currently allows teachers to create and
          preview phoneme-based Wordle and Word Search activities.
          Database functionality and dynamic word lists will be
          introduced in later assessments.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Activity Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold">
              Wordle
            </h3>

            <p className="mt-3">
              A phoneme-based Wordle activity that includes
              phoneme hints, difficulty settings, a preview and
              downloadable HTML output.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold">
              Word Search
            </h3>

            <p className="mt-3">
              A phoneme recognition activity using a small fixed
              word list with a preview and downloadable HTML output.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Student Information
        </h2>

        <div className="mt-4 border rounded-xl p-6">
          <p>
            <strong>Name:</strong> Logan Hosking
          </p>

          <p className="mt-2">
            <strong>Student Number:</strong> 21721784
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">
          Demonstration Video
        </h2>

        <p className="mt-3">
          This video demonstrates how to use the Phoneme Activity Builder.
        </p>

        <div className="mt-5 border rounded-xl p-6">
          <video
            controls
            className="w-full rounded-lg"
          >
            <source
              src="/video/demonstration.mp4"
              type="video/mp4"
            />

            Your browser does not support the video element.
          </video>
        </div>
      </section>
    </div>
  );
}