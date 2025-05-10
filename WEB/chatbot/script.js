let baseSintomas = [];
const historicoConversas = [];

fetch('sintomas.json')
  .then(res => res.json())
  .then(data => baseSintomas = data)
  .catch(err => console.error("Erro ao carregar base:", err));

function sendMessage() {
  const input = document.getElementById("userInput");
  const mensagem = input.value.toLowerCase().trim();
  const chat = document.getElementById("chat");

  if (!mensagem || baseSintomas.length === 0) return;

  chat.innerHTML += `<div><strong>Você:</strong> ${mensagem}</div>`;

  const resposta = analisarSintomas(mensagem);
  chat.innerHTML += `<div style="background:#fff; padding:10px; margin:5px 0; border-radius:8px;"><strong>Bot:</strong> ${resposta}</div>`;

  historicoConversas.push({ usuario: mensagem, bot: resposta, timestamp: new Date().toISOString() });

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

function analisarSintomas(texto) {
  const doc = nlp(texto);
  const sintomasReconhecidos = new Set();
  const respostas = [];

  baseSintomas.forEach(item => {
    const correspondentes = item.sintomas.filter(s => doc.has(s));
    if (correspondentes.length > 0) {
      correspondentes.forEach(s => sintomasReconhecidos.add(s));
      const probabilidade = Math.round((correspondentes.length / item.sintomas.length) * 100);

      respostas.push(`
        <p><strong>Sintomas reconhecidos:</strong> ${correspondentes.join(', ')}</p>
        <p><strong>Probabilidade:</strong> ${probabilidade}%</p>
        <p><strong>Causa provável:</strong> ${item.causa}</p>
        <p><strong>Cuidados:</strong> ${item.cuidados}</p>
      `);
    }
  });

  if (respostas.length === 0) {
    return "Desculpe, não reconheci os sintomas. Tente reformular ou procure um profissional.";
  }

  return `
    <p><strong>Todos os sintomas mencionados:</strong> ${Array.from(sintomasReconhecidos).join(', ')}</p>
    ${respostas.join("<hr/>")}
  `;
}

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y = 10;

  pdf.setFontSize(16);
  pdf.text("Relatório Diagnostico Digital", 10, y);
  y += 10;

  pdf.setFontSize(12);
  historicoConversas.forEach(conversa => {
    const botLimpo = conversa.bot.replace(/<[^>]*>/g, '');
    const linhasBot = pdf.splitTextToSize(botLimpo, 180);

    if (y + linhasBot.length * 7 > 280) {
      pdf.addPage();
      y = 10;
    }

    pdf.text(`Você: ${conversa.usuario}`, 10, y);
    y += 7;
    pdf.text(linhasBot, 10, y);
    y += linhasBot.length * 7;
  });

  pdf.save("diagnotico.pdf");
}