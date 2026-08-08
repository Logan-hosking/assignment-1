import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Phoneme Activity Builder",
  description:
    "Wordle and Word Search builder for Speech Pathology students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b p-4 text-center">
          <h1 className="text-xl font-bold">
            Phoneme Activity Builder — Assessment 1
          </h1>
        </header>

        <Navbar />

        <main className="p-6 min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}