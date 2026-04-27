# Настройка Formspree для GitHub Pages

## Что такое Formspree?

Formspree - это сервис для обработки форм на статических сайтах (как GitHub Pages). Позволяет принимать сообщения с вашего сайта без бэкенда.

## Бесплатный план
- **50 сообщений в месяц** - бесплатно
- **1 форма** - бесплатно  
- **Базовая статистика** - бесплатно
- **Email уведомления** - бесплатно

Для портфолио этого более чем достаточно!

## Настройка за 2 минуты:

### 1. Регистрация
1. Перейдите на [https://formspree.io/](https://formspree.io/)
2. Зарегистрируйтесь (можно через GitHub)
3. Подтвердите email

### 2. Создание формы
1. Нажмите "New Form"
2. **Form name**: `Portfolio Contact`
3. **Email**: `nikmax20115@gmail.com` (ваш email)
4. Нажмите "Create Form"

### 3. Получение Form ID
После создания формы вы увидите:
```
https://formspree.io/f/abcdef123456
```
Ваш Form ID: `abcdef123456`

### 4. Обновление сайта
Откройте `index.html` и замените `your-form-id`:

```html
<!-- Было: -->
<form action="https://formspree.io/f/your-form-id" method="POST">

<!-- Стало: -->
<form action="https://formspree.io/f/abcdef123456" method="POST">
```

### 5. Тестирование
1. Загрузите сайт на GitHub Pages
2. Заполните форму
3. Проверьте email `nikmax20115@gmail.com`

## Дополнительные настройки Formspree:

### Настройка полей формы
В панели Formspree можно настроить:
- **Required fields** - обязательные поля
- **Email notifications** - уведомления
- **Auto-responder** - автоответ пользователю
- **Redirect URL** - страница после отправки

### Защита от спама
В настройках формы включите:
- **reCAPTCHA** (бесплатно)
- **Honeypot field**
- **Rate limiting**

## Альтернативы Formspree:

1. **Netlify Forms** - если хостите на Netlify
2. **Getform.io** - еще один вариант
3. **Firebase Functions** - продвинутый вариант

## Преимущества Formspree для GitHub Pages:

✅ **Работает из коробки** с GitHub Pages  
✅ **Не требует бэкенда**  
✅ **Простая настройка** - 5 минут  
✅ **Бесплатный план** достаточен  
✅ **Надежная доставка** писем  
✅ **Защита от спама**  

## Пример полученного email:

```
От: John Doe <john@example.com>
Тема: New submission from Portfolio Contact

Имя: John Doe
Email: john@example.com  
Сообщение: Привет! Мне нравится ваше портфолио. Давайте обсудим сотрудничество.

---
Отправлено с формы: https://yourusername.github.io/portfolio
```

## Troubleshooting:

### ❌ "Form not found"
**Причина**: Неверный Form ID  
**Решение**: Проверьте ID в панели Formspree

### ❌ "Email not received"
**Причина**: Проблемы с email  
**Решение**: Проверьте папку "Спам"

### ❌ "Form disabled"  
**Причина**: Превышен лимит сообщений  
**Решение**: Обновите до платного плана или подождите следующего месяца

Готово! Теперь ваша форма будет работать на GitHub Pages!
