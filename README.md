# News-Article

This project is a simple News application where users can view, create, update, and delete news articles. The application is built using **Laravel** for the mock up API and **React** with **Vite** for the frontend.

---

## Table of Contents

1. [Backend Setup (Laravel)](#backend-setup-laravel)
2. [Frontend Setup (React/Vite)](#frontend-setup-reactvite)
3. [API Endpoints](#api-endpoints)
4. [Project Structure](#project-structure)

---

## Backend Setup (Laravel)

To run the backend of the application, which is built with **Laravel**, follow the steps below:

### 1. Install PHP and Composer

Make sure that PHP and Composer are installed on your machine. You can download them from the following links:

- [PHP v8.3](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/)

### 2. Clone the Repository

Clone the repository to your local machine:

```bash
git clone git@github.com:QuantMis/news-article-assignment.git
cd news-api
```

### 3. Install Laravel Dependencies

Run the following command to install Laravel's dependencies using Composer:

```bash
composer install
```

### 4. Set Up Environment Variables

Copy the `.env.example` file to create a new `.env` file:

```bash
cp .env.example .env
```

### 5. Generate Application Key

Run the following command to generate an application key:

```bash
php artisan key:generate
```

### 6. Migrate Database

Run the following command to set up the database tables:

```bash
php artisan migrate
```

### 7. Run News Seeder

Run the following command to set up the database tables:

````bash
php artisan db:seed NewsSeeder
`

### 7. Serve the Laravel Application

Run the following command to start the Laravel development server:

```bash
php artisan serve
````

By default, the server will run on `http://localhost:8000`.

---

## Frontend Setup (React/Vite)

To run the frontend of the application, which is built with **React** and **Vite**, follow the steps below:

### 1. Install Node.js and npm

Make sure that **Node.js** and **npm** are installed on your machine. You can download them from the following link:

- [Node.js v20.15.0](https://nodejs.org/)

### 2. Install Frontend Dependencies

Run the following command to install the frontend dependencies:

```bash
npm install
```

### 3. Start the Vite Development Server

Run the following command to start the Vite development server:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

---

## API Endpoints

Here are the main API endpoints for the backend:

1. **GET /api/news** - Retrieve all news articles.
2. **GET /api/news/{id}** - Retrieve a single news article by ID.
3. **POST /api/news** - Create a new news article.
4. **PUT /api/news/{id}** - Update an existing news article by ID.
5. **DELETE /api/news/{id}** - Delete a news article by ID.

---

## Project Structure

### Backend API Mockup (Laravel)

- `app/Http/Controllers/NewsController.php` - Handles CRUD operations for news.
- `app/Models/News.php` - News model.
- `routes/api.php` - API routes for news endpoints.
- `.env` - Environment configuration for the backend (database, app key, etc.).

### Frontend (React/Vite)

- `src/components/NewsList.tsx` - Displays a list of news articles.
- `src/components/NewsDetail.tsx` - Displays the details of a single news article.
- `src/components/NewsForm.tsx` - Form for creating and editing news articles.
- `src/types/news.ts` - Type definition for the news articles.
- `.env` - Environment configuration for the frontend (API URL).
- `vite.config.ts` - Vite configuration file.
