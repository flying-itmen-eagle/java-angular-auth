CREATE Table users_has_groups (
    user_id BIGINT NOT NULL COMMENT 'User ID',
    group_id BIGINT NOT NULL COMMENT 'Group ID',
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);