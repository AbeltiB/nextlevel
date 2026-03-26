import { Hero } from "@/components/sections/Hero";
import { MarqueeScroll } from "@/components/sections/MarqueeScroll";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { MissionVision } from "@/components/sections/MissionVision";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeScroll variant="clients" />
      <Services />
      <Stats />
      <About />
      <MissionVision />
      <FeaturedWork />
      <MarqueeScroll variant="projects" />
      <Team />
      <Partners />
      <Contact />
    </>
  );
}
