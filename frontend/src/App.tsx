import Header from "@/components/Header";
import { Routes, Route } from 'react-router-dom';
import CreateQuiz from './pages/CreateQuiz';
import ViewQuiz from './pages/ViewQuiz';
import StudyMethod from './pages/StudyMethod';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/study-method" element={<StudyMethod />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz/:id" element={<ViewQuiz />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
