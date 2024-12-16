export const API_KEYS = {
  admin: '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',
  project: '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',
  projectId: 'proj_AjdijKQfZsoZ7NPSNScOGID2'
};

export const checkApiKey = (key: string): boolean => {
  return key !== '' && key !== 'your-api-key';
};

export const getOpenAIKey = (isAdmin: boolean = false): string => {
  return isAdmin ? API_KEYS.admin : API_KEYS.project;
};