import Navbar from "~/app/_components/home/Navbar";
import HeroSection from "~/app/_components/home/HeroSection";
import PropuestaSection from "~/app/_components/home/PropuestaSection";
import TiendaSection from "~/app/_components/home/TiendaSection";
import CursosSection from "~/app/_components/home/CursosSection";
import ServiciosSection from "~/app/_components/home/ServiciosSection";
import TestimoniosSection from "~/app/_components/home/TestimoniosSection";
import SobreMiSection from "~/app/_components/home/SobreMiSection";
import NewsletterSection from "~/app/_components/home/NewsletterSection";
import Footer from "~/app/_components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PropuestaSection />
        <TiendaSection />
        <CursosSection />
        <ServiciosSection />
        <TestimoniosSection />
        <SobreMiSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
