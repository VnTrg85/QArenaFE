import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTestProjectDetail } from '../../Service/TestProject/index';
import './ProjectDetailPage.css';
import { createTestFeature } from '../../Service/TestProject/index';
import AddTestFeatureModal from '../../Component/TestFeature/TestfeatureModal/AddTestFeatureModal';
import TestFeatureCard from '../../Component/TestFeature/TestfeatureCard/TestFeature-Card';
import { getPayoutBugByProjectId, createPayoutBug } from '../../Service/TestProject/index';
import PayoutBugCard from '../../Component/PayoutBug/PayoutBugCard/PayoutBugCard';
import PayoutBugModal from '../../Component/PayoutBug/PayoutBugModal/PayoutBugModal';
import { useNavigate } from 'react-router-dom';

const ProjectDetailPage = () => {
  const location = useLocation();
  const [projectId,setProjectId] = useState( location.pathname.split("/")[3])
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [features, setFeatures] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        console.log("Fetching detail for ID:", projectId);
        const res = await getTestProjectDetail(projectId);
        console.log("Response from API:", res);
        if (res.status === 'success') {
          setProject(res.data);
          
        } else {
          console.error('Failed to fetch project details');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchPayouts = async () => {
      const res = await getPayoutBugByProjectId(projectId);
      if (res.status === 'success') {
        setPayouts(res.data);
      }
    };
    fetchPayouts();
    fetchProjectDetail();
  }, [projectId]);

  const handleAddFeature = async (featureData) => {
    const payload = { ...featureData, testProjectId: Number(projectId) };
    const res = await createTestFeature(payload);
    if (res.status === 'success') {
      setProject((prev) => ({
        ...prev,
        testFeatures: [...(prev.testFeatures || []), res.data],
      }));
    } else {
      alert("Thêm mới thất bại: " + res.data);
    }
  };

  const handleAddPayout = async (payoutData) => {
    const res = await createPayoutBug(payoutData);
    if (res.status === 'success') {
      setPayouts(prev => [...prev, res.data]);
    } else {
      alert("Thêm payout thất bại: " + res.data);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu dự án...</p>
      </div>
    );
  }
  if (!project) return <div className="error">Không tìm thấy thông tin dự án.</div>;
  return (
    <div className="project-detail-container">
      <h1 className="project-title">{project.projectName}</h1>

      <div className="project-section">
        <h3>Mô tả</h3>
        <p>{project.description}</p>
      </div>

      <div className="project-section">
        <h3>Mục tiêu</h3>
        <p>{project.goal}</p>
      </div>

      <div className="project-section">
        <h3>Ngoài phạm vi</h3>
        <p>{project.outScope}</p>
      </div>

      <div className="project-section">
        <h3>Yêu cầu bổ sung</h3>
        <p>{project.additionalRequirement}</p>
      </div>

      <div className="project-info-grid">
        <div className="info-item">
          <strong>Link:</strong><br />
          <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
        </div>

        <div className="info-item">
          <strong>Nền tảng:</strong><br />
          {project.platform?.join(", ")}
        </div>

        <div className="info-item">
          <strong>Ngôn ngữ:</strong><br />
          {project.language?.join(", ")}
        </div>

        <div className="info-item">
          <strong>Ngày tạo:</strong><br />
          {new Date(project.create_At).toLocaleDateString()}
        </div>

        <div className="info-item">
          <strong>Ngày kết thúc:</strong><br />
          {new Date(project.end_At).toLocaleDateString()}
        </div>

        <div className="info-item">
          <strong>Trạng thái:</strong><br />
          <span className={`status ${project.status}`}>{project.status}</span>
        </div>
      </div>
      {project.status === 'Done' && (
        <div className="list-bug-button-container">
          <button
            className="list-bug-button"
            onClick={() => navigate(`/Q3VzdG9tZXI=/project/list-bug/${projectId}`)}>
            Xem danh sách Bug
          </button>
        </div>
      )}
      <div className="testfeature-section">
        <div className="testfeature-header">
          <h2>Test Features</h2>
          <button onClick={() => setShowModal(true)}>+ Thêm Test Feature</button>
        </div>
        <div className="testfeature-grid">
          {(project.testFeatures || []).map((feature, index) => (
            <TestFeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {showModal && (
        <AddTestFeatureModal
          projectId={projectId}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddFeature}
        />
      )}

      <div className="testfeature-section">
        <div className="testfeature-header">
          <h2>Payout Bugs</h2>
          <button onClick={() => setShowPayoutModal(true)}>+ Thêm Payout</button>
        </div>
        <div className="testfeature-grid">
          {payouts.map((payout, idx) => (
            <PayoutBugCard key={idx} payout={payout} />
          ))}
        </div>
      </div>

      {showPayoutModal && (
        <PayoutBugModal
          projectId={projectId}
          onClose={() => setShowPayoutModal(false)}
          onSubmit={handleAddPayout}
        />
      )}
    </div>
  );
};

export default ProjectDetailPage;
