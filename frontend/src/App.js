import { Route, Routes } from 'react-router-dom';
import NotificationPage from './pages/NotificationPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NotificationPage />} />
      </Routes>
    </>
  );
}

export default App;
