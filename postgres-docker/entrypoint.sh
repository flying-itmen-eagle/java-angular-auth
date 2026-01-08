#!/bin/bash
set -e

# 定義資料庫目錄
PGDATA="/var/lib/pgsql/18/data"

# 檢查是否需要初始化 (如果目錄下沒有 PG_VERSION 檔案)
if [ ! -s "$PGDATA/PG_VERSION" ]; then
    echo "Initializing PostgreSQL..."
    /usr/pgsql-18/bin/initdb -D "$PGDATA"

    echo "Configuring remote access..."
    # 修改 pg_hba.conf 允許所有 IP 連線
    echo "host all all 0.0.0.0/0 trust" >> "$PGDATA/pg_hba.conf"

    # 修改 postgresql.conf 監聽所有 IP
    echo "listen_addresses='*'" >> "$PGDATA/postgresql.conf"
fi

# 執行傳入的指令 (即 CMD 的內容)
exec "$@"