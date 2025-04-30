import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ListBugPage.css';
import { getBugsByProject, exportBugsToExcel } from '../../Service/TestProject/index';

const ListBugPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const projectId = location.pathname.split("/")[4];
  
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await getBugsByProject(projectId);
        if (res.status === 'success') {
          setBugs(res.data);
        } else {
          console.error('Lỗi khi lấy danh sách bug:', res.data);
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi gọi API:', error);
      }
    };
    fetchBugs();
  }, [projectId]);

  const handleExport = async () => {
    try {
      const response = await exportBugsToExcel(projectId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bug_report_project_${projectId}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Export lỗi:', error);
    }
  };

  return (
    <div className="bug-list-container">
      <h2>Danh sách Bug</h2>
      <div className="bug-actions">
        <button onClick={() => navigate(-1)}>Quay lại</button>
        <button onClick={handleExport}>Export Excel</button>
      </div>
      <table className="bug-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Trình duyệt</th>
            <th>Trạng thái</th>
            <th>Ngày báo</th>
            <th>Bug Type ID</th>
            <th>URL Test</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.title}</td>
              <td>{bug.browswer}</td>
              <td>{bug.status}</td>
              <td>{new Date(bug.reported_at).toLocaleDateString()}</td>
              <td>{bug.bugTypeId}</td>
              <td>
                <a href={bug.url_test} target="_blank" rel="noreferrer">Xem</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBugPage;
