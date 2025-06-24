import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResultCheck from './pages/ResultCheck';
import RegisterStudent from './pages/RegisterStudent';
const NcertPdf = React.lazy(() => import('./pages/NcertPdf'));
const NcertNotes = React.lazy(() => import('./pages/NcertNotes'));
const ReferenceBook = React.lazy(() => import('./pages/ReferenceBook'));
const NcertSolution = React.lazy(() => import('./pages/NcertSolution'));
const VardaanJunior = React.lazy(() => import('./pages/VardaanJunior'));
const VardaanSenior = React.lazy(() => import('./pages/VardaanSenior'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const SubcategoryPage = React.lazy(() => import('./pages/SubcategoryPage'));
const SubcategoryListPage = React.lazy(() => import('./pages/SubcategoryListPage'));
const Login = React.lazy(() => import('./pages/login'));
const Admin = React.lazy(() => import('./pages/admin'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
import TestPaper from './pages/TestPaper';
import BookSolutions from './pages/BookSolutions';
import NcertBooks from './pages/NcertBooks';
import Syllabus from './pages/Syllabus';
import Notes from './pages/Notes';
import Class10 from './studymaterial/Class10';
import StudyMaterial from './studymaterial/StudyMaterial';
import Class10Science from './studymaterial/Class10Science';
import Class10ScienceCbsePYQ from './studymaterial/Class10ScienceCbsePYQ';
import Class10Mathematics from './studymaterial/Class10Mathematics';
import Class10SocialScience from './studymaterial/Class10SocialScience';
import Class10English from './studymaterial/Class10English';
import Class10EnglishGrammar from './studymaterial/Class10EnglishGrammar';
import Class6 from './studymaterial/Class6';
import Class6Science from './studymaterial/Class6Science';
import Class6Mathematics from './studymaterial/Class6Mathematics';
import Class6SocialScience from './studymaterial/Class6SocialScience';
import Class6English from './studymaterial/Class6English';
import Class6EnglishGrammar from './studymaterial/Class6EnglishGrammar';
import Class7 from './studymaterial/Class7';
import Class8 from './studymaterial/Class8';
import Class7Science from './studymaterial/Class7Science';
import Class7Mathematics from './studymaterial/Class7Mathematics';
import Class7SocialScience from './studymaterial/Class7SocialScience';
import Class7English from './studymaterial/Class7English';
import Class7EnglishGrammar from './studymaterial/Class7EnglishGrammar';
import Class8Science from './studymaterial/Class8Science';
import Class8Mathematics from './studymaterial/Class8Mathematics';
import Class8SocialScience from './studymaterial/Class8SocialScience';
import Class8English from './studymaterial/Class8English';
import Class8EnglishGrammar from './studymaterial/Class8EnglishGrammar';
import Class6icse from './studymaterial/Class6icse';
import Class6icseScience from './studymaterial/Class6icseScience';
import Class6icseMathematics from './studymaterial/Class6icseMathematics';
import Class6icseSocialScience from './studymaterial/Class6icseSocialScience';
import Class6icseEnglish from './studymaterial/Class6icseEnglish';
import Class6icseEnglishGrammar from './studymaterial/Class6icseEnglishGrammar';
import Class7icse from './studymaterial/Class7icse';
import Class8icse from './studymaterial/Class8icse';
import Class7icseScience from './studymaterial/Class7icseScience';
import Class7icseMathematics from './studymaterial/Class7icseMathematics';
import Class7icseSocialScience from './studymaterial/Class7icseSocialScience';
import Class7icseEnglish from './studymaterial/Class7icseEnglish';
import Class7icseEnglishGrammar from './studymaterial/Class7icseEnglishGrammar';
import Class8icseScience from './studymaterial/Class8icseScience';
import Class8icseMathematics from './studymaterial/Class8icseMathematics';
import Class8icseSocialScience from './studymaterial/Class8icseSocialScience';
import Class8icseEnglish from './studymaterial/Class8icseEnglish';
import Class8icseEnglishGrammar from './studymaterial/Class8icseEnglishGrammar';
import Class9 from './studymaterial/Class9';
import Class9Science from './studymaterial/Class9Science';
import Class9Mathematics from './studymaterial/Class9Mathematics';
import Class9SocialScience from './studymaterial/Class9SocialScience';
import Class9English from './studymaterial/Class9English';
import Class9EnglishGrammar from './studymaterial/Class9EnglishGrammar';
import Class9icse from './studymaterial/Class9icse';
import Class9icseScience from './studymaterial/Class9icseScience';
import Class9icseMathematics from './studymaterial/Class9icseMathematics';
import Class9icseSocialScience from './studymaterial/Class9icseSocialScience';
import Class9icseEnglish from './studymaterial/Class9icseEnglish';
import Class9icseEnglishGrammar from './studymaterial/Class9icseEnglishGrammar';
import Class11 from './studymaterial/Class11';
import Class11Science from './studymaterial/Class11Science';
import Class11Mathematics from './studymaterial/Class11Mathematics';
import Class11SocialScience from './studymaterial/Class11SocialScience';
import Class11English from './studymaterial/Class11English';
import Class11EnglishGrammar from './studymaterial/Class11EnglishGrammar';
import Class12 from './studymaterial/Class12';
import Class12Science from './studymaterial/Class12Science';
import Class12Mathematics from './studymaterial/Class12Mathematics';
import Class12SocialScience from './studymaterial/Class12SocialScience';
import Class12English from './studymaterial/Class12English';
import Class12EnglishGrammar from './studymaterial/Class12EnglishGrammar';
import Class10icse from './studymaterial/Class10icse';
import Class10icseScience from './studymaterial/Class10icseScience';
import Class10icseMathematics from './studymaterial/Class10icseMathematics';
import Class10icseSocialScience from './studymaterial/Class10icseSocialScience';
import Class10icseEnglish from './studymaterial/Class10icseEnglish';
import Class10icseEnglishGrammar from './studymaterial/Class10icseEnglishGrammar';
import Class11icse from './studymaterial/Class11icse';
import Class11icseScience from './studymaterial/Class11icseScience';
import Class11icseMathematics from './studymaterial/Class11icseMathematics';
import Class11icseSocialScience from './studymaterial/Class11icseSocialScience';
import Class11icseEnglish from './studymaterial/Class11icseEnglish';
import Class11icseEnglishGrammar from './studymaterial/Class11icseEnglishGrammar';
import Class12icse from './studymaterial/Class12icse';
import Class12icseScience from './studymaterial/Class12icseScience';
import Class12icseMathematics from './studymaterial/Class12icseMathematics';
import Class12icseSocialScience from './studymaterial/Class12icseSocialScience';
import Class12icseEnglish from './studymaterial/Class12icseEnglish';
import Class12icseEnglishGrammar from './studymaterial/Class12icseEnglishGrammar';

const AdminDashboard = React.lazy(() => import('./pages/admindashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const WriteArticle = React.lazy(() => import('./pages/WriteArticle'));
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
import './App.css';
import supabase from './supabaseClient';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LogoutSyncHandler() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'vardaan-logout') {
        supabase.auth.signOut(); // Ensure local session is cleared
        navigate('/login');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [navigate]);
  return null;
}

function PasswordRecoveryRedirect() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (
      (window.location.pathname === '/' || window.location.pathname === '') &&
      window.location.hash.includes('type=recovery')
    ) {
      navigate('/reset-password' + window.location.hash, { replace: true });
    }
  }, [navigate]);
  return null;
}

function OAuthRedirectHandler() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    if (
      params.get('access_token') &&
      !window.location.hash.includes('type=recovery') &&
      !window.location.pathname.includes('/dashboard') &&
      !window.location.pathname.includes('/reset-password')
    ) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  return null;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Global profile completion enforcement
  React.useEffect(() => {
    const enforceProfileCompletion = async () => {
      // Only enforce on protected routes
      const unprotected = ['/', '/login', '/register',  '/forgot-password', '/reset-password'];
      if (unprotected.includes(location.pathname)) return;
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;
      // Use correct required fields as per current schema
      const requiredFields = ['full_name', 'father_name', 'phone', 'class', 'dob', 'profile_image'];
      // Check user_metadata (mapping to correct keys)
      const metaMissing = [
        !user.user_metadata?.name || user.user_metadata.name.toString().trim() === '',
        !user.user_metadata?.father_name || user.user_metadata.father_name.toString().trim() === '',
        !user.user_metadata?.phone || user.user_metadata.phone.toString().trim() === '',
        !user.user_metadata?.class || user.user_metadata.class.toString().trim() === '',
        !user.user_metadata?.dob || user.user_metadata.dob.toString().trim() === '',
        !user.user_metadata?.profile_photo || user.user_metadata.profile_photo.toString().trim() === ''
      ].some(Boolean);
      if (metaMissing) {
        navigate( { replace: true });
        return;
      }
      // Check profiles table
      const { data: profile } = await supabase.from('profiles').select('full_name, father_name, phone, class, dob, profile_image').eq('id', user.id).single();
      const dbMissing = !profile || [
        !profile.full_name || profile.full_name.toString().trim() === '',
        !profile.father_name || profile.father_name.toString().trim() === '',
        !profile.phone || profile.phone.toString().trim() === '',
        !profile.class || profile.class.toString().trim() === '',
        !profile.dob || profile.dob.toString().trim() === '',
        !profile.profile_image || profile.profile_image.toString().trim() === ''
      ].some(Boolean);
      if (dbMissing) {
        navigate( { replace: true });
        return;
      }
      // All fields present, allow navigation
    };
    enforceProfileCompletion();
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen ">
      <ScrollToTop />
      {location.pathname !== '/' &&
 location.pathname !== '/dashboard' &&
 location.pathname !== '/admin' &&
 location.pathname !== '/admindashboard' &&
 location.pathname !== '/vardaan-junior' &&
 location.pathname !== '/vardaan-senior' && <Navbar />}


      <LogoutSyncHandler />
      <PasswordRecoveryRedirect />
      <OAuthRedirectHandler />
      <React.Suspense fallback={<div style={{textAlign:'center',marginTop:60}}></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results" element={<ResultCheck />} />
          <Route path="/ncert-pdf" element={<NcertPdf />} />
          <Route path="/ncert-notes" element={<NcertNotes />} />
          <Route path="/ncert-solutions" element={<NcertSolution />} />
          <Route path="/reference-books" element={<ReferenceBook />} />
          <Route path="/studymaterial/class10/Class10Mathematics" element={<Class10Mathematics />} />
<Route path="/studymaterial/class10/Class10SocialScience" element={<Class10SocialScience />} />
<Route path="/studymaterial/class10/Class10English" element={<Class10English />} />
<Route path="/studymaterial/class10/Class10EnglishGrammar" element={<Class10EnglishGrammar />} />

          {/* Class 7 CBSE Subject Pages */}
          <Route path="/studymaterial/class6" element={<Class6 />} />
<Route path="/studymaterial/class6/Class6Science" element={<Class6Science />} />
<Route path="/studymaterial/class6/Class6Mathematics" element={<Class6Mathematics />} />
<Route path="/studymaterial/class6/Class6SocialScience" element={<Class6SocialScience />} />
<Route path="/studymaterial/class6/Class6English" element={<Class6English />} />
<Route path="/studymaterial/class6/Class6EnglishGrammar" element={<Class6EnglishGrammar />} />
<Route path="/studymaterial/class6" element={<Class6 />} />

<Route path="/studymaterial/class7" element={<Class7 />} />
<Route path="/studymaterial/class7/Class7Science" element={<Class7Science />} />
<Route path="/studymaterial/class7/Class7Mathematics" element={<Class7Mathematics />} />
<Route path="/studymaterial/class7/Class7SocialScience" element={<Class7SocialScience />} />
<Route path="/studymaterial/class7/Class7English" element={<Class7English />} />
<Route path="/studymaterial/class7/Class7EnglishGrammar" element={<Class7EnglishGrammar />} />

          {/* Class 8 CBSE Subject Pages */}
          <Route path="/studymaterial/class8" element={<Class8 />} />
<Route path="/studymaterial/class8/Class8Science" element={<Class8Science />} />
<Route path="/studymaterial/class8/Class8Mathematics" element={<Class8Mathematics />} />
<Route path="/studymaterial/class8/Class8SocialScience" element={<Class8SocialScience />} />
<Route path="/studymaterial/class8/Class8English" element={<Class8English />} />
<Route path="/studymaterial/class8/Class8EnglishGrammar" element={<Class8EnglishGrammar />} />

          {/* Class 7 ICSE Subject Pages */}
          <Route path="/studymaterial/class6icse" element={<Class6icse />} />
<Route path="/studymaterial/class6icse/Class6icseScience" element={<Class6icseScience />} />
<Route path="/studymaterial/class6icse/Class6icseMathematics" element={<Class6icseMathematics />} />
<Route path="/studymaterial/class6icse/Class6icseSocialScience" element={<Class6icseSocialScience />} />
<Route path="/studymaterial/class6icse/Class6icseEnglish" element={<Class6icseEnglish />} />
<Route path="/studymaterial/class6icse/Class6icseEnglishGrammar" element={<Class6icseEnglishGrammar />} />
<Route path="/studymaterial/class7icse" element={<Class7icse />} />
<Route path="/studymaterial/class7icse/Class7icseScience" element={<Class7icseScience />} />
<Route path="/studymaterial/class7icse/Class7icseMathematics" element={<Class7icseMathematics />} />
<Route path="/studymaterial/class7icse/Class7icseSocialScience" element={<Class7icseSocialScience />} />
<Route path="/studymaterial/class7icse/Class7icseEnglish" element={<Class7icseEnglish />} />
<Route path="/studymaterial/class7icse/Class7icseEnglishGrammar" element={<Class7icseEnglishGrammar />} />

          {/* Class 8 ICSE Subject Pages */}
          <Route path="/studymaterial/class8icse" element={<Class8icse />} />
<Route path="/studymaterial/class8icse/Class8icseScience" element={<Class8icseScience />} />
<Route path="/studymaterial/class8icse/Class8icseMathematics" element={<Class8icseMathematics />} />
<Route path="/studymaterial/class8icse/Class8icseSocialScience" element={<Class8icseSocialScience />} />
<Route path="/studymaterial/class8icse/Class8icseEnglish" element={<Class8icseEnglish />} />
<Route path="/studymaterial/class8icse/Class8icseEnglishGrammar" element={<Class8icseEnglishGrammar />} />

          {/* Class 9 CBSE Subject Pages */}
          <Route path="/studymaterial/class9" element={<Class9 />} />
<Route path="/studymaterial/class9/Class9Science" element={<Class9Science />} />
<Route path="/studymaterial/class9/Class9Mathematics" element={<Class9Mathematics />} />
<Route path="/studymaterial/class9/Class9SocialScience" element={<Class9SocialScience />} />
<Route path="/studymaterial/class9/Class9English" element={<Class9English />} />
<Route path="/studymaterial/class9/Class9EnglishGrammar" element={<Class9EnglishGrammar />} />

          {/* Class 9 ICSE Subject Pages */}
          <Route path="/studymaterial/class9icse" element={<Class9icse />} />
<Route path="/studymaterial/class9icse/Class9icseScience" element={<Class9icseScience />} />
<Route path="/studymaterial/class9icse/Class9icseMathematics" element={<Class9icseMathematics />} />
<Route path="/studymaterial/class9icse/Class9icseSocialScience" element={<Class9icseSocialScience />} />
<Route path="/studymaterial/class9icse/Class9icseEnglish" element={<Class9icseEnglish />} />
<Route path="/studymaterial/class9icse/Class9icseEnglishGrammar" element={<Class9icseEnglishGrammar />} />
<Route path="/studymaterial/class10icse" element={<Class10icse />} />
<Route path="/studymaterial/class10icse/Class10icseScience" element={<Class10icseScience />} />
<Route path="/studymaterial/class10icse/Class10icseMathematics" element={<Class10icseMathematics />} />
<Route path="/studymaterial/class10icse/Class10icseSocialScience" element={<Class10icseSocialScience />} />
<Route path="/studymaterial/class10icse/Class10icseEnglish" element={<Class10icseEnglish />} />
<Route path="/studymaterial/class10icse/Class10icseEnglishGrammar" element={<Class10icseEnglishGrammar />} />

          {/* Class 11 CBSE Subject Pages */}
          <Route path="/studymaterial/class11" element={<Class11 />} />
<Route path="/studymaterial/class11/Class11Science" element={<Class11Science />} />
<Route path="/studymaterial/class11/Class11Mathematics" element={<Class11Mathematics />} />
<Route path="/studymaterial/class11/Class11SocialScience" element={<Class11SocialScience />} />
<Route path="/studymaterial/class11/Class11English" element={<Class11English />} />
<Route path="/studymaterial/class11/Class11EnglishGrammar" element={<Class11EnglishGrammar />} />

          {/* Class 12 CBSE Subject Pages */}
          <Route path="/studymaterial/class12" element={<Class12 />} />
<Route path="/studymaterial/class12/Class12Science" element={<Class12Science />} />
<Route path="/studymaterial/class12/Class12Mathematics" element={<Class12Mathematics />} />
          <Route path="/studymaterial/class11icse" element={<Class11icse />} />
          <Route path="/studymaterial/class11icse/Class11icseScience" element={<Class11icseScience />} />
          <Route path="/studymaterial/class11icse/Class11icseMathematics" element={<Class11icseMathematics />} />
          <Route path="/studymaterial/class11icse/Class11icseSocialScience" element={<Class11icseSocialScience />} />
          <Route path="/studymaterial/class11icse/Class11icseEnglish" element={<Class11icseEnglish />} />
          <Route path="/studymaterial/class11icse/Class11icseEnglishGrammar" element={<Class11icseEnglishGrammar />} />
          {/* Class 12 ICSE Subject Pages */}
          <Route path="/studymaterial/class12icse" element={<Class12icse />} />
<Route path="/studymaterial/class12icse/Class12icseScience" element={<Class12icseScience />} />
<Route path="/studymaterial/class12icse/Class12icseMathematics" element={<Class12icseMathematics />} />
<Route path="/studymaterial/class12icse/Class12icseSocialScience" element={<Class12icseSocialScience />} />
<Route path="/studymaterial/class12icse/Class12icseEnglish" element={<Class12icseEnglish />} />
<Route path="/studymaterial/class12icse/Class12icseEnglishGrammar" element={<Class12icseEnglishGrammar />} />

          <Route path="/vardaan-junior" element={<VardaanJunior />} />
          <Route path="/vardaan-senior" element={<VardaanSenior />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/testpaper" element={<TestPaper />} />
          <Route path="/book-solutions" element={<BookSolutions />} />
          <Route path="/ncertbooks" element={<NcertBooks />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/writearticle" element={<WriteArticleWithData />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/studymaterial" element={<StudyMaterial />} />
          <Route path="/studymaterial/class10" element={<Class10 />} />
<Route path="/studymaterial/class10" element={<Class10 />} />
          <Route path="/studymaterial/:class10science/:class10Science" element={<Class10Science />} />
          <Route path="/studymaterial/:class10/:class10science/:class10SciencecbsePYQ" element={<Class10ScienceCbsePYQ />} />


          
          <Route path="/class10science" element={<Class10Science />} />

        </Routes>
      </React.Suspense>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function WriteArticleWithData() {

  const [categories, setCategories] = React.useState([]);
  const [subcategories, setSubcategories] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let cats = [];
      let subs = {};
      try {
        const { data: catData, error: catErr } = await supabase.from('category').select('*');
        if (catErr) {
          console.error('Error fetching categories:', catErr);
        }
        cats = catData || [];
        const { data: allSubs, error: subErr } = await supabase.from('subcategories').select('*');
        if (subErr) {
          console.error('Error fetching subcategories:', subErr);
        }
        if (allSubs) {
          cats.forEach(cat => {
            subs[cat.id] = allSubs.filter(sub => String(sub.category_id) === String(cat.id));
          });
        }
      } catch (e) {
        console.error('Unexpected error in fetchData:', e);
      }
      setCategories(cats);
      setSubcategories(subs);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:60}}>Loading...</div>;
  return <WriteArticle categories={categories} subcategories={subcategories} />;
}

function RedirectToCategory() {
  const { category } = useParams();
  return <Navigate to={`/studymaterial/${category}`} replace />;
}
