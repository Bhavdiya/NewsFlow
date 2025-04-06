import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ArticleCard } from './components/ArticleCard';
import type { Article, UserPreferences } from './types';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of AI in Healthcare',
    summary: 'Artificial intelligence is revolutionizing healthcare with breakthrough applications in diagnosis and treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800',
    sentiment: 'positive',
    isRead: false,
    isSaved: false,
    publishedAt: '2024-03-15T10:00:00Z',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Global Markets Face New Challenges',
    summary: 'Economic experts analyze the impact of recent global events on financial markets.',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800',
    sentiment: 'neutral',
    isRead: false,
    isSaved: true,
    publishedAt: '2024-03-15T09:30:00Z',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Breakthrough in Quantum Computing',
    summary: 'Scientists achieve major milestone in quantum computing research.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800',
    sentiment: 'positive',
    isRead: true,
    isSaved: false,
    publishedAt: '2024-03-15T08:45:00Z',
    category: 'Science'
  }
];

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: ['Technology', 'Business', 'Science'],
    showSentiment: true,
    compactView: false,
  } as UserPreferences);

  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);

  const handleToggleSave = (id: string) => {
    setArticles(articles.map(article =>
      article.id === id ? { ...article, isSaved: !article.isSaved } : article
    ));
  };

  const handleMarkRead = (id: string) => {
    setArticles(articles.map(article =>
      article.id === id ? { ...article, isRead: true } : article
    ));
  };

  const filteredArticles = articles.filter(article =>
    preferences.categories.includes(article.category)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar
        preferences={preferences}
        onPreferencesChange={setPreferences}
      />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient">
              Your News Feed
            </h2>
            <div className="flex gap-2">
              {preferences.categories.map(category => (
                <span
                  key={category}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/20 text-purple-200"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            {filteredArticles.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                compact={preferences.compactView}
                showSentiment={preferences.showSentiment}
                onToggleSave={handleToggleSave}
                onMarkRead={handleMarkRead}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;