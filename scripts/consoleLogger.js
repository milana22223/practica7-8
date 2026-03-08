document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('formValid', function(event) {
        const data = event.detail;


        console.clear();


        console.log('🌺 НОВОЕ СООБЩЕНИЕ С САЙТА FLOWFLOW 🌺');
        console.log('='.repeat(50));
        console.log('👤 ФИО:', data.fullname);
        console.log('📞 Телефон:', data.phone);
        console.log('📧 Email:', data.email);
        console.log('📋 Тема:', data.topic);
        console.log('💬 Сообщение:', data.message);
        console.log('🕐 Время отправки:', data.timestamp);
        console.log('='.repeat(50));

        console.table({
            'Поле': ['ФИО', 'Телефон', 'Email', 'Тема', 'Сообщение', 'Время'],
            'Значение': [
                data.fullname, 
                data.phone, 
                data.email, 
                data.topic, 
                data.message, 
                data.timestamp
            ]
        });

        console.warn('Это демо-режим. Для реальной отправки подключите бэкенд или сервис (EmailJS/Formspree).');
    });
});