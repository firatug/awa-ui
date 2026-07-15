export interface ChatMessage {
  id: string
  text: string
  isOwn?: boolean
}

export interface ChatBubbleGroup {
  id: string
  isOwn: boolean
  avatarSeed: string
  bubbles: string[]
}

export interface ChatThread {
  id: string
  name: string
  lastMessage: string
  time: string
  statusIcon: 'done' | 'muted'
  avatarSeed: string
  conversation: ChatBubbleGroup[]
}

export const chatThreads: ChatThread[] = [
  {
    id: '1',
    name: 'Pari Subramanium',
    lastMessage:
      'Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.',
    time: '15 min',
    statusIcon: 'done',
    avatarSeed: 'Pari',
    conversation: [
      {
        id: 'g1',
        isOwn: false,
        avatarSeed: 'Pari',
        bubbles: ['Hello!'],
      },
      {
        id: 'g2',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: [
          'Hi!',
          'Credibly innovate granular internal or "organic" sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences.',
        ],
      },
      {
        id: 'g3',
        isOwn: false,
        avatarSeed: 'Pari',
        bubbles: ['Dramatically synthesize integrated schemas with optimal networks.'],
      },
      {
        id: 'g4',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: ['Interactively procrastinate high-payoff content'],
      },
      {
        id: 'g5',
        isOwn: false,
        avatarSeed: 'Pari',
        bubbles: [
          'Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures.',
          'Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster superior methodologies without market-driven best practices.',
        ],
      },
      {
        id: 'g6',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: ['Distinctively exploit optimal alignments for intuitive bandwidth'],
      },
      {
        id: 'g7',
        isOwn: false,
        avatarSeed: 'Pari',
        bubbles: ['Quickly coordinate e-business applications through'],
      },
    ],
  },
  {
    id: '2',
    name: 'Andrew Fox',
    lastMessage:
      'Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information without cross-media value.',
    time: '2 hr',
    statusIcon: 'done',
    avatarSeed: 'Andrew',
    conversation: [
      {
        id: 'a1',
        isOwn: false,
        avatarSeed: 'Andrew',
        bubbles: ['Are the reports ready for the Friday review?'],
      },
      {
        id: 'a2',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: ['Yes — I will share the final deck this afternoon.'],
      },
    ],
  },
  {
    id: '3',
    name: 'Lieke Vermeulen',
    lastMessage:
      'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
    time: 'Yesterday',
    statusIcon: 'muted',
    avatarSeed: 'Lieke',
    conversation: [
      {
        id: 'l1',
        isOwn: false,
        avatarSeed: 'Lieke',
        bubbles: ['Mute this thread for now — focus mode on.'],
      },
    ],
  },
  {
    id: '4',
    name: 'Benjamin Beck',
    lastMessage:
      'Completely synergize resource sucking relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.',
    time: '1 week ago',
    statusIcon: 'done',
    avatarSeed: 'Benjamin',
    conversation: [
      {
        id: 'b1',
        isOwn: false,
        avatarSeed: 'Benjamin',
        bubbles: ['Can we revisit the onboarding checklist tomorrow?'],
      },
      {
        id: 'b2',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: ['Absolutely. I will book a 30-minute slot.'],
      },
    ],
  },
  {
    id: '5',
    name: 'Joshua Harris',
    lastMessage:
      'Dynamically innovate resource-leveling customer service for state of the art customer service. Objectively innovate empowered manufactured products whereas parallel platforms.',
    time: 'Jan 10, 2015',
    statusIcon: 'done',
    avatarSeed: 'Joshua',
    conversation: [
      {
        id: 'j1',
        isOwn: false,
        avatarSeed: 'Joshua',
        bubbles: ['Platform release notes are in the shared folder.'],
      },
    ],
  },
  {
    id: '6',
    name: 'Lisa Cooper',
    lastMessage:
      'Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.',
    time: 'Jan 5, 2015',
    statusIcon: 'done',
    avatarSeed: 'Lisa',
    conversation: [
      {
        id: 'c1',
        isOwn: false,
        avatarSeed: 'Lisa',
        bubbles: ['QA signed off on the sprint items.'],
      },
    ],
  },
  {
    id: '7',
    name: 'Matthew Harris',
    lastMessage: 'Globally incubate standards compliant channels before scalable benefits.',
    time: 'Jan 4, 2015',
    statusIcon: 'done',
    avatarSeed: 'Matthew',
    conversation: [
      {
        id: 'm1',
        isOwn: false,
        avatarSeed: 'Matthew',
        bubbles: ['Standards checklist is complete.'],
      },
    ],
  },
  {
    id: '8',
    name: 'Diana Nguyen',
    lastMessage: 'Happy new yeaar!!',
    time: 'Jan 1, 2015',
    statusIcon: 'done',
    avatarSeed: 'Diana',
    conversation: [
      {
        id: 'd1',
        isOwn: false,
        avatarSeed: 'Diana',
        bubbles: ['Happy new yeaar!!'],
      },
      {
        id: 'd2',
        isOwn: true,
        avatarSeed: 'You',
        bubbles: ['Happy New Year!'],
      },
    ],
  },
]

export const chatNotifications = [
  {
    id: 'n1',
    caption:
      'Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.',
    time: '2 hr',
    unread: true,
  },
  {
    id: 'n2',
    caption:
      'Dramatically visualize customer directed convergence without revolutionary ROI. Efficiently unleash cross-media information without cross-media value.',
    time: '16:55',
    unread: true,
  },
  {
    id: 'n3',
    caption:
      'Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
    time: 'Yesterday',
    unread: true,
  },
]

/* Keep legacy exports used by ChatPage route */
export interface LegacyChatMessage {
  id: string
  sender: string
  content: string
  time: string
  isOwn?: boolean
}

export const legacyChatThreads = chatThreads.map((thread) => ({
  id: thread.id,
  name: thread.name,
  lastMessage: thread.lastMessage,
  unread: thread.statusIcon === 'done' ? 0 : 1,
  online: true,
  messages: thread.conversation.flatMap((group, gi) =>
    group.bubbles.map((text, bi) => ({
      id: `${thread.id}-${gi}-${bi}`,
      sender: group.isOwn ? 'You' : thread.name,
      content: text,
      time: thread.time,
      isOwn: group.isOwn,
    })),
  ),
}))
