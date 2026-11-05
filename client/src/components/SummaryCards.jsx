import { Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition hover:shadow-md">
        <div className="p-4 bg-blue-50 rounded-full">
          <Wallet className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Balance</p>
          <p className={`text-2xl font-bold mt-1 tracking-tight ${balance >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
            ₹{balance.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition hover:shadow-md">
        <div className="p-4 bg-emerald-50 rounded-full">
          <ArrowUpRight className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Income</p>
          <p className="text-2xl font-bold mt-1 tracking-tight text-emerald-600">
            +₹{income.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition hover:shadow-md">
        <div className="p-4 bg-rose-50 rounded-full">
          <ArrowDownRight className="w-7 h-7 text-rose-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">Total Expenses</p>
          <p className="text-2xl font-bold mt-1 tracking-tight text-rose-600">
            -₹{expense.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}