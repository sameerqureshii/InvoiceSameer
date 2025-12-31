import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Navbar/>
      <Hero/>
    </main>
  );
}
