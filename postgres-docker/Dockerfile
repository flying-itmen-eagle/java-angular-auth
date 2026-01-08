# 使用 CentOS Stream 9 作為基底 (CentOS 7 已停止維護，且較難支援新版 PG)
FROM quay.io/centos/centos:stream9

# 修正 Repo 連線問題：切換 mirrorlist 為 baseurl，避免 mirrorlist 連線失敗
RUN sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/centos-*.repo && \
    sed -i 's|#baseurl=http://mirror.stream.centos.org|baseurl=http://stream.centos.org|g' /etc/yum.repos.d/centos-*.repo

# 1. 更新系統套件
# 2. 安裝 PostgreSQL 官方 Yum Repository (針對 EL9)
# 3. 停用系統內建的 PostgreSQL 模組 (避免版本衝突)
# 4. 安裝 PostgreSQL 18 Server 與 Client
RUN dnf -y update && \
    dnf -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm && \
    dnf -y -q module disable postgresql && \
    dnf -y install postgresql18-server postgresql18 && \
    dnf clean all

# 設定環境變數，將 PostgreSQL binary 加入 PATH，方便直接執行 psql 或 postgres 指令
ENV PATH=$PATH:/usr/pgsql-18/bin

# 建立資料庫資料目錄並設定權限
RUN mkdir -p /var/lib/pgsql/18/data && \
    chown -R postgres:postgres /var/lib/pgsql

# 複製 Entrypoint 腳本並給予執行權限
COPY entrypoint.sh /usr/local/bin/
# 使用 sed 去除可能存在的 Windows 換行字元 (\r)，避免腳本執行失敗
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

# 切換至 postgres 使用者 (PostgreSQL 不建議以 root 執行)
USER postgres

# 開放 PostgreSQL 預設 Port
EXPOSE 5432

# 設定預設執行指令
# 注意：若資料目錄為空，啟動時需要先執行 initdb。
# 這裡僅示範啟動指令，實際生產環境建議搭配 Entrypoint script 來自動處理初始化。
ENTRYPOINT ["entrypoint.sh"]
CMD ["postgres", "-D", "/var/lib/pgsql/18/data"]
