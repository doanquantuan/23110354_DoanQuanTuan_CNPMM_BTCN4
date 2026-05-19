-- Insert Roles
INSERT INTO roles (id, name) VALUES
(1, 'Admin'),
(2, 'User');

-- Insert Users (Password: Learning@2026 -> Hash: $2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO)
INSERT INTO users (email, password, firstName, lastName, address, phoneNumber, gender, image, roleId, positionId, createdAt, updatedAt) VALUES
('ntha91.nvt@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO', 'Trường', 'Nguyễn', '123 Main Street, Ho Chi Minh City, Vietnam', '0912345678', 1, NULL, 1, 'admin', NOW(), NOW()),
('user1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO', 'John', 'Doe', '456 Oak Avenue, Ha Noi, Vietnam', '0987654321', 1, NULL, 2, 'developer', NOW(), NOW()),
('user2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO', 'Jane', 'Smith', '789 Pine Road, Da Nang, Vietnam', '0901234567', 0, NULL, 2, 'designer', NOW(), NOW()),
('user3@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO', 'Michael', 'Johnson', '321 Elm Street, Can Tho, Vietnam', '0923456789', 1, NULL, 2, 'tester', NOW(), NOW()),
('user4@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye4k0Dy8KVvJ6H7F1H6Fxqd4mHlP9e0vO', 'Sarah', 'Williams', '654 Maple Drive, Hai Phong, Vietnam', '0934567890', 0, NULL, 2, 'manager', NOW(), NOW());

-- Insert OTPs
INSERT INTO otps (code, userId, type, isUsed, expiresAt, createdAt) VALUES
('123456', 1, 'forgot_password', 0, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW()),
('654321', 2, 'forgot_password', 0, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW()),
('111111', 3, 'register', 0, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW()),
('222222', 4, 'forgot_password', 0, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW()),
('333333', 5, 'forgot_password', 1, DATE_SUB(NOW(), INTERVAL 1 HOUR), DATE_SUB(NOW(), INTERVAL 2 HOUR));
