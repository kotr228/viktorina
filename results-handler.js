// Альтернативний обробник результатів без Google Sheets
// Результати зберігаються локально в localStorage браузера

class ResultsHandler {
    constructor() {
        this.storageKey = 'quiz_results';
    }

    // Збереження результату
    saveResult(result) {
        try {
            const results = this.getAllResults();
            results.push({
                ...result,
                id: Date.now(),
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(this.storageKey, JSON.stringify(results));
            return true;
        } catch (error) {
            console.error('Помилка збереження результату:', error);
            return false;
        }
    }

    // Отримання всіх результатів
    getAllResults() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Помилка завантаження результатів:', error);
            return [];
        }
    }

    // Отримання статистики
    getStatistics() {
        const results = this.getAllResults();
        if (results.length === 0) {
            return {
                total: 0,
                averageScore: 0,
                averagePercentage: 0,
                averageTime: 0
            };
        }

        const total = results.length;
        const totalScore = results.reduce((sum, r) => sum + r.correctAnswers, 0);
        const totalPercentage = results.reduce((sum, r) => sum + r.percentage, 0);
        const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);

        return {
            total,
            averageScore: (totalScore / total).toFixed(1),
            averagePercentage: (totalPercentage / total).toFixed(1),
            averageTime: Math.round(totalTime / total)
        };
    }

    // Експорт в JSON
    exportToJSON() {
        const results = this.getAllResults();
        const dataStr = JSON.stringify(results, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `quiz-results-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Експорт в CSV
    exportToCSV() {
        const results = this.getAllResults();
        if (results.length === 0) {
            alert('Немає результатів для експорту');
            return;
        }

        const headers = ['Дата', 'Імя', 'Email', 'Правильних відповідей', 'Відсоток', 'Час (сек)'];
        const csvRows = [headers.join(',')];

        results.forEach(result => {
            const row = [
                result.timestamp,
                result.name || 'Анонім',
                result.email || '-',
                result.correctAnswers,
                result.percentage,
                result.timeSpent
            ];
            csvRows.push(row.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `quiz-results-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Очистка всіх результатів
    clearAllResults() {
        if (confirm('Ви впевнені, що хочете видалити всі результати?')) {
            localStorage.removeItem(this.storageKey);
            return true;
        }
        return false;
    }
}

// Експорт для використання
window.ResultsHandler = ResultsHandler;
