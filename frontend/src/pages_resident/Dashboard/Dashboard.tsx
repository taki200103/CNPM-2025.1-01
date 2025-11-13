// src/pages/Dashboard/DashboardPage.tsx
import { useState } from 'react';
import './Dashboard.css';

interface StatCard {
  number: number;
  label: string;
  dateRange: string;
}

const DashboardPage = () => {
  const [stats] = useState<StatCard[]>([
    { number: 5, label: 'Thanh Vien', dateRange: 'Jan 1, 2023 - June 30, 2023' },
    { number: 10, label: 'Thong bao', dateRange: 'Jan 1, 2023 - June 30, 2023' },
    { number: 100000, label: 'Tien phai dong (vnd)', dateRange: 'Jan 1, 2023 - June 30, 2023' },
  ]);

  const [bottomStats] = useState<StatCard[]>([
    { number: 18, label: 'Thong bao', dateRange: 'Jan 1, 2023 - June 30, 2023' },
    { number: 18, label: 'Thong bao', dateRange: 'Jan 1, 2023 - June 30, 2023' },
    { number: 18, label: 'Thong bao', dateRange: 'Jan 1, 2023 - June 30, 2023' },
  ]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-page">
        <div className="dashboard-content">
        {/* Top Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h2 className="stat-number">{stat.number}</h2>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-date">{stat.dateRange}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Tong chi phi trong thang</h3>
            <p className="chart-date">Jan 1, 2023 - June 30, 2023</p>
            <div className="chart-container">
              <div className="chart-placeholder">
                {/* Biểu đồ cột sẽ được thêm vào đây */}
                <p>Bar Chart</p>
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Thong ke chi phi</h3>
            <p className="chart-date">Jan 1, 2023 - June 30, 2023</p>
            <div className="chart-container">
              <div className="chart-placeholder">
                {/* Biểu đồ đường sẽ được thêm vào đây */}
                <p>Line Chart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="stats-grid-bottom">
          {bottomStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h2 className="stat-number">{stat.number}</h2>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-date">{stat.dateRange}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;