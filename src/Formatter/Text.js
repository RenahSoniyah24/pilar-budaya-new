export const formatDate = (isoString) => {
  let date = new Date(isoString);
  let formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date);
}

export const calculateAge = (birthdateString) => {
  const birthdate = new Date(birthdateString);
  if (isNaN(birthdate)) {
    return 0;
  }

  const today = new Date();

  if (birthdate > today) {
    return 0;
  }

  let age = today.getFullYear() - birthdate.getFullYear();

  const isBeforeBirthday =
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  return age;
};

export const getFileIdFromDriveUrl  = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export const formatRupiah = (amount) => {
  if (typeof amount !== 'number') {
    throw new Error('Input must be a number');
  }
  
  return `Rp.${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
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

export const getLatestPayment = (payments) => {
  if (!Array.isArray(payments) || payments.length === 0) {
      console.error("Invalid input: payments should be a non-empty array.");
      return null;
  }

  // Sort by uploadDate in descending order and return the first item
  const sortedPayments = payments.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  return sortedPayments[0] || null;
};

export const getCurrentMonth = () => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const currentMonthIndex = new Date().getMonth(); // Mendapatkan indeks bulan (0-11)
  return months[currentMonthIndex];
};