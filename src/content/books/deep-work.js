export const deepWork = {
  id: 'deep-work',
  title: 'Deep Work',
  author: 'Cal Newport',
  rating: 5,
  category: 'Productivity',
  emoji: '🧠',
  gradient: 'from-blue-500 to-purple-500',
  coverImage: null,
  publishedYear: 2016,
  pages: 296,
  dateRead: '2024-01-20',
  summary: 'Rules for focused success in a distracted world, teaching how to cultivate deep concentration.',
  
  review: `
## The Premise

In an age of constant connectivity, **Deep Work** argues that the ability to focus without distraction is becoming both increasingly rare and increasingly valuable. Cal Newport defines deep work as:

> "Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit."

## Why This Book Matters

As a software developer, I constantly battle with:
- Slack notifications
- Email threads
- Social media temptations
- Open office distractions

This book provided a framework for reclaiming my attention.

## Core Concepts

### Deep Work vs Shallow Work

| Deep Work | Shallow Work |
|-----------|--------------|
| Cognitively demanding | Non-cognitively demanding |
| Creates new value | Logistical-style tasks |
| Hard to replicate | Easy to replicate |
| Improves skills | Doesn't improve skills |

### The Deep Work Hypothesis

> "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy."

This creates an opportunity: those who cultivate this skill will thrive.

## The Four Rules

### Rule #1: Work Deeply

Newport presents four philosophies for integrating deep work:

1. **Monastic** - Eliminate or radically minimize shallow obligations
2. **Bimodal** - Divide time between deep and shallow in clear phases
3. **Rhythmic** - Chain deep work into a regular habit
4. **Journalistic** - Fit deep work wherever you can

I adopted the **Rhythmic Philosophy** with 4-hour morning deep work blocks.

### Rule #2: Embrace Boredom

> "Don't take breaks from distraction. Instead take breaks from focus."

The key insight: if you give your mind an "out" during boredom, you weaken its ability to concentrate.

### Rule #3: Quit Social Media

Not completely, but apply the **craftsman approach**: adopt a tool only if its benefits substantially outweigh its negatives for your professional goals.

### Rule #4: Drain the Shallows

- Schedule every minute of your day
- Quantify the depth of activities
- Become hard to reach

## My Implementation

\`\`\`javascript
// My Deep Work Schedule
const dailySchedule = {
  "5:30 AM": "Wake up, no phone",
  "6:00 AM - 10:00 AM": "Deep Work Block 1",
  "10:00 AM - 12:00 PM": "Shallow work, meetings",
  "12:00 PM - 1:00 PM": "Lunch, walk",
  "1:00 PM - 4:00 PM": "Deep Work Block 2",
  "4:00 PM - 5:00 PM": "Email, admin",
  "5:00 PM": "Shutdown ritual"
};
\`\`\`

### The Shutdown Ritual

I implemented Newport's shutdown complete ritual:
1. Review all tasks and notes
2. Check calendar for tomorrow
3. Make a rough plan for tomorrow
4. Say "Shutdown complete"

This helps my brain fully disconnect from work.

## Results After 3 Months

- Completed complex projects 40% faster
- Reduced work hours while increasing output
- Feel less mentally exhausted
- Better work-life boundaries

## Memorable Quotes

> "Who you are, what you think, feel, and do, what you love—is the sum of what you focus on."

> "A deep life is a good life."

## Criticisms

- Some advice is easier for academics than industry workers
- The "quit social media" chapter feels slightly outdated
- Doesn't address creative work as well

## Verdict

Essential reading for knowledge workers. The strategies require commitment, but the payoff in productivity and satisfaction is substantial.

**Rating: ★★★★★ (5/5)**

*Read this if shallow work is consuming your professional life.*
  `,
  
  relatedBooks: ['atomic-habits', 'the-power-of-now'],
  tags: ['productivity', 'focus', 'work', 'concentration', 'career']
};
