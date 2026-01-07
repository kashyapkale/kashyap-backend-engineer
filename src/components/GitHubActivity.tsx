import { useEffect, useState } from "react";
import { Flame, Calendar, TrendingUp, Activity } from "lucide-react";

// Placeholder data structure - replace with API call later
// To integrate with real GitHub API:
// 1. Create a backend endpoint that fetches from GitHub GraphQL API
// 2. Use a GitHub token with read:user scope
// 3. Cache responses for 1 hour to avoid rate limiting
interface GitHubStats {
  contributions: number[][];
  currentStreak: number;
  longestStreak: number;
  mostActiveDay: string;
  totalContributions: number;
  monthlyTrend: { month: string; count: number }[];
}

const generatePlaceholderData = (): GitHubStats => {
  // Generate 52 weeks x 7 days of contribution data
  const contributions: number[][] = [];
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
      // Random contribution levels 0-4
      weekData.push(Math.floor(Math.random() * 5));
    }
    contributions.push(weekData);
  }

  return {
    contributions,
    currentStreak: 12,
    longestStreak: 47,
    mostActiveDay: "Tuesday",
    totalContributions: 847,
    monthlyTrend: [
      { month: "Aug", count: 78 },
      { month: "Sep", count: 92 },
      { month: "Oct", count: 156 },
      { month: "Nov", count: 134 },
      { month: "Dec", count: 89 },
      { month: "Jan", count: 112 },
    ],
  };
};

function ContributionGrid({ contributions }: { contributions: number[][] }) {
  const getLevelClass = (level: number) => {
    switch (level) {
      case 0: return "contrib-0";
      case 1: return "contrib-1";
      case 2: return "contrib-2";
      case 3: return "contrib-3";
      default: return "contrib-4";
    }
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-max">
        {contributions.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-[3px]">
            {week.map((level, dayIdx) => (
              <div
                key={dayIdx}
                className={`w-[10px] h-[10px] rounded-sm ${getLevelClass(level)} transition-colors`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-card rounded-md border border-border">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate API fetch - replace with real API call
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In production, this would be:
        // const response = await fetch('/api/github-stats', { next: { revalidate: 3600 } });
        // const data = await response.json();
        
        setStats(generatePlaceholderData());
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-12 border-t border-border">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          GitHub Activity
        </h2>
        <div className="space-y-4">
          <div className="h-[90px] skeleton-pulse rounded-md" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 skeleton-pulse rounded-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="py-12 border-t border-border">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          GitHub Activity
        </h2>
        <p className="text-sm text-muted-foreground">
          Unable to load GitHub activity. Check back later.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        GitHub Activity
      </h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-card rounded-lg border border-border">
          <ContributionGrid contributions={stats.contributions} />
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[10px] h-[10px] rounded-sm ${
                    level === 0 ? "contrib-0" :
                    level === 1 ? "contrib-1" :
                    level === 2 ? "contrib-2" :
                    level === 3 ? "contrib-3" : "contrib-4"
                  }`}
                />
              ))}
            </div>
            <span>More</span>
            <span className="ml-auto font-mono">{stats.totalContributions} contributions</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Flame} label="Current streak" value={`${stats.currentStreak} days`} />
          <StatCard icon={Calendar} label="Longest streak" value={`${stats.longestStreak} days`} />
          <StatCard icon={TrendingUp} label="Most active day" value={stats.mostActiveDay} />
          <StatCard icon={Activity} label="This month" value={stats.monthlyTrend[stats.monthlyTrend.length - 1].count} />
        </div>
      </div>
    </section>
  );
}
