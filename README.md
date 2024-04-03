# Mindful Meds

## Overview

Mindful Meds is a medication tracking application designed for individuals managing mental illnesses.


## Problem

Treating mental illnesses often involves a complex combination of medications, necessitating careful monitoring and adjustment. Mindful Meds facilitates tracking current and past medications, along with their respective dosages. This is particularly beneficial during transitions, such as tapering off or introducing new medications. Users can record any side effects or benefits for discussion with their healthcare provider or for future reference.


## Local Installation / Setup

### Client repo (this one)
- Install Node packages
- Launch the application
- Open the device toolbar in Chrome Dev Tools and select *"iPhone 12 Pro"*
- Navigate to `http://localhost:3000/login`
- Login credentials:
    - email: `leeland@goldendoodle.com`
    - password: `1234`

    ```
    npm install

    npm start
    ```

### Server repo ([link here](https://github.com/melanierawluk/mindful-meds-server))
- Install Node packages
- Set up the database
- Run migrations
- Seed the tables
- Start the server

    ```
    npm install

    npx knex migrate:latest
    npx knex seed:run --specific users.js
    npx knex seed:run --specific medications.js
    npx knex seed:run --specific notes.js

    node --watch server.js
    ```

 ## Visuals

![](./public/visuals/mm-visuals.png)

## User Journey
**Login**
- Use the credentials provided in the seed files:
    - email: `leeland@goldendoodle.com`
    - password: `1234`

**Register**
- Upon registration, users are redirected to the login page.
    
**Dashboard** 

- Upon login, users are directed to the dashboard.
- The dashboard displays the current medication schedule, grouped by times and including dosages. *NOTE: The cards are not clickable at the moment*.
- Users can add notes directly from this page or navigate to the notes page via the bottom navigation menu.
- Future functionality: Implement a modal to log taken medications, with a verification icon appearing afterward.


**Medication List**
- Lists all current and past medications.

- Click each medication to view its details and history.

    - **Medication Details**: 
        - Users can view detailed information about each medication, edit dosage and frequency, and deactivate medications.
        - Deactivated medications are moved from the dashboard to the past medications list.

    - **Medication History**: 
        Displays past dose and schedule combinations for each medication.


**Add New Med**
- Allows users to add new medications with details such as name, dose, frequency, and scheduled times.
- Redirects users to the dashboard after a brief delay upon saving.

**Notes**
- Includes a calendar for users to view past medications and associated notes.
- *Future functionality*: Implement autosave for notes.

**Profile**
- Displays user information and allows logout.
- *Future functionality*: Enable users to edit their information.


## Additional Future Functionality

- Inventory Tracking: Monitor current medication supply and calculate refill dates.
- Reminders: Send notifications for medication intake and refills.
- Logging: Track when users log or skip medications.
- Swipe Date Functionality: Implement a horizontal scrollable calendar on the dashboard for easy date selection and medication logging.


# Implementation

## Tech Stack


- React.js
- SASS
- Material UI
- Node
- Express
- Axios
- Knex
- MySQL



## Database

![](./public/capstone_database.png)