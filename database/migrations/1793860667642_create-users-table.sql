-- Up Migration

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    auth0_issuer VARCHAR(255) NOT NULL,
    auth0_subject VARCHAR(255) NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    role_id SMALLINT NOT NULL,

    profile_picture_key VARCHAR(512),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deactivated_at TIMESTAMPTZ,

    CONSTRAINT uq_users_auth0_identity
        UNIQUE (auth0_issuer, auth0_subject),

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_users_deactivation
        CHECK (
            (is_active = TRUE AND deactivated_at IS NULL)
            OR
            (is_active = FALSE AND deactivated_at IS NOT NULL)
        ),

    CONSTRAINT chk_users_email_lowercase
        CHECK (email = LOWER(email))
);


-- Indexes

CREATE INDEX idx_users_role_id
    ON users(role_id);


-- Down Migration

DROP TABLE users;