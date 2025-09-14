# Kando Tasks

A simple Kanban-style task management web app built with React, Vite, and Tailwind CSS. Create, view, and manage tasks with a modern UI.

## Features
- Create new tasks with title, priority, and status
- View tasks by status: To Do, Overdue, Done
- Mark tasks as done
- Responsive, accessible UI
- API integration via React Query

## Tech Stack
- [React](https://react.dev/) (with hooks)
- [Vite](https://vitejs.dev/) (fast dev/build)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [@tanstack/react-query](https://tanstack.com/query/latest) (data fetching/caching)
- [Radix UI](https://www.radix-ui.com/) (accessible UI primitives)
- [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) (class utilities)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repo
git clone https://github.com/simonfcodes/kando_web.git
cd kando_web

# Install dependencies
npm install
# or
yarn install
```

### Running Locally
```bash
npm run dev
# or
yarn dev
```
App will be available at [http://localhost:5173](http://localhost:5173) by default.

### API Backend
By default, the app expects an API at `http://localhost:8080/api/v1`. You can override this by setting the `VITE_API_URL` environment variable in a `.env` file:
```
VITE_API_URL=https://your-api-url/api/v1
```

## Project Structure
```
kando_web/
├── src/
│   ├── api/         # API client, hooks, types
│   ├── assets/      # Static assets
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   ├── index.css    # Global styles
│   ├── App.tsx      # Main app component
│   └── main.tsx     # Entry point
├── public/          # Public assets
├── package.json     # Project metadata
├── vite.config.ts   # Vite config
└── README.md        # Project info
```

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss major changes first.

## License
MIT
