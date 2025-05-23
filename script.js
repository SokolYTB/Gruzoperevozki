document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Анимация чисел в статистике
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    number.textContent = target;
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Запуск анимации при скролле до блока
    function checkScroll() {
        const aboutSection = document.querySelector('.about');
        const sectionTop = aboutSection.offsetTop;
        const sectionHeight = aboutSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > sectionTop + sectionHeight - windowHeight - 100) {
            animateNumbers();
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    
    // Слайдер отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Автопереключение слайдера
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Модальное окно
    const modal = document.getElementById('orderModal');
    const orderBtn = document.getElementById('orderBtn');
    const closeBtn = document.querySelector('.close');
    
    orderBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработка форм
    const orderForm = document.getElementById('orderForm');
    const modalForm = document.getElementById('modalForm');
    
    function handleFormSubmit(e, formType) {
        e.preventDefault();
        
        let name, phone, message;
        
        if (formType === 'main') {
            name = document.getElementById('name').value;
            phone = document.getElementById('phone').value;
            message = document.getElementById('message').value;
        } else {
            name = document.getElementById('modalName').value;
            phone = document.getElementById('modalPhone').value;
            const service = document.getElementById('modalService').value;
            message = `Заявка на услугу: ${service}`;
        }
        
        // Здесь должна быть логика отправки данных на сервер
        console.log('Отправка заявки:', { name, phone, message });
        
        // Показываем сообщение об успехе
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        
        // Очищаем форму
        if (formType === 'main') {
            orderForm.reset();
        } else {
            modalForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    orderForm.addEventListener('submit', (e) => handleFormSubmit(e, 'main'));
    modalForm.addEventListener('submit', (e) => handleFormSubmit(e, 'modal'));
    
    // Маска для телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+()-]/g, '');
        });
    });
});