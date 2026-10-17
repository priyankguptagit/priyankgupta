interface Achievement {
  id: string;
  title: string;
  type:
    | 'Patent'
    | 'Certification'
    | 'Award'
    | 'Publication'
    | 'Conference'
    | 'Speaking'
    | 'Training';
  status: string;
  applicationNumber?: string;
  approved: boolean;
}

export const publicAchievements: readonly Achievement[] = [];
