# Dog Breed Viewer

A fullstack application built inside an NX monorepo. The frontend is built with [React](https://react.dev) and the backend is built with [NestJS](https://nestjs.com/).

## Table of Contents

1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Completed Features](#completed-features)
6. [Missing Features](#missing-features)
7. [Approaches](#approaches)

## Installation

To install the project, follow these steps:

1. Install NX globally: `npm add --global nx`. Read more about NX installation [here](https://nx.dev/docs/getting-started/installation).
2. Clone the repository
3. Navigate to the project directory
4. Install dependencies: `npm install`

## Running the Application

To run the application, follow these steps:

1. Start the backend server: `npx nx serve @org/backend`
2. Start the frontend application: `npx nx dev @org/frontend`
3. Navigate to `http://localhost:4200` in your browser to access the application

You can also run the following...

#### Storybook:

1. Run `npx nx run @org/frontend:storybook --port=5200` in the terminal
2. Navigate to `http://localhost:5200` in your browser to access Storybook

#### Unit Testing:

1. Run `npx nx run @org/frontend:test` in the terminal

## Project Structure

The project is structured as an NX monorepo with the following apps:

-   `backend`: The backend server built with NestJS
-   `frontend`: The frontend application built with React

## Technologies Used

-   [React](https://react.dev)
-   [NestJS](https://nestjs.com/)
-   [NX](https://nx.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Storybook](https://storybook.js.org/)
-   [SCSS](https://sass-lang.com/)

## Completed Features

| Feature                         | Required | Implemented |
| ------------------------------- | -------- | ----------- |
| Fetch and Display Breed List    | 🟢       | 🟢          |
| Select a Breed and View Images  | 🟢       | 🟢          |
| Add a search/filter input field | 🟢       | 🟢          |
| Handle API Errors               | 🟢       | 🟢          |
| Dynamic Updates                 | 🟢       | 🟢          |
| Loading States                  | 🟢       | 🟢          |
| Rate Limits                     | 🟡       | 🟠          |
| Cache                           | 🟡       | 🟠          |
| Unit Testing                    | 🟡       | 🟢          |
| User Auth                       | 🟡       | 🟢          |
| Create a Server                 | 🟠       | 🟢          |
| GET API Endpoint                | 🟠       | 🟢          |
| POST API Endpoint               | 🟠       | 🟢          |
| DELETE API Endpoint             | 🟠       | 🟢          |
| Data Persistence                | 🟠       | 🟢          |
| "Favourite" Functionality       | 🟠       | 🟢          |
| Display Favourites              | 🟠       | 🟢          |
| "Un-Favourite" Functionality    | 🟠       | 🟢          |
| Mobile Responsiveness           | 🔴       | 🟢          |
| 404 Page                        | 🔴       | 🟢          |

## Missing Features

| Feature             | Reason                                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ARIA Attributes     | Although implemented in some places, it was low priority for this project.                                                                   |
| Shareable TS Models | In order to keep consistency between the frontend and backend, shareable TS models would be nice, but it is not a priority for this project. |
| Light/Dark Mode     | The basis was built for this, but some colors are not accessible. Did not spend time fixing this as it is not a priority for this project.   |

## Approaches

### Frontend

#### Architecture

```
|- frontend
|  |- app
|  |- components
|     |- {{ CATEGORY }}
|        |- {{ COMPONENT }}
|  |- features
|     |- {{ FEATURE }}
|        |- {{ SUB_FEATURE }} (If applicable)
|        |- components (Responsible for components specific to this feature)
|           |- {{ COMPONENT }}
|  |- layouts
|     |- {{ LAYOUT }}
|  |- providers
|     |- {{ PROVIDER }}
|  |- styles
|     |- {{ STYLE }}
|  |- utils
|    |- definitions
|    |- methods
|    |- models
|    |- routes
```

| Folder                                            | Usage                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| app                                               | Responsible for managing the application state and routing                          |
| components                                        | Responsible for reusable UI components                                              |
| components/{{ CATEGORY }}                         | Hosts all reusable components related by type (action, feedback, form, etc.)        |
| components/{{ CATEGORY }}/{{ COMPONENT }}         | Hosts the component files (e.g. {{ COMPONENT }}.tsx, {{ COMPONENT }}.module.scss)   |
| features                                          | Responsible for application features                                                |
| features/{{ FEATURE }}                            | Hosts all files related to the feature (e.g. breeds, auth, etc.)                    |
| features/{{ FEATURE }}/{{ SUB_FEATURE }}          | Hosts all files related to the sub-feature (e.g. login, register, etc.)             |
| features/{{ FEATURE }}/components                 | Hosts all components specific to the feature (e.g. breed list, breed details, etc.) |
| features/{{ FEATURE }}/components/{{ COMPONENT }} | Hosts the component files (e.g. {{ COMPONENT }}.tsx, {{ COMPONENT }}.module.scss)   |
| layouts                                           | Responsible for application layouts                                                 |
| layouts/{{ LAYOUT }}                              | Hosts the layout files (e.g. {{ LAYOUT }}.tsx, {{ LAYOUT }}.module.scss)            |
| providers                                         | Responsible for application state management                                        |
| providers/{{ PROVIDER }}                          | Hosts the provider files (e.g. {{ PROVIDER }}.tsx, {{ PROVIDER }}.definitions.ts)   |
| styles                                            | Responsible for application styles                                                  |
| utils                                             | Responsible for global functions, variables and definitions                         |
| utils/definitions                                 | Hosts all shareable interfaces and type definitions                                 |
| utils/methods                                     | Hosts all shareable methods                                                         |
| utils/models                                      | Hosts all shareable API models definitions                                          |
| utils/routes                                      | Hosts all shareable route structures                                                |

#### Design

Instead of a dashboard view, the layout is based on a searchable index. Infinite scrolling was introduced in order to improve the user experience. The index is sorted by breed name to make it easier for users to find the breed they are looking for. A background image was added in order to give a visual indicator of the currently focused breed. This image preview will allow users to quickly decide which breed they want to view more information about.

The breed details page has horizontal scrolling to allow users to view more images of the selected breed. The scroll is also infinite which makes cycling between the images a smooth experience.

A small count indicator was added to the favourites button to show the user how many breeds they have favourited. This is also used to confirm the user's action when they click the favourite button.

A full page error is shown when the breeds cannot be loaded. The application has no purpose without the breed data, hence hiding all other components is required so users do not get frustrated with broken UI.

### Backend

#### Architecture

```
|- backend
|  |- app
|     |- {{ FEATURE }}
```

| Folder            | Usage                                                                            |
| ----------------- | -------------------------------------------------------------------------------- |
| app               | Responsible for managing the application state and routing                       |
| app/{{ FEATURE }} | Hosts all files related to the feature (e.g. auth.controller.ts, auth.module.ts) |
