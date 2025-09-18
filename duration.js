import ms from "ms";

/**
 * Generate an array of durations based on interval input (e.g., ["0:00", "30:00", "1:00:00"]); interval input example is in "H:MM:SS" or "MM:SS" format (e.g., "1:30" for 1 minute and 30 seconds, "1:00:00" for 1 hour)
 * 
 * @param {*} beginningDuration 
 * @param {*} endingDuration 
 * @param {*} intervalDuration 
 * @returns 
 */
export function generateDurations(
  beginningDuration,
  endingDuration,
  intervalDuration,
) {
  // Helper to parse any duration string to seconds
  function parseFlexibleDuration(duration) {
    if (typeof duration !== "string")
      throw new Error("Duration must be a string");
    // Try ms first
    let msValue = ms(duration);
    if (typeof msValue === "number") {
      return Math.floor(msValue / 1000);
    }
    // Try H:MM:SS or MM:SS
    const parts = duration.split(":").map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    throw new Error("Invalid duration format");
  }

  // Helper to format seconds as H:MM:SS or MM:SS
  function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    } else {
      return `${m}:${s.toString().padStart(2, "0")}`;
    }
  }

  const start = parseFlexibleDuration(beginningDuration);
  const end = parseFlexibleDuration(endingDuration);
  const step = parseFlexibleDuration(intervalDuration);

  if (step <= 0 || start > end) {
    return [];
  }

  const durations = [];
  for (let current = start; current <= end; current += step) {
    durations.push(formatDuration(current));
  }

  return durations;
}

// TODO: Rather than making this a separte function, have it be a dot annotation for generateDurations (e.g., generateDurations(...).asMarkdownList())

export function generateDurationsAsMarkdownList(
  beginningDuration,
  endingDuration,
  intervalDuration,
) {
  const durations = generateDurations(
    beginningDuration,
    endingDuration,
    intervalDuration,
  );
  return durations.map(d => `- ${d}`).join("\n");
}