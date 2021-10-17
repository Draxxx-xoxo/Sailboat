-- Table: guild.reports

-- DROP TABLE guild.reports;

CREATE TABLE IF NOT EXISTS guild.reports
(
    report_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 10000000000 CACHE 1 ),
    reporter_id bigint,
    reporter_tag text COLLATE pg_catalog."default",
    reported_user_tag text COLLATE pg_catalog."default",
    reported_user_id bigint,
    reason text COLLATE pg_catalog."default",
    "timestamp" bigint,
    server_id bigint,
    status text COLLATE pg_catalog."default",
    message_id bigint
)