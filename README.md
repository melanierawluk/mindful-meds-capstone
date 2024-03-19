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

- Unique user profiles with log in, log out, and sign up functionality
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
- JWT


## APIs

- No external API's

## Sitemap

  - Register
  - Log in 
  - Dashboard
      - Popup/modal to log or skip dose. User can also navigate to the medication details page by clicking on the card
  - Medications
  - Add new med
  - Notes
  - Profile
  

## Mockups

![](./public/capstone_proposal_mockup.png)

## Data


- User table
    - primary key: user id
    - email
    - password
    - name

- Medication table
    - primary key: med id
    - forgein key: user id
    - boolean: active med
    - dose
    - frequency
    - list of times?
    - created_at
    - updated_at

- Notes table?
    - primary key: note id
    - foreign key: user id
    - created_at
    - updated_at
    - note content


## Endpoints


### POST /auth/login

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### POST /auth/register

- Create new user

Parameters:

- email: User's email
- name: User's name
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### POST /med/add

- Create new medication

Parameters

- medication_name
- strength
- frequency
- times

```
    {
        "id": 1,
        "medication_name": "Abilify",
        "strength": 15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ]
    }
```

### PUT /med/:id/edit

- Updates/edits to existing med (note or info)

Parameters:
- id: medication id
- medication_name
- strength
- frequency
- times

Response:

```
    {
        "id": 1,
        "medication_name": "Abilify",
        "strength": 15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ],
        "notes": [
            {
            id: 1,
            "created_at": timestamp,
            "updated_at": timestamp,
            "note_content": "Lorem ipsum"
            }
        ]
    }
```

### GET /user/:id
- User profile

Parameters:
- id: user id

Response: 
```
{
    "id": 123,
    "email": "leeland@goldendoodle.com",
    "name": "Leeland Eyelet,
    "password": ***
}
```

### GET /user/:id/meds/active
- List of all current meds for user (active:true)

Parameters:
- id: user id

Response:

```
    {
        "id": 1,
        "user_id": 123
        "active": true
        "medication_name": "Abilify",
        "strength": 15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ],
        "notes": [
            {
            id: 1,
            "created_at": timestamp,
            "updated_at": timestamp,
            "note_content": "Lorem ipsum"
            }
        ]
    }
```

### GET /user/:id/meds/inactive
- List of all past meds for user (active:false)

Parameters:
- id: user id

Response:

```
    {
        "id": 1,
        "user_id": 123
        "active": false,
        "medication_name": "Abilify",
        "strength": 15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ],
        "notes": [
            {
            id: 1,
            "created_at": timestamp,
            "updated_at": timestamp,
            "note_content": "Lorem ipsum"
            }
        ]
    }
```

### GET /user/:id/meds/:id
- Medication details for specific medication

Parameters:
- id: user id
- id: medication id


Reponse:
```
    {
        "id": 1,
        "user_id": 123,
        "medication_name": "Abilify",
        "strength": 15mg",
        "frequency": "Once daily",
        "times": [
            "9:00 AM",
            "6:00 PM"
            ],
        "notes": [
            {
            id: 1,
            "created_at": timestamp,
            "updated_at": timestamp,
            "note_content": "Lorem ipsum"
            }
        ]
    }
```

## Auth


- There will be log in, log out, and sign up functionality
- This will be implemented with JWT

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

FRONT END
- Initial folder structure and git repo
- Setup SASS variables, mixins, colors, fonts
- Assets: icons for menu, icons for tablet/capsule
- Setup react router
- Header component (pastel gradient)
- Menu/footer component (5 icons: home, pills, plus, notes, avatar)
- Log in page
- Sign up page
- Dashboard page (current date, "calendar" swipe of previous/future dates)
- Medication List page
- Add new med page
- Notes page
- Profile page
- Medication detail modal (from medicaiton list page)
- Schedule detail modal (from dashboard page)
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
- API to GET list of all current medications (display on dashboard with name, time & dose)
- API to GET details of a single medication (medication detail page)
- API to POST new medication
- API to PUT updates to existing medication (edits and/or skipped/taken data)
- API to POST new user
- API to POST login
- API to GET profile information


## Nice-to-haves


- Connect API with list of common meds. When adding a new med, could suggest meds while user is typing
- Keep track of current medication inventory. Enter the amount of pills you have and how many you need to take each day and the app will calculate the date at which you need a refill.
- Text/email/push reminders for when to take medications based on the schedule added, and also for refilling meds. Send a reminder to the user to take notes when starting a new medication or tapering off one.
