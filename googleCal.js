require("dotenv").config({ path: __dirname + "/.env" })
const {google} = require('googleapis')

const {OAuth2} = google.auth
const oAuth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY)
oAuth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})

const calendar = google.calendar({version: "v3", auth: oAuth2Client})
const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Meeting with backend',
    location: 'Marigold Street, Ajah',
    description: 'Meeting to discuss analytics',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver'
    },
    colorId: 5
}

calendar.freebusy.query({
    resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        items: [{id: 'primary'}]
    }
}, (err, res) => {
    if(err) return console.error('Free Busy query error: ', err)
    const eventsArr = res.data.calendars.primary.busy
    if (eventsArr.length === 0) return calendar.events.insert({calendarId: 'primary', resource: event}, err => {
        if (err) return console.error('Calendar event creation error: ', err)
        return console.log('calendar event created')
    })
    return console.log("I'm busy")
})