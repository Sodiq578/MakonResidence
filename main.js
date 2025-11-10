const BOT_TOKEN = '8328125073:AAEWoSW-yjqgPLq4uLPEKGyemwa2lr47x6I';
const CHAT_ID   = '-4935605017';

// Elementlar
const openModal = document.getElementById('openModal');
const openModal2 = document.getElementById('openModal2'); // ikkinchi tugma
const formModal = document.getElementById('makon-modal');
const closeModal = document.getElementById('closeModal');
const makonForm = document.getElementById('makonForm');
const successModal = document.getElementById('successModal');

// Modalni ochish
openModal.addEventListener('click', () => {
  formModal.style.display = 'flex';
});

if(openModal2) {
  openModal2.addEventListener('click', () => {
    formModal.style.display = 'flex';
  });
}

// Modalni yopish
closeModal.addEventListener('click', () => {
  formModal.style.display = 'none';
});

// Formani yuborish
makonForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !phone) {
    alert("Iltimos, barcha maydonlarni to‘ldiring!");
    return;
  }

  const message = `📝 Yangi so‘rov:
👤 Ism: ${name}
📞 Telefon: ${phone}
🌐 Sayt: 2 oq sayt`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    // Modalni yopish va muvaffaqiyat modali ochish
    formModal.style.display = 'none';
    successModal.style.display = 'flex';
  } catch (error) {
    alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
    console.error(error);
  }
});

// Modal tashqarisiga bosganda yopish
window.addEventListener('click', (e) => {
  if (e.target === formModal) formModal.style.display = 'none';
  if (e.target === successModal) successModal.style.display = 'none';
});
