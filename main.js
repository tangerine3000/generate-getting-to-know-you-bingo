const questionsInput = document.getElementById('questions');
const countSpan = document.getElementById('count');
const previewBtn = document.getElementById('previewBtn');
const generateBtn = document.getElementById('generateBtn');
const preview = document.getElementById('preview');
const numCardsInput = document.getElementById('numCards');

questionsInput.addEventListener('input', updateCount);
previewBtn.addEventListener('click', generatePreview);
generateBtn.addEventListener('click', generatePDF);
document.getElementById('exportImageBtn').addEventListener('click', exportImage);

function updateCount() {
    const lines = questionsInput.value.trim().split('\n').filter(line => line.trim());
    countSpan.textContent = lines.length;
    previewBtn.disabled = lines.length !== 25;
    generateBtn.disabled = lines.length !== 25;
}

function getQuestions() {
    return questionsInput.value
        .trim()
        .split('\n')
        .filter(line => line.trim())
        .slice(0, 25);
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createBingoCard(questions) {
    const shuffled = shuffle(questions);
    const card = [];

    for (let i = 0; i < 25; i++) {
        if (i === 12) {
            card.push('FREE');
        } else {
            card.push(shuffled[i < 12 ? i : i - 1]);
        }
    }

    return card;
}

function renderCard(card) {
    const div = document.createElement('div');
    div.className = 'bingo-card';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = 'GETTING TO KNOW YOU BINGO';

    const subtitle = document.createElement('div');
    subtitle.className = 'card-subtitle';
    subtitle.textContent = 'Find Someone Who...';

    const grid = document.createElement('div');
    grid.className = 'card-grid';

    card.forEach((text, i) => {
        const cell = document.createElement('div');
        cell.className = 'card-cell';

        if (i === 12) {
            cell.classList.add('free');
        } else {
            const textDiv = document.createElement('div');
            textDiv.className = 'card-cell-text';
            textDiv.textContent = text;
            cell.appendChild(textDiv);

            const line = document.createElement('div');
            line.className = 'card-cell-line';
            cell.appendChild(line);
        }

        grid.appendChild(cell);
    });

    div.appendChild(title);
    div.appendChild(subtitle);
    div.appendChild(grid);
    return div;
}

function generatePreview() {
    const questions = getQuestions();
    if (questions.length !== 25) return;

    preview.innerHTML = '';
    const card = createBingoCard(questions);
    preview.appendChild(renderCard(card));
}

function generatePDF() {
    try {
        const questions = getQuestions();
        if (questions.length !== 25) {
            alert('Please enter exactly 25 questions');
            return;
        }

        const numCards = parseInt(numCardsInput.value) || 5;
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const margin = 12.7;
        const cardSize = 82;
        const spacing = 8;

        let cardIndex = 0;

        while (cardIndex < numCards) {
            if (cardIndex > 0) pdf.addPage();

            for (let pos = 0; pos < 2 && cardIndex < numCards; pos++) {
                const card = createBingoCard(questions);
                const y = margin + pos * (cardSize + spacing);

                drawCardToPDF(pdf, card, margin, y, cardSize);
                cardIndex++;
            }
        }

        pdf.save('bingo-cards.pdf');
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF: ' + error.message);
    }
}

function drawCardToPDF(pdf, card, x, y, size) {
    const titleSize = size * 0.08;
    const subtitleSize = size * 0.06;
    const cellWidth = size / 5;
    const cellHeight = cellWidth * 1.4;
    const fontSize = cellWidth / 12;
    const titleY = y;
    const subtitleY = y + titleSize * 0.7;
    const gridY = y + titleSize + subtitleSize + 2;

    pdf.setFontSize(titleSize);
    pdf.setFont('helvetica', 'bold');
    const titleWidth = pdf.getTextWidth('GETTING TO KNOW YOU BINGO');
    pdf.text('GETTING TO KNOW YOU BINGO', x + (size - titleWidth) / 2, titleY + titleSize);

    pdf.setFontSize(subtitleSize);
    pdf.setFont('helvetica', 'normal');
    const subtitleWidth = pdf.getTextWidth('Find Someone Who...');
    pdf.text('Find Someone Who...', x + (size - subtitleWidth) / 2, subtitleY + subtitleSize + 2);

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', 'normal');

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const index = row * 5 + col;
            const cellX = x + col * cellWidth;
            const cellY = gridY + row * cellHeight;

            pdf.rect(cellX, cellY, cellWidth, cellHeight);

            const text = card[index];
            if (text === 'FREE') {
                pdf.setFillColor(255, 250, 205);
                pdf.rect(cellX, cellY, cellWidth, cellHeight, 'F');
                pdf.setFont('helvetica', 'bold');
                const starWidth = pdf.getTextWidth('★');
                pdf.text('★', cellX + (cellWidth - starWidth) / 2, cellY + cellHeight / 2 + fontSize / 3);
            } else {
                pdf.setFont('helvetica', 'normal');
                const lines = pdf.splitTextToSize(text, cellWidth - 2);
                const lineHeight = fontSize / 2.5;
                const textHeight = lines.length * lineHeight;
                const startY = cellY + 3 + (cellHeight * 0.45 - textHeight) / 2;

                lines.forEach((line, i) => {
                    const lineWidth = pdf.getTextWidth(line);
                    const lineX = cellX + (cellWidth - lineWidth) / 2;
                    pdf.text(line, lineX, startY + i * lineHeight);
                });
            }
        }
    }
}

function exportImage() {
    const cardElement = document.querySelector('.bingo-card');
    if (!cardElement) {
        alert('Generate a preview first');
        return;
    }

    try {
        html2canvas(cardElement, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'bingo-card.png';
            link.href = canvas.toDataURL();
            link.click();
        }).catch(error => {
            console.error('Image export error:', error);
            alert('Error exporting image: ' + error.message);
        });
    } catch (error) {
        console.error('Image export error:', error);
        alert('Error exporting image: ' + error.message);
    }
}

updateCount();
