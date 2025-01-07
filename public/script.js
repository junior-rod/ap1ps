document.getElementById('formulario').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const campoValor = document.getElementById('campoValor');
    const resultado = document.getElementById('resultado');
    const valor = campoValor.value.trim();
  
    if (valor === '') {
      resultado.textContent = 'Por favor, insira um valor válido.';
      return;
    }
  
    try {
      const response = await fetch('/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor })
      });
  
      if (!response.ok) {
        throw new Error('Erro ao processar o valor.');
      }
  
      const data = await response.json();
      resultado.innerHTML = `
        <p>O valor <strong>${data.valor}</strong> foi enviado <strong>${data.contador}</strong> vez(es).</p>
      `;
    } catch (error) {
      resultado.textContent = 'Erro ao enviar o valor. Tente novamente mais tarde.';
    }
  });
  