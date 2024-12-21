create database nhathuoc;
use nhathuoc;
-- Bảng bệnh nhân (Patient)
CREATE TABLE patient (
    patient_id INT AUTO_INCREMENT PRIMARY KEY, 
    patient_name VARCHAR(200),
    gender VARCHAR(50),
    date_of_birth DATE,
    address VARCHAR(200),
    phone VARCHAR(10)
);

-- Bảng nhà cung cấp (Supplier)
CREATE TABLE supplier (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY, 
    supplier_name VARCHAR(200),
    phone VARCHAR(10),
    address VARCHAR(200)
);

-- Bảng thuốc (Medicine)
CREATE TABLE medicine (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY, 
    medicine_name VARCHAR(200),
    treat varchar(200), 
    quantity INT,
    exp_date DATE,
    medicine_type VARCHAR(200),
    entry_date DATE,
    image_url VARCHAR(500),
    price VARCHAR(20)
);
-- Bảng đóng góp thuốc (Contribution)
CREATE TABLE contribution (
    contribution_id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT, 
    supplier_id INT, 
    quantity INT,
    FOREIGN KEY (medicine_id) REFERENCES medicine(medicine_id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id) ON DELETE CASCADE
);

-- Bảng chi tiết hóa đơn (Invoice Details)
CREATE TABLE invoice_details (
    invoice_details_id INT AUTO_INCREMENT PRIMARY KEY, 
    patient_id INT, 
    medicine_id INT, 
    quantity INT,
    date_of_transact DATE,
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicine(medicine_id) ON DELETE CASCADE
);


-- Thêm 10 bệnh nhân vào bảng patient
INSERT INTO patient (patient_name, gender, date_of_birth, address, phone) VALUES
('Nguyễn Văn An', 'Nam', '1990-01-01', '123 Lý Tự Trọng, Q1, TP.HCM', '0901234567'),
('Trần Thị Bình', 'Nữ', '1985-05-12', '456 Nguyễn Huệ, Q1, TP.HCM', '0902345678'),
('Lê Minh Cường', 'Nam', '1992-07-23', '789 Đoàn Văn Bơ, Q4, TP.HCM', '0903456789'),
('Phạm Hồng Duyên', 'Nữ', '1994-09-10', '101 Nguyễn Thị Minh Khai, Q3, TP.HCM', '0904567890'),
('Vũ Thị Mai', 'Nữ', '1980-11-15', '202 Hoàng Sa, Q1, TP.HCM', '0905678901'),
('Bùi Văn Hòa', 'Nam', '1993-02-20', '303 Lê Quang Định, Q1, TP.HCM', '0906789012'),
('Đặng Thị Hồng', 'Nữ', '1988-03-30', '404 Trần Phú, Q5, TP.HCM', '0907890123'),
('Ngô Minh Hiếu', 'Nam', '1995-06-18', '505 Phan Đình Phùng, Q1, TP.HCM', '0908901234'),
('Lý Thị Lan', 'Nữ', '1987-10-25', '606 Cách Mạng Tháng Tám, Q10, TP.HCM', '0909012345'),
('Hoàng Văn Sơn', 'Nam', '1991-12-05', '707 Nguyễn Oanh, Q12, TP.HCM', '0900123456');

-- Thêm 10 nhà cung cấp vào bảng supplier
INSERT INTO supplier (supplier_name, phone, address) VALUES
('Công Ty Dược phẩm An Bình', '0901112233', '101 Trường Chinh, Q.Tân Bình, TP.HCM'),
('Công Ty Dược phẩm Bảo An', '0902223344', '202 Nguyễn Văn Cừ, Q.5, TP.HCM'),
('Công Ty Dược phẩm Dũng Tân', '0903334455', '303 Lê Đại Hành, Q.11, TP.HCM'),
('Công Ty Dược phẩm Hải Nam', '0904445566', '404 Phan Xích Long, Q. Phú Nhuận, TP.HCM'),
('Công Ty Dược phẩm Minh An', '0905556677', '505 Võ Văn Kiệt, Q.1, TP.HCM'),
('Công Ty Dược phẩm Việt Tín', '0906667788', '606 Kinh Dương Vương, Q.Bình Tân, TP.HCM'),
('Công Ty Dược phẩm Đại Tín', '0907778899', '707 Lê Quang Định, Q.Gò Vấp, TP.HCM'),
('Công Ty Dược phẩm Phú Bình', '0908889900', '808 Bạch Đằng, Q. Bình Thạnh, TP.HCM'),
('Công Ty Dược phẩm Đông Á', '0909990011', '909 Nguyễn Kiệm, Q.Gò Vấp, TP.HCM'),
('Công Ty Dược phẩm Hoàng Anh', '0910001122', '1010 Phan Huy Ích, Q.Tân Bình, TP.HCM');

-- Thêm 10 thuốc vào bảng medicine
INSERT INTO medicine (medicine_name, treat, quantity, exp_date, medicine_type, entry_date, image_url, price) VALUES
('Paracetamol 500mg', 'Giảm đau, hạ sốt', 100, '2025-12-31', 'Thuốc giảm đau', '2024-12-21', 'http://example.com/image_paracetamol.jpg', '100.000 đ'),
('Amoxicillin 500mg', 'Kháng sinh, điều trị nhiễm trùng', 200, '2026-01-15', 'Kháng sinh', '2024-12-21', 'http://example.com/image_amoxicillin.jpg', '150.000 đ'),
('Ibuprofen 400mg', 'Giảm đau, chống viêm', 150, '2025-06-30', 'Thuốc giảm đau, chống viêm', '2024-12-21', 'http://example.com/image_ibuprofen.jpg', '120.000 đ'),
('Omeprazole 20mg', 'Điều trị loét dạ dày', 50, '2025-03-20', 'Thuốc dạ dày', '2024-12-21', 'http://example.com/image_omeprazole.jpg', '180.000 đ'),
('Metformin 500mg', 'Điều trị tiểu đường', 120, '2027-02-28', 'Thuốc tiểu đường', '2024-12-21', 'http://example.com/image_metformin.jpg', '250.000 đ'),
('Cetirizine 10mg', 'Điều trị dị ứng', 80, '2025-11-11', 'Thuốc dị ứng', '2024-12-21', 'http://example.com/image_cetirizine.jpg', '90.000 đ'),
('Salbutamol 2mg', 'Điều trị hen suyễn', 200, '2026-08-10', 'Thuốc hen suyễn', '2024-12-21', 'http://example.com/image_salbutamol.jpg', '200.000 đ'),
('Aspirin 100mg', 'Giảm đau, hạ sốt', 300, '2025-12-01', 'Thuốc giảm đau, hạ sốt', '2024-12-21', 'http://example.com/image_aspirin.jpg', '80.000 đ'),
('Vitamin C 500mg', 'Vitamin bổ sung cho cơ thể', 500, '2027-05-05', 'Vitamin', '2024-12-21', 'http://example.com/image_vitamin_c.jpg', '50.000 đ'),
('Loratadine 10mg', 'Điều trị dị ứng', 150, '2026-09-30', 'Thuốc dị ứng', '2024-12-21', 'http://example.com/image_loratadine.jpg', '120.000 đ');

-- Thêm 10 đóng góp thuốc vào bảng contribution
INSERT INTO contribution (medicine_id, supplier_id, quantity) VALUES
(1, 1, 50),
(2, 2, 100),
(3, 3, 150),
(4, 4, 50),
(5, 5, 120),
(6, 6, 80),
(7, 7, 200),
(8, 8, 300),
(9, 9, 500),
(10, 10, 150);

-- Thêm 10 chi tiết hóa đơn vào bảng invoice_details
INSERT INTO invoice_details (patient_id, medicine_id, quantity, date_of_transact) VALUES
(1, 1, 2, '2024-12-21'),
(2, 2, 1, '2024-12-21'),
(3, 3, 5, '2024-12-21'),
(4, 4, 1, '2024-12-21'),
(5, 5, 3, '2024-12-21'),
(6, 6, 2, '2024-12-21'),
(7, 7, 1, '2024-12-21'),
(8, 8, 4, '2024-12-21'),
(9, 9, 6, '2024-12-21'),
(10, 10, 3, '2024-12-21');
