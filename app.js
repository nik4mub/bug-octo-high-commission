const salesInputs = [...document.querySelectorAll('#days input')];
const rateInput = document.getElementById('rate');
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
function updateTotals() {
    const total = salesInputs.reduce((sum, input) => sum + (input.disabled ? 0 : Math.max(0, Number(input.value) || 0)), 0);
    const rate = Math.min(100, Math.max(0, Number(rateInput.value) || 0));
    document.getElementById('total').textContent = currency.format(total);
    document.getElementById('commission').textContent = currency.format(total * rate / 100);
}
salesInputs.forEach(input => input.addEventListener('input', updateTotals));
document.querySelectorAll('.off-toggle input').forEach(toggle => toggle.addEventListener('change', () => {
    const row = toggle.closest('.day-row');
    const salesInput = row.querySelector('input[type="number"]');
    salesInput.disabled = toggle.checked;
    row.dataset.off = toggle.checked;
    updateTotals();
}));
rateInput.addEventListener('input', updateTotals);
const toggle = document.getElementById('themeToggle');
try { if (localStorage.getItem('commission-theme') === 'dark') document.documentElement.dataset.theme = 'dark'; } catch (_) { }
function syncThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    document.getElementById('themeIcon').textContent = dark ? '☀' : '☾';
    document.getElementById('themeText').textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#11151d' : '#f5f7fb';
}
toggle.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('commission-theme', dark ? 'dark' : 'light'); } catch (_) { }
    syncThemeButton();
});
syncThemeButton();