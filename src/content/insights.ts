import type { Article } from '@/types';

/**
 * Long-form notes. Bodies are plain paragraphs so the content layer stays
 * dependency-free; swap for MDX later without changing the route contract.
 */
export const articles: readonly Article[] = [
  {
    slug: 'architecture-decisions-that-age-well',
    title: 'Architecture Decisions That Age Well',
    description:
      'Why the best architecture decisions are the ones you can still explain two years later, and how architecture decision records make that possible.',
    publishedAt: '[Add publish date]',
    readingTime: '6 min read',
    tags: ['Architecture', 'Documentation', 'Engineering Practice'],
    status: 'draft',
    body: [
      'Most architecture discussions end in a decision that nobody writes down. Six months later the team inherits the consequence without the reasoning, and the only honest answer to "why is it like this?" is a shrug.',
      'An architecture decision record fixes this cheaply. One page: the context, the options considered, the decision, and the consequences accepted. It is not documentation for its own sake — it is the difference between a system people can evolve and a system people are afraid to touch.',
      'The test I apply is simple. If a new engineer joins the team and reads the last ten decision records, can they make the eleventh decision consistently with the previous ten? If yes, the architecture has a memory. If no, the architecture only exists in the heads of whoever attended the meeting.',
      'Decisions that age well share a few traits. They name the constraint that drove them, rather than the technology that satisfied it. They state what was explicitly rejected. And they are honest about the cost being accepted, because every architecture decision buys something and pays for it somewhere else.',
    ],
  },
  {
    slug: 'what-manufacturing-it-teaches-software-teams',
    title: 'What Manufacturing IT Teaches Software Teams',
    description:
      'Shop-floor systems have a different relationship with downtime. That constraint produces engineering habits worth borrowing.',
    publishedAt: '[Add publish date]',
    readingTime: '7 min read',
    tags: ['Manufacturing IT', 'MES', 'Reliability'],
    status: 'draft',
    body: [
      'When software sits next to a production line, the cost of a failed deployment is not an error rate on a dashboard. It is a line that stops. That single constraint reshapes how teams think about change.',
      'The first habit is respect for the rollback path. In manufacturing IT, you do not ship something you cannot reverse quickly, and you rehearse the reversal before you need it. Most enterprise web teams would benefit from the same discipline.',
      'The second habit is explicit integration contracts. Plant systems, MES layers and enterprise platforms are built by different vendors on different release cycles. The only thing that holds the landscape together is a well-defined interface, versioned deliberately and changed slowly.',
      'The third is observability that a non-developer can read. Operations staff need to know whether the system is healthy without reading a stack trace. That forces teams to define what "healthy" actually means — a question surprisingly many applications cannot answer.',
      'None of this is exotic. It is simply what happens when the feedback loop for a mistake is immediate and physical.',
    ],
  },
  {
    slug: 'agentic-ai-without-the-hype',
    title: 'Agentic AI Without the Hype',
    description:
      'A practical framing of what agentic workflows are good at, where they break, and how enterprises should evaluate them.',
    publishedAt: '[Add publish date]',
    readingTime: '8 min read',
    tags: ['Agentic AI', 'Generative AI', 'Architecture'],
    status: 'draft',
    body: [
      'An agent is a loop: a model proposes an action, a tool executes it, the result feeds back, and the loop continues until a stopping condition. That is the entire idea. Everything interesting is in the engineering around it.',
      'Agentic systems are strong where the task is well-bounded, the tools are reliable, and a wrong answer is cheap to detect. They are weak where the task is open-ended, the failure is silent, and no human reviews the output.',
      'For enterprise adoption, three questions decide viability. What is the blast radius if the agent is wrong? Who reviews the output, and do they have enough context to catch a plausible-sounding mistake? And can you reconstruct afterwards what the system did and why?',
      'Retrieval-augmented generation deserves the same scrutiny. Grounding a model in your own documents improves relevance, but it does not make the answer correct — it makes the answer confident. Evaluation sets and traceable citations are not optional extras.',
      'Used carefully, these systems remove a real class of tedious work. Used as a substitute for understanding the problem, they produce expensive, articulate nonsense.',
    ],
  },
  {
    slug: 'advice-for-engineering-students',
    title: 'Advice for Engineering Students That Actually Compounds',
    description:
      'Notes from college seminars: the small number of habits that make a disproportionate difference in the first five years of a career.',
    publishedAt: '[Add publish date]',
    readingTime: '5 min read',
    tags: ['Career', 'Mentoring', 'Students'],
    status: 'draft',
    body: [
      'Students usually ask which framework to learn. It is almost never the question that matters. Frameworks have a half-life of a few years; fundamentals do not.',
      'Learn to read code you did not write. Most of your professional life is spent understanding existing systems, not creating new ones from a blank file. Clone a real open-source project and trace one feature end to end.',
      'Build one project deeply instead of five shallowly. A single application with authentication, a real database, tests, error handling and a deployment pipeline says more than a folder of tutorials.',
      'Write things down. A short blog post explaining something you just learned forces the gap in your understanding into the open, and it compounds into a public record of how you think.',
      'Finally, learn to explain technical work to someone who is not technical. The engineers whose careers accelerate are almost always the ones who can make a room understand the trade-off.',
    ],
  },
];

export const publishedArticles: readonly Article[] = articles.filter(
  (article) => article.status === 'published'
);

export function getArticleBySlug(slug: string): Article | undefined {
  return publishedArticles.find((article) => article.slug === slug);
}
