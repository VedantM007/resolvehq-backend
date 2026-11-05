INSERT INTO public.roles (id, name, description)
VALUES
    (1, 'ADMIN', 'Administrator with full platform access'),
    (2, 'TECHNICAL_SUPPORT_AGENT', 'Support agent responsible for handling customer tickets'),
    (3, 'CUSTOMER', 'Customer who can create and manage support tickets')
ON CONFLICT (id) DO NOTHING;