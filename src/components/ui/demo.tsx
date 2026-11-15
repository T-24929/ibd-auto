import { FeatureSteps } from "@/components/blocks/feature-section"

const features = [
  {
    step: "Step 1",
    title: "Learn the Basics",
    content: "Start your Web3 journey by learning the fundamentals of decentralized systems and cryptography.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "Step 2",
    title: "Deep Dive",
    content: "Dive deep into smart contract architecture, verifiable consensus, and distributed execution.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    step: "Step 3",
    title: "Build Projects",
    content: "Graduate with production-ready hands-on experience through deploying full-stack decentralized applications.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
]

export function FeatureStepsDemo() {
  return (
    <FeatureSteps
      features={features}
      title="Your Journey Starts Here"
      autoPlayInterval={4000}
      imageHeight="h-[450px]"
    />
  )
}

export default FeatureStepsDemo
