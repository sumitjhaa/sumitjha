export interface ProjectLink {
    label: string
    url: string
}

export interface ProjectTech {
    name: string
    icon: string
    color: string
}

export interface Project {
    slug: string
    title: string
    description: string
    image: string
    technologies: ProjectTech[]
    links: ProjectLink[]
    date: string
    status: string
}

export const PROJECTS: Project[] = [
    {
        slug: 'charcha',
        title: 'Charcha',
        description: 'A full-stack language learning platform where users connect via chat, voice calls, and recorded sessions. Built with a MongoDB-backed Express API and a real-time React frontend powered by Zustand state management, all wrapped in a clean Daisy UI interface. Join communities, practice conversations, and track your progress — all in one place.',
        image: '/img/projects/kurakani.png',
        technologies: [
            { name: 'MongoDB', icon: '/img/techicons/mongo.svg', color: '#47A248' },
            { name: 'NodeJS', icon: '/img/techicons/nodejs.svg', color: '#339933' },
            { name: 'ExpressJS', icon: '/img/techicons/expressjs.svg', color: '#404D59' },
            { name: 'React', icon: '/img/techicons/react.svg', color: '#61DAFB' },
            { name: 'Zustand', icon: '/img/techicons/zustand.svg', color: '#6D6D6D' },
            { name: 'DaisyUI', icon: '/img/techicons/daisyui.svg', color: '#5A0EF8' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/charcha' },
            { label: 'Live Demo', url: 'https://charcha-lpvh.onrender.com' },
        ],
        date: '2025-07-15',
        status: 'Completed',
    },
    {
        slug: 'freddit',
        title: 'Freddit',
        description: 'A feature-rich Reddit clone built with Ruby on Rails and PostgreSQL. Users can create communities, post content, upvote and downvote, leave threaded comments, and build discussion spaces around any topic. Full authentication, moderation tools, and a clean responsive interface make it feel right at home.',
        image: '/img/projects/Freddit.png',
        technologies: [
            { name: 'Ruby', icon: '/img/techicons/ruby.svg', color: '#CC342D' },
            { name: 'Ruby on Rails', icon: '/img/techicons/rails.svg', color: '#CC0000' },
            { name: 'JavaScript', icon: '/img/techicons/js.svg', color: '#F7DF1E' },
            { name: 'PostgreSQL', icon: '/img/techicons/psql.svg', color: '#4169E1' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/freddit' },
        ],
        date: '2025-04-12',
        status: 'Completed',
    },
    {
        slug: 'vigilante',
        title: 'Vigilante',
        description: 'A pipeline-based malware detection system that combines machine learning with fast feature extraction for real-time threat scanning. The Python backend uses Pandas and NumPy for data processing and Scikit-learn for classification, served through a Flask API. Extract PE file features, run predictions, and get results in milliseconds.',
        image: '/img/projects/vigilante.png',
        technologies: [
            { name: 'Python', icon: '/img/techicons/python.svg', color: '#3776AB' },
            { name: 'Jupyter', icon: '/img/techicons/jupyter.svg', color: '#F37626' },
            { name: 'NumPy', icon: '/img/techicons/numpy.svg', color: '#013243' },
            { name: 'Pandas', icon: '/img/techicons/pandas.svg', color: '#150458' },
            { name: 'Scikit-learn', icon: '/img/techicons/scikit-learn.svg', color: '#F7931E' },
            { name: 'Flask', icon: '/img/techicons/flask.svg', color: '#000000' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/Malware-detector-ML' },
        ],
        date: '2025-03-10',
        status: 'Completed',
    },
    {
        slug: 'tick',
        title: 'Tick',
        description: 'A collaborative sticky notes app with real-time drag & drop task management and sharable boards. Built with React and Node.js, powered by Appwrite for authentication and data sync. Create boards, add notes, rearrange with smooth drag-and-drop, and broadcast changes to your team — all without ever losing your flow.',
        image: '/img/projects/tick.png',
        technologies: [
            { name: 'React', icon: '/img/techicons/react.svg', color: '#61DAFB' },
            { name: 'TailwindCSS', icon: '/img/techicons/tailwindcss.svg', color: '#06B6D4' },
            { name: 'NodeJS', icon: '/img/techicons/nodejs.svg', color: '#339933' },
            { name: 'Appwrite', icon: '/img/techicons/appwrite.svg', color: '#FD366E' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/Tick' },
            { label: 'Live Demo', url: 'https://tick-eight.vercel.app/' },
        ],
        date: '2025-02-18',
        status: 'Completed',
    },
    {
        slug: 'dragnotes',
        title: 'Dragnotes',
        description: 'A privacy-first sticky notes app that respects your anonymity — no accounts, no tracking, just pure drag-and-drop note-taking. Built with React and Sass for a polished UI, backed by a Node.js server for optional sync. Create, organize, and toss notes with zero friction.',
        image: '/img/projects/dragnotes.png',
        technologies: [
            { name: 'React', icon: '/img/techicons/react.svg', color: '#61DAFB' },
            { name: 'Sass', icon: '/img/techicons/sass.svg', color: '#CC6699' },
            { name: 'JavaScript', icon: '/img/techicons/js.svg', color: '#F7DF1E' },
            { name: 'NodeJS', icon: '/img/techicons/nodejs.svg', color: '#339933' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/FrontEnd-projects/tree/main/DragDocs' },
            { label: 'Live Demo', url: 'https://dragnote.vercel.app/' },
        ],
        date: '2025-01-05',
        status: 'Completed',
    },
    {
        slug: 'tugnotes',
        title: 'Tugnotes',
        description: 'A lightweight Kanban board for simple drag & drop task management. No frameworks, no bloat — just vanilla HTML, CSS, and JavaScript. Create tasks, move them across columns, and keep your workflow visual and minimal. Perfect for when you just need to get things done.',
        image: '/img/projects/tugnotes.png',
        technologies: [
            { name: 'HTML', icon: '/img/techicons/html.svg', color: '#E34F26' },
            { name: 'CSS', icon: '/img/techicons/css.svg', color: '#1572B6' },
            { name: 'JavaScript', icon: '/img/techicons/js.svg', color: '#F7DF1E' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/js-rookies/tree/main/18-TugNotes/v2' },
            { label: 'Live Demo', url: 'https://tugnote.vercel.app/' },
        ],
        date: '2024-11-28',
        status: 'Completed',
    },
    {
        slug: 'otakudoro',
        title: 'Otakudoro',
        description: 'An anime-themed Pomodoro timer that brings your favourite aesthetic to productivity. Built with Electron for cross-platform support on Windows and Linux, featuring custom themes, focus sessions, break timers, and a clean interface. Stay focused in style — your waifu would be proud.',
        image: '/img/projects/otakudoro.png',
        technologies: [
            { name: 'HTML', icon: '/img/techicons/html.svg', color: '#E34F26' },
            { name: 'CSS', icon: '/img/techicons/css.svg', color: '#1572B6' },
            { name: 'JavaScript', icon: '/img/techicons/js.svg', color: '#F7DF1E' },
            { name: 'Electron', icon: '/img/techicons/electron.svg', color: '#47848F' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/otakudoro' },
            { label: 'Live Demo', url: 'https://otakudoro.vercel.app/' },
        ],
        date: '2024-10-12',
        status: 'Completed',
    },
    {
        slug: 'ziggle',
        title: 'Ziggle',
        description: 'Physics animation project showcasing smooth motion and dynamic visual effects.',
        image: '/img/projects/paper-ziggle.gif',
        technologies: [
            { name: 'HTML', icon: '/img/techicons/html.svg', color: '#E34F26' },
            { name: 'CSS', icon: '/img/techicons/css.svg', color: '#1572B6' },
            { name: 'JavaScript', icon: '/img/techicons/js.svg', color: '#F7DF1E' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/js-rookies/blob/main/22-ziggle/index.html' },
            { label: 'Live Demo', url: 'https://ziggle-cubes.vercel.app/' },
        ],
        date: '2024-08-20',
        status: 'Completed',
    },
]
