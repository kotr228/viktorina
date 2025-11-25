# Налаштування Google Sheets для вікторини

Цей файл містить інструкції для налаштування інтеграції з Google Таблицями для збереження результатів вікторини.

## Крок 1: Створіння Google Таблиці

1. Перейдіть на [Google Sheets](https://docs.google.com/spreadsheets/)
2. Створіть нову таблицю
3. Назвіть її, наприклад: "Результати вікторини - Протидія насильству"
4. Створіть такі колонки в першому рядку:
   - A1: `Дата та час`
   - B1: `Ім'я`
   - C1: `Email`
   - D1: `Правильних відповідей`
   - E1: `Всього питань`
   - F1: `Відсоток`
   - G1: `Час проходження (сек)`
   - H1: `Детальні відповіді`

## Крок 2: Створення Google Apps Script

1. У вашій Google Таблиці натисніть `Розширення` → `Apps Script`
2. Видаліть весь код за замовчуванням
3. Вставте наступний код:

```javascript
function doPost(e) {
  try {
    // Отримання активної таблиці
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Парсинг даних з запиту
    var data = JSON.parse(e.postData.contents);

    // Форматування детальних відповідей
    var detailedAnswers = data.answers.map(function(answer) {
      return answer.question + ': ' + answer.userAnswer +
             ' (' + (answer.isCorrect ? '✓' : '✗ Правильно: ' + answer.correctAnswer) + ')';
    }).join(' | ');

    // Додавання нового рядка з даними
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.correctAnswers,
      data.totalQuestions,
      data.percentage + '%',
      data.timeSpent,
      detailedAnswers
    ]);

    // Повернення успішної відповіді
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Повернення помилки
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Web App is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Натисніть `Зберегти` (іконка дискети)
5. Дайте проекту назву, наприклад: "Вікторина - Обробник результатів"

## Крок 3: Розгортання Web App

1. Натисніть `Розгорнути` → `Нове розгортання`
2. Натисніть на іконку шестерні біля "Виберіть тип" та оберіть `Веб-додаток`
3. Налаштуйте параметри:
   - **Опис**: "Збір результатів вікторини" (необов'язково)
   - **Виконати як**: `Я` (ваш обліковий запис)
   - **Хто має доступ**: `Будь-хто` (важливо!)
4. Натисніть `Розгорнути`
5. Підтвердьте дозволи:
   - Натисніть `Авторизувати доступ`
   - Виберіть ваш Google акаунт
   - Натисніть `Додатково` → `Перейти до назва_проекту (небезпечно)`
   - Натисніть `Дозволити`
6. **ВАЖЛИВО**: Скопіюйте URL Web App (він виглядає як `https://script.google.com/macros/s/...../exec`)

## Крок 4: Налаштування вікторини

1. Відкрийте файл `script.js` у вашому проекті
2. Знайдіть рядок:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
```
3. Замініть `'YOUR_GOOGLE_SCRIPT_URL_HERE'` на скопійований URL (включно з лапками):
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...../exec';
```
4. Збережіть файл

## Крок 5: Тестування

1. Відкрийте вашу вікторину в браузері
2. Пройдіть вікторину до кінця
3. Перевірте вашу Google Таблицю - там має з'явитися новий рядок з результатами

## Налаштування автоматичного форматування (опціонально)

Щоб автоматично форматувати таблицю, додайте цю функцію в Apps Script:

```javascript
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Заморожування першого рядка
  sheet.setFrozenRows(1);

  // Форматування заголовків
  var headerRange = sheet.getRange(1, 1, 1, 8);
  headerRange.setBackground('#667eea');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');

  // Автоматичне підлаштування ширини колонок
  sheet.autoResizeColumns(1, 8);
}
```

Після додавання цього коду, закрийте та знову відкрийте таблицю - вона автоматично відформатується.

## Вирішення проблем

### Дані не зберігаються
- Перевірте, чи правильно скопійовано URL
- Переконайтеся, що в налаштуваннях розгортання обрано "Будь-хто" для доступу
- Перевірте консоль браузера (F12) на наявність помилок

### Помилка авторизації
- Переконайтеся, що ви надали всі необхідні дозволи
- Спробуйте створити нове розгортання

### URL не працює
- Переконайтеся, що URL закінчується на `/exec`, а не на `/dev`
- Перевірте, чи не видалили випадково лапки навколо URL

## Додаткова інформація

Результати зберігаються в реальному часі після завершення кожної вікторини. Ви можете:
- Аналізувати статистику
- Експортувати дані в інші формати
- Створювати графіки та звіти в Google Sheets
- Налаштувати сповіщення при нових відповідях
