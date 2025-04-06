import React from 'react';
import { Settings, BookMarked, Layout, TrendingUp, ChevronRight } from 'lucide-react';
import type { UserPreferences } from '../types';

interface SidebarProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

export function Sidebar({ preferences, onPreferencesChange }: SidebarProps) {
  const categories = [
    'Technology',
    'Business',
    'Science',
    'Health',
    'Entertainment',
    'Sports',
  ];

  return (
    <div className="w-72 bg-slate-900/50 backdrop-blur-md h-screen p-6 border-r border-purple-500/20">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg shadow-purple-500/20">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient">
          NewsFlow
        </h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-4">
            Categories
          </h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-purple-500/40 bg-purple-500/10 text-purple-500 focus:ring-purple-500/40"
                  checked={preferences.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...preferences.categories, category]
                      : preferences.categories.filter((c) => c !== category);
                    onPreferencesChange({ ...preferences, categories: newCategories });
                  }}
                />
                <span className="ml-2 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-purple-200 uppercase tracking-wider mb-4">
            Display
          </h2>
          <div className="space-y-2">
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-purple-500/40 bg-purple-500/10 text-purple-500 focus:ring-purple-500/40"
                checked={preferences.showSentiment}
                onChange={(e) => onPreferencesChange({ ...preferences, showSentiment: e.target.checked })}
              />
              <span className="ml-2 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                Show Sentiment
              </span>
            </label>
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-purple-500/40 bg-purple-500/10 text-purple-500 focus:ring-purple-500/40"
                checked={preferences.compactView}
                onChange={(e) => onPreferencesChange({ ...preferences, compactView: e.target.checked })}
              />
              <span className="ml-2 text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                Compact View
              </span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-purple-500/20">
          <button className="flex items-center justify-between w-full p-2 rounded-lg text-purple-200/80 hover:text-purple-200 hover:bg-purple-500/20 transition-colors group">
            <div className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              <span className="text-sm">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="flex items-center justify-between w-full p-2 rounded-lg text-purple-200/80 hover:text-purple-200 hover:bg-purple-500/20 transition-colors group">
            <div className="flex items-center">
              <BookMarked className="w-4 h-4 mr-2" />
              <span className="text-sm">Saved Articles</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="flex items-center justify-between w-full p-2 rounded-lg text-purple-200/80 hover:text-purple-200 hover:bg-purple-500/20 transition-colors group">
            <div className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              <span className="text-sm">View Options</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}