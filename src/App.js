import './App.css';
import './styles/NavBar.css'
import './styles/Footer.css'
import './styles/Quotas.css'
import QuotationPage from './pages/QuotationPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <QuotationPage></QuotationPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
