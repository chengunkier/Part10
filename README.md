# Rate Repository App

A mobile application for rating GitHub repositories. Users can browse reviewed repositories, view individual repository details and reviews, and create new reviews when signed in. The app is built with React Native and Expo, and it uses a GraphQL API as its backend. Created as part of [Full Stack Open](https://fullstackopen.com/en/part10), part 10.

## Try the app on your phone

Scan the following QR code with the Expo Go app to try out the application:

![QR code](./qr-code.png)

## Features

- Browse a list of reviewed repositories
- Sort repositories by latest, highest rated, or lowest rated
- Search repositories by name or owner
- View a single repository's details and its reviews
- Sign in and sign up
- Create, view, and delete reviews

## Tech stack

- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL
- [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for forms and validation
- [React Router Native](https://reactrouter.com/) for navigation

## Running locally

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the project root with: