// Simple helper for generating temporary IDs for optimistic updates
let tempId = -1
export const nextTempId = () => tempId--
