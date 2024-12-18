// Utility to generate avatar from name
export const generateAvatarFromName = (name) => {
  if (!name) return "/default-avatar.png";

  // Extract initials
  const initials = name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");

  // Create SVG avatar
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="100" height="100" fill="${getColorFromName(name)}"/>
      <text 
        x="50" 
        y="50" 
        text-anchor="middle" 
        dy=".3em" 
        fill="white" 
        font-size="40"
      >
        ${initials}
      </text>
    </svg>
  `;

  // Convert SVG to base64
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate a consistent color based on name
export const getColorFromName = (name) => {
  if (!name) return "#3B82F6"; // default blue

  // Simple hash function to generate a color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a color
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};
