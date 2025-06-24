// Verifica se usuário está logado
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
if (!usuario || !usuario.id) {
  window.location.href = "../login/index.html";
}

async function buscarAtestadosDoPaciente(pacienteId) {
  try {
    const response = await fetch(`http://localhost:3000/funcmed/paciente/${pacienteId}`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar atestados");
    }

    const atestados = await response.json();

    if (atestados.length === 0) {
      alert("Nenhum atestado encontrado.");
      return;
    }

    let container = document.getElementById('cardsContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cardsContainer';
      document.body.appendChild(container);
    }

    container.innerHTML = '';

    atestados.forEach(atestado => {
      const card = document.createElement('div');
      card.className = 'atestado-card';

      card.innerHTML = `
        <h3>Atestado #${atestado.id}</h3>
        <p><strong>Médico:</strong> ${atestado.nome_med}</p>
        <p><strong>CRM:</strong> ${atestado.crm_med}</p>
        <p><strong>Data Consulta:</strong> ${atestado.data ? new Date(atestado.data).toLocaleDateString() : '-'}</p>
        <p><strong>Afastamento Inicial:</strong> ${atestado.afast_o ? new Date(atestado.afast_o).toLocaleDateString() : '-'}</p>
        <p><strong>Afastamento Final:</strong> ${atestado.afast_c ? new Date(atestado.afast_c).toLocaleDateString() : '-'}</p>
        <p><strong>Motivo:</strong> ${atestado.motivo}</p>
        <p><strong>Assinatura do Médico:</strong> ${atestado.ass_med}</p>
        <button class="btn-baixar-pdf">Baixar PDF</button>
      `;

      // Adiciona evento para baixar PDF
      const btn = card.querySelector('.btn-baixar-pdf');
      btn.addEventListener('click', () => baixarPDFAtestado(atestado));

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}

// Função para gerar e baixar PDF de um atestado específico
function baixarPDFAtestado(atestado) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(16);
  pdf.text("Atestado Médico", 10, 20);

  pdf.setFontSize(12);
  pdf.text(`ID: ${atestado.id}`, 10, 30);
  pdf.text(`Médico: ${atestado.nome_med}`, 10, 40);
  pdf.text(`CRM: ${atestado.crm_med}`, 10, 50);
  pdf.text(`Data da Consulta: ${atestado.data ? new Date(atestado.data).toLocaleDateString() : '-'}`, 10, 60);
  pdf.text(`Afastamento Inicial: ${atestado.afast_o ? new Date(atestado.afast_o).toLocaleDateString() : '-'}`, 10, 70);
  pdf.text(`Afastamento Final: ${atestado.afast_c ? new Date(atestado.afast_c).toLocaleDateString() : '-'}`, 10, 80);
  pdf.text(`Motivo: ${atestado.motivo}`, 10, 90);
  pdf.text(`Assinatura do Médico: ${atestado.ass_med}`, 10, 100);

  pdf.save(`atestadoDD.pdf`);
}

// Executa a busca quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
  buscarAtestadosDoPaciente(usuario.id);
});
