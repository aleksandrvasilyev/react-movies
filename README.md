# Movies Explorer

## Live Demo

[Movies Explorer](https://react-movies-oleksandr.netlify.app/)

## Overview

Movies Explorer is a web application to allows users to show lists of movies, sort and filter movies by parameters, view detailed information about the movie, add movies to favorite, open view history page and search movies by it's title.

## Features

- Display list of movies
- View detailed information about a single movie
- Add movie to favorites
- Search movies by title
- Sort movies by parameters (rating, year, popularity)
- Filter movies by parameters (genre, year, votes count)

## Technologies Used

- React
- React router
- Context API
- TMDB API

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/aleksandrvasilyev/react-movies.git
   ```

2. Open application folder:

   ```bash
   cd react-movies
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy file .env.example to .env:

   ```bash
   cp .env.example .env
   ```

5. Add your api key from [TMDB (The Movie Database)](https://developer.themoviedb.org/docs/getting-started) to .env file

   ```bash
   VITE_API_TOKEN=YOUR_API_KEY
   ```

6. Start the server::

   ```bash
   npm run dev
   ```

7. Open link in your browser - [http://localhost:5173/](http://localhost:5173/)
