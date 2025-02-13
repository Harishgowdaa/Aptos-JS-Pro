import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletSelector } from './components/WalletSelector';
import { SignAndSubmitTransaction } from './pages/SignAndSubmitTransaction';
import PageNotFound from './pages/PageNotFound';
import Transactions from './pages/Transactions';
import { TransactionsTable } from './pages/TransactionsTable';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='*' element={<PageNotFound />} />
                <Route path='/' element={<WalletSelector />} />
                <Route path='/send-transaction' element={<SignAndSubmitTransaction />} />
                <Route path='/transactions' element={<TransactionsTable />} />
            </Routes>
        </Router>
    );
}

export default App;
