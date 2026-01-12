CREATE TABLE groups_has_permissions (
    group_id BIGINT NOT NULL COMMENT 'Group ID',
    permission_id BIGINT NOT NULL COMMENT 'Permission ID',
    PRIMARY KEY (group_id, permission_id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);