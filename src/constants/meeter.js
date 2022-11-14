export const PHONE_REGX =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

export const EVENT_STATUS = Object.freeze({
    DRAFT: 'Draft',
    PENDING: 'Pending',
    APPROVED: 'Approved',
});
export const DEFAULT_AFFILIATIONS = Object.freeze({
    affiliations: {
        active: {
            label: 'Meeter Test System',
            role: 'guest',
            value: 'mtr',
        },
        options: [
            {
                label: 'Meeter Test System',
                role: 'guest',
                value: 'mtr',
            },
        ],
    },
});
