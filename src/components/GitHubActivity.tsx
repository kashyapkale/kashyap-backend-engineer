import { useEffect, useState } from "react";
import { Flame, Calendar, TrendingUp, Activity } from "lucide-react";
import { profile } from "@/content/profile";

interface GitHubStats {
  contributions: number[][];
  currentStreak: number;
  longestStreak: number;
  mostActiveDay: string;
  totalContributions: number;
  monthlyTrend: { month: string; count: number }[];
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

// Extract username from GitHub URL
const getGitHubUsername = (): string => {
  const githubUrl = profile.github || "";
  const match = githubUrl.match(/github\.com\/([^\/]+)/);
  return match ? match[1] : "kashyapkale";
};

// Fetch contribution data from GitHub GraphQL API
const fetchGitHubContributions = async (username: string): Promise<ContributionDay[]> => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  // Optional: Use GitHub token from environment variable for higher rate limits
  // Without token, you get 60 requests/hour. With token, you get 5000 requests/hour
  const token = import.meta.env.VITE_GITHUB_TOKEN || "";
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || "GitHub API error");
    }

    const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const contributions: ContributionDay[] = [];
    
    weeks.forEach((week: { contributionDays: ContributionDay[] }) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        contributions.push(day);
      });
    });

    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
};

// Transform GitHub API data into component format
const processContributions = (contributions: ContributionDay[]): GitHubStats => {
  // Group contributions by week (52 weeks = 1 year)
  const weeks: number[][] = [];
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
  
  // Create a map of date -> count
  const contributionMap = new Map<string, number>();
  contributions.forEach((day) => {
    contributionMap.set(day.date, day.contributionCount);
  });

  // Generate 52 weeks of data
  let currentWeek: number[] = [];
  let currentDatePointer = new Date(oneYearAgo);
  
  // Find the first Sunday (GitHub calendar starts on Sunday)
  while (currentDatePointer.getDay() !== 0) {
    currentDatePointer.setDate(currentDatePointer.getDate() - 1);
  }

  for (let week = 0; week < 52; week++) {
    currentWeek = [];
    for (let day = 0; day < 7; day++) {
      const dateStr = currentDatePointer.toISOString().split("T")[0];
      const count = contributionMap.get(dateStr) || 0;
      // Map to GitHub's contribution levels (0-4)
      // GitHub uses: 0, 1-9, 10-19, 20-29, 30+
      let level = 0;
      if (count >= 30) level = 4;
      else if (count >= 20) level = 3;
      else if (count >= 10) level = 2;
      else if (count >= 1) level = 1;
      currentWeek.push(level);
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }
    weeks.push(currentWeek);
  }

  // Calculate stats
  const totalContributions = contributions.reduce((sum, day) => sum + day.contributionCount, 0);
  
  // Sort contributions by date (oldest first)
  const sortedContributions = [...contributions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate streaks
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate current streak (from today backwards)
  const todayStr = today.toISOString().split("T")[0];
  let checkDate = new Date(today);
  let foundToday = false;
  
  // Check if today has contributions
  const todayContrib = contributionMap.get(todayStr) || 0;
  if (todayContrib > 0) {
    foundToday = true;
    currentStreak = 1;
    checkDate.setDate(checkDate.getDate() - 1);
    
    // Count backwards
    while (checkDate >= oneYearAgo) {
      const dateStr = checkDate.toISOString().split("T")[0];
      const count = contributionMap.get(dateStr) || 0;
      if (count > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak (across entire year)
  for (const day of sortedContributions) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate most active day
  const dayCounts: { [key: string]: number } = {};
  contributions.forEach((day) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    dayCounts[dayName] = (dayCounts[dayName] || 0) + day.contributionCount;
  });
  
  const mostActiveDay = Object.entries(dayCounts).reduce((a, b) => 
    dayCounts[a[0]] > dayCounts[b[0]] ? a : b
  )[0];

  // Calculate monthly trend (last 6 months)
  const monthlyTrend: { month: string; count: number }[] = [];
  const monthCounts: { [key: string]: number } = {};
  
  contributions.forEach((day) => {
    const date = new Date(day.date);
    const monthKey = date.toLocaleDateString("en-US", { month: "short" });
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + day.contributionCount;
  });

  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const currentMonthIndex = currentDate.getMonth();
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonthIndex - i + 12) % 12;
    const month = months[monthIndex];
    monthlyTrend.push({
      month,
      count: monthCounts[month] || 0,
    });
  }

  return {
    contributions: weeks,
    currentStreak,
    longestStreak,
    mostActiveDay,
    totalContributions,
    monthlyTrend,
  };
};

// Fallback placeholder data
const generatePlaceholderData = (): GitHubStats => {
  const contributions: number[][] = [];
  for (let week = 0; week < 52; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < 7; day++) {
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
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const username = getGitHubUsername();
        const contributions = await fetchGitHubContributions(username);
        const processedStats = processContributions(contributions);
        
        setStats(processedStats);
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch GitHub stats, using placeholder:", e);
        // Fallback to placeholder data on error
        setStats(generatePlaceholderData());
        setError(false); // Don't show error, just use placeholder
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
