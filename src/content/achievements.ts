export interface Achievement {
  id: string;
  title: string;
  type: 'Patent' | 'Certification' | 'Award' | 'Publication' | 'Conference' | 'Speaking' | 'Training';
  status: string;
  applicationNumber?: string;
  approved: boolean;
  link?: string;
}

export const achievements: readonly Achievement[] = [{
  id: 'patent-201921032486',
  title: 'AI-Based Ensembled Bot Mechanism for Indian Stock Market Prediction and Customer Advisory System for Traders',
  type: 'Patent', applicationNumber: '201921032486', status: 'Published', approved: false,
}];
export const publicAchievements = achievements.filter(achievement => achievement.approved);