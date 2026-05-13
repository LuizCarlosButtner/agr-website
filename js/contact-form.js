// =====================================================================
// LÓGICA DO FORMULÁRIO DE CONTATO — Web3Forms
// =====================================================================

// Configuração da integração Web3Forms
const WEB3FORMS_ACCESS_KEY = 'ac96daf9-a415-4472-9ac5-3e4f3404b2d2';
const WEB3FORMS_FROM_NAME  = 'AGR Podcast Estúdios — Site';
const WEB3FORMS_SUBJECT    = 'Nova mensagem pelo site AGR';

// Configuração da API do Gemini (IA para Resumos dos Vídeos)
// Insira a sua chave gerada no Google AI Studio aqui:
const GEMINI_API_KEY = '';

// Helpers de visibilidade (corrige conflito entre inline style e CSS class)
function showEl(el)  { el.style.display = 'block'; }
function hideEl(el)  { el.style.display = 'none';  }

(function () {
  const form       = document.getElementById('contact-form');
  if (!form) return;

  const btnSubmit  = document.getElementById('btn-submit');
  const btnText    = document.getElementById('btn-submit-text');
  const btnSpinner = document.getElementById('btn-submit-spinner');
  const msgSuccess = document.getElementById('form-success');
  const msgError   = document.getElementById('form-error');

  // Esconde as mensagens de feedback ao usuário começar a digitar novamente
  form.addEventListener('input', function () {
    hideEl(msgSuccess);
    hideEl(msgError);
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Estado de loading
    btnSubmit.disabled       = true;
    btnText.textContent      = 'Enviando…';
    btnSpinner.style.display = 'inline-block';
    hideEl(msgSuccess);
    hideEl(msgError);

    // Monta o FormData e injeta as configurações via JS (sem expor no HTML)
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('from_name',  WEB3FORMS_FROM_NAME);
    formData.append('subject',    WEB3FORMS_SUBJECT);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Exibe mensagem de sucesso
        msgSuccess.style.opacity    = '1';
        msgSuccess.style.transition = 'opacity 0.6s ease';
        showEl(msgSuccess);
        form.reset();

        // Esmaecer e esconder após 5 segundos
        setTimeout(function () {
          msgSuccess.style.opacity = '0';
          setTimeout(function () {
            hideEl(msgSuccess);
            msgSuccess.style.opacity = '1'; // reseta para próximo uso
          }, 650);
        }, 5000);
      } else {
        console.error('Web3Forms error:', data.message);
        showEl(msgError);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showEl(msgError);
    } finally {
      // Restaura o botão independente do resultado
      btnSubmit.disabled       = false;
      btnText.textContent      = 'Enviar Mensagem';
      btnSpinner.style.display = 'none';
    }
  });
})();
