```markdown
# Health Dashboard
> Patient Health Dashboard for Prior Authorization  
> Basys.ai assessment

# Running Locally

```

cd client
yarn
yarn dev

```
```

cd server
yarn
npx nodemon index.ts

```

`.env` file inside server

```

MONGODB_URI=mongodb://username:password@host:port/database

```

# Project Structure

```

health-dashboard/
├── client/               # Frontend (React/Next.js or similar)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/               # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   ├── index.ts
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── package.json
├── README.md
└── .gitignore

```

# API Overview

| Method | Endpoint             | Description                          |
|---------|----------------------|--------------------------------------|
| GET     | `/api/patients`      | Fetch all patients                   |
| POST    | `/api/patients`      | Add new patient record               |
| GET     | `/api/patients/:id`  | Fetch patient by ID                  |
| PUT     | `/api/patients/:id`  | Update patient health details        |
| DELETE  | `/api/patients/:id`  | Delete patient record                |

# Technologies Used

- **Frontend:** React / Next.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Token)  
- **Development Tools:** Nodemon, ESLint, Prettier  

# Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request.

# License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.
```
