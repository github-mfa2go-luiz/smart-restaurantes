# 🍽️ Dashboard de Restaurantes Brasil

## ✨ Como Usar

### Opção 1: Abrir Diretamente (MAIS FÁCIL!)
1. Baixe o arquivo `restaurantes-dashboard.html`
2. Clique duas vezes nele ou arraste para o navegador
3. Pronto! Funciona 100% offline

### Opção 2: Hospedagem Online (Gratuita)
Para compartilhar com outras pessoas ou acessar de qualquer lugar:

**GitHub Pages (Grátis):**
1. Crie uma conta no GitHub
2. Crie um repositório novo
3. Faça upload do arquivo HTML
4. Vá em Settings > Pages > Ative o GitHub Pages
5. Seu dashboard estará online em: `https://seuusuario.github.io/seu-repo`

**Netlify (Grátis):**
1. Acesse netlify.com
2. Arraste o arquivo HTML para o site
3. Pronto! Link gerado instantaneamente

## 📝 Como Atualizar os Dados

### Método Manual (Recomendado):
1. Edite seu CSV no Excel/Google Sheets
2. Me envie o novo CSV
3. Eu gero um novo HTML atualizado para você

### Método Avançado (Para Programadores):
O arquivo `dashboard.jsx` é o componente React.
Você pode editar o array `restaurantsData` dentro do HTML diretamente.

## 🔄 Próximos Passos (Automação)

Se quiser automação semanal para buscar dados atualizados:

### Opção A: Script Python (Local)
- Criarei um script que roda 1x por semana
- Busca avaliações do Google Places API
- Valida se menus ainda existem
- Gera novo HTML automaticamente

### Opção B: Airtable + Make.com (Nuvem)
- Base de dados visual (tipo Notion turbinado)
- Automação na nuvem (sem código)
- Busca automática de dados
- **Custo:** ~$9-29/mês

### Opção C: Notion + API (Híbrido)
- Mantém seus dados no Notion
- Script busca dados via API do Notion
- Gera dashboard automaticamente
- **Custo:** Grátis (API do Notion é gratuita)

## 🎨 Funcionalidades Atuais

✅ Filtros por: Cidade, Tipo de Comida, Bairro, Estilo
✅ Busca por nome
✅ Estatísticas em tempo real
✅ Cards bonitos e responsivos
✅ Links diretos para cardápios
✅ Indicação de reserva
✅ Design mobile-friendly
✅ 100% funcional offline

## 📊 Dados Incluídos

- **33 restaurantes** válidos
- **São Paulo:** 26 restaurantes
- **Campos do Jordão:** 6 restaurantes
- **São Bernardo:** 1 restaurante

**Tipos de Comida:**
- Brasileira, Italiana, Carne, Japonesa
- Fitness, Brunch, Pizza, Mediterrânea
- Internacional, Fondue, Francesa, Mineira

## 🚀 Melhorias Futuras Possíveis

1. **Mapa Interativo** - Mostrar restaurantes no Google Maps
2. **Avaliações** - Integrar ratings do Google/TripAdvisor
3. **Fotos** - Adicionar imagens dos pratos
4. **Favoritos** - Sistema de marcação
5. **Compartilhar** - Gerar lista de recomendações
6. **Rotas** - Calcular distância/tempo até cada restaurante

## 💡 Dicas

- **Performance:** O arquivo HTML é leve (~100KB) e carrega instantaneamente
- **Mobile:** Funciona perfeitamente em celular/tablet
- **Impressão:** Você pode imprimir diretamente do navegador
- **Backup:** Sempre mantenha uma cópia do CSV original

## 🆘 Problemas?

Se algo não funcionar:
1. Tente outro navegador (Chrome, Firefox, Safari)
2. Verifique se JavaScript está ativado
3. Limpe o cache do navegador
4. Me avise e eu corrijo!

---

**Criado com ❤️ usando React + Tailwind CSS**
**Última atualização:** Janeiro 2026