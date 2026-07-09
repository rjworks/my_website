export interface BlogPost {
  slug: string
  title: string
  date: string // ISO date, e.g. '2026-05-12'
  tags: string[]
  excerpt: string
  content: string[] // paragraphs
}

export const blogs: BlogPost[] = [
  {
    slug: 'building-a-reddit-sentiment-pipeline',
    title: 'Building an Automated Reddit Sentiment Pipeline',
    date: '2026-03-14',
    tags: ['Python', 'AI/LLM', 'Automation'],
    excerpt:
      'How I stitched together the Reddit API, an LLM, and Discord webhooks into a daily pipeline that turns subreddit chatter into trade signals.',
    content: [
      'Every morning before the market opens, a script on my server wakes up, scrapes a handful of stock-focused subreddits, and starts reading. Not literally reading — but close enough. It pulls the day’s hottest posts and comments, feeds them to an LLM, and asks a simple question: what is this crowd feeling about which tickers, and how confident should I be?',
      'The pipeline has three stages. First, ingestion: pull posts via the Reddit API, filter noise (bots, mega-threads, obvious spam), and bucket mentions by ticker. Second, synthesis: rather than a naive keyword sentiment score, I pass aggregated comment clusters to an LLM with a tight prompt asking for a directional read and a confidence level, grounded in the actual text rather than vibes.',
      'Third, delivery: results get formatted and pushed to a private Discord channel via webhook, so I get a readable digest before the opening bell instead of a raw CSV. The whole thing runs unattended on a cron schedule.',
      'The part that took the longest to get right wasn’t the scraping or the LLM prompt — it was deciding what to ignore. Subreddits are loud, and most of the loudest posts are the least informative. Filtering for signal over noise ended up mattering more than any model tweak, and it’s the main reason the recommendations turned out usable rather than just entertaining.',
    ],
  },
  {
    slug: 'lessons-from-shipping-charityk',
    title: 'Lessons from Shipping CharityK',
    date: '2026-01-22',
    tags: ['Angular', 'ASP.NET Core', 'Azure'],
    excerpt:
      'Notes from a contract building a platform that connects businesses to charities — what actually moved the page-load needle, and what I would do differently.',
    content: [
      'CharityK started as a fairly standard full-stack build: Angular on the frontend, ASP.NET Core on the backend, SQL Server underneath, all deployed to Azure. The interesting problems showed up once real data and real usage patterns entered the picture.',
      'The biggest win came from something unglamorous: auditing what the frontend was actually waiting on. A handful of endpoints were doing more work than the page needed — joining tables the UI never rendered, serializing fields nobody consumed. Trimming those payloads and adding targeted indexes on the SQL Server side cut page loads by roughly half.',
      'Docker made local development and CI consistent across machines, which mattered more than I expected on a contract where I wasn’t the only person touching the codebase. Reproducible environments turned "works on my machine" from a recurring argument into a non-issue.',
      'If I were starting over, I’d profile the real request patterns earlier instead of optimizing based on assumptions about where the bottlenecks would be. The slow part was rarely where I guessed it would be.',
    ],
  },
  {
    slug: 'why-i-still-reach-for-server-sent-events',
    title: 'Why I Still Reach for Server-Sent Events',
    date: '2025-11-05',
    tags: ['Web', 'Architecture'],
    excerpt:
      'WebSockets get all the attention, but for one-directional live updates, SSE is simpler to build, deploy, and reason about.',
    content: [
      'Whenever a project needs "live updates," the default instinct is to reach for WebSockets. They’re powerful, bidirectional, and well-supported — and for a lot of use cases, they’re more than what’s actually needed.',
      'Server-Sent Events cover a surprising amount of ground: a plain HTTP connection the server keeps open and streams text down. No separate protocol handshake, no extra library on the client — just an EventSource and a route that writes to the response as data becomes available. Browsers reconnect automatically if the connection drops, which is one less thing to build.',
      'The tradeoff is obvious: it’s one-directional. The client can’t push messages back over the same connection. For dashboards, notifications, and progress streams — anything where the server is the one with news to share — that constraint is barely a constraint at all, and the resulting code is a fraction of the size of a WebSocket setup.',
      'I used this pattern for a small hello-world streaming demo on this site, and it’s the same shape I’d reach for on a production dashboard: simple until proven insufficient.',
    ],
  },
]
