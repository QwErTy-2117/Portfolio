export interface Project {
  slug: string
  title: string
  tag: string
  year: string
  description: string
  images: string[]
}

export const projects: Project[] = [
  {
    slug: "kitchen-unit",
    title: "Kitchen Unit",
    tag: "Conceptual 3D Design",
    year: "2026",
    description: "**A kitchen pared down to its essentials**: one oak block, soft edges, a flush sink and faucet set into the top. No exposed hardware, nothing decorative.\n\nA concept exploring **how much can be removed from a familiar form**.",
    images: [
      "/images/kitchen-unit/5.jpeg",
      "/images/kitchen-unit/3.jpeg",
      "/images/kitchen-unit/6.jpeg",
    ],
  },
  {
    slug: "automated-ai-newsletter",
    title: "Automated AI Newsletter",
    tag: "AI Automation",
    year: "2026",
    description: "I kept falling behind on AI, geopolitics, and economics. Not because I wasn't interested, just because keeping up with everything manually takes more time than most people have.\n\nSo **I built a system to do it for me**. It pulls from the sources I actually care about, ranks and summarizes the content, then sends me a PDF briefing on a schedule.\n\nThe ranking is pretty straightforward: keyword matching combined with source weighting. The scraper itself is intentionally simple.\n\nMost of my time went into the PDF generation. I wanted something that looked good, not just something that technically worked. Every library I tried produced output I hated, so **I ended up building my own renderer**.\n\nIt's all tied together with a cron job, SMTP, and DKIM. I put the first version together in a weekend, and **it's been running for six months without a single issue**.",
    images: ["/images/ai-newsletter.png"],
  },
  {
    slug: "mysterium-network",
    title: "Mysterium Network",
    tag: "Protocol",
    year: "2026",
    description: "Cloud storage where **the server genuinely can't read what it's holding**.\n\nFiles get encrypted and split before they leave your device. What ends up on the network is **unreadable, uncorrelatable, and deliberately incomplete**. No single node ever sees more than one fragment, so there's nothing to leak even if it wanted to.\n\nThe architecture took a while to land on: XOR-based secret sharing client-side, each chunk routed to a different node. Retrieval was the harder part — nodes go down, so I ended up doing quorum-based reads. Try all nodes, succeed as soon as you have enough pieces.\n\nThe idea is simple: **privacy and cloud storage shouldn't be a tradeoff**.",
    images: ["/images/mysterium-network.png"],
  },
  {
    slug: "coco",
    title: "Coco",
    tag: "App Concept",
    year: "2026",
    description: "Something I keep coming back to: a notes app that **lets you think without phrasing it right**.\n\nThe idea is simple: you type or speak a thought, hit enter, it's captured. No folder decision, no tag, no format. A local embedding model indexes it silently in the background; retrieval is **semantic, not structural**.\n\nThe problem I'm trying to solve: every notes app right now makes you decide where something goes before you even understand what it is. You have to pick a folder before you've finished the thought. **That upfront friction is why most captured ideas die in a Drafts folder somewhere**, mine included.\n\nCoco removes that entirely. Input is instant. Retrieval is semantic search. Any structure comes later, either by you or silently by the AI. It's built for people whose workflow breaks the moment they have to stop and organise.\n\nWhether it actually works in practice, I genuinely don't know yet. But the concept **keeps nagging at me**.",
    images: [
      "https://images.unsplash.com/photo-1623150502742-6a849aa94be4?auto=format&fit=crop&w=1200&q=80",
    ],
  },
]
