export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  isRead: boolean;
  isSaved: boolean;
  publishedAt: string;
  category: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  categories: string[];
  showSentiment: boolean;
  compactView: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id'>;
        Update: Partial<Omit<Article, 'id'>>;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>>;
      };
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>;
      };
    };
  };
}