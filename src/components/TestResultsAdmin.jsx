import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import '../components/TestResultsAdmin.css';
import CustomSelect from './CustomSelect';

const TestResultsAdmin = () => {
  // View mode: 'add' or 'manage'
  const [viewMode, setViewMode] = useState('add');
  const [testResults, setTestResults] = useState([]);
const [studentNames, setStudentNames] = useState({});
const [centreNames, setCentreNames] = useState({});

  // Fetch test results for manage mode
  useEffect(() => {
    if (viewMode === 'manage') {
      fetchTestResults();
    }
    // eslint-disable-next-line
  }, [viewMode]);

  const fetchTestResults = async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('test_date', { ascending: false });
    if (error) throw error;
    setTestResults(data || []);

    // Fetch all unique student_ids and centre_ids for name mapping
    const studentIds = [...new Set((data || []).map(r => r.student_id).filter(Boolean))];
    const centreIds = [...new Set((data || []).map(r => r.centre_id).filter(Boolean))];

    // Fetch student names
    if (studentIds.length > 0) {
      const { data: students, error: studentError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', studentIds);
      if (!studentError && students) {
        const map = {};
        students.forEach(s => { map[s.id] = s.full_name; });
        setStudentNames(map);
      }
    } else {
      setStudentNames({});
    }

    // Fetch centre names
    if (centreIds.length > 0) {
      const { data: centres, error: centreError } = await supabase
        .from('centres')
        .select('id, name')
        .in('id', centreIds);
      if (!centreError && centres) {
        const cmap = {};
        centres.forEach(c => { cmap[c.id] = c.name; });
        setCentreNames(cmap);
      }
    } else {
      setCentreNames({});
    }
  } catch (err) {
    setError('Failed to fetch test results');
  } finally {
    setLoading(false);
  }
};

  const handleDeleteTestResult = async (id) => {
    if (!window.confirm('Are you sure you want to delete this test result?')) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('test_results')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setTestResults(results => results.filter(r => r.id !== id));
    } catch (err) {
      setError('Failed to delete test result');
    } finally {
      setLoading(false);
    }
  };

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedTest: null, // will hold the selected test object
    newTest: { test_name: '', test_date: '', centre_id: '' },
    selectedStudents: [], // array of student ids
    studentSubjects: {}, // { studentId: [ { subject, full_marks, obtained_marks } ] }
  });

  const [tests, setTests] = useState([]);
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [centres, setCentres] = useState([]);
  const [selectedCentreStudents, setSelectedCentreStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Effect hooks
  useEffect(() => {
    fetchCentres();
    fetchTests();
  }, []);

  useEffect(() => {
    if (formData.selectedTest && formData.selectedTest.centre_id) {
      fetchStudentsByCentre(formData.selectedTest.centre_id);
    }
  }, [formData.selectedTest]);

  // Data fetching functions
  const fetchTests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tests')
        .select('*, centres(name)')
        .order('test_date', { ascending: false });
      if (error) throw error;
      setTests(data || []);
    } catch (err) {
      setError('Failed to fetch tests');
    } finally {
      setLoading(false);
    }
  };

  const createTest = async () => {
    setError('');
    const { test_name, test_date, centre_id } = formData.newTest;
    if (!test_name || !test_date || !centre_id) {
      setError('Please fill all test fields');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tests')
        .insert([{ test_name, test_date, centre_id }])
        .select();
      if (error) throw error;
      setTests(prev => [data[0], ...prev]);
      setFormData(prev => ({ ...prev, selectedTest: data[0], newTest: { test_name: '', test_date: '', centre_id: '' } }));
      setShowCreateTest(false);
    } catch (err) {
      setError('Failed to create test: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCentres = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('centres')
        .select('*')
        .order('name');

      if (error) throw error;
      setCentres(data || []);
    } catch (err) {
      console.error('Error fetching centres:', err);
      setError('Failed to fetch centres');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsByCentre = async (centreId) => {
    try {
      setLoading(true);
      
      // First, get the centre name from centres table
      const { data: centreData, error: centreError } = await supabase
        .from('centres')
        .select('name')
        .eq('id', centreId)
        .single();

      if (centreError) {
        console.error('Error fetching centre:', centreError);
        setError('Failed to fetch centre information');
        return;
      }

      const centreName = centreData?.name;
      console.log('Looking for students in centre:', centreName);

      // Then fetch students who belong to this centre
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, father_name, class, centre, email, phone')
        .eq('centre', centreId)
        .order('full_name');
      
      if (error) {
        console.error('Error fetching profiles:', error);
        setError('Failed to fetch student profiles: ' + error.message);
        return;
      }

      // No need to filter in frontend since we filtered in the query
      const students = data || [];
      console.log('Fetched students:', students);
      console.log('Found students:', students.length);

      if (students.length === 0) {
        setError('No students found for this centre');
        setSelectedCentreStudents([]);
        return;
      }

      setSelectedCentreStudents(students);
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const fetchSubjects = () => [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Hindi', label: 'Hindi' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateSubjectMarks = (subject) => {
    const fullMarks = parseInt(subject.full_marks);
    const obtainedMarks = parseInt(subject.obtained_marks);
    
    if (isNaN(fullMarks) || isNaN(obtainedMarks)) {
      return false;
    }
    
    if (obtainedMarks > fullMarks) {
      setError('Obtained marks cannot exceed full marks');
      return false;
    }
    
    return true;
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { subject: '', full_marks: '', obtained_marks: '' }]
    }));
  };

  const removeSubject = (index) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    console.log('handleSubjectChange called:', { index, field, value });
    const updatedSubjects = formData.subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );

    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const calculatePercentage = (fullMarks, obtainedMarks) => {
    const fMarks = parseInt(fullMarks);
    const oMarks = parseInt(obtainedMarks);
    const percent = (oMarks / fMarks) * 100;
    console.log('calculatePercentage:', { fullMarks, obtainedMarks, fMarks, oMarks, percent });
    if (isNaN(fMarks) || isNaN(oMarks) || fMarks === 0) return '0.00';
    return Math.min(Math.max(percent, 0), 100).toFixed(2);
  };

  // Navigation handlers
  const handleNext = () => {
    setError('');
    
    // Step 1: Only require a selected test
    if (currentStep === 1 && !formData.selectedTest) {
      setError('Please select or create a test');
      return;
    }

    // Step 2: Removed (Test Details handled in Step 1) - skip validation

    if (currentStep === 3) {
      if (!formData.selectedStudent) {
        setError('Please select a student');
        return;
      }

      // Validate all subjects
      const hasInvalidSubject = formData.subjects.some(subject => 
        !validateSubjectMarks(subject)
      );

      if (hasInvalidSubject) {
        return;
      }

      // Show summary before final submission
      setShowSummary(true);
      return;
    }

    setCurrentStep(prev => prev + 1);
  };


  const handlePrevious = () => {
    if (showSummary) {
      setShowSummary(false);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleConfirmSubmit = () => {
    setShowSummary(false);
    setShowConfirm(true);
  };

  // Form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const testResults = formData.subjects.map(subject => {
        const percentage = calculatePercentage(
          parseInt(subject.full_marks),
          parseInt(subject.obtained_marks)
        );

        return {
          student_id: formData.selectedStudent,
          test_name: formData.test_name,
          subject: subject.subject,
          test_date: formData.test_date,
          full_marks: parseInt(subject.full_marks),
          obtained_marks: parseInt(subject.obtained_marks),
          percentage: parseFloat(percentage),
          centre_id: formData.centre_id
        };
      });

      console.log('Submitting testResults:', testResults);
const { error } = await supabase
  .from('test_results')
  .insert(testResults);

      if (error) throw error;

      alert('Test results added successfully!');
      setFormData({
        centre_id: '',
        test_name: '',
        test_date: '',
        subjects: [],
        selectedStudent: null
      });
      setCurrentStep(1);
      setShowSummary(false);
      setShowConfirm(false);
    } catch (err) {
      setError('Error adding test results: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div className="test-results-admin">
      <h2>Test Results Management</h2>
      {error && <div className="error-message">{error}</div>}

      {/* Toggle between Add and Manage */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button
          type="button"
          style={{ background: viewMode === 'add' ? '#3b82f6' : '#f3f4f6', color: viewMode === 'add' ? 'white' : '#333', padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          onClick={() => setViewMode('add')}
        >
          Add Test Result
        </button>
        <button
          type="button"
          style={{ background: viewMode === 'manage' ? '#3b82f6' : '#f3f4f6', color: viewMode === 'manage' ? 'white' : '#333', padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          onClick={() => setViewMode('manage')}
        >
          Manage Tests
        </button>
      </div>

      {/* Manage Tests Table */}
      {viewMode === 'manage' && (
  <div style={{ marginBottom: 40 }}>
    {loading ? (
      <div>Loading test results...</div>
    ) : (
      <div className="manage-tests-grouped">
        {Object.entries(
          testResults.reduce((acc, result) => {
            if (!acc[result.test_name]) acc[result.test_name] = [];
            acc[result.test_name].push(result);
            return acc;
          }, {})
        )
          .sort((a, b) => {
            // Sort by most recent test date in each group
            const aMax = Math.max(...a[1].map(r => new Date(r.test_date).getTime()));
            const bMax = Math.max(...b[1].map(r => new Date(r.test_date).getTime()));
            return bMax - aMax;
          })
          .map(([testName, results], idx) => (
            <details key={testName} open={idx === 0} style={{ marginBottom: 18, border: '1.5px solid #f3f4f6', borderRadius: 8, background: '#f9fafb' }}>
              <summary style={{ fontWeight: 700, fontSize: 18, padding: 12, cursor: 'pointer', color: '#ea580c' }}>{testName} <span style={{ fontWeight: 400, fontSize: 13, color: '#666', marginLeft: 12 }}>({results.length} students)</span></summary>
              <div style={{ padding: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th>Centre</th>
                      <th>Student</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Full Marks</th>
                      <th>Obtained</th>
                      <th>Percentage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(result => (
                      <tr key={result.id}>
                        <td>{centreNames[result.centre_id] || result.centre_id}</td>
                        <td>{studentNames[result.student_id] || result.student_id}</td>
                        <td>{result.test_date}</td>
                        <td>{result.subject}</td>
                        <td>{result.full_marks}</td>
                        <td>{result.obtained_marks}</td>
                        <td>{result.percentage}</td>
                        <td>
                          <button onClick={() => handleDeleteTestResult(result.id)} style={{ color: 'white', background: '#ef4444', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem', cursor: 'pointer' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        {testResults.length === 0 && (
          <div style={{ textAlign: 'center', padding: 16 }}>No test results found.</div>
        )}
      </div>
    )}
  </div>
)}

      {/* Add Test Result Form */}
      {viewMode === 'add' && (
        <div className="form-container">
          {/* Confirm Submission Dialog */}
          {showConfirm && (
            <div className="confirm-container">
              <h3>Confirm Submission</h3>
              <p>Are you sure you want to publish these test results?</p>
              <div className="button-group">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          )}

          {/* Summary Review */}
          {showSummary && (
            <div className="summary-container">
              <h3>Review Test Results</h3>
              <div className="summary-content">
                <div className="summary-item">
                  <span>Centre:</span>
                  <span>{centres.find(c => c.id === formData.centre_id)?.name}</span>
                </div>
                <div className="summary-item">
                  <span>Test Name:</span>
                  <span>{formData.test_name}</span>
                </div>
                <div className="summary-item">
                  <span>Test Date:</span>
                  <span>{new Date(formData.test_date).toLocaleDateString()}</span>
                </div>
                <div className="summary-item">
                  <span>Student:</span>
                  <span>{selectedCentreStudents.find(s => s.id === formData.selectedStudent)?.full_name}</span>
                </div>
                <div className="subjects-summary">
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="subject-summary">
                      <div>
                        <span>Subject:</span>
                        <span>{subject.subject}</span>
                      </div>
                      <div>
                        <span>Marks:</span>
                        <span>{subject.obtained_marks}/{subject.full_marks}</span>
                      </div>
                      <div>
                        <span>Percentage:</span>
                        <span>{calculatePercentage(subject.full_marks, subject.obtained_marks)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="button-group">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSubmit}
                  disabled={loading}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Multi-step Form */}
          {!showSummary && !showConfirm && (
            <>
              {currentStep === 1 && (
                <>
                  <h3>Step 1: Select or Create Test</h3>
                  <div className="form-group">
                    <label>Test</label>
                    <select
                      value={formData.selectedTest ? formData.selectedTest.id : ''}
                      onChange={e => {
                        const test = tests.find(t => t.id === e.target.value);
                        setFormData(prev => ({ ...prev, selectedTest: test }));
                      }}
                      disabled={loading}
                    >
                      <option value="">Select Test</option>
                      {tests.map(test => (
                        <option key={test.id} value={test.id}>
                          {test.test_name} ({test.test_date}) - {test.centres?.name || test.centre_id}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="button" onClick={() => setShowCreateTest(v => !v)} style={{ margin: '10px 0', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    {showCreateTest ? 'Cancel' : 'Create New Test'}
                  </button>
                  {showCreateTest && (
                    <div className="form-group" style={{ border: '1.5px solid #e5e7eb', borderRadius: 8, padding: 16, margin: '10px 0' }}>
                      <label>Test Name</label>
                      <input
                        type="text"
                        value={formData.newTest.test_name}
                        onChange={e => setFormData(prev => ({ ...prev, newTest: { ...prev.newTest, test_name: e.target.value } }))}
                        placeholder="Enter test name"
                        required
                        disabled={loading}
                      />
                      <label>Test Date</label>
                      <input
                        type="date"
                        value={formData.newTest.test_date}
                        onChange={e => setFormData(prev => ({ ...prev, newTest: { ...prev.newTest, test_date: e.target.value } }))}
                        required
                        disabled={loading}
                      />
                      <label>Centre</label>
                      <select
                        value={formData.newTest.centre_id}
                        onChange={e => setFormData(prev => ({ ...prev, newTest: { ...prev.newTest, centre_id: e.target.value } }))}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Centre</option>
                        {centres.map(centre => (
                          <option key={centre.id} value={centre.id}>{centre.name}</option>
                        ))}
                      </select>
                      <button type="button" style={{ marginTop: 10, background: '#10b981', color: 'white', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer' }} onClick={createTest} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Test'}
                      </button>
                    </div>
                  )}
                  {formData.selectedTest && (
                    <div style={{ margin: '16px 0', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: 8, padding: 14 }}>
                      <b>Selected Test:</b> {formData.selectedTest.test_name} <br/>
                      <b>Date:</b> {formData.selectedTest.test_date} <br/>
                      <b>Centre:</b> {centres.find(c => c.id === formData.selectedTest.centre_id)?.name || formData.selectedTest.centre_id}
                    </div>
                  )}
                  <div className="button-group">
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={loading || !formData.selectedTest}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}


              {currentStep === 2 && (
                <>
                  <h3>Step 2: Select Student</h3>
                  <div className="form-group">
                    <label>Student in Centre</label>
                    {selectedCentreStudents.length === 0 ? (
                      <div>No students found for this centre.</div>
                    ) : (
                      <select
                        value={formData.selectedStudent || ''}
                        onChange={e => setFormData(prev => ({ ...prev, selectedStudent: e.target.value }))}
                        required
                        disabled={loading}
                      >
                        <option value="">Select Student</option>
                        {selectedCentreStudents.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.full_name} (Class: {student.class})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {formData.selectedStudent && (() => {
                    const student = selectedCentreStudents.find(s => s.id === formData.selectedStudent);
                    if (!student) return null;
                    return (
                      <div style={{
                        background: '#f9fafb',
                        border: '1.5px solid #e5e7eb',
                        borderRadius: 8,
                        padding: 16,
                        margin: '12px 0 24px 0',
                        maxWidth: 420
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 18, color: '#ea580c', marginBottom: 8 }}>{student.full_name}</div>
                        <div style={{ color: '#444', fontSize: 15 }}>
                          {student.full_name && <div><b>Name:</b> {student.full_name}</div>}
                          {student.father_name && <div><b>Father's Name:</b> {student.father_name}</div>}
                          {student.class && <div><b>Class:</b> {student.class}</div>}
                          {student.centre && (() => {
                            const centreObj = centres.find(c => c.id === student.centre);
                            return <div><b>Centre:</b> {centreObj ? centreObj.name : student.centre}</div>;
                          })()}
                          {student.email && <div><b>Email:</b> {student.email}</div>}
                          {student.phone && <div><b>Mobile:</b> {student.phone}</div>}
                        </div>
                      </div>
                    );
                  })()}
                  <div className="button-group">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={loading}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={loading || !formData.selectedStudent}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}


              {currentStep === 3 && (
                <>
                  <h3>Step 3: Subject Marks Entry</h3>
                  <div className="subjects-container">
                    <div className="subject-group">
                      <div className="form-group">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject || ''}
                          onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          required
                          placeholder="Enter subject name"
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <label>Full Marks</label>
                        <input
                          type="number"
                          value={formData.full_marks || ''}
                          onChange={e => setFormData(prev => ({ ...prev, full_marks: e.target.value }))}
                          required
                          min="1"
                          disabled={loading}
                        />
                      </div>
                      <div className="form-group">
                        <label>Obtained Marks</label>
                        <input
                          type="number"
                          value={formData.obtained_marks || ''}
                          onChange={e => setFormData(prev => ({ ...prev, obtained_marks: e.target.value }))}
                          required
                          min="0"
                          disabled={loading}
                        />
                      </div>
                      <div className="percentage-display">
                        Percentage: {calculatePercentage(
                          formData.full_marks,
                          formData.obtained_marks
                        )}%
                      </div>
                    </div>
                  </div>



                  <div className="button-group">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={loading}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        loading ||
                        !formData.subject ||
                        !formData.full_marks ||
                        !formData.obtained_marks ||
                        isNaN(Number(formData.full_marks)) ||
                        isNaN(Number(formData.obtained_marks)) ||
                        Number(formData.full_marks) <= 0 ||
                        Number(formData.obtained_marks) < 0 ||
                        Number(formData.obtained_marks) > Number(formData.full_marks)
                      }
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TestResultsAdmin;
