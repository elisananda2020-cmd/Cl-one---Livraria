document.addEventListener('DOMContentLoaded', function() {
    const telInput = document.getElementById('tel');
    const cpfInput = document.getElementById('cpf');
    const erroSpan = document.getElementById('cpf-erro');
    const form = document.getElementById('cadastroForm');

    // MÁSCARA DE TELEFONE
    telInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/^(\d*)/, '($1');
        }
        e.target.value = value;
    });

    // MÁSCARA DE CPF
    cpfInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length > 11) v = v.slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = v;
    });

    // VALIDADOR DE CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '' || cpf.length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
        return true;
    }

    cpfInput.addEventListener('blur', (e) => {
        if (!validarCPF(e.target.value) && e.target.value.length > 0) {
            erroSpan.style.display = 'block';
            cpfInput.style.border = '1px solid #ff4d4d';
        } else {
            erroSpan.style.display = 'none';
            cpfInput.style.border = '';
        }
    });

    // IMPEDE O ENVIO SE O CPF FOR INVÁLIDO
    form.addEventListener('submit', function(e) {
        if (!validarCPF(cpfInput.value)) {
            e.preventDefault(); 
            alert('Por favor, insira um CPF válido antes de continuar.');
            cpfInput.focus();
        }
    });
});

function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

function toggleContato() {
    const menu = document.getElementById('menuContato');
    menu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-item').forEach(el => observer.observe(el));

    let count = 0;
    const cartCountElement = document.querySelector('.cart-count');

    window.toggleCart = function() {
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        
        if (sidebar && overlay) {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-open');
        }
    };

    window.updateCartCount = function() {
        count++;
        if (cartCountElement) {
            cartCountElement.innerText = count;
        }
    };
});

