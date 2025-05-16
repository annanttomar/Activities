const presence = new Presence({
  clientId: '1350359904300564510',
});

const presenceData: PresenceData = {
  details: 'Idling 💤',
  state: '',
  largeImageKey: 'https://i.ibb.co/TBYtYzMc/940956e1-8b78-424c-ad21-3a5e687dd6b4.jpg',
};

let idleTS = sessionStorage.getItem('idleTimestamp');
if (!idleTS) {
  idleTS = String(Math.floor(Date.now() / 1000));
  sessionStorage.setItem('idleTimestamp', idleTS);
}
const idleTimestamp = Number(idleTS);

function updatePresence() {
  const title = document.title.trim();

  const isFocus = !title.startsWith('25:00 - Time to focus!') && title.includes('Time to focus!');
  const isShortBrk = title.includes('Time for a break!');
  const isLongBrk = title.includes('Timer for a break!');

  if (isFocus) {
    presenceData.details = 'Focusing 📖';
    presenceData.state = 'for 25 min…';
    delete presenceData.startTimestamp;
  } else if (isShortBrk || isLongBrk) {
    presenceData.details = 'Taking a break ☕';
    presenceData.state = 'Chilling ☕';
    delete presenceData.startTimestamp;
  } else {
    presenceData.details = 'Idling 💤';
    presenceData.state = '';
    presenceData.startTimestamp = idleTimestamp;
  }

  presence.setActivity(presenceData);
}

presence.on('UpdateData', updatePresence);
setInterval(updatePresence, 1000);
