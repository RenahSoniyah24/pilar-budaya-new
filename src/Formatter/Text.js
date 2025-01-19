export const formatDate = (isoString) => {
  let date = new Date(isoString);
  let formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
}

export function formatDateToIndonesian(dateStr) {
  // Parse tanggal dari string
  const date = new Date(dateStr);

  // Daftar nama bulan dalam bahasa Indonesia
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Ambil hari, bulan, dan tahun
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Gabungkan dalam format "10 Januari 2025"
  return `${day} ${month} ${year}`;
}

export const formatName = (name, maxLength) => {
  if (!name || typeof name !== 'string') {
    return '';
  }
  return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
};