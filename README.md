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
