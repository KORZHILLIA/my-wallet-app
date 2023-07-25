# Read in other languages: [Українська](README.ua.md)

# Vite + React + TS template

This project's been powered by **Vite** development environment with in-box
React-TS template.

## Deployment

The app is deployed at **Vercel** (https://my-wallet-app-jade.vercel.app).

## Features

1. This app is capable to recognize the device it's been running on and work
   accordingly.
2. In case of mobile device the message is shown instructing user how to act.
   User should install Metamask, add/restore his wallet and open inner Metamask
   browser which will allow to use the app.
3. In case of desktop the only thing is needed is Metamask browser extension.
4. The app works according to technical task.
5. Some important constants used are in .env file.
6. Helpers functions are separated.
7. All the async functions are separated.
8. There are several re-used shared components such as forms Input, OuterLink
   button, button with spinner.
9. Style mechanism is react scss modules.

## Unsolved problems.

1. Checksum validation was not applied due to deprecation of
   web3.utils.checkAddressCheckSum function as well as 'process is not defined'
   problem during using web3-validator with Vite. All others packages such as
   ethers.js, checksum, and eip55 also have conflict with Vite.
