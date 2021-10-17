-- Table: guild.infractions

-- DROP TABLE guild.infractions;

CREATE TABLE IF NOT EXISTS guild.infractions
(
    report_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 100000000 CACHE 1 ),
    discord_id bigint,
    discord_tag text COLLATE pg_catalog."default",
    infractions text COLLATE pg_catalog."default",
    moderator_id bigint,
    moderator_tag text COLLATE pg_catalog."default",
    reason text COLLATE pg_catalog."default",
    "timestamp" bigint,
    server_id bigint
)

