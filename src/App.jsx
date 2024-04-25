import { Badge } from './components/Badge';
import { Header } from './components/Header';
import { Event } from './components/Event';
import './index.css';

function App() {

  return (
    <div>
      <Header />
      <Badge title ="hei" icon ="calender" />
      <Event />
    </div>
  );
}

export default App;