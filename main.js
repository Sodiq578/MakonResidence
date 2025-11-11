const BOT_TOKEN = '8328125073:AAEWoSW-yjqgPLq4uLPEKGyemwa2lr47x6I';
const CHAT_ID = '-4935605017';

// Elementlar
const openModalBtns = document.querySelectorAll('#openModal, #openModal2'); // Har ikkala tugma
const formModal = document.getElementById('makon-modal');
const closeModalBtn = document.getElementById('closeModal');
const makonForm = document.getElementById('makonForm');

// Modalni ochish (har ikkala tugma ishlaydi)
openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formModal.style.display = 'flex';
    });
});

// Modalni yopish (× tugmasi)
closeModalBtn.addEventListener('click', () => {
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

    const message = `📝 Yangi so‘rov:\n👤 Ism: ${name}\n📞 Telefon: ${phone}\n🌐 Sayt: 2 oq sayt`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            // Formani yopish va tozalash
            formModal.style.display = 'none';
            makonForm.reset();

            // Userni avtomatik Telegram kanalga yo'naltirish
            window.location.href = 'https://t.me/megaaksiya2026';
        } else {
            throw new Error('Telegram xizmati xatosi');
        }
    } catch (error) {
        alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
        console.error(error);
    }
});
