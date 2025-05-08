const presence = new Presence({
    clientId: '1370078552581603489', 
  });
  
  const browsingTimestamp = Math.floor(Date.now() / 1000);
  
  enum ActivityAssets {
    Logo = 'https://hexa.watch/favicon.ico',
  }
  
  presence.on('UpdateData', async () => {
    const presenceData: PresenceData = {
      largeImageKey: ActivityAssets.Logo,
      largeImageText: 'Hexa Watch',
      startTimestamp: browsingTimestamp,
      buttons: [
        {
          label: 'Open Website',
          url: 'https://hexa.watch',
        },
      ],
    };
  
    const { pathname, href, search } = document.location;
    const pathList = pathname.split('/').filter(Boolean);
    const searchParams = new URLSearchParams(search);
  
    let movieName: string | null = null;
    let timeSpent: string = '';
  
    // Movie page detection
    if (pathname.startsWith('/watch/movie/')) {
      const movieIdMatch = pathname.match(/\/watch\/movie\/(\d+)/);
      if (movieIdMatch) {
        movieName = document.title.replace(/ - Hexa Watch$/, ''); // Get the movie name from the document title (customize based on how titles are structured on the site)
        const elapsedTime = Math.floor((Date.now() / 1000) - browsingTimestamp); // Calculate the elapsed time in seconds
        timeSpent = formatElapsedTime(elapsedTime);
      }
      presenceData.details = `Watching ${movieName}`;
      presenceData.state = `Movie - ${timeSpent}`;
    } else {
      // Not watching a movie, idle or browsing
      if (pathname === '/' || pathname.startsWith('/search')) {
        presenceData.details = 'Browsing Hexa Watch';
        presenceData.state = 'Searching or Idling';
      } else {
        presenceData.details = 'Browsing Hexa Watch';
        presenceData.state = 'On hexa.watch';
      }
    }
  
    if (presenceData.details) {
      presence.setActivity(presenceData);
    } else {
      presence.clearActivity();
    }
  });
  
  // Helper function to format elapsed time (e.g., "12 minutes ago")
  function formatElapsedTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
  