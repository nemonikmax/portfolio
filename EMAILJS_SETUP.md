# Настройка EmailJS для отправки сообщений с сайта

## Что нужно сделать для запуска:

### 1. Регистрация на EmailJS
1. Перейдите на [https://www.emailjs.com/](https://www.emailjs.com/)
2. Зарегистрируйтесь (бесплатный план позволяет до 200 сообщений в месяц)
3. Подтвердите email

### 2. Создание Email Service
1. В панели EmailJS перейдите в "Email Services"
2. Нажмите "Add New Service"
3. Выберите почтовый сервис (рекомендую Gmail):
   - **Gmail**: самый простой вариант
   - **Outlook**: если используете Microsoft
   - **Другой SMTP**: любой другой почтовый сервис
4. Подключите ваш email (нужно будет авторизоваться)
5. Запишите **Service ID** (например: `service_xxxxxxxxx`)

### 3. Создание Email Template
1. Перейдите в "Email Templates"
2. Нажмите "Create New Template"
3. Настройте шаблон:

**Template Name:** `Contact Form`

**To Email:** `nikmax20115@gmail.com` (ваш email)

**Subject:** `Новое сообщение с сайта от {{from_name}}`

**Content:**
```
Привет, Nemik!

Ты получил новое сообщение с твоего портфолио:

Имя: {{from_name}}
Email: {{reply_to}}
Сообщение: {{message}}

---
Отправлено с сайта: https://your-portfolio-url.com
```

4. Сохраните шаблон и запишите **Template ID** (например: `template_xxxxxxxxx`)

### 4. Получение Public Key
1. Перейдите в "Integration" или "Account" → "API Keys"
2. Скопируйте **Public Key** (начинается с `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 5. Обновление кода сайта
Откройте файл `script.js` и замените плейсхолдеры:

```javascript
// Найдите эту строку и замените YOUR_PUBLIC_KEY
emailjs.init("YOUR_PUBLIC_KEY");

// И эту строку - замените YOUR_SERVICE_ID и YOUR_TEMPLATE_ID
const result = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm);
```

**Пример с реальными данными:**
```javascript
emailjs.init("abc123def456ghi789jkl012mno345pq");

const result = await emailjs.sendForm('service_abc123', 'template_def456', contactForm);
```

### 6. Тестирование
1. Откройте ваш сайт на `http://localhost:8080`
2. Перейдите в раздел "Контакты"
3. Заполните форму и отправьте тестовое сообщение
4. Проверьте ваш email (включая спам)

## Возможные проблемы и решения:

### ❌ "EmailJS is not defined"
**Причина:** Библиотека не загрузилась
**Решение:** Проверьте интернет-соединение и что сайт открыт через http сервер

### ❌ "Failed to send"
**Причина:** Неверные ID или ключи
**Решение:** Проверьте что все ID и ключи правильно скопированы

### ❌ Сообщения не приходят на email
**Причина:** Проблемы с почтовым сервисом
**Решение:** Проверьте настройки Email Service в панели EmailJS

## Альтернативы (если EmailJS не работает):

1. **Formspree.io** - еще один простой сервис форм
2. **Netlify Forms** - если хостите на Netlify
3. **GitHub Pages + Firebase** - более сложный вариант

## Бесплатные лимиты EmailJS:
- **200 сообщений в месяц** на бесплатном плане
- **2 email сервиса** можно подключить
- **Без ограничений по трафику**

Для портфолио этого более чем достаточно!
