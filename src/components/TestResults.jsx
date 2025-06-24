import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function TestResultCard({ result }) {
  return (
    <div className="result-card">
      <div className="card-header">
        <span className="subject">{result.subject}</span>
        <span className="date">{new Date(result.test_date).toLocaleDateString()}</span>
      </div>
      <div className="marks">
        <div className="full-marks">
          <span className="label">Full Marks:</span>
          <span className="value">{result.full_marks}</span>
        </div>
        <div className="obtained-marks">
          <span className="label">Obtained:</span>
          <span className="value">{result.obtained_marks}</span>
        </div>
        <div className="percentage">
          <span className="label">Percentage:</span>
          <span className="value">{result.percentage.toFixed(2)}%</span>
        </div>
        <div className="rank">
          <span className="label">Rank:</span>
          <span className="value">{result.rank}</span>
        </div>
      </div>
    </div>
  );
}

const TestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTestResults() {
      try {
        setLoading(true);
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        const user = userData?.user;
        
        if (!user || !user.id) {
          setError('User not logged in');
          return;
        }

        // Get student's centre
        const { data: studentData, error: studentError } = await supabase
          .from('profiles')
          .select('centre_id')
          .eq('id', user.id)
          .single();

        if (studentError) throw studentError;
        const studentCentreId = studentData?.centre_id;

        // Get all test results for the student's centre
        const { data, error } = await supabase
          .from('test_results')
          .select('*')
          .eq('centre_id', studentCentreId)
          .order('test_date', { ascending: false });

        if (error) throw error;
        
        // Calculate ranks within the centre
        const resultsWithRanks = await Promise.all(
          data.map(async (result) => {
            const { count } = await supabase
              .from('test_results')
              .select('*', { count: 'exact', head: true })
              .eq('centre_id', studentCentreId)
              .eq('test_name', result.test_name)
              .eq('subject', result.subject)
              .gt('percentage', result.percentage);

            return {
              ...result,
              rank: count + 1
            };
          })
        );

        setTestResults(resultsWithRanks);
      } catch (err) {
        setError('Failed to load test results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestResults();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Group results by week
  const resultsByWeek = testResults.reduce((acc, result) => {
    if (!acc[result.week]) acc[result.week] = [];
    acc[result.week].push(result);
    return acc;
  }, {});

  const weekSections = Object.entries(resultsByWeek).map(([week, results]) => (
    <div key={week} className="week-section">
      <h3>Week {week}</h3>
      <div className="test-comparison">
        {results.map((result) => (
          <div key={result.id} className="test-box">
            <h4>{result.test_name}</h4>
            <TestResultCard result={result} />
          </div>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="test-results-container">
      <h2>Test Results</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {testResults.length === 0 ? (
        <div className="no-results">No test results available</div>
      ) : (
        weekSections
      )}
    </div>
  );
};

export default TestResults;
