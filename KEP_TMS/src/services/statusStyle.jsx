const getSeverity = (status) => {
    status = status.toUpperCase();
    switch (status) {
        case 'FORAPPROVAL':
            return 'success';

        case 'APPROVED':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
export default getSeverity