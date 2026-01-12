create Table permissions (
    id BIGSERIAL PRIMARY KEY COMMENT 'Primary key',
    name VARCHAR(255) NOT NULL COMMENT 'Name of the permission',
    description TEXT COMMENT 'Description of the permission',
    label INTEGER NOT NULL DEFAULT 0 COMMENT '0:main menu, 1:sub menu, 2:view, 3:action',
    parent_id BIGINT DEFAULT NULL COMMENT 'Parent permission ID for hierarchical structure',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp'
);