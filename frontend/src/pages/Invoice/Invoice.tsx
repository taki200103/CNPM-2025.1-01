import { useInvoice } from './Invoice_hook';
import './Invoice.css';

const Invoice = () => {
  const { invoices, loading, error } = useInvoice();

  if (loading) {
    return (
      <div className="invoice-loading">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="invoice-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="invoice-page">
      <header className="invoice-header">
        <h1>Hóa đơn của tôi</h1>
      </header>

      {invoices.length === 0 ? (
        <div className="invoice-empty">Chưa có hóa đơn nào.</div>
      ) : (
        <div className="invoice-list">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="invoice-card">
              <div className="invoice-card-header">
                <h3 className="invoice-name">{invoice.name}</h3>
                <span className="invoice-amount">
                  {invoice.money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
              <div className="invoice-meta">
                <span>Ngày tạo: {new Date(invoice.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="invoice-row">
                <span className="label">Dịch vụ</span>
                <span className="value">{invoice.service?.name || '-'}</span>
              </div>
              <div className="invoice-row">
                <span className="label">Cách tính</span>
                <span className="value">{invoice.service?.calculate || '-'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoice;


