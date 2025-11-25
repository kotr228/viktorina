// Конфігурація для Google Sheets
// ВАЖЛИВО: Замініть це значення на ваш URL Google Apps Script Web App
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqZmsLirQGsHvjCbzX0e2kRIHCME0RbfhzRiAgNyZf_d9k92I3fBSQsgUMYkQWutX2/exec';

// Питання вікторини
const questions = [
    {question: "Які форми насильства охоплює Стамбульська конвенція, ратифікована Україною?",

        answers: [

            "Тільки фізичне та сексуальне насильство",

            "Фізичне, психологічне, сексуальне та економічне насильство, включаючи переслідування та примусовий шлюб",

            "Тільки насильство стосовно жінок",

            "Виключно домашнє насильство між подружжям"

        ],

        correctAnswer: 1

    },

    {

        question: "Що таке газлайтинг як форма психологічного насильства?",

        answers: [

            "Публічне приниження жертви",

            "Маніпулювання, при якому кривдник змушує жертву сумніватися у власному сприйнятті реальності та психічному здоров'ї",

            "Фізичне насильство з використанням газу",

            "Словесні образи та лайка"

        ],

        correctAnswer: 1

    },

    {

        question: "Який термін дії тимчасового обмежувального припису згідно із законодавством України?",

        answers: [

            "До 5 діб з можливістю продовження до 30 діб",

            "1 місяць без можливості продовження",

            "До моменту розгляду справи в суді",

            "6 місяців"

        ],

        correctAnswer: 0

    },

    {

        question: "Що таке 'цикл насильства', описаний психологом Ленор Уокер?",

        answers: [

            "Різні види насильства, що змінюють одне одного",

            "Повторюваний патерн із фаз: наростання напруги, вибух насильства, примирення та спокій",

            "Передача насильницької поведінки від батьків до дітей",

            "Систематичне насильство протягом усього життя"

        ],

        correctAnswer: 1

    },

    {

        question: "Яке явище описує термін 'інституційне насильство'?",

        answers: [

            "Насильство в установах для дітей-сиріт",

            "Насильство з боку держави через законодавство, правоохоронні органи чи соціальні інститути",

            "Насильство в школах та університетах",

            "Організована злочинність"

        ],

        correctAnswer: 1

    },

    {

        question: "Що таке 'сталкінг' і чому він вважається формою насильства?",

        answers: [

            "Одноразове спостереження за особою",

            "Систематичне переслідування, стеження чи нав'язливе спілкування, що викликає страх та обмежує свободу жертви",

            "Пошук інформації про людину в соціальних мережах",

            "Професійна детективна діяльність"

        ],

        correctAnswer: 1

    },

    {

        question: "Яка з наведених ситуацій є прикладом економічного (фінансового) насильства?",

        answers: [

            "Спільне планування сімейного бюджету",

            "Партнер забороняє працювати, контролює всі гроші, змушує звітувати за кожну витрату та не дає доступу до рахунків",

            "Обговорення великих покупок перед їх здійсненням",

            "Розподіл фінансових обов'язків у родині"

        ],

        correctAnswer: 1

    },

    {

        question: "Що таке 'жертва-звинувачення' (victim blaming)?",

        answers: [

            "Коли жертва звинувачує кривдника",

            "Коли суспільство покладає відповідальність за насильство на саму жертву замість кривдника",

            "Юридичний термін для позову жертви",

            "Коли жертва визнає свою провину"

        ],

        correctAnswer: 1

    },

    {

        question: "Який вид насильства передбачає ізоляцію жертви від друзів, родини, контроль соціальних контактів та обмеження свободи пересування?",

        answers: [

            "Фізичне насильство",

            "Сексуальне насильство",

            "Соціальне насильство (форма психологічного)",

            "Економічне насильство"

        ],

        correctAnswer: 2

    },

    {

        question: "Що таке 'кібербулінг' та чому він особливо небезпечний?",

        answers: [

            "Звичайна комунікація в інтернеті",

            "Цькування через цифрові технології, що може бути постійним, анонімним та мати широку аудиторію",

            "Гра в онлайн-ігри",

            "Критика публічних осіб у соцмережах"

        ],

        correctAnswer: 1

    },

    {

        question: "Яке поняття описує ситуацію, коли жертва повертається до кривдника в середньому 7 разів перед остаточним розривом?",

        answers: [

            "Слабкість характеру жертви",

            "Складний процес виходу з насильницьких стосунків через психологічну залежність, страх, економічні чинники та надію на зміни",

            "Любов до кривдника",

            "Байдужість до власного життя"

        ],

        correctAnswer: 1

    },

    {

        question: "Що таке 'травмо-інформований підхід' у роботі з жертвами насильства?",

        answers: [

            "Юридична процедура розслідування",

            "Підхід, що визнає вплив травми на людину і забезпечує безпечне середовище без повторної травматизації",

            "Медична діагностика травм",

            "Психіатричне лікування"

        ],

        correctAnswer: 1

    },

    {

        question: "Які дії НЕ є ефективними, коли ви підтримуєте жертву насильства?",

        answers: [

            "Вислуховувати без осуду, вірити та пропонувати інформацію про ресурси допомоги",

            "Критикувати за те, що залишається з кривдником, тиснути з вимогами негайно піти, приймати рішення за жертву",

            "Забезпечувати безпеку та конфіденційність",

            "Надавати емоційну підтримку та повагу до її рішень"

        ],

        correctAnswer: 1

    },

    {

        question: "Що передбачає Закон України 'Про запобігання та протидію домашньому насильству' (2017)?",

        answers: [

            "Тільки кримінальне покарання для кривдників",

            "Комплексну систему: попередження, підтримку жертв, відповідальність кривдників, спеціальні заходи та міжвідомчу взаємодію",

            "Виключно адміністративну відповідальність",

            "Тільки психологічну допомогу жертвам"

        ],

        correctAnswer: 1

    },

    {

        question: "Яка форма насильства найчастіше залишається непоміченою та недооціненою через відсутність видимих слідів?",

        answers: [

            "Фізичне насильство",

            "Сексуальне насильство",

            "Психологічне (емоційне) насильство",

            "Всі форми однаково помітні"
        ],

        correctAnswer: 2

    }
];

// Стан вікторини
let currentQuestionIndex = 0;
let userAnswers = [];
let userName = '';
let userEmail = '';
let startTime = null;

// Елементи DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');

const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');

const progressFill = document.getElementById('progress-fill');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    totalQuestionsSpan.textContent = questions.length;

    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    shareBtn.addEventListener('click', shareResults);
});

function startQuiz() {
    userName = userNameInput.value.trim() || 'Анонім';
    userEmail = userEmailInput.value.trim();
    startTime = new Date();

    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];

    // Оновлення прогресу
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Відображення питання
    questionText.textContent = question.question;

    // Очищення попередніх відповідей
    answersContainer.innerHTML = '';

    // Створення кнопок відповідей
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;

        // Перевірка, чи була обрана ця відповідь раніше
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });

    // Оновлення кнопок навігації
    updateNavigationButtons();
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;

    // Оновлення UI
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('selected');
        if (index === answerIndex) {
            btn.classList.add('selected');
        }
    });

    // Активація кнопки "Далі"
    updateNavigationButtons();
}

function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;

    const hasAnswer = userAnswers[currentQuestionIndex] !== null;
    nextBtn.disabled = !hasAnswer;

    // Зміна тексту кнопки на останньому питанні
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Завершити';
    } else {
        nextBtn.textContent = 'Далі →';
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // Завершення вікторини
        showResults();
    }
}

function showResults() {
    const endTime = new Date();
    const timeSpent = Math.round((endTime - startTime) / 1000); // в секундах

    // Підрахунок правильних відповідей
    let correctCount = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // Відображення екрану результатів
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    // Анімація відсотка
    animateScore(percentage);

    // Відображення кількості правильних відповідей
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('total-answers').textContent = questions.length;

    // Відображення повідомлення зворотного зв'язку
    const feedbackMessage = document.getElementById('feedback-message');
    if (percentage >= 80) {
        feedbackMessage.innerHTML = '<strong>🎊 Відмінно!</strong> Ви маєте чудові знання про протидію насильству. Продовжуйте поширювати цю важливу інформацію!';
    } else if (percentage >= 60) {
        feedbackMessage.innerHTML = '<strong>👍 Добре!</strong> У вас є базові знання, але є простір для покращення. Ознайомтеся з додатковими ресурсами нижче.';
    } else if (percentage >= 40) {
        feedbackMessage.innerHTML = '<strong>📚 Можна краще!</strong> Рекомендуємо більше дізнатися про протидію насильству та доступні ресурси підтримки.';
    } else {
        feedbackMessage.innerHTML = '<strong>💡 Потрібно покращити знання!</strong> Будь ласка, ознайомтеся з інформацією про протидію насильству та зверніться до спеціалістів за потреби.';
    }

    // Відправка результатів в Google Sheets
    sendResultsToGoogleSheets(correctCount, percentage, timeSpent);
}

function animateScore(targetPercentage) {
    const scoreElement = document.getElementById('score-percentage');
    let currentPercentage = 0;
    const duration = 1500; // 1.5 секунди
    const steps = 60;
    const increment = targetPercentage / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentPercentage);
    }, stepDuration);
}

async function sendResultsToGoogleSheets(correctCount, percentage, timeSpent) {
    const data = {
        timestamp: new Date().toISOString(),
        name: userName,
        email: userEmail,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        percentage: percentage,
        timeSpent: timeSpent,
        answers: userAnswers.map((answer, index) => ({
            question: questions[index].question,
            userAnswer: answer !== null ? questions[index].answers[answer] : 'Не відповів',
            correctAnswer: questions[index].answers[questions[index].correctAnswer],
            isCorrect: answer === questions[index].correctAnswer
        }))
    };

    // Локальне збереження (завжди працює)
    try {
        const resultsHandler = new ResultsHandler();
        resultsHandler.saveResult(data);
        console.log('✅ Результати збережено локально');
    } catch (error) {
        console.error('❌ Помилка локального збереження:', error);
    }

    // Відправка в Google Sheets (якщо налаштовано)
    if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log('✅ Результати відправлено в Google Sheets');
        } catch (error) {
            console.error('❌ Помилка відправки в Google Sheets:', error);
        }
    } else {
        console.log('ℹ️ Google Sheets не налаштовано. Результати збережено тільки локально.');
        console.log('ℹ️ Переглянути результати можна на сторінці admin.html');
    }
}

// Клас для роботи з локальним збереженням
class ResultsHandler {
    constructor() {
        this.storageKey = 'quiz_results';
    }

    saveResult(result) {
        try {
            const results = this.getAllResults();
            results.push({
                ...result,
                id: Date.now()
            });
            localStorage.setItem(this.storageKey, JSON.stringify(results));
            return true;
        } catch (error) {
            console.error('Помилка збереження:', error);
            return false;
        }
    }

    getAllResults() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            return [];
        }
    }
}

function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');

    // Скидання форми
    userNameInput.value = '';
    userEmailInput.value = '';
}

function shareResults() {
    const correctCount = userAnswers.filter((answer, index) =>
        answer === questions[index].correctAnswer
    ).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    const shareText = `Я пройшов вікторину "Протидія насильству" і набрав ${percentage}%! Перевір свої знання теж!`;

    if (navigator.share) {
        navigator.share({
            title: 'Вікторина: Протидія насильству',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Помилка при спробі поділитися:', err));
    } else {
        // Копіювання в буфер обміну
        const tempInput = document.createElement('input');
        tempInput.value = shareText + ' ' + window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Посилання скопійовано в буфер обміну!');
    }
}
