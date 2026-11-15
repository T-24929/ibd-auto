import { AboutHero } from '../components/AboutHero'
import { Stats } from '../components/Stats'
import { OurStory } from '../components/OurStory'

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <AboutHero />
      <Stats />
      <OurStory />
    </div>
  )
}
