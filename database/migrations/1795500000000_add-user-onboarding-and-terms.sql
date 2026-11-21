-- Up Migration

ALTER TABLE users
ADD COLUMN onboarding_completed_at TIMESTAMPTZ;

CREATE TABLE user_terms_acceptances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    terms_version VARCHAR(50) NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_terms_acceptances_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_user_terms_acceptances_version
        UNIQUE (user_id, terms_version)
);

CREATE INDEX idx_user_terms_acceptances_user_id
ON user_terms_acceptances(user_id);