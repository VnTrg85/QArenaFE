import React, { useEffect, useState } from 'react';
import './PayoutBugModal.css';
import { getAllBugTypes } from '../../../Service/TestProject';

const PayoutBugModal = ({ projectId, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [bugTypeId, setBugTypeId] = useState('');
  const [bugTypes, setBugTypes] = useState([]);

  useEffect(() => {
    const fetchBugTypes = async () => {
      const res = await getAllBugTypes();
      if (res.status === 'success') {
        setBugTypes(res.data);
      } else {
        console.error('Lỗi khi tải Bug Type:', res.data);
      }
    };
    fetchBugTypes();
  }, []);

  const handleSubmit = () => {
    if (!amount || !bugTypeId) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const payload = {
      amount: Number(amount),
      bugType: { id: Number(bugTypeId) },
      testProject: { id: Number(projectId) }
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3 className="modal-title">Thêm Payout Bug</h3>

        <label htmlFor="amount">Số tiền:</label>
        <input
          id="amount"
          type="number"
          placeholder="Nhập số tiền"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <label htmlFor="bugType">Loại Bug:</label>
        <select
          id="bugType"
          value={bugTypeId}
          onChange={e => setBugTypeId(e.target.value)}
        >
          <option value="">-- Chọn loại bug --</option>
          {bugTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button className="btn btn-submit" onClick={handleSubmit}>Thêm</button>
          <button className="btn btn-cancel" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default PayoutBugModal;
