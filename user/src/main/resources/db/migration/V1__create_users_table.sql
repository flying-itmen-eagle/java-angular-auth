CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 如果您有初始資料要塞入，也可以寫在這裡
INSERT INTO users (username, password, email) VALUES ('admin', 'admin123', 'admin@example.com');
