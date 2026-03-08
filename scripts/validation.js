// scripts/validation.js
// Валидация формы обратной связи для FlowFlow

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        clearErrors();
        
        let isValid = true;


        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        const nameWords = fullnameValue.split(' ').filter(word => word.length > 0);

        if (fullnameValue === '') {
            showError(fullname, 'Введите ваше имя');
            isValid = false;
        } else if (nameWords.length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        }

        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }

        const topic = document.getElementById('topic');
        if (topic.value === '') {
            showError(topic, 'Выберите тему обращения');
            isValid = false;
        }

        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {

            const field = agreement.closest('.field');
            if (field) {
                const helpBlock = document.createElement('p');
                helpBlock.classList.add('help', 'is-danger');
                helpBlock.textContent = 'Необходимо согласие на обработку данных';
                field.appendChild(helpBlock);
                agreement.classList.add('is-danger');
            }
            isValid = false;
        }


        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                topic: topic.value,
                message: document.getElementById('message').value.trim() || '(не заполнено)',
                timestamp: new Date().toLocaleString('ru-RU')
            };

            const validationEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(validationEvent);


            alert('Спасибо! Ваше сообщение отправлено (демо-режим).\nДанные выведены в консоль.');
            form.reset();
        }
    });

    function showError(input, message) {
        input.classList.add('is-danger');

        const helpBlock = document.createElement('p');
        helpBlock.classList.add('help', 'is-danger');
        helpBlock.textContent = message;


        const field = input.closest('.field') || input.closest('.control')?.parentNode;
        if (field) {
            field.appendChild(helpBlock);
        }
    }


    function clearErrors() {

        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });

        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
    }


    document.querySelectorAll('.input, .textarea, .select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field') || this.closest('.control')?.parentNode;
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    });


    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    }
});