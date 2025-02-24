import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletSelector } from './components/WalletSelector';
import { SignAndSubmitTransaction } from './pages/SignAndSubmitTransaction';
import PageNotFound from './pages/PageNotFound';
import { TransactionsTable } from './pages/TransactionsTable';
import Header from './components/Header';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

function App() {
    const { connected } = useWallet();

    return (
        <Router>
            {connected && <Header />}
            <Routes>
                <Route path='/' element={<WalletSelector />} />
                <Route path='/send-transaction' element={<SignAndSubmitTransaction />} />
                <Route path='/transactions' element={<TransactionsTable />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
