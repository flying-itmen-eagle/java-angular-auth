-- Active: 1768188799888@@127.0.0.1@5432@postgres
CREATE Table groups (
    id BIGSERIAL PRIMARY KEY COMMENT 'Primary key',
    name TEXT NOT NULL COMMENT 'Name of the group',
    enabled BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Whether the group is active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp'
);