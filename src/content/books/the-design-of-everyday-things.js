export const theDesignOfEverydayThings = {
  id: 'the-design-of-everyday-things',
  title: 'The Design of Everyday Things',
  author: 'Don Norman',
  rating: 5,
  category: 'Design',
  emoji: '🎨',
  gradient: 'from-pink-500 to-rose-500',
  coverImage: null,
  publishedYear: 1988,
  pages: 368,
  dateRead: '2024-04-05',
  summary: 'A classic book on user-centered design principles that shapes how we think about products.',
  
  review: `
## Why Design Matters

**The Design of Everyday Things** transformed how I see the world. After reading this, you'll never look at a door, a stove, or an app the same way again.

## The Problem with Bad Design

> "When people have trouble using something, it's not their fault—it's the fault of the design."

Don Norman's central thesis: **blame the design, not the user**.

We've all:
- Pushed a door that should be pulled
- Struggled with a confusing remote
- Gotten lost in a building

These aren't user errors. They're design failures.

## Core Principles

### Affordances

An affordance is what an object allows you to do:
- A chair affords sitting
- A button affords pushing
- A handle affords pulling

Good design makes affordances visible and intuitive.

### Signifiers

Signifiers communicate **where** and **how** to act:

\`\`\`
Good: "PUSH" sign on a door
Bad: Flat door with no indication
\`\`\`

### Mapping

The relationship between controls and their effects:

| Good Mapping | Bad Mapping |
|--------------|-------------|
| Stove burner knobs arranged like burners | Knobs in a row for 4 burners |
| Light switch near the door it controls | Switch bank with no labels |
| Volume slider that goes up/down | Complex menu navigation |

### Feedback

Users need to know their action had an effect:
- Button changes color when clicked
- Sound plays when message sends
- Progress bar shows download status

### Conceptual Models

Users build mental models of how things work. Good design supports accurate mental models.

## The Seven Stages of Action

Norman's framework for how we interact with objects:

1. **Goal** - What do I want to accomplish?
2. **Plan** - What actions will achieve this?
3. **Specify** - What exact sequence?
4. **Perform** - Do the action
5. **Perceive** - What happened?
6. **Interpret** - What does it mean?
7. **Compare** - Did I achieve my goal?

Failures can occur at any stage.

## Design Thinking Applied

### The Gulf of Execution

The gap between what users want to do and what the interface allows:

> "If the user cannot figure out how to work the device, it doesn't matter how good the device is."

### The Gulf of Evaluation

The gap between what happened and the user's understanding:

> "Users need feedback. They need to know that their action had an effect."

## Real-World Examples

### The Norman Door

Doors so poorly designed that you don't know whether to push or pull. They're named after Don Norman himself.

**Good door design:**
- Flat plate = push
- Handle = pull
- Clear signifiers

### The Stove Problem

Standard 4-burner stoves with controls in a row are inherently confusing. Better mapping:

\`\`\`
[Burner]  [Burner]     [Control] [Control]
                        [Control] [Control]
[Burner]  [Burner]
\`\`\`

## Applying to Digital Design

These principles directly apply to UI/UX:

- **Affordances**: Buttons should look clickable
- **Signifiers**: Icons should be clear
- **Mapping**: Navigation should be logical
- **Feedback**: Loading states, confirmations
- **Consistency**: Same action = same result

## Favorite Quotes

> "Design is really an act of communication."

> "The same technology that simplifies life by providing more functions in each device also complicates life by making the device harder to learn, harder to use."

> "Good design is actually a lot harder to notice than poor design."

## Impact on My Work

As a developer, I now:
- Test interfaces with fresh eyes
- Prioritize clear feedback
- Question every UI decision
- Advocate for user research

## Criticisms

- Some examples feel dated (physical product focused)
- Can be repetitive
- The "revised edition" improvements are minor

## Who Should Read This

- UX/UI designers
- Product managers
- Software developers
- Anyone who creates things people use

## Final Thoughts

This book should be required reading for anyone who builds products. The principles are timeless, even as the examples age.

> "We must design for the way people behave, not for how we would wish them to behave."

**Rating: ★★★★★ (5/5)**

*Read this if you create anything that other humans will use.*
  `,
  
  relatedBooks: ['atomic-habits', 'deep-work'],
  tags: ['design', 'ux', 'product', 'psychology', 'usability']
};
