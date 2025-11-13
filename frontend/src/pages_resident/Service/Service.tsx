// src/pages/Service/Service.tsx
import { useService } from './Service_hook';
import './Service.css';

const Service = () => {
  const { allServices, loading } = useService();

  if (loading) {
    return (
      <div className="service-loading">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Danh sách dịch vụ</h1>
      </div>

      <section className="all-services">
        <div className="service-grid">
          {allServices.map(service => (
            <div key={service.id} className="service-card">
              <h3>{service.name}</h3>
              <p className="service-info">{service.info}</p>
              <p className="service-calculate">
                <strong>Cách tính:</strong> {service.calculate}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Service;