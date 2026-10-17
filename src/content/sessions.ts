export interface Session {
  id: string;
  title: string;
  topicId: string;
  eventType: string;
  audienceCategory: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  free: boolean;
  date?: string;
  duration?: string;
  status: 'Proposed' | 'Open' | 'Scheduled' | 'Registration Closed' | 'Completed' | 'Postponed' | 'Cancelled';
}

export const sessions: readonly Session[] = [];