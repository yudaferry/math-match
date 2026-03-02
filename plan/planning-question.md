# Math Game Web App — Planning Questions

## Target Audience & Purpose

1. Who is the primary audience? (e.g., young children ages 5–8, middle schoolers, adults brushing up on skills, competitive math enthusiasts)
answer: young children ages 4 to 12
2. Is this for solo play, classroom use, or both?
answer: both
3. Is there a specific learning goal — reinforcing basic arithmetic, building speed, teaching concepts, or pure entertainment?
answer: basic arithmetic and speed for answering each question
4. Will there be multiple player profiles or just a single-user experience?
answer: both
5. Does the app need to track progress over time, or is each session standalone?
answer: for MVP standalone session, but for next step, i need it can tract progress

## Game Mechanics & Features

6. What math topics should the game cover? (e.g., addition, subtraction, multiplication, division, fractions, algebra, geometry)
answer: addition, subtraction, multiplication, and division only
7. Should difficulty adapt automatically based on performance, let the player choose, or follow a fixed progression?
answer: let the player or mentor choose
8. What is the core game loop? (e.g., answer questions against a timer, match pairs, solve puzzles, beat levels)
answer: only answer a mount of question, but it shows one by one. let say i want setup 5 question, after all 5 question answered , the result shows how many correct and how many wrong, also shows duration to finish those 5 question.
9. Should there be a time pressure element, or is it more relaxed and self-paced?
answer: configurable, it can shows time pressure or only show the case deppend on setup before press start
10. Do you want multiple game modes (e.g., practice mode, challenge mode, timed sprint)?
answer: no, only simple answer the question
11. Should there be a scoring or points system? If so, high scores, leaderboards, or personal bests?
answer: no
12. Do you want hints or step-by-step help available to players?
answer: no
13. Should the game have levels, chapters, or a progression map players unlock over time?
answer: no
14. Do you want any rewards or achievements (badges, stars, animations on completion)?
answer: for MVP, no need. but for future, this good idea

## Visual Style & Vibe

15. What overall mood or feeling should the app have? (e.g., fun and cartoonish, clean and minimal, competitive and intense, calm and focused)
answer: clean and minimal
16. Are there any apps, games, or websites whose visual style you admire and want to draw inspiration from?
answer: no
17. Do you have any color palette preferences or colors to avoid?
answer: no
18. Should animations and sound effects play a big role, a small role, or none at all?
answer: for MVP, let's create it without sound or anymations. but it decide later after MVP
19. Should the visual style feel more like a game (full-screen, immersive) or more like a tool/app (clean UI, functional)?
answer: like tool / app
20. Any character mascots, avatars, or illustrated elements you'd like, or strictly abstract/typographic?
answer: for MVP, no need. keep it after MVP

## Technical Preferences

21. Should this work on desktop, mobile, or both?
answer: since i prefer web app, i prefer it can do PWA too
22. Do you have a preference for any specific technology or framework, or are you open to recommendations?
answer: i want to learn flutter, it's possible to use flutter but deploy to vercel ? 
23. Should this be a standalone front-end app (no backend needed) or do you need user accounts, saved progress, and a database?
answer: for MVP, front end only. after MVP it can save progress and has user account or database
24. Do you want the app to work offline, or is an internet connection assumed?
answer: for single user, can work offline with PWA. for multiple player must be online
25. Do you need multi-language support?
answer: no, only indonesian language
26. Should the app be embeddable (e.g., in a school website via iframe) or a standalone URL?
answer: no

## Scope & Complexity

27. What does a "done" version 1 look like to you — the bare minimum that would make you happy to show someone?
answer: has configuration page, button start, loop the case until meet the configuration, show the result
28. Are there any features you know you want to add later but not in the first version?
answer: yes, check previous answer
29. Do you have a timeline or deadline in mind?
answer: 1-2 hours
30. Will you maintain this yourself after it's built, or does it need to be very simple to hand off?
answer: this my personal project
31. Is there a budget consideration for hosting, backend services, or third-party tools?
answer: since i want to deploy it on vercel or cloudflare, i think there is no need any budget
