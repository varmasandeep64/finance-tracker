import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Filter } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { token, user, logout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  
  // Filter States
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const API_URL = 'http://localhost:5000/api/transactions';
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const categories = ['Salary', 'Freelance', 'Food', 'Rent', 'Utilities', 'Shopping', 'Travel', 'Health', 'Other'];

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL, config);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (newTx) => {
    try {
      const res = await axios.post(API_URL, newTx, config);
      setTransactions([res.data, ...transactions]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, config);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Apply Filters
  const filteredTransactions = transactions.filter(t => {
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    const matchCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchType && matchCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">FinanceTracker</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
                <span className="text-xs text-slate-500">{user?.email}</span>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Pass FILTERED transactions to cards and charts */}
        <SummaryCards transactions={filteredTransactions} />
        <Charts transactions={filteredTransactions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 sticky top-24">
            <TransactionForm onAdd={handleAdd} />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 w-full sm:w-auto"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expense Only</option>
                </select>
                <select 
                  value={categoryFilter} 
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 w-full sm:w-auto"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Transaction Table */}
            <TransactionList transactions={filteredTransactions} onDelete={handleDelete} />
          </div>
        </div>
      </main>
    </div>
  );
}