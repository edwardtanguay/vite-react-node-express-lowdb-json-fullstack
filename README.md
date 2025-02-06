# vite-react-node-express-lowdb-json-fullstack

This is a fullstack React/Node/Express/lowdb-json application that runs in one directory. 

The lowdb database layer is read/write and uses one JSON file which is easy to read, search and edit with any editor, which makes this site particularly useful for local development tools or other internal apps.

The database layer is abstracted so that it can be swapped out with any other database, e.g. SQLite, MySQL or MongoDB.

In the frontend, easy-peasy Redux is used for straight-forward state management, which communicates with a dataModel that uses Zod to validate and cleanse all incoming data.

## frontend

-   Vite React
-   TypeScript - _types shared between frontend and backend_
-   React Router 6.4 - _with createBrowserRouter_
-   easy-peasy Redux - _state management_
-   Zod - _validation_
-   Tailwind & Sass
-   nodemon - _hot reloading_
-   concurrently - _runs backend/frontend with one command_
-   ESLint/Prettier
-   responsive - _less than 768px = vertical smartphone_

## backend API

-   Node/Express
-   TypeScript
-   lowdb with db.json - _datasource_

## setup

-   `npm i`
-   `npm run dev` - _starts both backend and frontend_
