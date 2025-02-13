# Tech Stack

This document outlines the technology stack for the application, serving as a guideline for the development team.

## Frontend

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS, Styled Components
- **Animations**: Framer Motion
- **Internationalization**: react-i18next
- **Testing**: Jest, React Testing Library

## Backend

- **Platform**: Supabase
- **Authentication**: Supabase Auth
- **Real-time Features**: Supabase Realtime

## Roadmap Visualization

- **Tool**: React Flow

## DevOps and Deployment

- **CI/CD**: GitHub Actions
- **Hosting**: Netlify
- **Monitoring and Logging**: Sentry

## Additional Tools

- **Linting and Formatting**: ESLint, Prettier
- **Code Quality**: Husky
- **Documentation**: Storybook

## Database Schema

```sql
CREATE TABLE Identities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    roadmap_id INT REFERENCES Roadmaps(id),
    identity_id INT REFERENCES Identities(id)
);

CREATE TABLE Roadmaps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    goal_id INT REFERENCES Goals(id)
);

CREATE TABLE Habits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id),
    roadmap_id INT REFERENCES Roadmaps(id)
);

CREATE TABLE Sessions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id),
    reflection_id INT REFERENCES Reflections(id)
);

CREATE TABLE Reflections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_id INT REFERENCES Sessions(id)
);

CREATE TABLE Levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id)
);

CREATE TABLE Streaks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id),
    habit_id INT REFERENCES Habits(id)
);

CREATE TABLE Heatmaps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id)
);

CREATE TABLE Notifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    identity_id INT REFERENCES Identities(id)
);
```

## Folder Structure

```
/public
  /images
  /fonts
/src
  /api
  /assets
    /fonts
    /images
  /components
    /Roadmap
      /hooks
    /common
      /button
      /form
      /text
    /transitions
  /config
  /constants
  /context
  /helpers
  /hooks
  /intl
  /layout
  /services
    /identity
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /goals
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /habits
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /sessions
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /progress
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /notifications
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
    /user-management
      /aggregates
      /controllers
      /services
      /repositories
      /models
      /utils
  /store
  /styles
  /types
  /views
```

