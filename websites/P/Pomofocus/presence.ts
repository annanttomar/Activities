const presence = new Presence({
  clientId: '1350359904300564510'
})

const presenceData: PresenceData = {
  details: 'Studying...',
  state: '📖',
  largeImageKey: 'https://i.ibb.co/TBYtYzMc/940956e1-8b78-424c-ad21-3a5e687dd6b4.jpg'
}

const emojis = ['📖', '📚', '📕', '📝', '✏️', '🧠', '💡', '📘', '📙', '📗']
let emojiIndex = 0

let stored = sessionStorage.getItem('startTimestamp')
if (!stored) {
  stored = Math.floor(Date.now() / 1000).toString()
  sessionStorage.setItem('startTimestamp', stored)
}
const startTimestamp = Number.parseInt(stored, 10)

function updatePresence(): void {
  presenceData.state = emojis[emojiIndex]
  presenceData.startTimestamp = startTimestamp
  presence.setActivity(presenceData)
  emojiIndex = (emojiIndex + 1) % emojis.length
}

setInterval(updatePresence, 30000)

presence.on('UpdateData', () => {
  updatePresence()
})
