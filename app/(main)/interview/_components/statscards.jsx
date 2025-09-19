import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Brain, PersonStandingIcon, Trophy } from 'lucide-react';
import React from 'react';

const StatsCards = ({ assessments = [] }) => {
  const getAverageScore = () => {
    if (!assessments.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + (Number(assessment.quizScore) || 0),
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments.length) return null;
    // sort by createdAt (descending)
    const sorted = [...assessments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sorted[0];
  };

  const getTotalQuestions = () => {
    if (!assessments.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + (assessment.questions?.length || 0),
      0
    );
  };

  const latest = getLatestAssessment();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-xs text-muted-foreground">Across all assessments</p>
        </CardContent>
      </Card>

      {/* Total Questions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground">Total Questions</p>
        </CardContent>
      </Card>

      {/* Latest Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <PersonStandingIcon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {latest ? Number(latest.quizScore).toFixed(1) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
