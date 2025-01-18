export const formatDate = (isoString) => {
  let date = new Date(isoString);
  let formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
}

export const formatName = (name, maxLength) => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
};