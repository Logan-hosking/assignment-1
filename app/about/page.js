export default function About() {
  return (
    <div className="container-page">
      <h1 className="text-4xl font-bold">
        About
      </h1>

      <section className="mt-8">
        <h2 className="section-title">
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
        <h2 className="section-title">
          Activity Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <div className="card">
            <h3 className="text-xl font-bold">
              Wordle
            </h3>

            <p className="mt-3">
              A phoneme-based Wordle activity that includes
              phoneme hints, difficulty settings, a preview and
              downloadable HTML output.
            </p>
          </div>

          <div className="card">
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
        <h2 className="section-title">
          Accessibility and Design Decisions
        </h2>

        <div className="card mt-4">
          <p>
            Accessibility and usability were considered throughout
            the frontend design of the application.
          </p>

          <ul className="list-disc ml-6 mt-4 space-y-2">
            <li>
              Clear headings and labels are used to make each page
              easier to understand and navigate.
            </li>

            <li>
              Interactive controls can be reached using keyboard
              navigation and include visible focus indicators.
            </li>

            <li>
              Phoneme buttons provide explanatory hints to help users
              understand the relationship between phoneme symbols and
              familiar English sounds.
            </li>

            <li>
              Responsive layouts are used so the interface remains
              usable on desktop and smaller screens.
            </li>

            <li>
              Light and dark theme options allow users to customise
              the visual appearance of the interface.
            </li>

            <li>
              Activity previews allow teachers to review settings
              before generating the final standalone HTML activity.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="section-title">
          Student Information
        </h2>

        <div className="card mt-4">
          <p>
            <strong>Name:</strong> Logan Hosking
          </p>

          <p className="mt-2">
            <strong>Student Number:</strong> 21721784
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="section-title">
          Demonstration Video
        </h2>

        <p className="mt-3">
          This video demonstrates how to use the Phoneme Activity Builder.
        </p>

        <div className="card mt-5">
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