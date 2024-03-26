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

[Back-end repository](https://github.com/melanierawluk/mindful-meds-server)

![](./public/capstone_database.png)


## Endpoints

### GET /user/:userId
- Retrieves user profile information.

Parameters:
- userId: The unique identifier of the user to retrieve.

Response: 
```
{
    "id": 123,
    "email": "leeland@goldendoodle.com",
    "name": "Leeland Eyelet"
}
```

### GET /meds/:userId
- Retrieves a list of medications associated with a specified user. To retrieve only current medications, filter the response for those with `active: true`.

Parameters:
- userId: The ID of the user for whom to retrieve medications.

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

### GET /meds/:userId/:medId
- Retrieves details of a specific medication for a given user.

Parameters:
- userId: The ID of the user.
- medId: The ID of the medication.


Reponse:
```
{
    "id": 5,
    "active": 0,
    "name": "Wellbutrin",
    "dose": "150 mg",
    "frequency": "Once daily",
    "times": [
        "9:00 AM"
    ],
    "start_date": "2024-03-20T06:29:50.000Z",
    "end_date": "2024-03-26T14:26:20.000Z",
    "created_at": "2024-03-20T06:29:50.000Z",
    "updated_at": "2024-03-26T14:26:20.000Z",
    "user_id": 1
}
```

### GET /notes/userId/:date

- Retrieve notes for a specified date.

Parameters:
- userId: The ID of the user.
- date: The date for which notes are requested (YYYY-DD-MM).

Response:

```
{
    "id": 3,
    "date": "2024-03-21T06:00:00.000Z",
    "note_content": "Feeling pretty down today",
    "created_at": "2024-03-20T04:27:58.000Z",
    "updated_at": "2024-03-25T22:08:32.000Z",
    "user_id": 1
}
```

### GET /meds/:userId/date/:date

- Retrieves medications taken on a specific date for a given user.

Parameters
- userId: The ID of the user.
- date: The date for which medications are requested (YYYY-DD-MM).

Response

```
[
    {
        "id": 1,
        "name": "Prozac",
        "dose": "20mg",
        "frequency": "Twice daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
        ],
        "start_date": "2024-03-20T04:27:51.000Z",
        "end_date": "2024-03-26T14:21:42.000Z"
    },
]
```


### POST /meds/:userId/add

- Creates a new medication entry for a user.

Parameters

- userId: The ID of the user.

Request
```
{
    "name": "Buspirone",
    "dose": "60 mg",
    "frequency": "Once daily",
    "times": "6:00PM",
    "user_id": 1
}
```

Response
```
    {
        "id": 37,
        "active": 1,
        "name": "Buspirone",
        "dose": "50 mg",
        "frequency": "Once daily",
        "times": [
            "5:00PM"
        ],
        "start_date": "2024-03-26T15:42:33.000Z",
        "end_date": null,
        "created_at": "2024-03-26T15:42:33.000Z",
        "updated_at": "2024-03-26T15:42:33.000Z",
        "user_id": 1
    }
```

### POST /meds/:medId/update

- Creates a new entry in the database for a changed dose/frequency/times of medication.

Parameters:
- medId: The ID of the medication.

Request
```
{
    "name": "Buspirone",
    "dose": "60 mg",
    "frequency": "Once daily",
    "times": "6:00PM",
    "user_id": 1
}
```

Response
```
    {
        "id": 38,
        "active": 1,
        "name": "Buspirone",
        "dose": "60 mg",
        "frequency": "Once daily",
        "times": [
            "6:00PM"
        ],
        "start_date": "2024-03-26T15:47:00.000Z",
        "end_date": null,
        "created_at": "2024-03-26T15:47:00.000Z",
        "updated_at": "2024-03-26T15:47:00.000Z",
        "user_id": 1
    }
```


### PATCH /notes/:userId

- medId: The ID of the medication.

Parameters:
- userId: The ID of the user.

Request

```
{
    "date": "2024-03-11",
    "note_content": "Feeling energetic and optimistic"
}
```

Response
```
{
    "id": 9,
    "date": "2024-03-11T06:00:00.000Z",
    "note_content": "Feeling energetic and optimistic",
    "created_at": "2024-03-26T15:57:36.000Z",
    "updated_at": "2024-03-26T15:57:36.000Z",
    "user_id": 1
}
```


### POST /notes/:userId

- Creates a new note for a specified user.

Parameters: 
- userId: The ID of the user.

Request

```
{
    "date": "2024-03-11",
    "note_content": "Feeling energetic and optimistic"
}
```


Response

```
{
    "id": 9,
    "date": "2024-03-11T06:00:00.000Z",
    "note_content": "Feeling energetic and optimistic",
    "created_at": "2024-03-26T15:57:36.000Z",
    "updated_at": "2024-03-26T15:57:36.000Z",
    "user_id": 1
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
- GET /user/:userId
- GET /meds/:userId
- GET /meds/:userId/:medId
- GET /meds/:userId/date/:date
- POST /meds/:userId/add
- POST /meds/:medId/update
- GET /notes/userId/:date
- PATCH /notes/:userId
- POST /notes/:userId


## Nice-to-haves


- Connect API with list of common meds. When adding a new med, could suggest meds while user is typing
- Keep track of current medication inventory. Enter the amount of pills you have and how many you need to take each day and the app will calculate the date at which you need a refill.
- Text/email/push reminders for when to take medications based on the schedule added, and also for refilling meds. Send a reminder to the user to take notes when starting a new medication or tapering off one.
- Tracking for when the user logs or skips a certain medication for the day. Along with this, the swipe date functionality for the dashboard would be added. Selecting a certain date would tell the user whether or not they logged the medication. There would likely be a limitation for how far back th user could swipe, and likely no forward swiping into the future dates.
- User authentication
    - POST /auth/login - Endpoint to log in a user
    - POST /auth/register - Endpoint to create a new user
