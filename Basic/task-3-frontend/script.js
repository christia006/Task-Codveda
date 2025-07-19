// URL API backend
const apiUrl = 'http://localhost:3000/users';

// Fungsi untuk ambil data dan tampilkan
async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const users = await response.json();

    const container = document.getElementById('users-container');
    container.innerHTML = '';

    users.forEach(user => {
      const div = document.createElement('div');
      div.className = 'user-card';
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Panggil fungsi saat halaman dibuka
fetchUsers();
