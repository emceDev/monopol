This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Description

This application is a clone of real life game called monopoly.
It is MVP (Minimum Viable Product) made to learn Next. And it was great fun to develop it with LEAN and AGILE in mind,
continous feedback pushed me further with knowledge that what I do is what users want.
Application is playable, but there is no traffic since I stopped my diploma paper experiment.
This app is only to gather information, but has/will have many functionalities that early adopters may like.
Gameplay over graphics :)

# Structure

Hosted: vercel,
Backend: vercel/node,
Front: React,
Database: Firebase Real Time Database,
State mgmt: Recoil,

# User story (simplified)

I want to play cardboard game, but I cannot since friends are far away.,
I open website, create game, wait for players and play...

# Folder structure

/Pages/api - api side of next all the logic, db queries,
/Pages/Home.tsx - good entry point to the project,
/components/GameData.js - Component rendering game board and inGame UI,
/state - recoil state atoms,
/styles - styles divied by sections,

# Notes

There is automatic loggin mechanism implemented now, as to give user immediate ability to test the app.
Gameboard update mechanism is relying on pooling, it should be changed.
Very few of next capabilities were used in this project.
There are still console.logs to help with development, there is no distinction between production or development.
It is best to follow with ctrl + LMB as some files are big, but functions are mostly self explanatory.
