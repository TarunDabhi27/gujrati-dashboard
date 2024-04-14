export default function statusEnumToReadable(status: string): {
  label: string;
  color: string;
} {
  switch (status) {
    case 'ACTIVE':
      return {
        label: 'Active',
        color: '#43A047',
      };
    case 'UNDER_REVIEW':
      return {
        label: 'Under Review',
        color: '#FB8C00',
      };
    case 'INACTIVE':
      return {
        label: 'Inactive',
        color: '#757575',
      };
    case 'CANCELLED':
      return {
        label: 'Cancelled',
        color: '#E53935',
      };
    case 'CREATED':
      return {
        label: 'Created',
        color: '#3949AB',
      };
    case 'COMPLETED':
      return {
        label: 'Completed',
        color: '#43A047',
      };
    case 'DRAFT':
      return {
        label: 'Draft',
        color: '#6D4C41',
      };
    default:
      return {
        label: status,
        color: '#000',
      };
  }
}
