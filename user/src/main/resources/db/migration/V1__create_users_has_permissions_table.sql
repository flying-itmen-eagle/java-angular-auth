CREATE TABLE users_has_permissions (
    user_id BIGINT NOT NULL COMMENT 'User ID',
    permission_id BIGINT NOT NULL COMMENT 'Permission ID',
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);