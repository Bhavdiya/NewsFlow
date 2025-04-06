import React from 'react';
import { Share2, Bookmark, BookmarkCheck, Circle, Clock } from 'lucide-react';
import type { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
  showSentiment?: boolean;
  onToggleSave: (id: string) => void;
  onMarkRead: (id: string) => void;
}

export function ArticleCard({
  article,
  compact = false,
  showSentiment = true,
  onToggleSave,
  onMarkRead,
}: ArticleCardProps) {
  const sentimentColors = {
    positive: 'text-green-400',
    neutral: 'text-blue-400',
    negative: 'text-red-400',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div
      className={`group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 ${
        article.isRead ? 'opacity-75' : ''
      }`}
      onClick={() => onMarkRead(article.id)}
    >
      <div className={`flex ${compact ? 'flex-row' : 'md:flex-row flex-col'}`}>
        <div className={`${compact ? 'w-48 h-48' : 'md:w-72 w-full h-48 md:h-full'} relative overflow-hidden`}>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showSentiment && (
            <div className="absolute top-3 right-3 bg-slate-800/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg shadow-purple-500/20">
              <Circle
                className={`w-4 h-4 ${sentimentColors[article.sentiment]} fill-current`}
              />
            </div>
          )}
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">
                  {article.category}
                </span>
                <div className="flex items-center text-purple-300/60 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                {article.title}
              </h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(article.id);
                }}
                className={`p-2 rounded-full transition-colors ${
                  article.isSaved
                    ? 'text-purple-400 bg-purple-500/20 hover:bg-purple-500/30'
                    : 'text-purple-300/60 hover:text-purple-300 hover:bg-purple-500/20'
                }`}
              >
                {article.isSaved ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full text-purple-300/60 hover:text-purple-300 hover:bg-purple-500/20 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          {!compact && (
            <p className="mt-3 text-purple-200/80">
              {article.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}