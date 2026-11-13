/* The first-person story and memory captions are kept separate from the game. */
window.Journey = window.Journey || {};

Journey.story = {
  why: 'To explore new possibilities and turn challenges into action, so that I can continuously grow, achieve meaningful goals, and create valuable experiences and connections along the way.',
  levels: [
    {
      name: 'The Island of Discovery',
      short: 'Discovery',
      subtitle: 'Discovering My WHY',
      stamp: 'Curiosity',
      color: '#6dddc4',
      icon: 'compass',
      lens: 'Finding My WHY · Bird in Hand',
      intro: 'I used to think of basketball, moving away for university, and studying abroad as separate decisions. Each one asked me to do something unfamiliar. I only saw how closely they were connected when I put them next to each other.',
      task: 'Unpack my journey',
      guidance: 'Select a memory, then choose where it belongs. You can also drag it onto the route.',
      reflection: [
        'In BU301, an exercise with my classmate Beatrice helped me look back at these choices together. The confidence I built near Milan made Sweden feel possible, and Sweden made the move to Canada feel more natural.',
        'What stayed consistent was the reason I kept saying yes. I wanted to explore, act on my curiosity, grow, and build relationships along the way. I could finally put that reason into words.'
      ],
      before: 'I saw my experiences as separate challenges.',
      after: 'They were connected by the same desire to explore, grow, take action, and connect with people.'
    },
    {
      name: 'The Factory of Possibilities',
      short: 'Possibilities',
      subtitle: 'Turning Frustration into Opportunity',
      stamp: 'Courage',
      color: '#f3a879',
      icon: 'spark',
      lens: 'Opportunity recognition · Bird in Hand',
      intro: 'Two internships gave me very different experiences. At Giacomini, I worked on a demanding project and felt proud presenting the results to management and the board. At Caleffi, I had less supervision and mentoring on my project than I had hoped for.',
      task: 'Transform the problem',
      guidance: 'Open both workshop doors, then bring the problem they reveal to the workbench.',
      reflection: [
        'At first, I thought of the difference between the two internships in terms of what I had gained from each. BU301 encouraged me to look again. The gap between what I expected and what I experienced gave me a question I could explore.',
        'I began to wonder how students and employers could make expectations clearer before an internship started. Internship Match grew out of that question. I had learned to look at a frustration and see a possible starting point.'
      ],
      before: 'My different internship experiences were part of my personal learning.',
      after: 'They could also help me recognize a problem worth solving for other people.'
    },
    {
      name: 'The Bridge of Courage',
      short: 'Courage',
      subtitle: 'Learning to Take Small Risks',
      stamp: 'Action',
      color: '#83bbf5',
      icon: 'bridge',
      lens: 'Affordable Loss',
      intro: 'I usually picture the destination first, then draw a route from A to B. With Internship Match, I wanted to know what it would take to pursue the whole idea. That made the first step feel bigger and less certain.',
      task: 'Build the first steps',
      guidance: 'Set three stepping stones in order. Each one makes a little more of the crossing possible.',
      reflection: [
        'Affordable Loss helped me start with a different question. What could I commit now and still feel comfortable if the idea changed? I considered my time, money, reputation, and the emotional energy I was willing to put into it.',
        'I could imagine an initial experiment and decide what I wanted to learn from it. Having a limit made the uncertainty easier to work with. I could decide how far to go after I had taken a first step.'
      ],
      before: 'I needed a clear plan and enough resources to pursue the complete idea.',
      after: 'I can take a small step, learn from it, and decide what to do next.'
    },
    {
      name: 'The Crossroads of Perspectives',
      short: 'Perspectives',
      subtitle: 'Learning to Listen',
      stamp: 'Collaboration',
      color: '#c5afff',
      icon: 'crossroads',
      lens: 'Crazy Quilt · Iteration · Lemonade',
      intro: 'Once I had the idea for Internship Match, my instinct was to work out the details myself. Talking to Sofia and Dario gave me two views of internships that I could only get by asking and listening.',
      task: 'Collect two perspectives',
      guidance: 'Open each conversation, then add both insights to the idea board.',
      reflection: [
        'Sofia’s experience brought everyday responsibilities, learning goals, and supervision into focus. Dario helped me see the difficulty of structuring internships at a small company and the risks of unrestricted public reviews.',
        'I began asking a better question about feedback. How could it stay transparent and give employers a fair context? The conversations moved my attention toward clearer learning plans, a tutor commitment, and more structured feedback. I could see how leaving an idea open to challenge gave it room to improve.'
      ],
      before: 'If I had a promising idea, I should develop and perfect it.',
      after: 'An idea can become stronger when I allow other people to challenge it.'
    },
    {
      name: 'The Horizon of Growth',
      short: 'Growth',
      subtitle: 'Becoming a Different Thinker',
      stamp: 'Growth',
      color: '#f6c453',
      icon: 'sunrise',
      lens: 'Effectuation · Reflection · Learning through action',
      intro: 'For most of my life, I have been motivated by goals. I love setting challenges for myself and working toward them. Before BU301, I often thought of progress as moving from A to B along a route I had already planned.',
      task: 'Redesign the road',
      guidance: 'Activate each discovery and watch the route change.',
      reflection: [
        'Now I see how much I can learn along the way. An experiment can give me a reason to adjust a plan. A conversation can bring an option into view that I had never considered.',
        'I could never have planned every step from Milan to Sweden and Canada. Each experience changed what I believed was possible. I am beginning to bring that same openness to the ideas I care about. I can keep a goal in sight while giving myself room to change the route.'
      ],
      before: 'Progress meant choosing a goal and following a clear route toward it.',
      after: 'Progress can also mean adapting the route as I learn, without losing sight of what matters to me.',
      insight: 'I haven’t changed who I am. I am learning how to use who I am in a different way.'
    }
  ],
  packing: [
    { id: 'basketball', name: 'Basketball', slot: 'The first leap', icon: 'ball', photo: 1, text: 'As a young player, I left a familiar team for a more competitive environment and eventually reached Reyer Venezia. Basketball was one of my first experiences of choosing a challenge. It stayed part of my life when I moved away for university.' },
    { id: 'milan', name: 'Milan', slot: 'Living independently', icon: 'house', photo: 2, text: 'I had doubts when I moved away from home to study at LIUC, near Milan. Living independently taught me to organize my days, solve problems, make decisions, and build new relationships.' },
    { id: 'sweden', name: 'Sweden', slot: 'My first study abroad', icon: 'plane', photo: 3, text: 'When I decided to study in Sweden, I still felt insecure about my English. Meeting new people and managing daily life in an unfamiliar place helped me trust myself a little more.' },
    { id: 'canada', name: 'Canada', slot: 'Going further', icon: 'leaf', photo: 4, text: 'I now study at Wilfrid Laurier University in Waterloo. Before I started university, I would never have pictured myself here. Milan and Sweden made this next step feel possible.' }
  ],
  internships: [
    { id: 'giacomini', name: 'Giacomini', label: 'A project I felt proud of', icon: 'factory', photo: 7, text: 'My internship at Giacomini gave me the chance to work on a demanding project and present my results to company management and the board of directors. I felt proud of what I had completed.' },
    { id: 'caleffi', name: 'Caleffi', label: 'A gap I began to notice', icon: 'book', photo: 8, text: 'At Caleffi, the supervision and mentoring available for my project were limited. That experience made the gap between expectations and the day-to-day reality of an internship easier for me to see.' }
  ],
  problem: 'Students do not always know what their internship experience will really involve.',
  concept: 'A concept to help students and companies create clearer, more meaningful internship experiences.',
  bridge: [
    { name: 'Start with what I have', icon: 'case', text: 'I can begin with my internship experience, what I know about the problem, and the people I can learn from.' },
    { name: 'Choose what I can afford to lose', icon: 'scale', text: 'I can set limits on the money, time, and energy I am prepared to commit.' },
    { name: 'Learn from a first experiment', icon: 'spark', text: 'A small experiment could tell me what to investigate before I make a larger commitment.' }
  ],
  commitments: [
    ['Up to €100', 'Money', 'The upper limit I considered for an initial exploration.'],
    ['6–10 hours a week', 'Time', 'The approximate weekly time I considered setting aside.'],
    ['Medium', 'Reputational commitment', 'I considered how much of my reputation I was prepared to put behind an early idea.'],
    ['High', 'Emotional commitment', 'I cared about the problem and recognized the energy I was prepared to invest.']
  ],
  conversations: [
    { id: 'sofia', name: 'Sofia', role: 'The student perspective', icon: 'book', logo: { path: './assets/images/liuc.png', alt: 'LIUC – The Business University' }, insight: 'Clarify what students will do and learn', text: 'Sofia is a close friend and former Management Engineering classmate. Her internship experience highlighted the value of realistic daily responsibilities, clear learning objectives, and meaningful supervision.' },
    { id: 'dario', name: 'Dario', role: 'The employer perspective', icon: 'factory', logo: { path: './assets/images/etter.jpg', alt: 'ETTER Guarnizioni Industriali' }, insight: 'Support smaller employers and balance feedback', text: 'Dario Etter owns ETTER S.r.l., where I previously completed an internship. He explained how difficult it can be for a small company to structure an internship and define a suitable project. He also raised the risk that unrestricted public reviews could unfairly damage a company’s reputation.' }
  ],
  objection: 'Public reviews could create unfair reputational risks.',
  question: 'How could feedback remain transparent while becoming more balanced?',
  concepts: ['Internship Blueprint', 'Learning Roadmap', 'Tutor Commitment', 'Structured feedback'],
  turns: [
    { name: 'Experiment', icon: 'spark', text: 'I can take a small step before I know the entire route.' },
    { name: 'Listen', icon: 'crossroads', text: 'Other people can help me see a route I missed.' },
    { name: 'Adapt', icon: 'compass', text: 'I can change my approach and keep sight of the goal.' }
  ],
  extras: {
    mother: { title: 'A note about my mother', type: 'letter', photo: 5, text: 'At first, my mother was skeptical about my decision to move away for university. Later, when she saw how much I had matured and how happy I was, she told me she was proud of the decision I had made. That meant a great deal to me.' },
    jesolo: { title: 'A postcard from Jesolo', type: 'postcard', photo: 13, text: 'The beach in Jesolo is one of my familiar places. I enjoy being by the sea and spending time there with people close to me.' },
    kobe: { title: 'Kobe', type: 'postcard', photo: 6, text: 'One of the familiar things that always makes home feel like home.' }
  },
  finale: [
    'When I first left home for university, I had no idea where that decision would take me.',
    'Milan helped me become independent. Sweden gave me the confidence to explore even further. And today, I am studying in Canada, somewhere I once thought I would never reach.',
    'Every experience taught me something about myself. BU301 helped me discover that I could apply that same openness to my thinking. I could question my assumptions, listen to others, try an idea before it was perfect, and learn to adapt.',
    'I started this course thinking that entrepreneurship was something people were born with. Now, I understand that entrepreneurial thinking can also be learned and practiced.',
    'I don’t know exactly where my journey will take me next. But I know that I want to keep exploring.'
  ]
};
