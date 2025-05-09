const presence = new Presence({
  clientId: '1370078552581603489',
});

let startTimestamp = Math.floor(Date.now() / 1000);

enum ActivityAssets {
  Logo = 'https://cdn.rcd.gg/PreMiD/websites/H/HexaWatch/assets/logo.png',
}

presence.on('UpdateData', async () => {
  const { pathname } = document.location;
  const pathList = pathname.split('/').filter(Boolean);

  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    buttons: [
      { label: 'Open Hexa Watch', url: 'https://hexa.watch' },
    ],
  };

  // Clean title by removing " - Hexa Watch", etc.
  const cleanTitle = document.title.replace(/\s*[-|–]\s*Hexa\s*Watch\s*$/i, '').trim();

  switch (true) {
    case pathname.startsWith('/watch/movie'):
      presenceData.details = 'Watching a movie';
      presenceData.state = cleanTitle || 'A Movie';
      presenceData.startTimestamp = startTimestamp;
      break;
    case pathname.startsWith('/watch/tv'):
      presenceData.details = 'Watching a TV show';
      presenceData.state = cleanTitle || 'A TV Show';
      presenceData.startTimestamp = startTimestamp;
      break;
    case pathname.startsWith('/details/movie'):
      presenceData.details = 'Browsing movie details';
      presenceData.state = cleanTitle || 'A Movie';
      break;
    case pathname.startsWith('/details/tv'):
      presenceData.details = 'Browsing TV show details';
      presenceData.state = cleanTitle || 'A TV Show';
      break;
    case pathname.startsWith('/search'):
      presenceData.details = 'Searching on Hexa Watch';
      break;
    case pathname.startsWith('/collections'):
      presenceData.details = 'Browsing collections';
      break;
    default:
      presenceData.details = 'Browsing Hexa Watch';
      break;
  }

  if (presenceData.details) {
    presence.setActivity(presenceData);
  } else {
    presence.clearActivity();
  }
});
