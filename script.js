document.addEventListener('DOMContentLoaded', () => {
    // [Kode fitur smooth-scroll dan pencarian dinamis tetap dipertahankan seperti semula...]
    const btnExplore = document.getElementById('btn-explore');
    const contentSection = document.getElementById('content-section');

    if (btnExplore && contentSection) {
        btnExplore.addEventListener('click', () => {
            contentSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const searchInput = document.getElementById('search-breed');
    const cards = document.querySelectorAll('.breed-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            cards.forEach(card => {
                const breedName = card.getAttribute('data-name').toLowerCase();
                if (breedName.includes(keyword)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Pembuatan elemen backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);

    let activePlaceholder = null;

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-expand')) return;
            if (this.classList.contains('expanded') || this.classList.contains('closing')) return;

            const currentExpanded = document.querySelector('.breed-card.expanded');
            if (currentExpanded) {
                closeModal(currentExpanded);
            }

            activePlaceholder = document.createElement('div');
            activePlaceholder.className = 'card-placeholder';
            activePlaceholder.style.height = `${this.offsetHeight}px`;
            
            this.parentNode.insertBefore(activePlaceholder, this);

            this.classList.add('expanded');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeBtn = card.querySelector('.close-expand');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                closeModal(card);
            });
        }
    });

    backdrop.addEventListener('click', () => {
        const currentExpanded = document.querySelector('.breed-card.expanded');
        if (currentExpanded) {
            closeModal(currentExpanded);
        }
    });

    // PERBARUAN UTAMA: Logika Penutupan Berwaktu 3 Fase
        function closeModal(activeCard) {
            // Fase 1: Pemicu animasi keluar (Modal Fade Out)
            activeCard.classList.add('closing');
            backdrop.classList.remove('active');
            document.body.style.overflow = ''; 
        
            // Fase 2: Kembalikan ke grid setelah modal menghilang
            setTimeout(() => {
                // Hapus status modal sepenuhnya
                activeCard.classList.remove('expanded', 'closing');
            
                // Berikan kelas baru agar card muncul perlahan di posisi asalnya
                activeCard.classList.add('return-grid');
            
                // Bersihkan placeholder pengunci grid
                if (activePlaceholder) {
                    activePlaceholder.remove();
                    activePlaceholder = null;
                }

                // Fase 3: Pembersihan tuntas setelah animasi grid selesai
                setTimeout(() => {
                    activeCard.classList.remove('return-grid');
                }, 300); // Waktu yang sama dengan durasi animasi returnToGrid

            }, 300); // Waktu tunggu animasi modalClose selesai
        }
    });
