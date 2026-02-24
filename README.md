# Prisma ORM Lab (Node.js + Postgres)

## 1. Setup

```bash
npm install
```

Set DB URL in `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb?schema=public"
PORT=3000
```

## 2. Prisma Migration

```bash
npx prisma migrate dev --name init_relations
npx prisma generate
```

## 3. Run API

```bash
npm run dev
```

Server: `http://localhost:3000`

## 4. Endpoints

- `POST /users` - create user with first post (nested write)
  - body:
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "postTitle": "My first post"
    }
    ```

- `GET /posts` - posts with author and categories (`include/select`)

- `POST /posts/categories` - create category
  - body:
    ```json
    {
      "name": "IT"
    }
    ```

- `POST /posts/category` - connect category to post (M:N)
  - body:
    ```json
    {
      "postId": 1,
      "categoryId": 1
    }
    ```

- `GET /users/with-post-count` - users with post count (`_count`)

- `GET /users/with-it-category` - authors who have at least one post in category `IT`

## 5. Prisma Studio

```bash
npx prisma studio
```

After migration, tables in PostgreSQL:
- `User`
- `Post`
- `Category`
- auto-generated join table for implicit many-to-many (`_CategoryToPost`)
