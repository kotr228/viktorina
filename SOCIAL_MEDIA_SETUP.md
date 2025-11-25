# 📱 Налаштування соціальних мереж

## Як додати посилання на ваші Telegram та Instagram

У футері сайту є посилання на соціальні мережі. Щоб вони вказували на ваші акаунти, виконайте наступні кроки:

### Крок 1: Відкрийте файл index.html

Знайдіть файл `index.html` у корені проекту.

### Крок 2: Знайдіть розділ з посиланнями

Знайдіть у файлі такі рядки (біля кінця файлу, в футері):

```html
<a href="https://t.me/YOUR_TELEGRAM" target="_blank" ...>
```

та

```html
<a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" ...>
```

### Крок 3: Замініть плейсхолдери

#### Для Telegram:

Замініть `YOUR_TELEGRAM` на ваш Telegram username або назву каналу.

**Приклади:**

```html
<!-- Особистий акаунт -->
<a href="https://t.me/username" target="_blank" ...>

<!-- Канал -->
<a href="https://t.me/mychannel" target="_blank" ...>

<!-- Група -->
<a href="https://t.me/mygroup" target="_blank" ...>

<!-- Бот -->
<a href="https://t.me/mybot" target="_blank" ...>
```

#### Для Instagram:

Замініть `YOUR_INSTAGRAM` на ваш Instagram username.

**Приклад:**

```html
<a href="https://instagram.com/username" target="_blank" ...>
```

### Крок 4: Збережіть та запуште зміни

```bash
git add index.html
git commit -m "Оновлено посилання на соціальні мережі"
git push
```

## 🎨 Приклади реальних посилань

### Варіант 1: Конкретні акаунти
```html
<a href="https://t.me/protydiya_nasylstvu" target="_blank" ...>
```
```html
<a href="https://instagram.com/protydiya_nasylstvu" target="_blank" ...>
```

### Варіант 2: Організація
```html
<a href="https://t.me/la_strada_ukraine" target="_blank" ...>
```
```html
<a href="https://instagram.com/lastrada_ukraine" target="_blank" ...>
```

## 🔧 Додаткові налаштування

### Видалити одне з посилань

Якщо потрібно залишити тільки одну соціальну мережу, видаліть весь блок `<a>...</a>` непотрібного посилання.

### Додати інші соціальні мережі

Можна додати Facebook, Twitter, TikTok та інші за подібним шаблоном:

#### Facebook:
```html
<a href="https://facebook.com/YOUR_PAGE" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: opacity 0.3s;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
    <span>Facebook</span>
</a>
```

#### Twitter/X:
```html
<a href="https://twitter.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: opacity 0.3s;">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
    <span>Twitter</span>
</a>
```

## ✅ Перевірка

Після внесення змін:

1. Відкрийте `index.html` у браузері локально
2. Прокрутіть до футера внизу сторінки
3. Натисніть на іконки соціальних мереж
4. Переконайтеся, що вони відкривають правильні посилання

## 📝 Важливо

- Посилання відкриваються в **новій вкладці** (`target="_blank"`)
- Використовується `rel="noopener noreferrer"` для безпеки
- Іконки змінюють прозорість при наведенні для кращої UX
- Дизайн адаптивний і добре виглядає на мобільних пристроях

---

**Готово!** Тепер користувачі зможуть легко знайти вас у соціальних мережах! 🎉
