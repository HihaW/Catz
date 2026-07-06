document.addEventListener('DOMContentLoaded', () => {
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

        function closeModal(activeCard) {
            activeCard.classList.add('closing');
            backdrop.classList.remove('active');
            document.body.style.overflow = ''; 
        
            setTimeout(() => {
                activeCard.classList.remove('expanded', 'closing');
            
                activeCard.classList.add('return-grid');
            
                if (activePlaceholder) {
                    activePlaceholder.remove();
                    activePlaceholder = null;
                }

                setTimeout(() => {
                    activeCard.classList.remove('return-grid');
                }, 300); 

            }, 300);
        }
    });
