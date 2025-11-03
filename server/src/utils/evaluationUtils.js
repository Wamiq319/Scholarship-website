// calculate average evaluation score
export const calculateEvaluationScore = (evaluations) => {
  if (!evaluations.length) return 0;

  const totalScore = evaluations.reduce(
    (acc, ev) => {
      acc.merit += ev.scores.merit;
      acc.need += ev.scores.need;
      acc.extracurricular += ev.scores.extracurricular;
      return acc;
    },
    { merit: 0, need: 0, extracurricular: 0 }
  );

  const avgScore =
    (totalScore.merit + totalScore.need + totalScore.extracurricular) /
    (evaluations.length * 3);

  return avgScore;
};
