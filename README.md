# This Was a Useful Tool While It Lasted

**Important Update**  
Due to recent changes in Strava's API policies ([read more here](https://www.theverge.com/2024/11/22/24303124/strava-fitness-data-wearables)). These restrictions limit third-party applications like this one from using Strava data in ways that were previously allowed.

# About

![General Results](/project-screenshots/Screenshot1.png)

### Overview

This web app is designed exclusively for Strava runs.

Strava offers a "Best Efforts" feature that categorizes your runs into specific distances by year, awarding medals (1st, 2nd, and 3rd) to the fastest all-time runs in each category and displaying an all-time top 10 for each distance. However, this feature is only available to premium subscribers and has several limitations:

- Strava's Best Efforts only shows categorized runs, not all of your runs.
- It sorts runs only by date.
- It shows only the top 10 all-time runs for each category, without displaying all of your runs.
- It includes split distances, such as 5km segments from a 10km run, within the 5km category.

This web app enhances and extends Strava's Best Efforts functionality, allowing users to view **all** their runs and categorize them by distance. It also provides the ability to sort runs by **date, kudos, pace, or time** using Strava's free API.

### Key Features

- **Full Access to Your Runs**: This app uses Strava's free API to retrieve all of your activities, focusing solely on runs without requiring a premium subscription.
- **Run Categorization**: Automatically categorizes runs into predefined distances (5km, 10km, 15km, Half-Marathon, 30km, Marathon, and 50km), based on the full run distance, excluding split times.
- **Flexible Sorting**: Allows sorting runs by date, kudos, pace, or time, unlike Strava's Best Efforts which only sorts by date.
- **Yearly and All-Time Views**: View best efforts across all time or broken down by year, with top 3 runs for each category.

# Built With

* [![Angular][Angular]][Angular-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![RxJS][RxJS]][RxJS-url]
* [![PrimeNG][PrimeNG]][PrimeNG-url]
* [![Strava][Strava]][Strava-url]
* [![Google Maps][GoogleMaps]][GoogleMaps-url]

# Getting Started
## Prerequisites


1. **Strava Developer Account**:

   To access your Strava data, you need to create a Strava Developer account and register an API application.
    -  Visit the [Strava Developer Dashboard](https://developers.strava.com/).
    - Log in with your existing Strava account.
    - Click on **Create an App** to register a new application.
    - Complete the required fields such as **App Name**, **App Description**, **Website** (make sure to set this to `http://localhost:4200`), and **Redirect URI** (make sure to set this to `callback`).
    - After creating your application, you will be provided with a **Client ID** and **Client Secret**. These credentials will be used to authenticate your application with the Strava API.
    
3. **Google Maps API**:

    To use the Google Maps API, you need to create a Google Cloud project and enable the Google Maps JavaScript API.
    - Visit the [Google Cloud Console](https://console.cloud.google.com/).
    - Log in with your Google account or create one.
    - Create a new project or use an existing one.
    - Navigate to the **API & Services** section, then click on **Library**.
    - Search for **Google Maps JavaScript API** and enable it for your project.
    - Go to **Credentials** and click **Create Credentials** to generate an API key.

5. **NPM and Node.js**: You need to have Node.js and npm installed to run the application.

   - If you don’t have Node.js installed, download and install it from the [official Node.js website](https://nodejs.org/).

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FionnMcA/strava-best-efforts-free.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter Your Strava API Application Credentials in `environments.ts`

   In your Angular project, navigate to the `src/environments/` directory and open the `environments.ts` file. Enter your Strava API credentials as follows:

   ```typescript
   export const environment = {
     production: false,
     STRAVA_CLIENT_ID: 'YOUR_CLIENT_ID',
     STRAVA_CLIENT_SECRET: 'YOUR_CLIENT_SECRET',
     REDIRECT_URI: 'http://localhost:4200/callback'
   };

4. In your Angular project navigate to `index.html` and replace `key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX` with you Google Maps API key
    ```
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX&libraries=geometry"></script>
    ```

# Usage

Once you have set up the `strava-best-efforts-free` application and installed all dependencies, you can start using it to fetch and categorize your running data from Strava.

## Running the Application

1. **Start the Application**

   To run the application, open your terminal, navigate to the project directory, and execute the following command:
   ```sh
   npm start
   ```
2. **Authorize with Strava**

   Open your web browser and navigate to the following URL to authorize the application with your Strava account:
   ```sh
   http://localhost:4200
   ```
3. **View Your Categorized Runs**

   After authorizing the application, it will automatically fetch your activities from Strava, categorize your runs by distance and year, and display them in the app. You can filter and sort your runs by date, kudos, pace, or time.

### Sort By Year
![Sort By Year](/project-screenshots/Screenshot2.png) 
### No PR Available
![No PR](/project-screenshots/Screenshot3.png)

[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[RxJS]: https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white
[RxJS-url]: https://rxjs.dev/

[Strava]: https://img.shields.io/badge/Strava-FC4C02?style=for-the-badge&logo=strava&logoColor=white
[Strava-url]: https://developers.strava.com/

[GoogleMaps]: https://img.shields.io/badge/Google%20Maps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white
[GoogleMaps-url]: https://developers.google.com/maps

[PrimeNG]: https://img.shields.io/badge/PrimeNG-3C85D5?style=for-the-badge&logo=primeng&logoColor=white
[PrimeNG-url]: https://primeng.org/installation
