# Mindful Meds

## Overview


- Medication tracking app, focusing on people who take medication for treating mental illnesses.


## Problem


- Mental illnesses often require a cocktail of medications to treat, and multiple attempts at finding the right combination. This app will help people track the different medications (current and past) and their corresponding doses. This may be especially helpful for times when transitioning meds - either tapering off or adding new medications. Notes for any negative or positive affects can be added in the app and either brought to the attention of the doctor, or used as a reference in the future.

## User Profile

- People who take medication for mental illness.
- Looking for a way to keep track of medications
- Mobile app experience

## Features

- Add current medications and corresponding medication schedule. Include the name of the medication, the dose, frequency, and times when medication is to be taken
- Add notes on any symptoms/ side effects. Will either be in calendar or list format. Should show a list of medications that were currently being taken at that time.
- Show a history of past medications with the date, and dosage

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


## APIs

- No external API's

## Sitemap

  - Register
  - Log in 
  - Dashboard
  - Medications List
    - Medication detail modal
  - Add new med
  - Notes
  - Profile
  

## Mockups

![](./public/capstone_proposal_mockup.png)

## Data

![](./public/capstone_database.png)


## Endpoints

### GET /user/:id
- Endpoint to get a user profile

Parameters:
- id: The ID of the user that we want to retrieve

Response: 
```
{
    "id": 123,
    "email": "leeland@goldendoodle.com",
    "name": "Leeland Eyelet"
}
```

### GET /user/:id/meds
- Endpoint to retrieve a list of all meds for specified user. To get current meds, filter response for `active: true`

Parameters:
- id: The ID of the user that we want retrieved

Response:

```
[
    {
        "id": 1,
        "user_id": 123,
        "active": true || false,
        "medication_name": "Abilify",
        "dose": "15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
        ],
        "start_date": "timestamp",
        "end_date": "timestamp" || NULL
    },
    {
        // Objects of other medications
    }
]
```

### GET /user/:id/meds/:id
- Endpoint to retrieve medication details for specific medication

Parameters:
- id: The ID of the user that we want retrieved
- id: The ID of the medication that we want retrieved


Reponse:
```
{
    "id": 1,
    "user_id": 123,
    "medication_name": "Abilify",
    "dose": 15mg",
    "frequency": "Once daily",
    "times": [
        "9:00 AM",
        "6:00 PM"
        ],
    "start_date": "timestamp",
    "end_date": "timestamp" || NULL
}
```

### GET /user/:id/notes/:date

- Retrieve notes for a specified date. Includes information about medication that were active on the specified date

Parameters:
- id: The ID of the user.
- date: The specific date for the notes and active medications being requested.

Response:

```
[
    {
        "id": 1,
        "user_id": 123,
        "note_content": "Lorem ipsum",
        "medications": [
            {
                "id": 1,
                "medication_name": "Abilify",
                "dose": "15mg",
                "frequency": "Once daily",
                    times": [
                        "9:00 AM",
                        "6:00 PM"
                        ]
            },
            // Additional active medication objects at specified date
        ]
    }
]
```
### POST /meds/add

- Endpoint to create a new medication

Parameters

- name: The name of the medication.
- dose: The strength/dose of the medication.
- frequency: The frequency that the medication is taken.
- times: An array of times when the medication is taken.

```
    {
        "id": 1,
        "name": "Abilify",
        "active": true,
        "dose": "15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ],
        "start_date": current date
    }
```

### POST /meds/:id/update

- Endpoint to create a new entry in the database for a changed dose

Parameters:
- id: The ID of the medication to be updated.
- dose: The updated dose of the medication.
- frequency: The updated frequency when the medication is taken.
- times: Array of updated times when the medication is taken.

Response:

```
{
    "id": 1,
    "name": "Abilify",
    "active": true,
    "dose": "15mg",
    "frequency": "Once daily",
    "times": [
        "9:00 AM",
        "6:00 PM"
    ],
    "start_date": current date
}
```

## Auth

- Method of authentication has not been finalized (*"Nice to have"*)

## Roadmap


FRONT END
- Initial folder structure and git repo
- Setup SASS variables, mixins, colors, fonts
- Assets: icons for menu, icons for tablet/capsule
- Setup react router
- Header component (pastel gradient)
- Menu/footer component (5 icons: home, pills, plus, notes, avatar)
- Log in page
- Sign up page
- Dashboard page
- Medication List page
    - Medication detail modal 
- Add new med page
- Notes page
- Profile page
- Components:
    - Header
    - Footer/Menu
    - Cards
    - Popup/modal
    - Calendar
    - Buttons
    - Inputs


BACK END
- Initial folder structure and git repo
- Database connection with knex
- Knex migrations and seeds
- POST /meds/add - Endpoint to create a new medication
- POST /meds/:id/update - Endpoint to update/edit med dose, frequency, or times taken
- GET /user/:id - Endpoint to get a user profile
- GET /user/:id/meds - Endpoint to retrieve a list of all meds for user
- GET /user/:id/meds/:id - Endpoint to retireve medication details for specific medication
- GET /user/:id/notes/:date - Retrieve notes for a specified date. Includes information about medication that were active on the specified date


## Nice-to-haves


- Connect API with list of common meds. When adding a new med, could suggest meds while user is typing
- Keep track of current medication inventory. Enter the amount of pills you have and how many you need to take each day and the app will calculate the date at which you need a refill.
- Text/email/push reminders for when to take medications based on the schedule added, and also for refilling meds. Send a reminder to the user to take notes when starting a new medication or tapering off one.
- Tracking for when the user logs or skips a certain medication for the day. Along with this, the swipe date functionality for the dashboard would be added. Selecting a certain date would tell the user whether or not they logged the medication. There would likely be a limitation for how far back th user could swipe, and likely no forward swiping into the future dates.
- User authentication
    - POST /auth/login - Endpoint to log in a user
    - POST /auth/register - Endpoint to create a new user
