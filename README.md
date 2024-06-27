# Local Eats Menu

Local Eats Menu is a simple yet powerful web application designed specifically for a local restaurant. It offers an engaging platform for visitors to explore the restaurant's menu, featuring a variety of dishes across different categories. The app includes a user-friendly interface for customers to rate the restaurant and leave reviews without the need for signing in, enhancing community interaction and feedback.

## Summary

The Local Eats Menu app is crafted with modern web technologies to provide a seamless browsing experience. It showcases a home page with a slider of featured dishes and a straightforward form for visitor ratings and reviews. Additionally, the meals page is organized into tabs for easy navigation between different food categories such as drinks, sandwiches, and more. Users can also mark dishes as favorites, adding a personalized touch to their browsing experience.

## Features

- **Dish Slider**: The home page features a slider showcasing multiple dishes to attract and engage visitors.
- **Rating and Review Form**: Visitors can easily rate the restaurant and leave reviews without needing to sign in.
- **Categorized Meals Page**: Navigate through different food categories like drinks, sandwiches, etc., via tabs.
- **Favorites Feature**: Users can favorite dishes for quick access in future visits.
- **Responsive Design**: Ensures a great user experience across all devices, from desktops to mobile phones.

## Tech Stack and Libraries

- **Next.js**: Utilized for its server-side rendering capabilities, enhancing SEO and performance.
- **React**: Powers the user interface, providing a smooth interactive experience.
- **Tailwind CSS**: Used for styling, enabling rapid development of custom designs.
- **Firebase**: Supports backend functionalities such as the database for storing ratings and reviews.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone git@github.com:DevDhaif/next-food.git
cd next-food
npm install
```

Next, start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## Environment Variables

Before starting the project, ensure you have set up the necessary environment variables in your `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## Project Structure

- `app/`: Contains page components and global styles.
- `components/`: Reusable components used across the application.
- `lib/`: Library code and utilities, including Firebase configuration.
- `public/`: Static assets like images.
- `styles/`: Global and utility stylesheets.

## Deployment

This project can be deployed on platforms like Vercel, Netlify, or any other static site hosting service that supports Next.js. Follow the deployment instructions provided by your hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
