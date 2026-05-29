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
    slug: "orbit",
    title: "Orbit",
    tag: "Web App",
    year: "2026",
    description: "A real-time collaborative dashboard for tracking orbital debris and satellite trajectories. Built with WebSocket streaming and WebGL visualization.",
    images: [
      "https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg",
      "https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg",
      "https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg",
    ],
  },
  {
    slug: "nexus",
    title: "Nexus",
    tag: "Brand Identity",
    year: "2025",
    description: "Complete brand identity for a tech startup connecting distributed teams. Logo, typography system, color palette, and design language.",
    images: [
      "https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg",
      "https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg",
      "https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg",
    ],
  },
  {
    slug: "echo",
    title: "Echo",
    tag: "Full-Stack",
    year: "2025",
    description: "A social audio platform for async voice conversations. Features include voice rooms, transcripts, and AI-powered summarization.",
    images: [
      "https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg",
      "https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg",
      "https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg",
    ],
  },
  {
    slug: "lumen",
    title: "Lumen",
    tag: "UI/UX",
    year: "2024",
    description: "Lighting control interface for smart buildings. Focus on intuitive gesture controls and adaptive brightness algorithms.",
    images: [
      "https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg",
      "https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg",
      "https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg",
    ],
  },
]
