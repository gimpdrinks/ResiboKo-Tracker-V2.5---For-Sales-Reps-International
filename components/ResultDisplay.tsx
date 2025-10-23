import React, { useState, useEffect } from 'react';
import { ReceiptData } from '../types';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { TrashIcon } from './icons/TrashIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface ResultDisplayProps {
  data: ReceiptData;
  onSave: (data: ReceiptData) => void;
  onDiscard: () => void;
}

const categories = [
    "Meals",
    "Travel",
    "Vehicle Expenses",
    "Client Entertainment",
    "Office Supplies",
    "Communications",
    "Utilities",
    "Other"
];

const amountThresholds: Record<string, number> = {
    "Meals": 300,
    "Travel": 2000,
    "Vehicle Expenses": 500,
    "Client Entertainment": 1000,
    "Office Supplies": 500,
    "Communications": 200,
    "Utilities": 300,
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, onSave, onDiscard }) => {
  const [formData, setFormData] = useState<ReceiptData>({ ...data });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [warnings, setWarnings] = useState<Record<string, string | null>>({});

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  useEffect(() => {
    const validate = () => {
        const newErrors: Record<string, string | null> = {};
        const newWarnings: Record<string, string | null> = {};

        // --- ERRORS (block saving) ---

        if (!formData.transaction_name?.trim()) {
            newErrors.transaction_name = "Transaction name is required.";
        }

        if (formData.total_amount === null || formData.total_amount <= 0) {
            newErrors.total_amount = "A positive amount is required.";
        }

        if (!formData.transaction_date) {
            newErrors.transaction_date = "Transaction date is required.";
        } else {
            const transactionDate = new Date(formData.transaction_date);
            // Add timezone offset to avoid off-by-one day errors with UTC
            const localTransactionDate = new Date(transactionDate.valueOf() + transactionDate.getTimezoneOffset() * 60 * 1000);
            const today = new Date();
            today.setHours(23, 59, 59, 999); // Allow today

            if (localTransactionDate > today) {
                newErrors.transaction_date = "Date cannot be in the future.";
            }

            const currentYear = new Date().getFullYear();
            if (localTransactionDate.getFullYear() !== currentYear) {
                 newErrors.transaction_date = `Only transactions from ${currentYear} are allowed.`;
            }
        }
        
        if (formData.category === 'Client Entertainment' && !formData.client_or_prospect?.trim()) {
            newErrors.client_or_prospect = "Client/Prospect is required for this category.";
        }

        // --- WARNINGS (allow saving but show message) ---
        if (formData.category && formData.total_amount && amountThresholds[formData.category] && formData.total_amount > amountThresholds[formData.category]) {
            newWarnings.total_amount = `This amount is high for ${formData.category}. Please double-check.`;
        }

        if (!formData.purpose?.trim()) {
            newWarnings.purpose = "A clear purpose helps with faster expense approval.";
        }

        setErrors(newErrors);
        setWarnings(newWarnings);
    };

    validate();
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value === '' ? null : parseFloat(value) }))
  }

  const handleSave = () => {
    if (Object.values(errors).some(e => e !== null)) {
        // This should not be triggerable via UI, but as a safeguard
        alert("Please fix the errors before saving.");
        return;
    }
    onSave(formData);
  };

  const hasErrors = Object.values(errors).some(e => e !== null);

  return (
    <div className="p-6 bg-white rounded-2xl animate-fade-in-up">
      <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">Review & Confirm</h2>
      <p className="text-sm text-slate-500 mb-6 text-center">AI has extracted the details. Please verify and save.</p>

      <div className="space-y-4">
        <div>
          <label htmlFor="transaction_name" className="block text-sm font-medium text-slate-600 mb-1">
            Transaction Name
          </label>
          <input
            id="transaction_name"
            name="transaction_name"
            type="text"
            value={formData.transaction_name || ''}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-1 ${errors.transaction_name ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
            placeholder="e.g., Coffee Shop"
            aria-invalid={!!errors.transaction_name}
            aria-describedby="transaction_name-error"
          />
          {errors.transaction_name && <p id="transaction_name-error" className="text-xs text-red-600 mt-1">{errors.transaction_name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="total_amount" className="block text-sm font-medium text-slate-600 mb-1">
              Amount
            </label>
            <input
              id="total_amount"
              name="total_amount"
              type="number"
              step="0.01"
              value={formData.total_amount ?? ''}
              onChange={handleAmountChange}
              className={`w-full px-3 py-2 text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-1 ${errors.total_amount ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
              placeholder="e.g., 25.00"
              aria-invalid={!!errors.total_amount}
              aria-describedby="total_amount-error"
            />
            {errors.total_amount && <p id="total_amount-error" className="text-xs text-red-600 mt-1">{errors.total_amount}</p>}
            {warnings.total_amount && !errors.total_amount && (
                 <div className="flex items-start gap-1.5 mt-1.5 text-xs text-amber-700">
                    <AlertTriangleIcon className="w-4 h-4 flex-shrink-0 mt-px" />
                    <span>{warnings.total_amount}</span>
                 </div>
            )}
          </div>
          <div>
            <label htmlFor="transaction_date" className="block text-sm font-medium text-slate-600 mb-1">
              Date
            </label>
            <input
              id="transaction_date"
              name="transaction_date"
              type="date"
              value={formData.transaction_date || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-1 ${errors.transaction_date ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
              aria-invalid={!!errors.transaction_date}
              aria-describedby="transaction_date-error"
            />
            {errors.transaction_date && <p id="transaction_date-error" className="text-xs text-red-600 mt-1">{errors.transaction_date}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || 'Other'}
            onChange={handleChange}
            className="w-full px-3 py-2 text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="client_or_prospect" className="block text-sm font-medium text-slate-600 mb-1">
            Client/Prospect
          </label>
          <input
            id="client_or_prospect"
            name="client_or_prospect"
            type="text"
            value={formData.client_or_prospect || ''}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-slate-800 bg-white border rounded-lg focus:outline-none focus:ring-1 ${errors.client_or_prospect ? 'border-red-500 ring-red-500' : 'border-slate-300 focus:ring-indigo-500'}`}
            placeholder="e.g., John Doe"
            aria-invalid={!!errors.client_or_prospect}
            aria-describedby="client_or_prospect-error"
          />
           {errors.client_or_prospect && <p id="client_or_prospect-error" className="text-xs text-red-600 mt-1">{errors.client_or_prospect}</p>}
        </div>
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-slate-600 mb-1">
            Purpose
          </label>
          <input
            id="purpose"
            name="purpose"
            type="text"
            value={formData.purpose || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Client Coffee"
          />
            {warnings.purpose && (
                 <div className="flex items-start gap-1.5 mt-1.5 text-xs text-amber-700">
                    <AlertTriangleIcon className="w-4 h-4 flex-shrink-0 mt-px" />
                    <span>{warnings.purpose}</span>
                 </div>
            )}
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          disabled={hasErrors}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          <PlusCircleIcon className="w-5 h-5" />
          {hasErrors ? 'Please Fix Errors' : 'Save Transaction'}
        </button>
        <button
          onClick={onDiscard}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon className="w-5 h-5" />
          Discard
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;