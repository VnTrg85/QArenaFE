import React, { useState, useEffect } from 'react';
import QuillEditor from '../../QuillEditor';
import { getAllBugTypes } from '../../../Service/TestProject/index';
import './AddTestFeatureModal.css';

const AddTestFeatureModal = ({ projectId, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [bugTypes, setBugTypes] = useState([]);
  const [selectedBugType, setSelectedBugType] = useState(null);

  useEffect(() => {
    const fetchBugTypes = async () => {
      try {
        const res = await getAllBugTypes();
        if (res.status === 'success') {
          setBugTypes(res.data);
        }
      } catch (error) {
        console.error('Lỗi khi load bug types:', error);
      }
    };

    fetchBugTypes();
  }, []);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleSubmit = () => {
    if (name.trim()) {
    const selectedBugTypeObj = bugTypes.find(bt => bt.id === selectedBugType);
    const bugTypeName = selectedBugTypeObj ? selectedBugTypeObj.name : '';
      const data = {
        name: name.trim(),
        input: stripHtml(input),
        output: stripHtml(output),
        bugTypeId: selectedBugType ? [selectedBugType] : [],
        bugTypeName: bugTypeName,
        projectId: projectId
      };
      console.log(data);
      onSubmit(data);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Thêm mới Test Feature</h2>
        <div className="modal-form">
          <label>Tên Feature:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />

          <label>Input:</label>
          <QuillEditor value={input} onChange={setInput} />

          <label>Output:</label>
          <QuillEditor value={output} onChange={setOutput} />

          <label>Chọn Bug Type:</label>
            <div className="bugtype-dropdownlist">
            <select
                value={selectedBugType || ""}
                onChange={(e) => setSelectedBugType(Number(e.target.value))}
            >
                <option value="">Chọn Bug Type</option>
                {bugTypes.map((bt) => (
                <option key={bt.id} value={bt.id}>
                    <img
                    src={bt.icon_link}
                    alt={bt.name}
                    className="bugtype-iconlist"
                    style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    {bt.name}
                </option>
                ))}
            </select>
            </div>

          <div className="modal-actions">
            <button onClick={handleSubmit}>Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestFeatureModal;
