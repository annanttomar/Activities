const presence = new Presence({
  clientId: '631166262881550359',
});

const presenceData: PresenceData = {
  details: 'Studying...',
  state: '📖',
  largeImageKey: 'https://i.ibb.co/WW7TNh7L/940956e1-8b78-424c-ad21-3a5e687dd6b4.jpg',
};

const emojis = ['📖', '📚', '📕', '📝', '✏️', '🧠', '💡', '📘', '📙', '📗'];
let emojiIndex = 0;

let stored = sessionStorage.getItem('startTimestamp');
if (!stored) {
  stored = Math.floor(Date.now() / 1000).toString(); // in seconds
  sessionStorage.setItem('startTimestamp', stored);
}
const startTimestamp = parseInt(stored, 10);

function updatePresence() {
  presenceData.state = emojis[emojiIndex]; // only emoji changes
  presenceData.startTimestamp = startTimestamp; // stays fixed
  presence.setActivity(presenceData);

  emojiIndex = (emojiIndex + 1) % emojis.length;
}

setInterval(updatePresence, 30000);

presence.on('UpdateData', () => {
  updatePresence();
});
