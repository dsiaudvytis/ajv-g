export default (state = '', { type, data }) => {
  switch (type) {
    case 'UPLOAD_SOURCE_DOC':
      return data;
    default:
      return state;
  };
};
