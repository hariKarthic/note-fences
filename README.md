# NoteFence App
An app to send location aware notes which will be received when device is in that particular geo-fenced location.

## Getting Started
Following instruction will help you to get this code and make it up and running in your local environment.

### Prerequisites
List of softwares/setup required:
- Node
- VSCode or any other editor for javascript code editing
- Account with Heroku
- Account registered with firebase
- Account registered with Sentry ( for logging )
- A terminal/bash command prompt

##### Configuration and Installation
To install/run the applicaiton, please follow the following instruction step by step:
1. Checkout the code from the repo `https://github.com/Hackbit/reactriot2018-note-fence.git`
2. Once checkout, run `npm install` command to install all the dependencies
3. Open `client/src/index.js` and update the sentry configuration url as per your account.
4. Also, feel free to update `client/public/index.html` to update the voting url added before closing tag of `body`
5. Open the `VoteWidget.js` file and update the voting url there also.
6. Now, use the command `npm run build && npm run start` to launch the application.

##### Running the app
As mentioned in install section, once the app started, navigate to browser and launch
```
http://localhost:3000
```
** All Features might not work in localhost because some of the features used by application need to server the app on `https`
## Deployment
Deployment can be done on heroku or any other platform which supports node deployment. We deployed on heroku and the guidelines followed was as per the heroku `official documentation`.
So, in short, we need to create an app on heroku and then we can publish our app to the heroku app.
Once deployed, we can launch the app through the URL provided by heroku.

## Use cases
1. As a consumer, I went to a place where I found something that I want other colleagues to notify once they are at that location, we can send the text notes with the information.
once user comes to that geo fenced location, they will receive the note on their phone.

## Future
- Plan to move this app to react-native for better performance and improved features

## Limitations
- As of now this app does not work in background. To receive notes, the app has to be running in foreground.

## Authors
- Hari Karthick
- Anirvann Das
- Anand Kumar

## Credits
- Smashicons (for app icon)
    > https://www.flaticon.com/authors/smashicons