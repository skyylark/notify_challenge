# Light Feather Code Challenge

By Skylar Kuethe

## Table of Contents

- [Getting Started](#getting_started)
- [Usage](#usage)

## Getting Started <a name = "getting_started"></a>

### Prerequisites

Docker compose which should be installed with windows

Linux may need to install it separately

### Installing node modules

Running on Windows

Clone the repo

At the root folder of the project, run the following commands to get the node modules installed.

1.  cd backend/
2.  npm i
3.  cd ..
4.  cd frontend/
5.  npm i
6.  cd ..

all nodule modules should be isntalled for both front and backend

### Docker

run the following command at the root folder of the project.

    docker-compose up

it may take a minute or two for Docker to get both containers running
You should see that the backend is loaded

> Server is running at http://localhost:3001

Once React is loaded it should read

> Client_frontend | webpack complied successfully.

You can access http://localhost:3000 in your browser.

## Usage <a name = "usage"></a>

Send notification to backend system.
displays error is missing or invalid fields
Will display "Notification sent successfully" and clear all fields.
