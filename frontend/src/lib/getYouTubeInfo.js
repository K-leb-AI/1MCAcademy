export const getYouTubeInfo = async (url) => {
  // Extract video ID
  const videoIdRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = `${url}`.match(videoIdRegex);
  const videoId = match ? match[1] : null;

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch video info");
    }

    const data = await response.json();
    const video = data.items[0];

    if (!video) {
      throw new Error("Video not found");
    }

    // Parse ISO 8601 duration format (e.g., PT1H23M45S)
    const durationString = video.contentDetails.duration;
    const durationRegex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = durationString.match(durationRegex);

    const hours = parseInt(matches[1] || 0);
    const minutes = parseInt(matches[2] || 0);
    const seconds = parseInt(matches[3] || 0);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return {
      title: video.snippet.title,
      duration: totalSeconds, // in seconds
    };
  } catch (error) {
    console.error("Error fetching YouTube info:", error);
    throw error;
  }
};

// Usage
// const info = await getYouTubeInfo(
//   "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
// );
// console.log(info);
// {
//   videoId: "dQw4w9WgXcQ",
//   title: "Video Title",
//   duration: 5425,
//   durationFormatted: "1h 30m 25s",
//   thumbnail: "..."
// }
