
import React, { useState, useEffect } from 'react';
import { FileJson, Trash2, Info, FileText, TrendingUp, TrendingDown, AlertTriangle, X } from 'lucide-react';

interface Props {
  onReset: () => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
  expenseTarget: number;
  incomeTarget: number;
  onUpdateExpenseTarget: (value: number) => void;
  onUpdateIncomeTarget: (value: number) => void;
}

const Settings: React.FC<Props> = ({ 
  onReset, 
  onExportJSON, 
  onExportCSV, 
  expenseTarget, 
  incomeTarget, 
  onUpdateExpenseTarget, 
  onUpdateIncomeTarget 
}) => {
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  // Auto-cancel confirmation after 3 seconds if not clicked again
  useEffect(() => {
    let timer: number;
    if (isConfirmingReset) {
      timer = window.setTimeout(() => {
        setIsConfirmingReset(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isConfirmingReset]);

  const handleResetClick = () => {
    if (isConfirmingReset) {
      onReset();
      setIsConfirmingReset(false);
    } else {
      setIsConfirmingReset(true);
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
          <Info size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Pengaturan & Data</h2>
          <p className="text-xs text-gray-500 font-medium">Kelola anggaran dan ekspor</p>
        </div>
      </div>

      {/* Targets Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2">Monitor Target</h4>
        
        {/* Income Target */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <TrendingUp size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Target Pemasukan</h3>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
            <input 
              type="number"
              value={incomeTarget || ''}
              onChange={(e) => onUpdateIncomeTarget(Number(e.target.value))}
              placeholder="Target dana terkumpul..."
              className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none text-lg font-bold focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed italic">
            * Target total uang yang harus masuk/terkumpul (Misal: Iuran Kas).
          </p>
        </div>

        {/* Expense Target */}
        <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-600 mb-1">
            <TrendingDown size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">Limit Pengeluaran</h3>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
            <input 
              type="number"
              value={expenseTarget || ''}
              onChange={(e) => onUpdateExpenseTarget(Number(e.target.value))}
              placeholder="Limit belanja maksimal..."
              className="w-full pl-11 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none text-lg font-bold focus:ring-2 focus:ring-rose-500 transition-all"
            />
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed italic">
            * Batas maksimal uang yang boleh dikeluarkan.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2">Ekspor Laporan</h4>
        
        <button
          onClick={onExportCSV}
          className="w-full bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm active:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Export Data (CSV)</p>
              <p className="text-[10px] text-gray-400">Format tabel untuk Excel/Spreadsheet</p>
            </div>
          </div>
        </button>

        <button
          onClick={onExportJSON}
          className="w-full bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm active:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileJson size={20} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">Export Data (JSON)</p>
              <p className="text-[10px] text-gray-400">Cadangan lengkap untuk integrasi sistem</p>
            </div>
          </div>
        </button>

        <div className="pt-4">
          <button
            onClick={handleResetClick}
            className={`w-full p-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98] ${
              isConfirmingReset 
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
              : 'bg-rose-50 text-rose-600'
            }`}
          >
            {isConfirmingReset ? (
              <>
                <AlertTriangle size={18} className="animate-bounce" />
                <span className="text-sm font-black">YAKIN? KLIK LAGI UNTUK HAPUS SEMUA</span>
              </>
            ) : (
              <>
                <Trash2 size={18} />
                <span className="text-sm font-bold">Hapus Semua Catatan</span>
              </>
            )}
          </button>
          
          {isConfirmingReset && (
            <p className="text-center text-[10px] text-rose-500 mt-2 font-bold animate-pulse">
              Tindakan ini akan menghapus permanen seluruh data transaksi.
            </p>
          )}
        </div>
      </div>

      <div className="p-6 bg-gray-100 rounded-3xl text-center">
        <p className="text-xs text-gray-500 font-bold">Saku Bendahara Pro</p>
        <p className="text-[10px] text-gray-400 mt-1 italic">Versi 1.3.1 • Native-style Confirmation</p>
      </div>
    </div>
  );
};

export default Settings;
