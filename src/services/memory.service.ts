const memoryStore = new Map<string, string[]>();

const MAX_HISTORY = 15;

export const storeMessage = (userId: string, message: string): void => {
  if (!memoryStore.has(userId)) {
    memoryStore.set(userId, []);
  }

  const history = memoryStore.get(userId)!;
  history.push(message);

  if (history.length > MAX_HISTORY) {
    history.shift();
  }

  memoryStore.set(userId, history);
};

export const getHistory = (userId: string): string[] => {
  return memoryStore.get(userId) || [];
};

export const clearHistory = (userId: string): void => {
  memoryStore.delete(userId);
};
